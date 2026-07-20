import { ExternalLink } from "lucide-react";

export function HelpCenter() {
  return (
    <div className="rounded-lg border bg-white dark:bg-gray-950 shadow-sm p-6 h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-2">Help Center</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Browse comprehensive guides, video tutorials, and API documentation.
      </p>
      <a
        href="https://help.example.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-4 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mt-auto"
      >
        Visit Help Center
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}
