export default function Loading() {
  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border bg-white dark:bg-gray-950 p-6 shadow-sm">
            <div className="h-6 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
          <div className="rounded-lg border bg-white dark:bg-gray-950 p-6 shadow-sm">
            <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
            <div className="space-y-4">
              <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-white dark:bg-gray-950 p-6 shadow-sm">
          <div className="h-6 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
          <div className="space-y-3">
            <div className="h-20 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
