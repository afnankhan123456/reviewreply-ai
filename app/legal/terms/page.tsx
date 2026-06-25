export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-black text-black dark:text-white p-8">

      <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8">

        <h1 className="text-4xl font-bold mb-6">
          Terms & Conditions
        </h1>

        <div className="space-y-6 text-zinc-600 dark:text-zinc-400">

          <p>
            By using ReviewReply AI, you agree to follow all applicable laws and platform policies.
          </p>

          <p>
            Subscription payments are billed monthly and can be canceled anytime.
          </p>

          <p>
            Users are responsible for reviewing AI-generated replies before publishing them publicly.
          </p>

          <p>
            We reserve the right to suspend accounts involved in spam, abuse, or misuse of the platform.
          </p>

        </div>

      </div>

    </div>
  );
}