import EditableText from "../../../components/common/EditableText";

export default function Contact() {
  const socials = [
    {
      name: "Instagram",
      handle: "@hapi.cakes_bymichelle",
      href: "https://www.instagram.com/hapi.cakes_bymichelle",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 8.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 10.5ZM17.8 6.2a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "TikTok",
      handle: "@hapi.cakes_bymichelle",
      href: "https://www.tiktok.com/@hapi.cakes_bymichelle",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            d="M15.5 3h2.2c.3 2.1 1.8 3.8 3.8 4.3v2.3c-1.8-.1-3.4-.7-4.7-1.8v6.6a5.8 5.8 0 1 1-5.8-5.8c.4 0 .8 0 1.2.1v2.4a3.4 3.4 0 1 0 2.4 3.3V3Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "Facebook",
      handle: "Hapi.Cakes",
      href: "https://www.facebook.com/profile.php?id=61568773922797&locale=vi_VN",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "Threads",
      handle: "@hapi.cakes_bymichelle",
      href: "https://www.threads.com/@hapi.cakes_bymichelle",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            d="M12 3c5 0 8.8 2.9 9 8.3v.7c0 4.9-3.2 8-7.9 8-2.7 0-4.8-1.2-5.7-3.2l2.2-.9c.5 1.3 1.9 2.1 3.6 2.1 3 0 4.9-1.8 4.9-4.8v-.3c-1-.9-2.6-1.4-4.4-1.4-2.5 0-4.2 1-4.2 2.6 0 1.2 1 2 2.6 2 .7 0 1.4-.2 2-.5l.7 2.1c-.8.4-1.8.6-2.8.6-2.7 0-4.7-1.5-4.7-4.1 0-2.9 2.5-4.7 6.4-4.7 1.6 0 3.2.3 4.5.9-.6-3.1-3.2-4.8-6.5-4.8-3.9 0-6.5 2.4-6.5 6.8 0 4.4 2.6 6.9 6.8 6.9 1.6 0 3-.4 4.1-1.3l1.3 1.9c-1.4 1.1-3.2 1.7-5.4 1.7C6.1 20 3 16.7 3 11.9 3 6.3 6.8 3 12 3Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ];

  return (

  
    <section className="bg-gradient-to-b from-softBg via-softBg to-white px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-6 font-serif text-ink">
        <header className="relative overflow-hidden rounded-3xl border border-lavender/50 bg-white/70 p-6 shadow-sm backdrop-blur">
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute -left-6 -top-8 h-24 w-24 rounded-full bg-brandPink/20 blur-2xl" />
            <div className="absolute right-6 top-10 h-16 w-16 rounded-full bg-lavender/30 blur-xl" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(240,213,233,0.6),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(225,203,235,0.5),transparent_45%)]" />
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-plum/70">
            <EditableText
              copyKey="contact.header.label"
              defaultText="Contact"
            />
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-ink">
            <EditableText
              copyKey="contact.header.title"
              defaultText="Let’s Plan Something Sweet"
            />
          </h1>
          <p className="mt-2 text-sm text-muted">
            <EditableText
              copyKey="contact.header.subtitle"
              defaultText="Share your idea, ask a question, or say hello — we’d love to hear from you."
              multiline
            />
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-3xl border border-lavender/50 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(200,141,191,0.25)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-white via-white to-lavender/30 text-plum shadow-sm">
                {social.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">
                  {social.name}
                </p>
                <p className="text-xs text-muted">{social.handle}</p>
              </div>
              <span className="ml-auto text-sm font-semibold text-plum transition group-hover:text-brandPink">
                <EditableText
                  copyKey="contact.social.visit"
                  defaultText="Visit →"
                />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
