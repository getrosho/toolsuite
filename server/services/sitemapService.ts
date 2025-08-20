export class SitemapService {
  private baseUrl = process.env.BASE_URL || 'https://toolsuite.com';

  async generateSitemap(): Promise<string> {
    const urls = [
      { loc: '/', changefreq: 'daily', priority: '1.0' },
      { loc: '/word-counter', changefreq: 'weekly', priority: '0.9' },
      { loc: '/pdf-to-word', changefreq: 'weekly', priority: '0.9' },
      { loc: '/pdf-compressor', changefreq: 'weekly', priority: '0.8' },
      { loc: '/merge-pdfs', changefreq: 'weekly', priority: '0.8' },
      { loc: '/remove-background', changefreq: 'weekly', priority: '0.8' },
      { loc: '/qr-generator', changefreq: 'weekly', priority: '0.9' },
      { loc: '/thumbnail-downloader', changefreq: 'weekly', priority: '0.8' },
      { loc: '/currency-converter', changefreq: 'daily', priority: '0.8' },
      { loc: '/plagiarism-checker', changefreq: 'weekly', priority: '0.8' },
      { loc: '/meta-generator', changefreq: 'weekly', priority: '0.8' },
      { loc: '/title-counter', changefreq: 'weekly', priority: '0.7' },
      { loc: '/about', changefreq: 'monthly', priority: '0.5' },
      { loc: '/privacy', changefreq: 'monthly', priority: '0.3' },
      { loc: '/terms', changefreq: 'monthly', priority: '0.3' },
      { loc: '/contact', changefreq: 'monthly', priority: '0.5' },
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${this.baseUrl}${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;

    return sitemap;
  }
}

export const sitemapService = new SitemapService();
