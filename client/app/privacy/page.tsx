export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Privacy</div>
      <div className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-200">
        <p>
          Smart Civic collects the minimum information required to manage civic complaints, including your account
          details, complaint content, and optionally location and uploaded evidence.
        </p>
        <p>
          In production deployments, administrators should configure data retention, access controls, and audit logging
          according to local regulations.
        </p>
      </div>
    </div>
  );
}

