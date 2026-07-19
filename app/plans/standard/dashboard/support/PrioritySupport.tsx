import { ShieldCheck, Clock, Headphones } from "lucide-react";

export function PrioritySupport() {
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-950/20 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-2">
        <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
          Priority Support
        </h3>
        <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-200">
          Standard Plan
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        As a Standard plan member, you enjoy these benefits.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <Clock className="h-4 w-4 mt-0.5 text-gray-500 dark:text-gray-400" />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              4‑hour response time
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Guaranteed first reply within 4 business hours.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Headphones className="h-4 w-4 mt-0.5 text-gray-500 dark:text-gray-400" />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Email & chat support
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Reach us via in‑app chat or email any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
