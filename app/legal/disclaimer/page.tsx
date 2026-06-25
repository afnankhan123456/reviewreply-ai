export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-black text-black dark:text-white p-8">

      <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8">

        <h1 className="text-4xl font-bold mb-6">
          Disclaimer
        </h1>

        <div className="space-y-6 text-zinc-600 dark:text-zinc-400">

          <p>
            ReviewReply AI provides AI-generated responses and analytics for informational and business assistance purposes only.
          </p>

          <p>
            While we strive for accuracy, AI-generated replies may occasionally contain errors or inaccurate suggestions.
          </p>

          <p>
            Users are responsible for reviewing and approving all replies before publishing them publicly.
          </p>

          <p>
            ReviewReply AI is not liable for business losses, reputation damage, or platform policy violations resulting from the use of generated content.
          </p>

        </div>

      </div>

    </div>
  );
}