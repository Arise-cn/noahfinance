"use client";

import {
  EMAILJS_GET_IN_TOUCH_TEMPLATE_ID,
  GET_IN_TOUCH_EMAILJS_PARAMS as EJ,
} from "@/constants/emailjs";
import type { ContactFormAntiAbuseScope } from "@/hooks/useContactFormAntiAbuse";
import { useContactFormAntiAbuse } from "@/hooks/useContactFormAntiAbuse";
import { useEmailJs } from "@/hooks/useEmailJs";
import { cn } from "@/utils/cn";
import {
  forwardRef,
  type FormEvent,
  type ReactNode,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LANGUAGE_OPTIONS = ["English", "Chinese", "Other"] as const;
const SERVICE_OPTIONS = [
  "Residential loan",
  "Commercial loan",
  "Asset finance",
  "General enquiry",
] as const;
const HOURS = Array.from({ length: 13 }, (_, i) => i + 9);
const MINUTES = ["00", "15", "30", "45"] as const;

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-4 shrink-0 text-[#767676]", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-5 shrink-0 text-[#e8d587]", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M8 3v3M16 3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FieldLabel({
  children,
  required,
}: {
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <span className="font-inter text-[14px] font-semibold text-white">
      {children}
      {required ? <span className="text-[#e8d587]"> *</span> : null}
    </span>
  );
}

const TextInput = forwardRef<
  HTMLInputElement,
  {
    id: string;
    name: string;
    placeholder: string;
    type?: string;
    bordered?: boolean;
    className?: string;
    value: string;
    onChange: (v: string) => void;
  }
>(function TextInput(
  { id, name, placeholder, type = "text", bordered, className, value, onChange },
  ref,
) {
  return (
    <input
      ref={ref}
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "h-12 w-full rounded-[4px] bg-[#2a2a2a] px-4 font-inter text-[16px] text-white outline-none placeholder:text-[#767676]",
        bordered && "border border-solid border-[#e8d587]",
        className,
      )}
    />
  );
});

function SelectInput({
  id,
  name,
  placeholder,
  value,
  onChange,
  options,
}: {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full cursor-pointer appearance-none rounded-[4px] bg-[#2a2a2a] px-4 pr-10 font-inter text-[16px] text-white outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
    </div>
  );
}

type GetInTouchFormCardProps = {
  antiAbuseScope: ContactFormAntiAbuseScope;
  className?: string;
  formClassName?: string;
};

const GetInTouchFormCard = ({
  antiAbuseScope,
  className,
  formClassName,
}: GetInTouchFormCardProps) => {
  const baseId = useId();
  const {
    send,
    sending,
    error: sendError,
    isConfigured,
    reset: resetEmailJsState,
  } = useEmailJs({ templateId: EMAILJS_GET_IN_TOUCH_TEMPLATE_ID });
  const {
    assertCanSubmit,
    recordSuccessfulSubmit,
    cooldownSecondsLeft,
    isInCooldown,
    honeypotName,
  } = useContactFormAntiAbuse(antiAbuseScope);

  const [honeypot, setHoneypot] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [wechat, setWechat] = useState("");
  const [language, setLanguage] = useState("");
  const [service, setService] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredHour, setPreferredHour] = useState("");
  const [preferredMinute, setPreferredMinute] = useState("");
  const [subject, setSubject] = useState("");

  const [validationError, setValidationError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const preferredDateInputRef = useRef<HTMLInputElement | null>(null);

  const fieldId = (key: string) => `${baseId}-${key}`;

  const isRequiredComplete = useMemo(() => {
    const emailTrim = email.trim();
    return (
      name.trim() !== "" &&
      phone.trim() !== "" &&
      emailTrim !== "" &&
      EMAIL_RE.test(emailTrim) &&
      preferredDate !== "" &&
      preferredHour !== "" &&
      preferredMinute !== ""
    );
  }, [name, phone, email, preferredDate, preferredHour, preferredMinute]);

  const submitHighlighted =
    isRequiredComplete && isConfigured && !isInCooldown && !sending;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setSuccessMessage(null);
    resetEmailJsState();

    const nameTrim = name.trim();
    const phoneTrim = phone.trim();
    const emailTrim = email.trim();

    if (!nameTrim) {
      setValidationError("Please enter your name.");
      return;
    }
    if (!phoneTrim) {
      setValidationError("Please enter your phone number.");
      return;
    }
    if (!emailTrim) {
      setValidationError("Please enter your email.");
      return;
    }
    if (!EMAIL_RE.test(emailTrim)) {
      setValidationError("Please enter a valid email address.");
      return;
    }
    if (!preferredDate) {
      setValidationError("Please select a preferred date.");
      return;
    }
    if (!preferredHour || !preferredMinute) {
      setValidationError("Please select a preferred time (hour and minute).");
      return;
    }

    if (!isConfigured) {
      setValidationError(
        "Email service is not configured. Please call us or use the email address on this page.",
      );
      return;
    }

    const guard = assertCanSubmit(honeypot);
    if (!guard.ok) {
      if ("silentBot" in guard && guard.silentBot) {
        setSuccessMessage(
          "Thank you. Your message has been sent and we will get back to you soon.",
        );
        setHoneypot("");
      } else if ("message" in guard) {
        setValidationError(guard.message);
      }
      return;
    }

    const preferredTime =
      preferredHour && preferredMinute
        ? `${preferredHour.padStart(2, "0")}:${preferredMinute}`
        : "";

    try {
      await send({
        [EJ.name]: nameTrim,
        [EJ.phone]: phoneTrim,
        [EJ.email]: emailTrim,
        [EJ.preferredDate]: preferredDate,
        [EJ.preferredTime]: preferredTime,
        [EJ.wechat]: wechat.trim() || "N/A",
        [EJ.language]: language || "N/A",
        [EJ.service]: service || "N/A",
        [EJ.subject]: subject.trim() || "N/A",
      });

      setName("");
      setPhone("");
      setEmail("");
      setWechat("");
      setLanguage("");
      setService("");
      setPreferredDate("");
      setPreferredHour("");
      setPreferredMinute("");
      setSubject("");
      resetEmailJsState();
      recordSuccessfulSubmit();
      setSuccessMessage(
        "Thank you. Your message has been sent and we will get back to you soon.",
      );
    } catch {
      // sendError is set by useEmailJs
    }
  };

  const openPreferredDatePicker = () => {
    const input = preferredDateInputRef.current;
    if (!input) return;
    const pickerInput = input as HTMLInputElement & {
      showPicker?: () => void;
    };
    if (typeof pickerInput.showPicker === "function") {
      pickerInput.showPicker();
      return;
    }
    input.focus();
    input.click();
  };

  return (
    <div
      className={cn(
        "contact-form-metal-frame w-full max-w-[600px] overflow-hidden rounded-[36px]",
        className,
      )}
    >
      <form
        onSubmit={onSubmit}
        className={cn(
          "contact-form-metal-inner relative min-h-[789px] overflow-hidden bg-[#0f0f0f] px-6 py-6",
          formClassName,
        )}
      >
        <input
          type="text"
          name={honeypotName}
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0"
          aria-hidden
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-6">
          <div className="flex flex-col gap-4">
            <label htmlFor={fieldId("name")}>
              <FieldLabel required>Name</FieldLabel>
            </label>
            <TextInput
              id={fieldId("name")}
              name="name"
              placeholder="Your name"
              bordered
              value={name}
              onChange={setName}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor={fieldId("phone")}>
              <FieldLabel required>Phone</FieldLabel>
            </label>
            <TextInput
              id={fieldId("phone")}
              name="phone"
              type="tel"
              placeholder="Input Phone"
              value={phone}
              onChange={setPhone}
            />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor={fieldId("email")}>
              <FieldLabel required>Email</FieldLabel>
            </label>
            <TextInput
              id={fieldId("email")}
              name="email"
              type="email"
              placeholder="Input Email"
              value={email}
              onChange={setEmail}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor={fieldId("wechat")}>
              <FieldLabel>Wechat</FieldLabel>
            </label>
            <TextInput
              id={fieldId("wechat")}
              name="wechat"
              placeholder="Input Wechat ID"
              value={wechat}
              onChange={setWechat}
            />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor={fieldId("language")}>
              <FieldLabel>Language</FieldLabel>
            </label>
            <SelectInput
              id={fieldId("language")}
              name="language"
              placeholder="Select Language"
              value={language}
              onChange={setLanguage}
              options={LANGUAGE_OPTIONS}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor={fieldId("service")}>
              <FieldLabel>Service</FieldLabel>
            </label>
            <SelectInput
              id={fieldId("service")}
              name="service"
              placeholder="Select Service"
              value={service}
              onChange={setService}
              options={SERVICE_OPTIONS}
            />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor={fieldId("date")}>
              <FieldLabel required>Preferred Date</FieldLabel>
            </label>
            <div className="relative">
              <TextInput
                id={fieldId("date")}
                name="preferredDate"
                type="date"
                className="gold-date-input pr-10"
                placeholder=""
                value={preferredDate}
                onChange={setPreferredDate}
                ref={preferredDateInputRef}
              />
              <button
                type="button"
                aria-label="Open preferred date picker"
                onMouseDown={(e) => e.preventDefault()}
                onClick={openPreferredDatePicker}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <CalendarIcon />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <FieldLabel required>Preferred Time</FieldLabel>
            <div className="flex items-center gap-2">
              <div className="relative w-[124px] shrink-0">
                <select
                  id={fieldId("hour")}
                  name="preferredHour"
                  value={preferredHour}
                  onChange={(e) => setPreferredHour(e.target.value)}
                  className="h-12 w-full cursor-pointer appearance-none rounded-[4px] bg-[#2a2a2a] px-3 pr-8 font-inter text-[16px] text-white outline-none"
                >
                  <option value="">Hour</option>
                  {HOURS.map((h) => (
                    <option key={h} value={String(h)}>
                      {h}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
              </div>
              <span className="font-inter text-[16px] text-[#767676]">:</span>
              <div className="relative w-[124px] shrink-0">
                <select
                  id={fieldId("minute")}
                  name="preferredMinute"
                  value={preferredMinute}
                  onChange={(e) => setPreferredMinute(e.target.value)}
                  className="h-12 w-full cursor-pointer appearance-none rounded-[4px] bg-[#2a2a2a] px-3 pr-8 font-inter text-[16px] text-white outline-none"
                >
                  <option value="">Min</option>
                  {MINUTES.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:col-span-2">
            <label htmlFor={fieldId("subject")}>
              <FieldLabel>Subject</FieldLabel>
            </label>
            <textarea
              id={fieldId("subject")}
              name="subject"
              rows={5}
              placeholder="Input Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="min-h-[144px] w-full resize-y rounded-[4px] bg-[#2a2a2a] px-4 py-2 font-inter text-[16px] text-white outline-none placeholder:text-[#767676]"
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3">
          {!isConfigured ? (
            <p className="max-w-[480px] text-center font-inter text-[14px] leading-normal text-[#767676]">
              Online submission is unavailable while email is not configured.
              Please call us or use our email address.
            </p>
          ) : null}
          {validationError || (!successMessage && sendError) ? (
            <p
              className="max-w-[480px] text-center font-inter text-[14px] text-[#f87171]"
              role="alert"
            >
              {validationError ?? sendError?.message}
            </p>
          ) : null}
          {successMessage ? (
            <p className="max-w-[480px] text-center font-inter text-[14px] text-[#a3d9a5]">
              {successMessage}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={sending || !isConfigured || isInCooldown}
            className={cn(
              "h-12 w-full max-w-[480px] rounded-[24px] font-inter text-[18px] font-semibold transition-colors",
              submitHighlighted
                ? "bg-[#e8d587] text-[#1a1a1a] shadow-[0_0_28px_rgba(232,213,135,0.28)] hover:bg-[#f0e4a8]"
                : "bg-[#2a2a2a] text-[#3f3f3f] hover:bg-[#353535] hover:text-[#e8d587]",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
              !submitHighlighted &&
              "disabled:hover:bg-[#2a2a2a] disabled:hover:text-[#3f3f3f]",
              submitHighlighted &&
              "disabled:hover:bg-[#e8d587] disabled:hover:text-[#1a1a1a]",
            )}
          >
            {sending
              ? "SENDING…"
              : isInCooldown
                ? `WAIT ${cooldownSecondsLeft}s`
                : "SUBMIT"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GetInTouchFormCard;
