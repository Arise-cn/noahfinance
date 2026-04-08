const RESPONSIBILITIES = [
  "Work closely with an experienced mentor to enhance your mortgage broking skills.",
  "Manage both residential and commercial loan applications - from consultation to settlement and post-settlement follow-up.",
  "Engage with diverse clients including first home buyers, investors, self-employed and PAYG borrowers.",
  "Build and maintain strong relationships with clients and referral partners.",
];

const LOOKING_FOR = [
  "Previous experience in mortgage broking, banking, or finance is preferred.",
  "Excellent English communication skills; fluency in other languages (e.g. Mandarin, Cantonese, Vietnamese, etc.) is a plus.",
  "Self-motivated, goal-oriented, and proactive in business development.",
  "Able to work independently with flexible hours (remote or in-office).",
  "Must hold a valid work visa and be in good financial standing.",
];

const WHY_JOIN_US = [
  {
    title: "Mentorship & Growth",
    detail:
      "Learn directly from senior brokers and gain real industry experience.",
  },
  {
    title: "Lead Support",
    detail:
      "Receive a steady flow of qualified client enquiries to help build your portfolio.",
  },
  {
    title: "Flexibility",
    detail: "Work remotely or from our Box Hill office.",
  },
  {
    title: "Unlimited Earning Potential",
    detail: "Your effort determines your income; the sky's the limit.",
  },
  {
    title: "Supportive Culture",
    detail: "We believe in integrity, teamwork, and long-term success.",
  },
];

function NumberedList({ items }: { items: readonly string[] }) {
  return (
    <div className="mt-6 flex flex-col gap-6">
      {items.map((item, index) => (
        <div key={item} className="flex items-start gap-3">
          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded border border-[#e8d587] bg-[#050505b3]">
            <span className="font-inter text-base font-medium text-[#e8d587]">
              {index + 1}
            </span>
          </div>
          <p className="font-inter text-[18px] font-light leading-8 text-white">
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function AboutOverviewSection() {
  return (
    <div className="pb-16">
      <h1 className="font-misans text-[52px] font-black leading-normal text-white">
        About Us
      </h1>

      <p className="mt-10 font-inter text-[18px] font-light leading-8 text-white">
        <span className="text-[32px] font-semibold text-[#e8d587]">
          At Noah Finance
        </span>
        , we are not just mortgage brokers - we are a young, ambitious team
        helping Australians achieve their home ownership dreams. Led by an
        industry mentor with over 10 years of frontline experience, we provide
        the tools, training, and client leads you need to succeed in this
        rewarding career.
      </p>

      <div className="my-16 h-px w-full bg-linear-to-r from-[#403f38] via-[#e8d587] via-[52.712%] to-[#403f38]" />

      <h2 className="font-misans text-[52px] font-black leading-normal text-white">
        The Role
      </h2>
      <p className="mt-10 font-inter text-[18px] font-light leading-8 text-white">
        You will join a supportive environment where learning, collaboration,
        and growth come first. This role suits someone who is self-driven,
        enjoys helping people, and wants to build a long-term career in
        mortgage broking.
      </p>

      <h3 className="mt-14 font-misans text-2xl font-black text-white">
        Your Responsibilities:
      </h3>
      <NumberedList items={RESPONSIBILITIES} />

      <h3 className="mt-16 font-misans text-2xl font-black text-white">
        What We&apos;re Looking For:
      </h3>
      <NumberedList items={LOOKING_FOR} />

      <h3 className="mt-16 font-misans text-2xl font-black text-white">
        Why Join Us:
      </h3>
      <div className="mt-6 flex flex-col gap-5">
        {WHY_JOIN_US.map((item) => (
          <p
            key={item.title}
            className="font-inter text-[18px] font-light leading-8 text-white"
          >
            <span className="font-semibold text-[#e8d587]">{item.title}</span>
            {" - "}
            {item.detail}
          </p>
        ))}
      </div>

      <h3 className="mt-16 font-misans text-2xl font-black text-white">
        Ready to start your journey?
      </h3>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="font-inter text-[18px] font-light leading-8 text-white">
          Send your resume to
        </span>
        <a
          href="mailto:recruitment@noahfinance.com.au"
          className="inline-flex items-center gap-3 rounded border border-[#e8d587] bg-[#050505b3] px-4 py-2"
        >
          <span className="font-inter text-[18px] font-medium text-[#e8d587]">
            recruitment@noahfinance.com.au
          </span>
          <span className="rounded bg-[#e8d587] px-2 py-1 font-inter text-sm font-semibold text-[#0f0f0f]">
            EMAIL
          </span>
        </a>
      </div>

      <p className="mt-8 font-inter text-[18px] font-light leading-8 text-white">
        Join us, grow with a company that grows with you.
      </p>
    </div>
  );
}
