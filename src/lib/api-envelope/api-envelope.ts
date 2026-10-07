import { z } from "zod";

export const SUCCESS_CODE = 200;

export class ApiError extends Error {
  constructor(
    message: string,
    readonly code: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const envelopeSchema = z.object({
  data: z.unknown(),
  message: z.string(),
  code: z.number(),
});

export const parseEnvelope = <S extends z.ZodType>(
  schema: S,
  payload: unknown,
): z.infer<S> => {
  const envelope = envelopeSchema.parse(payload);
  if (envelope.code !== SUCCESS_CODE) {
    throw new ApiError(envelope.message, envelope.code);
  }
  return schema.parse(envelope.data);
};
