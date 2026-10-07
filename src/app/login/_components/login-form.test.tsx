import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const push = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));
vi.mock("@/app/login/_core/auth.sdk", () => ({
  authSdk: { login: vi.fn(), me: vi.fn() },
}));

import { authSdk } from "@/app/login/_core/auth.sdk";
import { LoginForm } from "@/app/login/_components/login-form";

const renderForm = () =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <LoginForm />
    </QueryClientProvider>,
  );

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("shows a validation error for an invalid email after blur", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByTestId("login-email-input"), "not-an-email");
    await user.tab();

    expect(await screen.findByText("Email tidak valid")).toBeInTheDocument();
  });

  test("does not call the sdk when the form is invalid", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByTestId("login-submit-btn"));

    expect(authSdk.login).not.toHaveBeenCalled();
  });

  test("submits valid credentials and redirects to the dashboard", async () => {
    vi.mocked(authSdk.login).mockResolvedValue({
      id: "1",
      name: "Ezra",
      email: "ezra@example.com",
    });
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByTestId("login-email-input"), "ezra@example.com");
    await user.type(screen.getByTestId("login-password-input"), "password123");
    await user.click(screen.getByTestId("login-submit-btn"));

    await waitFor(() => expect(push).toHaveBeenCalledWith("/dashboard"));
    expect(vi.mocked(authSdk.login).mock.calls[0][0]).toEqual({
      email: "ezra@example.com",
      password: "password123",
    });
  });

  test("shows the backend error message when login fails", async () => {
    vi.mocked(authSdk.login).mockRejectedValue(new Error("Invalid credentials"));
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByTestId("login-email-input"), "ezra@example.com");
    await user.type(screen.getByTestId("login-password-input"), "password123");
    await user.click(screen.getByTestId("login-submit-btn"));

    expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });
});
