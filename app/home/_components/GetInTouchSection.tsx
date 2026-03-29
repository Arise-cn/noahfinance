"use client";

import { CONTACT_FORM_EMAILJS_PARAMS as EJ } from "@/constants/emailjs";
import { useContactFormAntiAbuse } from "@/hooks/useContactFormAntiAbuse";
import { useEmailJs } from "@/hooks/useEmailJs";
import { useViewport } from "@/hooks/useViewport";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { type FormEvent, type ReactNode, useId, useState } from "react";

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

const LANGUAGE_OPTIONS = ["English", "Chinese", "Other"] as const;
const SERVICE_OPTIONS = [
  "Residential loan",
  "Commercial loan",
  "Asset finance",
  "General enquiry",
] as const;

const HOURS = Array.from({ length: 13 }, (_, i) => i + 9);
const MINUTES = ["00", "15", "30", "45"] as const;

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

function TextInput({
  id,
  name,
  placeholder,
  type = "text",
  bordered,
  value,
  onChange,
}: {
  id: string;
  name: string;
  placeholder: string;
  type?: string;
  bordered?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "h-12 w-full rounded-[4px] bg-[#2a2a2a] px-4 font-inter text-[16px] text-white outline-none placeholder:text-[#767676]",
        bordered && "border border-solid border-[#e8d587]",
      )}
    />
  );
}

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

const GetInTouchSection = () => {
  const { height } = useViewport();
  const baseId = useId();
  const { send, sending, error: sendError, isConfigured, reset: resetEmailJsState } =
    useEmailJs();
  const {
    assertCanSubmit,
    recordSuccessfulSubmit,
    cooldownSecondsLeft,
    isInCooldown,
    honeypotName,
  } = useContactFormAntiAbuse("home-get-in-touch");

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

  const fieldId = (key: string) => `${baseId}-${key}`;

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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim)) {
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
        [EJ.fromName]: nameTrim,
        [EJ.replyTo]: emailTrim,
        [EJ.phone]: phoneTrim,
        [EJ.wechat]: wechat.trim() || "—",
        [EJ.language]: language || "—",
        [EJ.service]: service || "—",
        [EJ.preferredDate]: preferredDate,
        [EJ.preferredTime]: preferredTime,
        [EJ.subject]: subject.trim() || "—",
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

  return (
    <div
      style={{ minHeight: height ? `${height}px` : "100vh" }}
      className="relative w-screen overflow-hidden bg-[#0f0f0f]"
    >
      <div
        className={cn(
          "relative z-10 mx-auto flex min-h-[inherit] w-full max-w-[1920px] flex-col",
          "px-8 py-16 md:px-[136px] xl:pl-[292px] xl:pr-[136px]",
        )}
      >
        <h2 className="font-misans text-[32px] font-black leading-normal text-white lg:pl-[62px]">
          GET IN TOUCH WITH US TODAY
        </h2>

        <div className="mt-10 flex flex-col gap-12 lg:mt-14 lg:flex-row lg:items-start lg:gap-10 xl:gap-16">
          {/* Left: map, contact info, hours */}
          <div className="flex w-full min-w-0 flex-1 flex-col gap-10 lg:max-w-[640px]">
            <div className="relative h-[220px] w-full max-w-[520px] overflow-hidden rounded-[20px] sm:h-[280px] lg:h-[336px]">
              <Image
                src="/images/home_p5_map.webp"
                alt="Office location"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 520px"
                priority={false}
              />
            </div>

            <div className="flex flex-col gap-6">
              <p className="font-inter text-[18px] font-semibold text-[#fff2ba]">
                CONTACT INFO
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p className="font-inter text-[14px] font-semibold text-white">
                    Address
                  </p>
                  <p className="font-inter text-[16px] font-light leading-normal text-white">
                    Suite 603, 21 Ellingworth Parade, Box Hill VIC 3128
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-inter text-[14px] font-semibold text-white">
                    Phone
                  </p>
                  <p className="font-inter text-[16px] font-light text-white">
                    03 9341 5678
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-inter text-[14px] font-semibold text-white">
                    Email
                  </p>
                  <p className="font-inter text-[16px] font-light text-white">
                    info@noahfinance.com.au
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <p className="font-inter text-[20px] font-semibold text-[#fff2ba]">
                WORKING HOURS
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p className="font-inter text-[14px] font-semibold text-white">
                    Mon-Fri
                  </p>
                  <p className="font-inter text-[16px] font-light text-white">
                    9:00am-5:30pm
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-inter text-[14px] font-semibold text-white">
                    Sat-Sun
                  </p>
                  <p className="font-inter text-[16px] font-light text-white">
                    By Appointment
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form (metal frame + inner glass, same as Header phone pill) */}
          <div className="w-full shrink-0 lg:w-[600px]">
            <div className="contact-form-metal-frame overflow-hidden rounded-[36px]">
              <form
                onSubmit={onSubmit}
                className="contact-form-metal-inner relative overflow-hidden px-6 py-6 sm:px-8 sm:py-8 bg-[#0F0F0F]"
              >
                {/* Honeypot: bots often fill hidden fields; humans should leave empty */}
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
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-5">
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
                    <TextInput
                      id={fieldId("date")}
                      name="preferredDate"
                      type="date"
                      placeholder=""
                      value={preferredDate}
                      onChange={setPreferredDate}
                    />
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
                      <span className="font-inter text-[16px] text-[#767676]">
                        :
                      </span>
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

                <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10">
                  {!isConfigured ? (
                    <p className="max-w-[480px] text-center font-inter text-[14px] leading-normal text-[#767676]">
                      Online submission is unavailable while email is not
                      configured. Please call us or use the email address on
                      the left.
                    </p>
                  ) : null}
                  {(validationError || (!successMessage && sendError)) ? (
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
                      "h-12 w-full max-w-[480px] rounded-[24px] bg-[#2a2a2a] font-inter text-[18px] font-semibold text-[#3f3f3f] transition-colors",
                      "hover:bg-[#353535] hover:text-[#e8d587]",
                      "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#2a2a2a] disabled:hover:text-[#3f3f3f]",
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouchSection;
