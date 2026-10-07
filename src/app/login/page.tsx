import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/app/login/_components/login-form";

export default function LoginPage() {
  return (
    <main
      data-testid="login-page"
      className="flex min-h-screen items-center justify-center bg-muted p-4"
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Masuk</CardTitle>
          <CardDescription>Masuk ke dashboard Citadel</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
