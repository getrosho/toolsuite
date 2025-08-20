import { useState, useEffect } from 'react';
import { AdSlot } from '@/components/AdSlot';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

const faqs = [
  {
    question: 'How accurate is the word counter?',
    answer: 'Our word counter is highly accurate and uses standard word counting algorithms. It counts words separated by spaces and considers punctuation appropriately.',
  },
  {
    question: 'Is my text data secure?',
    answer: 'Yes, all text processing happens in your browser. We don\'t store or transmit your text to any servers, ensuring complete privacy.',
  },
  {
    question: 'What is the reading time calculation based on?',
    answer: 'The estimated reading time is calculated based on an average reading speed of 200 words per minute, which is the standard for adult readers.',
  },
];

export default function WordCounter() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    readingTime: 0,
  });

  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
    const readingTime = Math.ceil(words / 200);

    setStats({
      words,
      characters,
      charactersNoSpaces,
      sentences,
      readingTime,
    });
  }, [text]);

  const clearText = () => {
    setText('');
  };

  return (
    <div>
      <section className="py-16 transition-theme bg-gray-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              <i className="fas fa-spell-check text-purple-500 mr-3"></i>
              Word Counter Tool
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use our free Word Counter tool to count words, characters, and sentences instantly online. 
              Perfect for writers, students, and content creators who need to track their writing progress.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <div>
                  <label htmlFor="text-input" className="block text-sm font-medium text-foreground mb-2">
                    Enter your text:
                  </label>
                  <Textarea
                    id="text-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={12}
                    className="resize-none"
                    placeholder="Type or paste your text here to get an instant word count..."
                  />
                </div>

                {/* Results Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Statistics</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-lg border border-border">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.words}</div>
                      <div className="text-sm text-muted-foreground">Words</div>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-lg border border-border">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.characters}</div>
                      <div className="text-sm text-muted-foreground">Characters</div>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-lg border border-border">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.charactersNoSpaces}</div>
                      <div className="text-sm text-muted-foreground">Chars (no spaces)</div>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-lg border border-border">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.sentences}</div>
                      <div className="text-sm text-muted-foreground">Sentences</div>
                    </div>
                  </div>

                  {/* Reading Time */}
                  <div className="bg-gradient-primary p-4 rounded-lg text-white">
                    <div className="text-lg font-semibold">Estimated Reading Time</div>
                    <div className="text-2xl font-bold">{stats.readingTime} minute{stats.readingTime !== 1 ? 's' : ''}</div>
                  </div>

                  {/* Clear Button */}
                  <Button 
                    onClick={clearText}
                    variant="outline"
                    className="w-full"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Text
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <div className="mt-12">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* Ad Slot */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSlot size="rectangle" className="mx-auto" />
        </div>
      </div>
    </div>
  );
}
