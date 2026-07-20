import { ExternalLink } from "lucide-react";

export function HelpCenter() {
  return (
    <div className="rounded-lg border bg-white dark:bg-gray-950 shadow-sm p-3 h-[183px] flex flex-col">
      <h3 className="text-base font-semibold mb-1.5">Help Center</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex-1">
        Browse comprehensive guides, video tutorials, and API documentation.
      </p>
      <a
        href="https://help.example.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-1.5 rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-1.5 text-xs font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mt-auto"
      >
        Visit Help Center
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
