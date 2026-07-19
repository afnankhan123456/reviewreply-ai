import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function HelpCenter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Help Center</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Browse comprehensive guides, video tutorials, and API documentation.
        </p>
        <Link href="https://help.example.com" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="gap-2">
            Visit Help Center
            <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
