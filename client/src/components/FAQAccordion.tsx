import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold mb-6 text-foreground">Frequently Asked Questions</h3>
      {faqs.map((faq, index) => (
        <div key={index} className="bg-card rounded-lg border border-border">
          <button
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent transition-colors"
            onClick={() => toggleFAQ(index)}
          >
            <span className="font-medium text-card-foreground">{faq.question}</span>
            {openIndex === index ? (
              <ChevronUp className="text-muted-foreground w-5 h-5" />
            ) : (
              <ChevronDown className="text-muted-foreground w-5 h-5" />
            )}
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4 text-muted-foreground">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
