import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const articles = [
  { title: "Getting Started Guide", content: "Learn how to set up your account and configure your first project." },
  { title: "Billing & Invoices", content: "Understand your billing cycle, payment methods, and how to download invoices." },
  { title: "API Reference", content: "Full documentation of our REST API with code examples." },
  { title: "Integrations", content: "Connect with popular tools like Slack, Jira, and GitHub." },
];

export function KnowledgeBase() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Knowledge Base</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {articles.map((article, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-left">
                {article.title}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {article.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
