"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckIcon, CopyIcon, Loader2Icon, SendIcon } from "lucide-react";
import { FaDiscord, FaGithubAlt, FaWhatsapp } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { HiExternalLink } from "react-icons/hi";
import { IoMdMail } from "react-icons/io";
import { cardVariants } from "../components/frosted-card";
import {
    EMAIL_MAX_LENGTH,
    MESSAGE_MAX_LENGTH,
    NAME_MAX_LENGTH,
    isWebhookConfigured,
    sendContactMessage,
} from "../utils/discord";

const EMAIL = "waynegabule@gmail.com";
const PHONE = "(+63) 927 973 4717";
const PHONE_DIGITS = "639279734717";
const TIME_ZONE = "Asia/Manila";

const REASONS = [
    { label: "Job Opportunity", color: "#ff3b3f" },
    { label: "Freelance Project", color: "#ff3b3f" },
    { label: "Collaboration", color: "#ff3b3f" },
    { label: "Just Saying Hi", color: "#ff3b3f" },
];

/** Minimum gap between two sends from the same browser. */
const COOLDOWN_MS = 60_000;
const LAST_SENT_KEY = "contactLastSent";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
    "w-full rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-foreground placeholder:text-white/30 outline-none transition-all duration-300 hover:border-white/20 focus:border-highlighter-2nd focus:shadow-[0_0_0_4px_rgba(255,59,63,0.15)] aria-[invalid=true]:border-highlight";

function readLastSent() {
    try {
        return Number(localStorage.getItem(LAST_SENT_KEY)) || 0;
    } catch {
        return 0;
    }
}

function useLocalTime() {
    const [time, setTime] = useState("");
    useEffect(() => {
        const format = () => new Intl.DateTimeFormat("en-US", {
            timeZone: TIME_ZONE,
            hour: "numeric",
            minute: "2-digit",
        }).format(new Date());
        setTime(format());
        const timer = setInterval(() => setTime(format()), 30_000);
        return () => clearInterval(timer);
    }, []);
    return time;
}

function CopyButton({ value, label }) {
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // Clipboard can be blocked (insecure context, permissions) — nothing to do.
        }
    };
    return (
        <button
            type="button"
            onClick={copy}
            aria-label={`Copy ${label}`}
            className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 text-foreground-2nd transition-colors duration-300 hover:border-highlighter-2nd hover:text-highlighter-2nd"
        >
            {copied ? <CheckIcon className="size-4 text-[#ff3b3f]" /> : <CopyIcon className="size-4" />}
        </button>
    );
}

function InfoRow({ icon, color, label, value, href, copyValue }) {
    return (
        <div className="group/row flex items-center gap-3 rounded-xl border border-white/5 bg-background/30 p-3 transition-colors duration-300 hover:border-white/15">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-lg" style={{ color }}>
                {icon}
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
                <span className="font-barlow-condensed text-xs uppercase tracking-widest text-foreground-2nd">{label}</span>
                {href ? (
                    <a href={href} target="_blank" rel="noreferrer" className="truncate text-foreground transition-colors duration-300 hover:text-highlighter-2nd">{value}</a>
                ) : (
                    <span className="truncate text-foreground">{value}</span>
                )}
            </div>
            {copyValue && <CopyButton value={copyValue} label={label} />}
        </div>
    );
}

function ContactForm() {
    const [form, setForm] = useState({ name: "", email: "", reason: REASONS[0].label, message: "", website: "" });
    const [touched, setTouched] = useState({});
    const [status, setStatus] = useState("idle"); // idle | sending | sent | error
    const [error, setError] = useState("");
    const configured = isWebhookConfigured();

    const errors = {
        name: !form.name.trim() ? "Please tell me your name." : "",
        email: !EMAIL_PATTERN.test(form.email.trim()) ? "Please enter a valid email so I can reply." : "",
        message: form.message.trim().length < 10 ? "Your message should be at least 10 characters." : "",
    };
    const isValid = !errors.name && !errors.email && !errors.message;

    const update = (field) => (event) => setForm((previous) => ({ ...previous, [field]: event.target.value }));
    const blur = (field) => () => setTouched((previous) => ({ ...previous, [field]: true }));
    const showError = (field) => touched[field] && errors[field];

    const submit = async (event) => {
        event.preventDefault();
        setTouched({ name: true, email: true, message: true });
        if (!isValid || status === "sending") return;

        // Bots fill every field; people never see this one.
        if (form.website) {
            setStatus("sent");
            return;
        }

        const waited = Date.now() - readLastSent();
        if (waited < COOLDOWN_MS) {
            setStatus("error");
            setError(`You just sent a message! Please wait ${Math.ceil((COOLDOWN_MS - waited) / 1000)}s before sending another.`);
            return;
        }

        setStatus("sending");
        setError("");
        try {
            await sendContactMessage({
                name: form.name.trim(),
                email: form.email.trim(),
                reason: form.reason,
                message: form.message.trim(),
            });
            try {
                localStorage.setItem(LAST_SENT_KEY, String(Date.now()));
            } catch {
                // Storage may be unavailable (private mode) — the cooldown is best-effort.
            }
            setStatus("sent");
        } catch (sendError) {
            setStatus("error");
            setError(sendError.message);
        }
    };

    const reset = () => {
        setForm({ name: "", email: "", reason: REASONS[0].label, message: "", website: "" });
        setTouched({});
        setStatus("idle");
    };

    return (
        <AnimatePresence mode="wait" initial={false}>
            {status === "sent" ? (
                <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                    transition={{ ease: [.1, .8, .4, 1], duration: .5 }}
                    className="flex min-h-[28rem] flex-col items-center justify-center gap-4 text-center"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 15, delay: .1 }}
                        className="flex size-16 items-center justify-center rounded-full border-2 border-[#ff3b3f] bg-[#ff3b3f]/15 text-foreground shadow-[0_0_25px_rgba(255,59,63,0.35)]"
                    >
                        <CheckIcon className="size-8" />
                    </motion.div>
                    <span className="text-3xl font-bold">Message sent<span className="text-highlight">!</span></span>
                    <p className="max-w-sm text-foreground-2nd">
                        Thanks for reaching out, {form.name.trim().split(" ")[0] || "friend"}. I&apos;ll get back to you at <span className="text-foreground">{form.email.trim()}</span>.
                    </p>
                    <button type="button" onClick={reset} className="link mt-2 pb-0.5 text-sm hover:after:w-full">
                        Send another message
                    </button>
                </motion.div>
            ) : (
                <motion.form
                    key="form"
                    noValidate
                    onSubmit={submit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                    transition={{ ease: [.1, .8, .4, 1], duration: .5 }}
                    className="flex flex-col gap-4"
                >
                    <fieldset>
                        <legend className="mb-2 font-barlow-condensed text-xs uppercase tracking-widest text-foreground-2nd">What&apos;s this about?</legend>
                        <div className="flex flex-wrap gap-2">
                            {REASONS.map((reason) => {
                                const selected = form.reason === reason.label;
                                return (
                                    <label
                                        key={reason.label}
                                        className={`cursor-pointer select-none rounded-lg border px-3 py-1 text-sm transition-all duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-highlighter-2nd ${selected ? "font-semibold text-foreground" : "border-white/10 text-foreground-2nd hover:border-white/25 hover:text-foreground"}`}
                                        style={selected ? { borderColor: reason.color, backgroundColor: `${reason.color}26` } : undefined}
                                    >
                                        <input type="radio" name="reason" value={reason.label} checked={selected} onChange={update("reason")} className="sr-only" />
                                        {reason.label}
                                    </label>
                                );
                            })}
                        </div>
                    </fieldset>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <label className="flex flex-col gap-1">
                            <span className="font-barlow-condensed text-xs uppercase tracking-widest text-foreground-2nd">Name</span>
                            <input
                                className={inputClass}
                                placeholder="Juan Dela Cruz"
                                autoComplete="name"
                                maxLength={NAME_MAX_LENGTH}
                                value={form.name}
                                onChange={update("name")}
                                onBlur={blur("name")}
                                aria-invalid={Boolean(showError("name"))}
                            />
                            {showError("name") && <span className="text-xs text-highlight">{errors.name}</span>}
                        </label>
                        <label className="flex flex-col gap-1">
                            <span className="font-barlow-condensed text-xs uppercase tracking-widest text-foreground-2nd">Email</span>
                            <input
                                className={inputClass}
                                type="email"
                                placeholder="you@example.com"
                                autoComplete="email"
                                maxLength={EMAIL_MAX_LENGTH}
                                value={form.email}
                                onChange={update("email")}
                                onBlur={blur("email")}
                                aria-invalid={Boolean(showError("email"))}
                            />
                            {showError("email") && <span className="text-xs text-highlight">{errors.email}</span>}
                        </label>
                    </div>

                    <label className="flex flex-col gap-1">
                        <span className="flex justify-between font-barlow-condensed text-xs uppercase tracking-widest text-foreground-2nd">
                            Message
                            <span className={form.message.length > MESSAGE_MAX_LENGTH * .9 ? "text-highlight" : ""}>
                                {form.message.length} / {MESSAGE_MAX_LENGTH}
                            </span>
                        </span>
                        <textarea
                            className={`${inputClass} resize-y`}
                            rows={7}
                            placeholder="Tell me about your project, role, or idea..."
                            maxLength={MESSAGE_MAX_LENGTH}
                            value={form.message}
                            onChange={update("message")}
                            onBlur={blur("message")}
                            aria-invalid={Boolean(showError("message"))}
                        />
                        {showError("message") && <span className="text-xs text-highlight">{errors.message}</span>}
                    </label>

                    {/* Honeypot: hidden from people and screen readers, irresistible to bots. */}
                    <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        value={form.website}
                        onChange={update("website")}
                        className="absolute -left-[9999px] size-0 opacity-0"
                    />

                    <AnimatePresence>
                        {(status === "error" || !configured) && (
                            <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                role="alert"
                                className="rounded-lg border-l-4 border-[#ff3b3f] bg-white/5 px-3 py-2 text-sm text-foreground"
                            >
                                {configured ? error : "The contact form isn't available right now."}{" "}
                                You can also email me at{" "}
                                <a href={`mailto:${EMAIL}`} className="font-semibold underline">{EMAIL}</a>.
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <div className="flex items-center justify-between gap-4">
                        <span className="text-xs text-foreground-2nd">Delivered straight to my Discord.</span>
                        <button
                            type="submit"
                            disabled={status === "sending" || !configured}
                            className="group/send flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border-2 border-highlighter-2nd bg-highlighter-2nd px-5 py-2 font-bold text-background transition-all duration-300 hover:bg-transparent hover:text-highlighter-2nd disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-highlighter-2nd disabled:hover:text-background"
                        >
                            {status === "sending" ? (
                                <>
                                    <Loader2Icon className="size-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Send Message
                                    <SendIcon className="size-4 transition-transform duration-300 group-hover/send:-translate-y-0.5 group-hover/send:translate-x-0.5" />
                                </>
                            )}
                        </button>
                    </div>
                </motion.form>
            )}
        </AnimatePresence>
    );
}

export default function Contact() {
    const localTime = useLocalTime();

    return (
        <main className="flex min-h-screen w-full items-center justify-center px-4 pb-24 pt-28">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: .15 } } }}
                className="grid w-full max-w-6xl grid-cols-1 gap-4 lg:grid-cols-5"
            >
                <motion.div variants={cardVariants} className="flex flex-col gap-4 lg:col-span-2">
                    <div className="mb-2">
                        <h1 className="text-5xl font-bold">Let&apos;s Chat<span className="font-black text-highlight">.</span></h1>
                        <p className="mt-3 text-foreground-2nd">
                            Have a role, a project, or an idea you want to bring to life? Send me a message and let&apos;s talk.
                        </p>
                    </div>

                    <section className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/[3%] p-4 backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0px_0px_15px_var(--highlighter)]">
                        <header className="mb-1 flex items-center gap-4">
                            <div className="h-2 w-10 rounded-lg bg-[#ff3b3f]" />
                            <span className="text-lg font-bold">Reach me directly</span>
                        </header>
                        <InfoRow icon={<IoMdMail />} color="#ff3b3f" label="Email" value={EMAIL} href={`mailto:${EMAIL}`} copyValue={EMAIL} />
                        <InfoRow icon={<FaWhatsapp />} color="#ff3b3f" label="WhatsApp" value={PHONE} href={`https://wa.me/${PHONE_DIGITS}`} copyValue={`+${PHONE_DIGITS}`} />
                        <InfoRow
                            icon={<FaLocationDot />}
                            color="#ff3b3f"
                            label="Location"
                            value={localTime ? `Davao City, PH · ${localTime} local time` : "Davao City, Philippines"}
                        />
                    </section>

                    <section className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[3%] p-4 backdrop-blur-sm">
                        <div className="flex gap-2">
                            <a href="https://discord.com/users/254225248889602048" target="_blank" rel="noreferrer" aria-label="Discord profile" className="flex w-fit rounded-lg bg-neutral-400 p-2 text-background shadow-[transparent_0px_0px_5px_4px] transition-all duration-500 hover:bg-transparent hover:text-[#ff3b3f] hover:shadow-[#ff3b3f_0px_0px_5px_4px]">
                                <FaDiscord className="size-4" />
                            </a>
                            <a href="https://github.com/Coralise" target="_blank" rel="noreferrer" aria-label="GitHub profile" className="flex w-fit rounded-lg bg-neutral-400 p-2 text-background shadow-[transparent_0px_0px_5px_4px] transition-all duration-500 hover:bg-transparent hover:text-[#ff3b3f] hover:shadow-[#ff3b3f_0px_0px_5px_4px]">
                                <FaGithubAlt className="size-4" />
                            </a>
                        </div>
                        <a href="/resume" className="link flex items-center gap-1 pb-0.5 text-sm hover:after:w-full hover:text-highlighter-2nd">
                            View Resume <HiExternalLink />
                        </a>
                    </section>
                </motion.div>

                <motion.section
                    variants={cardVariants}
                    className="rounded-2xl border border-white/5 bg-white/[3%] p-4 backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0px_0px_15px_var(--highlighter)] md:p-6 lg:col-span-3"
                >
                    <header className="mb-4 flex items-center gap-4">
                        <div className="h-2 w-10 rounded-lg bg-highlighter-2nd" />
                        <span className="text-lg font-bold">Send a message</span>
                    </header>
                    <ContactForm />
                </motion.section>
            </motion.div>
        </main>
    );
}
