import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { question: "How do I reset my password?", answer: "Go to Settings → Security and click 'Change Password'." },
  { question: "Can I upgrade my plan later?", answer: "Yes, you can upgrade anytime from the Billing page." },
  { question: "Where can I find my API key?", answer: "Navigate to Developer Settings → API Keys." },
  { question: "Do you offer refunds?", answer: "We offer a 14‑day money‑back guarantee on all plans." },
];

export function FAQ() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
