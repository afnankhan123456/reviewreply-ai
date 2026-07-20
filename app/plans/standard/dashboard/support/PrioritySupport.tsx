import { Clock, Headphones, Mail, AlertCircle } from "lucide-react";

export function PrioritySupport() {
  return (
    <div className="rounded-lg border bg-white dark:bg-gray-950 shadow-sm p-3 space-y-2">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white">Priority Support</h3>

      <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-gray-800 dark:text-gray-200 text-xs">Plan:</span>
          <span>Standard Plan</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
          <span className="font-medium text-gray-800 dark:text-gray-200 text-xs">First Response Time:</span>
          <span>Within 4 Business Hours</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Headphones className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
          <span className="font-medium text-gray-800 dark:text-gray-200 text-xs">Support Channels:</span>
          <span>In-App Chat &amp; Email</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Mail className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
          <span className="font-medium text-gray-800 dark:text-gray-200 text-xs">Support Email:</span>
          <a href="mailto:afnank@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">
            afnank@gmail.com
          </a>
        </div>

        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
          <span className="font-medium text-gray-800 dark:text-gray-200 text-xs">Support Hours:</span>
          <span>Monday–Friday (Business Hours)</span>
        </div>
      </div>

      <div className="flex items-start gap-1.5 p-2 rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-xs text-yellow-800 dark:text-yellow-200">
        <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
        <p>
          If you do not receive a response within 4 business hours, please contact us directly using the email or phone number above.
        </p>
      </div>
    </div>
  );
}
