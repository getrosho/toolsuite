import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Layout } from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import { useAnalytics } from "@/hooks/use-analytics";
import { useEffect } from "react";
import { initGA } from "@/lib/analytics";

// Pages
import Home from "@/pages/Home";
import WordCounter from "@/pages/WordCounter";
import PDFConverter from "@/pages/PDFConverter";
import PDFCompressor from "@/pages/PDFCompressor";
import MergePDFs from "@/pages/MergePDFs";
import RemoveBackground from "@/pages/RemoveBackground";
import QRGenerator from "@/pages/QRGenerator";
import ThumbnailDownloader from "@/pages/ThumbnailDownloader";
import CurrencyConverter from "@/pages/CurrencyConverter";
import PlagiarismChecker from "@/pages/PlagiarismChecker";
import MetaGenerator from "@/pages/MetaGenerator";
import TitleCounter from "@/pages/TitleCounter";
import About from "@/pages/About";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  useAnalytics();
  
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        
        {/* Text & File Tools */}
        <Route path="/word-counter" component={WordCounter} />
        <Route path="/pdf-to-word" component={PDFConverter} />
        <Route path="/pdf-compressor" component={PDFCompressor} />
        <Route path="/merge-pdfs" component={MergePDFs} />
        <Route path="/remove-background" component={RemoveBackground} />
        
        {/* Generators */}
        <Route path="/qr-generator" component={QRGenerator} />
        <Route path="/thumbnail-downloader" component={ThumbnailDownloader} />
        <Route path="/currency-converter" component={CurrencyConverter} />
        
        {/* SEO Tools */}
        <Route path="/plagiarism-checker" component={PlagiarismChecker} />
        <Route path="/meta-generator" component={MetaGenerator} />
        <Route path="/title-counter" component={TitleCounter} />
        
        {/* Company Pages */}
        <Route path="/about" component={About} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/contact" component={Contact} />
        
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  useEffect(() => {
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Layout>
            <Router />
          </Layout>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
