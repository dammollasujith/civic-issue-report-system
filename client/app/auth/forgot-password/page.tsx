"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { http } from "@/services/http";
import { Mail } from "lucide-react";

const schema = z.object({ email: z.string().email() });
type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    await http.post("/api/auth/forgot-password", values);
  }

  return (
    <Card className="p-8">
      <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-teal/20 to-brand-blue/10">
        <Mail className="size-6 text-slate-900 dark:text-slate-100" />
      </div>
      <div className="mt-5 text-center text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        FORGOT PASSWORD
      </div>
      <div className="mt-2 text-center text-sm text-slate-600 dark:text-slate-300">
        We’ll email you a reset link (if configured).
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="mb-2 text-xs font-medium text-slate-700 dark:text-slate-200">Email</div>
          <Input placeholder="Enter your email" type="email" {...register("email")} />
          {errors.email && <div className="mt-1 text-xs text-red-600">{errors.email.message}</div>}
        </div>
        <Button disabled={isSubmitting} type="submit" className="w-full">
          {isSubmitting ? "Sending..." : "Send reset link"}
        </Button>
      </form>

      {isSubmitSuccessful && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-700 shadow-sm dark:border-slate-700/80 dark:bg-slate-950/40 dark:text-slate-200">
          If the email exists, a reset link will be sent.
        </div>
      )}

      <div className="mt-5 text-center text-xs text-slate-600 dark:text-slate-300">
        Back to{" "}
        <Link className="font-semibold text-brand-blue hover:underline" href="/auth/citizen/login">
          login
        </Link>
      </div>
    </Card>
  );
}

