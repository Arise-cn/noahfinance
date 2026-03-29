"use client";

import { CONTACT_FORM_EMAILJS_PARAMS as EJ } from "@/constants/emailjs";
import { useContactFormAntiAbuse } from "@/hooks/useContactFormAntiAbuse";
import { useEmailJs } from "@/hooks/useEmailJs";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { type FormEvent, type ReactNode, useId, useState } from "react";

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

const ContactUsSection = () => {
  const baseId = useId();
  const {
    send,
    sending,
    error: sendError,
    isConfigured,
    reset: resetEmailJsState,
  } = useEmailJs();
  const {
    assertCanSubmit,
    recordSuccessfulSubmit,
    cooldownSecondsLeft,
    isInCooldown,
    honeypotName,
  } = useContactFormAntiAbuse("contact-us");

  const [honeypot, setHoneypot] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

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

    try {
      await send({
        [EJ.fromName]: nameTrim,
        [EJ.replyTo]: emailTrim,
        [EJ.phone]: phoneTrim,
        [EJ.message]: comment.trim() || "—",
      });

      setName("");
      setPhone("");
      setEmail("");
      setComment("");
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
    <section className="relative min-h-screen w-screen overflow-hidden bg-[#0f0f0f]">
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-[min(610px,55vh)] opacity-20"
        aria-hidden
      >
        <Image
          src="/images/contact_us_wave.webp"
          alt=""
          fill
          className="object-cover object-bottom"
          sizes="100vw"
          priority={false}
        />
      </div>

      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-[1920px]",
          "px-8 pb-24 pt-[140px] md:px-[136px] md:pt-[160px] xl:pl-[292px] xl:pr-[136px]",
        )}
      >
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-misans text-[52px] font-black leading-normal text-white">
            GET IN TOUCH WITH US
          </h1>

          <p className="mx-auto mt-6 max-w-[900px] text-center font-inter text-[18px] font-light leading-[32px] text-white">
            Thank you for your contact. Please fill out the form first to help
            us answer your question the most efficiently.
          </p>
        </div>

        <div className="mt-14 flex  gap-[183px] flex-row  w-full items-center justify-center">
          <div className="flex w-full max-w-[372px] flex-col gap-8 shrink-0">
            <div className="flex flex-col gap-4">
              <p className="font-inter text-[14px] font-semibold text-white">
                HOP BY WHENEVER
              </p>
              <p className="font-inter text-[24px] font-normal leading-normal text-[#e8d587]">
                Address: Suite 603, 21 Ellingworth Parade, Box Hill VIC 3128
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="font-inter text-[14px] font-semibold text-white">
                GIVE US A CALL ANYTIME
              </p>
              <a
                href="tel:0393415678"
                className="font-inter text-[20px] font-normal text-[#e8d587]"
              >
                03 9341 5678
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <p className="font-inter text-[14px] font-semibold text-white">
                WRITE US ANYTIME
              </p>
              <a
                href="mailto:info@noahfinance.com.au"
                className="font-inter text-[20px] font-normal text-[#e8d587]"
              >
                info@noahfinance.com.au
              </a>
            </div>
          </div>

          <div className="w-full shrink-0 lg:max-w-[600px] lg:justify-self-end">
            <div className="contact-form-metal-frame overflow-hidden rounded-[36px]">
              <form
                onSubmit={onSubmit}
                className="contact-form-metal-inner relative flex min-h-[628px] flex-col overflow-hidden px-6 py-8 sm:px-8 bg-[#0F0F0F]"
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
                <div
                  className="pointer-events-none absolute left-1/2 top-[32%] hidden h-[min(360px,45%)] w-px -translate-x-1/2 lg:block"
                  aria-hidden
                />

                <div className="relative z-10 flex flex-1 flex-col gap-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-6">
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
                  </div>
                  <div className="flex flex-col gap-4 sm:max-w-[264px]">
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
                  <div className="h-px w-full bg-[linear-gradient(to_right,transparent,#E8D587,transparent)]" />
                  <div className="flex flex-col gap-4">
                    <label htmlFor={fieldId("comment")}>
                      <FieldLabel>Question/Comment</FieldLabel>
                    </label>
                    <textarea
                      id={fieldId("comment")}
                      name="comment"
                      rows={5}
                      placeholder="Input Comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="min-h-[144px] w-full max-w-[552px] rounded-[4px] bg-[#2a2a2a] px-4 py-2 font-inter text-[16px] text-white outline-none placeholder:text-[#767676] resize-none"
                    />
                  </div>
                </div>

                <div className="relative z-10 mt-auto flex flex-col items-center gap-3 pt-10">
                  {!isConfigured ? (
                    <p className="max-w-[480px] text-center font-inter text-[14px] leading-normal text-[#767676]">
                      Online submission is unavailable while email is not
                      configured. Please call us or use the email address on
                      the left.
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
    </section>
  );
};

export default ContactUsSection;
