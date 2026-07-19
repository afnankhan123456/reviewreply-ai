import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ShieldCheck, Headphones } from "lucide-react";

export function PrioritySupport() {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <CardTitle>Priority Support</CardTitle>
          <Badge variant="default">Standard Plan</Badge>
        </div>
        <CardDescription>
          As a Standard plan member, you enjoy these benefits.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
          <div>
            <p className="font-medium">4‑hour response time</p>
            <p className="text-sm text-muted-foreground">
              Guaranteed first reply within 4 business hours.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Headphones className="h-4 w-4 mt-0.5 text-muted-foreground" />
          <div>
            <p className="font-medium">Email & chat support</p>
            <p className="text-sm text-muted-foreground">
              Reach us via in‑app chat or email any time.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
