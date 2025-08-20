import { type User, type InsertUser, type Tool, type InsertTool, type ToolUsage, type InsertToolUsage, type SiteSettings, type InsertSiteSettings } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getTool(slug: string): Promise<Tool | undefined>;
  getAllTools(): Promise<Tool[]>;
  createTool(tool: InsertTool): Promise<Tool>;
  updateTool(slug: string, updates: Partial<Tool>): Promise<Tool | undefined>;
  
  getToolUsage(toolSlug: string): Promise<ToolUsage | undefined>;
  incrementToolUsage(toolSlug: string): Promise<void>;
  getToolsUsageStats(): Promise<ToolUsage[]>;
  
  getSetting(key: string): Promise<SiteSettings | undefined>;
  setSetting(setting: InsertSiteSettings): Promise<SiteSettings>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private tools: Map<string, Tool>;
  private toolUsage: Map<string, ToolUsage>;
  private settings: Map<string, SiteSettings>;

  constructor() {
    this.users = new Map();
    this.tools = new Map();
    this.toolUsage = new Map();
    this.settings = new Map();
    
    // Initialize with default tools
    this.initializeDefaultTools();
  }

  private initializeDefaultTools() {
    const defaultTools: InsertTool[] = [
      {
        name: 'Word Counter',
        slug: 'word-counter',
        category: 'Text & Files',
        description: 'Count words, characters, and sentences instantly',
        icon: 'fas fa-spell-check',
      },
      {
        name: 'PDF to Word Converter',
        slug: 'pdf-to-word',
        category: 'Text & Files',
        description: 'Convert PDF files to editable Word documents',
        icon: 'fas fa-file-pdf',
      },
      {
        name: 'PDF Compressor',
        slug: 'pdf-compressor',
        category: 'Text & Files',
        description: 'Compress PDF files to reduce file size',
        icon: 'fas fa-compress',
      },
      {
        name: 'Merge PDFs',
        slug: 'merge-pdfs',
        category: 'Text & Files',
        description: 'Combine multiple PDF files into one',
        icon: 'fas fa-layer-group',
      },
      {
        name: 'Remove Background',
        slug: 'remove-background',
        category: 'Text & Files',
        description: 'Remove background from images automatically',
        icon: 'fas fa-magic',
      },
      {
        name: 'QR Code Generator',
        slug: 'qr-generator',
        category: 'Generators',
        description: 'Generate custom QR codes for any content',
        icon: 'fas fa-qrcode',
      },
      {
        name: 'Thumbnail Downloader',
        slug: 'thumbnail-downloader',
        category: 'Generators',
        description: 'Download thumbnails from social media',
        icon: 'fab fa-youtube',
      },
      {
        name: 'Currency Converter',
        slug: 'currency-converter',
        category: 'Generators',
        description: 'Convert currencies with live exchange rates',
        icon: 'fas fa-exchange-alt',
      },
      {
        name: 'Plagiarism Checker',
        slug: 'plagiarism-checker',
        category: 'SEO Tools',
        description: 'Check content for plagiarism and originality',
        icon: 'fas fa-search',
      },
      {
        name: 'Meta Tag Generator',
        slug: 'meta-generator',
        category: 'SEO Tools',
        description: 'Generate SEO-optimized meta tags',
        icon: 'fas fa-tags',
      },
      {
        name: 'Title Counter',
        slug: 'title-counter',
        category: 'SEO Tools',
        description: 'Count characters in titles and descriptions',
        icon: 'fas fa-ruler',
      },
    ];

    defaultTools.forEach(tool => {
      const fullTool: Tool = {
        id: randomUUID(),
        ...tool,
        isActive: true,
        createdAt: new Date(),
      };
      this.tools.set(tool.slug, fullTool);
      
      // Initialize usage stats
      this.toolUsage.set(tool.slug, {
        id: randomUUID(),
        toolSlug: tool.slug,
        usageCount: 0,
        lastUsed: new Date(),
      });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getTool(slug: string): Promise<Tool | undefined> {
    return this.tools.get(slug);
  }

  async getAllTools(): Promise<Tool[]> {
    return Array.from(this.tools.values()).filter(tool => tool.isActive);
  }

  async createTool(insertTool: InsertTool): Promise<Tool> {
    const id = randomUUID();
    const tool: Tool = {
      ...insertTool,
      id,
      isActive: true,
      createdAt: new Date(),
    };
    this.tools.set(insertTool.slug, tool);
    
    // Initialize usage stats
    this.toolUsage.set(insertTool.slug, {
      id: randomUUID(),
      toolSlug: insertTool.slug,
      usageCount: 0,
      lastUsed: new Date(),
    });
    
    return tool;
  }

  async updateTool(slug: string, updates: Partial<Tool>): Promise<Tool | undefined> {
    const tool = this.tools.get(slug);
    if (!tool) return undefined;
    
    const updatedTool = { ...tool, ...updates };
    this.tools.set(slug, updatedTool);
    return updatedTool;
  }

  async getToolUsage(toolSlug: string): Promise<ToolUsage | undefined> {
    return this.toolUsage.get(toolSlug);
  }

  async incrementToolUsage(toolSlug: string): Promise<void> {
    const usage = this.toolUsage.get(toolSlug);
    if (usage) {
      usage.usageCount += 1;
      usage.lastUsed = new Date();
      this.toolUsage.set(toolSlug, usage);
    } else {
      // Create new usage entry
      this.toolUsage.set(toolSlug, {
        id: randomUUID(),
        toolSlug,
        usageCount: 1,
        lastUsed: new Date(),
      });
    }
  }

  async getToolsUsageStats(): Promise<ToolUsage[]> {
    return Array.from(this.toolUsage.values())
      .sort((a, b) => b.usageCount - a.usageCount);
  }

  async getSetting(key: string): Promise<SiteSettings | undefined> {
    return this.settings.get(key);
  }

  async setSetting(insertSetting: InsertSiteSettings): Promise<SiteSettings> {
    const id = randomUUID();
    const setting: SiteSettings = {
      ...insertSetting,
      id,
      updatedAt: new Date(),
    };
    this.settings.set(insertSetting.key, setting);
    return setting;
  }
}

export const storage = new MemStorage();
