import { api } from "@/lib/axios/axios";
import { parseEnvelope } from "@/lib/api-envelope/api-envelope";
import { userSchema, type LoginPayload } from "@/app/login/_core/auth.types";

export const authSdk = {
  login: async (payload: LoginPayload) => {
    const { data } = await api.post("/auth/login", payload);
    return parseEnvelope(userSchema, data);
  },
  me: async () => {
    const { data } = await api.get("/auth/me");
    return parseEnvelope(userSchema, data);
  },
};
