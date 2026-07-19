"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { submitBugReport } from "./actions";

export function BugReport() {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setFeedback(null);
    startTransition(async () => {
      const result = await submitBugReport(formData);
      setFeedback({ type: result.success ? "success" : "error", message: result.message });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report a Bug</CardTitle>
        <CardDescription>
          Found something not working? Let us know and we'll fix it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Bug title</Label>
            <Input id="title" name="title" placeholder="e.g. Dashboard crashes on mobile" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="steps">Steps to reproduce</Label>
            <Textarea id="steps" name="steps" placeholder="Describe what you did..." required rows={4} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="severity">Severity</Label>
            <Select name="severity" defaultValue="medium">
              <SelectTrigger>
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low – Cosmetic issue</SelectItem>
                <SelectItem value="medium">Medium – Workaround exists</SelectItem>
                <SelectItem value="high">High – Blocking workflow</SelectItem>
                <SelectItem value="critical">Critical – System down</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {feedback && (
            <Alert variant={feedback.type === "success" ? "default" : "destructive"}>
              <AlertDescription>{feedback.message}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Submitting..." : "Submit Bug Report"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
