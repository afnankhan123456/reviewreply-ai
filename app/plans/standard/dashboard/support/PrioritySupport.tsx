import { Clock, Headphones, Mail, AlertCircle } from "lucide-react";

export function PrioritySupport() {
  return (
    <div className="rounded-lg border bg-white dark:bg-gray-950 shadow-sm p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Priority Support</h3>

      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-800 dark:text-gray-200">Plan:</span>
          <span>Standard Plan</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="font-medium text-gray-800 dark:text-gray-200">First Response Time:</span>
          <span>Within 4 Business Hours</span>
        </div>

        <div className="flex items-center gap-2">
          <Headphones className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="font-medium text-gray-800 dark:text-gray-200">Support Channels:</span>
          <span>In-App Chat &amp; Email</span>
        </div>

        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="font-medium text-gray-800 dark:text-gray-200">Support Email:</span>
          <a href="mailto:afnank@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
            afnank@gmail.com
          </a>
        </div>

        {/* Only this line removed: Support Phone */}

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="font-medium text-gray-800 dark:text-gray-200">Support Hours:</span>
          <span>Monday–Friday (Business Hours)</span>
        </div>
      </div>

      <div className="flex items-start gap-2 p-3 rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-sm text-yellow-800 dark:text-yellow-200">
        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
        <p>
          If you do not receive a response within 4 business hours, please contact us directly using the email or phone number above.
        </p>
      </div>
    </div>
  );
}
