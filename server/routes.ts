import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { pdfService } from "./services/pdfService";
import { qrService } from "./services/qrService";
import { currencyService } from "./services/currencyService";
import { seoService } from "./services/seoService";
import { sitemapService } from "./services/sitemapService";

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // PDF Tools
  app.post("/api/convert-pdf", upload.single('pdf'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No PDF file provided' });
      }

      const result = await pdfService.convertToWord(req.file.path);
      await storage.incrementToolUsage('pdf-to-word');
      
      res.json({
        success: true,
        downloadUrl: result.downloadUrl,
        filename: result.filename
      });
    } catch (error) {
      console.error('PDF conversion error:', error);
      res.status(500).json({ error: 'PDF conversion failed' });
    }
  });

  app.post("/api/compress-pdf", upload.single('pdf'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No PDF file provided' });
      }

      const result = await pdfService.compressPDF(req.file.path);
      await storage.incrementToolUsage('pdf-compressor');
      
      res.json({
        success: true,
        downloadUrl: result.downloadUrl,
        filename: result.filename,
        compressionRatio: result.compressionRatio
      });
    } catch (error) {
      console.error('PDF compression error:', error);
      res.status(500).json({ error: 'PDF compression failed' });
    }
  });

  app.post("/api/merge-pdfs", upload.array('pdfs', 10), async (req, res) => {
    try {
      if (!req.files || (req.files as Express.Multer.File[]).length < 2) {
        return res.status(400).json({ error: 'At least 2 PDF files are required' });
      }

      const files = req.files as Express.Multer.File[];
      const result = await pdfService.mergePDFs(files.map(f => f.path));
      await storage.incrementToolUsage('merge-pdfs');
      
      res.json({
        success: true,
        downloadUrl: result.downloadUrl,
        filename: result.filename
      });
    } catch (error) {
      console.error('PDF merge error:', error);
      res.status(500).json({ error: 'PDF merge failed' });
    }
  });

  // Image Tools
  app.post("/api/remove-background", upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      const apiKey = process.env.REMOVE_BG_API_KEY || process.env.VITE_REMOVE_BG_API_KEY || "";
      if (!apiKey) {
        return res.status(500).json({ error: 'Remove.bg API key not configured' });
      }

      const result = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey,
        },
        body: (() => {
          const formData = new FormData();
          const fs = require('fs');
          const blob = new Blob([fs.readFileSync(req.file!.path)], { type: req.file!.mimetype });
          formData.append('image_file', blob, req.file!.originalname);
          formData.append('size', 'auto');
          return formData;
        })(),
      });

      if (!result.ok) {
        throw new Error('Background removal failed');
      }

      const imageBuffer = await result.arrayBuffer();
      await storage.incrementToolUsage('remove-background');
      
      res.set('Content-Type', 'image/png');
      res.send(Buffer.from(imageBuffer));
    } catch (error) {
      console.error('Background removal error:', error);
      res.status(500).json({ error: 'Background removal failed' });
    }
  });

  // QR Code Generator
  app.post("/api/generate-qr", async (req, res) => {
    try {
      const { type, content, size, format } = req.body;
      
      if (!content) {
        return res.status(400).json({ error: 'Content is required' });
      }

      const result = await qrService.generateQR(content, { size, format });
      await storage.incrementToolUsage('qr-generator');
      
      res.json({
        success: true,
        qrCode: result.qrCode,
        format: result.format
      });
    } catch (error) {
      console.error('QR generation error:', error);
      res.status(500).json({ error: 'QR code generation failed' });
    }
  });

  // Currency Converter
  app.get("/api/currency/rates", async (req, res) => {
    try {
      const { base = 'USD' } = req.query;
      const rates = await currencyService.getExchangeRates(base as string);
      
      res.json({
        success: true,
        base,
        rates,
        lastUpdated: rates.lastUpdated
      });
    } catch (error) {
      console.error('Currency rates error:', error);
      res.status(500).json({ error: 'Failed to fetch exchange rates' });
    }
  });

  app.post("/api/currency/convert", async (req, res) => {
    try {
      const { from, to, amount } = req.body;
      
      if (!from || !to || !amount) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }

      const result = await currencyService.convertCurrency(from, to, parseFloat(amount));
      await storage.incrementToolUsage('currency-converter');
      
      res.json({
        success: true,
        from,
        to,
        amount: parseFloat(amount),
        convertedAmount: result.convertedAmount,
        rate: result.rate,
        lastUpdated: result.lastUpdated
      });
    } catch (error) {
      console.error('Currency conversion error:', error);
      res.status(500).json({ error: 'Currency conversion failed' });
    }
  });

  // Thumbnail Downloader
  app.post("/api/download-thumbnail", async (req, res) => {
    try {
      const { url, platform } = req.body;
      
      if (!url) {
        return res.status(400).json({ error: 'URL is required' });
      }

      // Basic thumbnail extraction logic
      let thumbnailUrl = '';
      
      if (platform === 'youtube' || url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
        if (videoId) {
          thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }
      } else if (platform === 'instagram' || url.includes('instagram.com')) {
        // Instagram thumbnail extraction would require their API
        return res.status(400).json({ error: 'Instagram thumbnails require API access' });
      } else if (platform === 'tiktok' || url.includes('tiktok.com')) {
        // TikTok thumbnail extraction would require their API
        return res.status(400).json({ error: 'TikTok thumbnails require API access' });
      }

      if (!thumbnailUrl) {
        return res.status(400).json({ error: 'Could not extract thumbnail from URL' });
      }

      await storage.incrementToolUsage('thumbnail-downloader');
      
      res.json({
        success: true,
        thumbnailUrl,
        platform
      });
    } catch (error) {
      console.error('Thumbnail download error:', error);
      res.status(500).json({ error: 'Thumbnail download failed' });
    }
  });

  // SEO Tools
  app.post("/api/check-plagiarism", async (req, res) => {
    try {
      const { text } = req.body;
      
      if (!text || text.trim().length < 50) {
        return res.status(400).json({ error: 'Text must be at least 50 characters long' });
      }

      const result = await seoService.checkPlagiarism(text);
      await storage.incrementToolUsage('plagiarism-checker');
      
      res.json({
        success: true,
        plagiarismScore: result.plagiarismScore,
        sources: result.sources,
        originalityPercentage: result.originalityPercentage
      });
    } catch (error) {
      console.error('Plagiarism check error:', error);
      res.status(500).json({ error: 'Plagiarism check failed' });
    }
  });

  app.post("/api/generate-meta-tags", async (req, res) => {
    try {
      const { title, description, keywords, url } = req.body;
      
      if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
      }

      const metaTags = seoService.generateMetaTags({ title, description, keywords, url });
      await storage.incrementToolUsage('meta-generator');
      
      res.json({
        success: true,
        metaTags
      });
    } catch (error) {
      console.error('Meta tag generation error:', error);
      res.status(500).json({ error: 'Meta tag generation failed' });
    }
  });

  // Sitemap
  app.get("/api/sitemap", async (req, res) => {
    try {
      const sitemap = await sitemapService.generateSitemap();
      
      res.set('Content-Type', 'application/xml');
      res.send(sitemap);
    } catch (error) {
      console.error('Sitemap generation error:', error);
      res.status(500).json({ error: 'Sitemap generation failed' });
    }
  });

  // Scientific Calculator
  app.post("/api/scientific-calculator", async (req, res) => {
    try {
      const { expression, operation, variable } = req.body;
      
      if (!expression) {
        return res.status(400).json({ 
          success: false,
          error: 'Expression is required' 
        });
      }

      let result;
      
      try {
        // Try to use the full math service first
        const { mathService } = await import('./services/mathService.js');
        result = await mathService.calculate({
          expression,
          operation: operation || 'evaluate',
          variable: variable || 'x'
        });
      } catch (mathError) {
        console.log('Full math service unavailable, using basic service');
        // Fallback to basic math service
        const { basicMathService } = await import('./services/basicMathService.js');
        const basicResult = basicMathService.parseAndCalculate(expression, operation || 'evaluate');
        result = {
          ...basicResult,
          steps: [
            ...basicResult.steps,
            '',
            'Note: Using basic math mode. For advanced calculus operations, please ensure the Python math service is running.'
          ]
        };
      }

      await storage.incrementToolUsage('scientific-calculator');
      
      res.json(result);
    } catch (error: any) {
      console.error('Scientific calculator error:', error);
      res.status(500).json({ 
        success: false,
        error: 'Calculation service error',
        result: 'Error',
        steps: ['Internal server error. Please try again.']
      });
    }
  });

  // Tool usage statistics
  app.get("/api/tools/stats", async (req, res) => {
    try {
      const stats = await storage.getToolsUsageStats();
      
      res.json({
        success: true,
        stats
      });
    } catch (error) {
      console.error('Stats error:', error);
      res.status(500).json({ error: 'Failed to fetch statistics' });
    }
  });

  // Download endpoint for processed files
  app.get("/downloads/:filename", async (req, res) => {
    try {
      const { filename } = req.params;
      const fs = await import('fs');
      const path = await import('path');
      
      // Sanitize filename to prevent directory traversal
      const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '');
      const downloadsDir = path.join(process.cwd(), 'downloads');
      const filePath = path.join(downloadsDir, safeFilename);
      
      // Ensure downloads directory exists
      if (!fs.existsSync(downloadsDir)) {
        fs.mkdirSync(downloadsDir, { recursive: true });
      }
      
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        // Create a placeholder file for demo purposes
        const fileExtension = path.extname(safeFilename).toLowerCase();
        let content = '';
        let contentType = 'application/octet-stream';
        
        if (fileExtension === '.docx') {
          contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          // Create a simple placeholder DOCX content
          content = 'This is a converted Word document from ToolSuite PDF converter.';
        } else if (fileExtension === '.pdf') {
          contentType = 'application/pdf';
          content = 'PDF content placeholder';
        }
        
        // For demo, create a text version with appropriate extension info
        fs.writeFileSync(filePath, `ToolSuite - Processed File\n\nOriginal filename: ${safeFilename}\nProcessed on: ${new Date().toISOString()}\n\n${content}`);
      }
      
      // Set appropriate headers for download
      const fileExtension = path.extname(safeFilename).toLowerCase();
      let contentType = 'application/octet-stream';
      
      if (fileExtension === '.docx') {
        contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      } else if (fileExtension === '.pdf') {
        contentType = 'application/pdf';
      }
      
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}"`);
      
      // Stream the file
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
      
      fileStream.on('error', (error: Error) => {
        console.error('File stream error:', error);
        res.status(404).json({ error: 'File not found' });
      });
      
    } catch (error: any) {
      console.error('Download error:', error);
      res.status(500).json({ error: 'Download failed' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
