"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/** 区分首页 / 联系页，冷却与每日上限各自计数 */
export type ContactFormAntiAbuseScope = "home-get-in-touch" | "contact-us";

const COOLDOWN_MS = 90_000;
const MIN_MS_AFTER_MOUNT = 2_800;
const MAX_SUBMITS_PER_LOCAL_DAY = 12;

function storageLastKey(scope: ContactFormAntiAbuseScope) {
  return `noahfinance_cf_last_${scope}`;
}

function storageDayKey(scope: ContactFormAntiAbuseScope) {
  return `noahfinance_cf_day_${scope}`;
}

function localDayId(d = new Date()): string {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function readDayCount(scope: ContactFormAntiAbuseScope): {
  day: string;
  count: number;
} {
  if (typeof window === "undefined") return { day: localDayId(), count: 0 };
  try {
    const raw = window.localStorage.getItem(storageDayKey(scope));
    if (!raw) return { day: localDayId(), count: 0 };
    const parsed = JSON.parse(raw) as { day?: string; count?: number };
    const day = typeof parsed.day === "string" ? parsed.day : localDayId();
    const count = typeof parsed.count === "number" ? parsed.count : 0;
    return { day, count };
  } catch {
    return { day: localDayId(), count: 0 };
  }
}

export type AntiAbuseBlock =
  | { ok: true }
  | { ok: false; message: string }
  | { ok: false; silentBot: true };

export function useContactFormAntiAbuse(scope: ContactFormAntiAbuseScope) {
  /** 仅在浏览器挂载后设置，避免 SSR 与首屏时间不一致 */
  const mountedAtRef = useRef<number | null>(null);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [cooldownTick, setCooldownTick] = useState(0);

  useEffect(() => {
    mountedAtRef.current =
      typeof performance !== "undefined" ? performance.now() : Date.now();
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageLastKey(scope));
      if (!raw) return;
      const t = Number.parseInt(raw, 10);
      if (!Number.isFinite(t)) return;
      const until = t + COOLDOWN_MS;
      if (until > Date.now()) setCooldownUntil(until);
    } catch {
      /* ignore */
    }
  }, [scope]);

  useEffect(() => {
    if (!cooldownUntil || cooldownUntil <= Date.now()) return;
    const id = window.setInterval(() => {
      setCooldownTick((n) => n + 1);
      if (Date.now() >= cooldownUntil) {
        setCooldownUntil(null);
        window.clearInterval(id);
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [cooldownUntil]);

  const cooldownSecondsLeft = useMemo(() => {
    if (!cooldownUntil) return 0;
    const left = Math.ceil((cooldownUntil - Date.now()) / 1000);
    return left > 0 ? left : 0;
  }, [cooldownUntil, cooldownTick]);

  const assertCanSubmit = useCallback(
    (honeypotValue: string): AntiAbuseBlock => {
      if (honeypotValue.trim() !== "") {
        return { ok: false, silentBot: true };
      }

      const start = mountedAtRef.current;
      if (start == null) {
        return {
          ok: false,
          message: "Please wait a moment before submitting.",
        };
      }
      const now =
        typeof performance !== "undefined" ? performance.now() : Date.now();
      const elapsed = now - start;

      if (elapsed < MIN_MS_AFTER_MOUNT) {
        return {
          ok: false,
          message: "Please wait a moment before submitting.",
        };
      }

      if (cooldownUntil && Date.now() < cooldownUntil) {
        const sec = Math.ceil((cooldownUntil - Date.now()) / 1000);
        return {
          ok: false,
          message: `Please wait ${sec}s before sending again.`,
        };
      }

      const { day, count } = readDayCount(scope);
      const today = localDayId();
      const effectiveCount = day === today ? count : 0;
      if (effectiveCount >= MAX_SUBMITS_PER_LOCAL_DAY) {
        return {
          ok: false,
          message:
            "You’ve reached the daily limit for form submissions from this browser. Please try again tomorrow or contact us by phone or email.",
        };
      }

      return { ok: true };
    },
    [cooldownUntil, scope],
  );

  const recordSuccessfulSubmit = useCallback(() => {
    const now = Date.now();
    try {
      window.localStorage.setItem(storageLastKey(scope), String(now));
      setCooldownUntil(now + COOLDOWN_MS);

      const today = localDayId();
      const { day, count } = readDayCount(scope);
      const next =
        day === today ? count + 1 : 1;
      window.localStorage.setItem(
        storageDayKey(scope),
        JSON.stringify({ day: today, count: next }),
      );
    } catch {
      /* ignore quota / private mode */
    }
  }, [scope]);

  return {
    assertCanSubmit,
    recordSuccessfulSubmit,
    cooldownSecondsLeft,
    isInCooldown: cooldownSecondsLeft > 0,
    honeypotName: "_hp_website" as const,
  };
}
