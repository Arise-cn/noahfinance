"use client";

import emailjs from "@emailjs/browser";
import type { EmailJSResponseStatus } from "@emailjs/browser";
import { useCallback, useMemo, useState } from "react";

import { EMAILJS_CONFIG } from "@/constants/emailjs";

export type UseEmailJsOverrides = {
  serviceId?: string;
  templateId?: string;
  publicKey?: string;
};

function toError(err: unknown): Error {
  if (err instanceof Error) return err;
  return new Error(typeof err === "string" ? err : "EmailJS 发送失败");
}

function resolveCredentials(
  base: { serviceId: string; templateId: string; publicKey: string },
  extra?: Pick<UseEmailJsOverrides, "serviceId" | "templateId" | "publicKey">,
) {
  return {
    serviceId: extra?.serviceId ?? base.serviceId,
    templateId: extra?.templateId ?? base.templateId,
    publicKey: extra?.publicKey ?? base.publicKey,
  };
}

export function useEmailJs(overrides?: UseEmailJsOverrides) {
  const base = useMemo(
    () => ({
      serviceId: overrides?.serviceId ?? EMAILJS_CONFIG.serviceId,
      templateId: overrides?.templateId ?? EMAILJS_CONFIG.templateId,
      publicKey: overrides?.publicKey ?? EMAILJS_CONFIG.publicKey,
    }),
    [
      overrides?.serviceId,
      overrides?.templateId,
      overrides?.publicKey,
    ],
  );

  const configured = useMemo(
    () =>
      Boolean(base.serviceId && base.templateId && base.publicKey),
    [base.publicKey, base.serviceId, base.templateId],
  );

  const [sending, setSending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastStatus, setLastStatus] = useState<EmailJSResponseStatus | null>(
    null,
  );

  const reset = useCallback(() => {
    setError(null);
    setLastStatus(null);
  }, []);

  const send = useCallback(
    async (
      templateParams: Record<string, unknown>,
      sendOverrides?: Pick<
        UseEmailJsOverrides,
        "serviceId" | "templateId" | "publicKey"
      >,
    ): Promise<EmailJSResponseStatus> => {
      const { serviceId, templateId, publicKey } = resolveCredentials(
        base,
        sendOverrides,
      );

      if (!serviceId || !templateId || !publicKey) {
        const err = new Error(
          "EmailJS：缺少 serviceId / templateId / publicKey，请检查环境变量或传入 overrides",
        );
        setError(err);
        throw err;
      }

      setSending(true);
      setError(null);
      setLastStatus(null);

      try {
        const status = await emailjs.send(
          serviceId,
          templateId,
          templateParams,
          { publicKey },
        );
        setLastStatus(status);
        return status;
      } catch (e) {
        const err = toError(e);
        setError(err);
        throw err;
      } finally {
        setSending(false);
      }
    },
    [base],
  );

  const sendForm = useCallback(
    async (
      form: HTMLFormElement | string,
      sendOverrides?: Pick<
        UseEmailJsOverrides,
        "serviceId" | "templateId" | "publicKey"
      >,
    ): Promise<EmailJSResponseStatus> => {
      const { serviceId, templateId, publicKey } = resolveCredentials(
        base,
        sendOverrides,
      );

      if (!serviceId || !templateId || !publicKey) {
        const err = new Error(
          "EmailJS：缺少 serviceId / templateId / publicKey，请检查环境变量或传入 overrides",
        );
        setError(err);
        throw err;
      }

      setSending(true);
      setError(null);
      setLastStatus(null);

      try {
        const status = await emailjs.sendForm(serviceId, templateId, form, {
          publicKey,
        });
        setLastStatus(status);
        return status;
      } catch (e) {
        const err = toError(e);
        setError(err);
        throw err;
      } finally {
        setSending(false);
      }
    },
    [base],
  );

  return {
    isConfigured: configured,
    sending,
    error,
    lastStatus,
    send,
    sendForm,
    reset,
  };
}
