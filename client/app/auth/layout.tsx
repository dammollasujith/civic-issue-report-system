export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}

