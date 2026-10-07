"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/app/login/_core/auth.queries";
import { loginSchema } from "@/app/login/_core/auth.types";

const DASHBOARD_PATH = "/dashboard";

export function LoginForm() {
  const router = useRouter();
  const loginMutation = useLoginMutation();

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onChange: loginSchema },
    onSubmit: ({ value }) => {
      loginMutation.mutate(value, {
        onSuccess: () => router.push(DASHBOARD_PATH),
      });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    form.handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <form.Field name="email">
        {(field) => (
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}>Email</Label>
            <Input
              id={field.name}
              type="email"
              autoComplete="email"
              data-testid="login-email-input"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
            />
            <FieldError field={field} />
          </div>
        )}
      </form.Field>

      <form.Field name="password">
        {(field) => (
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name}>Password</Label>
            <Input
              id={field.name}
              type="password"
              autoComplete="current-password"
              data-testid="login-password-input"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
            />
            <FieldError field={field} />
          </div>
        )}
      </form.Field>

      {loginMutation.error && (
        <p role="alert" className="text-sm text-destructive">
          {loginMutation.error.message}
        </p>
      )}

      <Button
        type="submit"
        data-testid="login-submit-btn"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Masuk..." : "Masuk"}
      </Button>
    </form>
  );
}

interface FieldErrorProps {
  field: {
    state: { meta: { isTouched: boolean; errors: Array<{ message: string } | undefined> } };
  };
}

function FieldError({ field }: FieldErrorProps) {
  const { isTouched, errors } = field.state.meta;
  const message = errors.map((error) => error?.message).filter(Boolean).join(", ");

  if (!isTouched || !message) return null;

  return (
    <p role="alert" className="text-sm text-destructive">
      {message}
    </p>
  );
}
