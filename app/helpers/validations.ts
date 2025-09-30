import { z } from "zod/v4";

export const urlSchema = (messages: {
  emptyUrl: string;
  invalidUrl: string;
  validDomain: string;
  domainExtension: string;
  extension: string;
}) =>
  z
    .string()
    .trim()
    .min(1, { message: messages.emptyUrl })
    .transform((val) => {
      if (!/^https?:\/\//i.test(val)) return `https://${val}`;
      return val;
    })
    .superRefine((val, ctx) => {
      if (/^https?:\/\/$/i.test(val)) {
        ctx.addIssue({
          code: "custom",
          message: messages.validDomain,
        });
        return;
      }

      if (/^https?:\/\/www$/i.test(val)) {
        ctx.addIssue({
          code: "custom",
          message: messages.domainExtension,
        });
        return;
      }

      if (/^https?:\/\/[a-z0-9-]+$/i.test(val)) {
        ctx.addIssue({
          code: "custom",
          message: messages.extension,
        });
        return;
      }
      
      const generalUrlRegex =
        /^https?:\/\/([a-z0-9-]+\.)+[a-z]{2,}(:\d+)?(\/\S*)?$/i;

      if (!generalUrlRegex.test(val)) {
        ctx.addIssue({
          code: "custom",
          message: messages.invalidUrl,
        });
      }
    });

export const validateUrl = (
  input: string,
  messages: {
    emptyUrl: string;
    invalidUrl: string;
    validDomain: string;
    domainExtension: string;
    extension: string;
  }
): { valid: string | null; error: string } => {
  try {
    const url = urlSchema(messages).parse(input);
    return { valid: url, error: "" };
  } catch (err) {
    let message = messages.invalidUrl;

    if (err instanceof z.ZodError && err.issues.length > 0) {
      message = err.issues[0].message;
    }

    return { valid: null, error: message };
  }
};
