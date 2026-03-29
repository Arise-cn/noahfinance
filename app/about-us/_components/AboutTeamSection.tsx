import { cn } from "@/utils/cn";
import Image from "next/image";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  bullets: string[];
  phone: string;
};

/** 顺序与 Figma 1:1550 栅格一致：上排 Robin / Jie / Maggie，下排 Chat / Grace / Charlie */
const TEAM: TeamMember[] = [
  {
    id: "robin",
    name: "Robin Liu",
    role: "Managing Director",
    bullets: [
      "10+ years Mortgage Broking experience",
      "Complex loan structures",
      "Strong leadership and relationship management",
    ],
    phone: "0433 450 609",
  },
  {
    id: "jie",
    name: "Jie Xu",
    role: "Senior Mortgage Broker",
    bullets: [
      "Specialize in self-employed clients",
      "Structure loans with tax efficiency in mind",
      "Strong attention to financial details",
    ],
    phone: "0484 780 324",
  },
  {
    id: "maggie",
    name: "Maggie Wu",
    role: "Senior Mortgage Broker",
    bullets: [
      "Specialize in PAYG clients",
      "Professional presentation and personable approach",
      "Strong understanding of financial analysis and lending policy",
    ],
    phone: "0448 327 578",
  },
  {
    id: "chat",
    name: "Chat Dasanayake",
    role: "Mortgage Broker",
    bullets: [
      "Financial Planning Specialist",
      "Comprehensive loan structuring with long-term financial goals in mind",
      "Trusted advisor for new and experienced investors",
    ],
    phone: "0404 789 200",
  },
  {
    id: "grace",
    name: "Grace Yii",
    role: "Mortgage Broker",
    bullets: [
      "Multi Language Speaking",
      "Specialize in first home buyers and owner-occupier loans",
      "Strong, trustworthy relationships with clients through clear communication and care",
    ],
    phone: "0410 758 428",
  },
  {
    id: "charlie",
    name: "Charlie Chhaing",
    role: "Mortgage Broker",
    bullets: [
      "Specialize in loans for clients with non-traditional employment or income sources",
      "Adaptable and resourceful, with a broad understanding of various industries",
      "Strong problem-solving skills developed through cross-industry experience",
    ],
    phone: "0466 080 924",
  },
];

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="home-service-expanded-frame h-[338px] w-[329px] max-w-full shrink-0 overflow-hidden rounded-[24px]">
      <article
        className={cn(
          "flex h-full min-h-0 flex-col gap-6 overflow-hidden rounded-[23px] bg-[#0f0f0f]",
          "px-[16px] py-[40px]",
        )}
      >
        <div className="flex flex-col gap-[12px] text-[#fff2ba]">
          <h3 className="font-inter text-[24px] font-extrabold leading-normal">
            {member.name}
          </h3>
          <p className="font-inter text-[16px] font-normal leading-normal">
            {member.role}
          </p>
        </div>

        <div className="flex min-h-0 flex-1 items-start gap-0">
          <div
            className="h-[124px] w-px shrink-0 bg-linear-to-b from-[#403f38] via-[#e8d587] via-[52.712%] to-[#403f38]"
            aria-hidden
          />
          <ul className="ml-[9px] flex min-w-0 flex-1 list-none flex-col gap-4 p-0 font-inter text-[12px] font-light leading-normal text-white">
            {member.bullets.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-[12px]">
          <img
            src="/images/phone_icon.png"
            className="h-6 w-6 shrink-0"
            alt=""
          />
          <a
            href={`tel:${member.phone.replace(/\s/g, "")}`}
            className="font-inter text-[20px] font-normal tracking-[0.02em] text-[#e8d587]"
          >
            {member.phone}
          </a>
        </div>
      </article>
    </div>
  );
}

const AboutTeamSection = () => {
  return (
    <section className="relative min-h-screen w-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/about_us_bg.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/60" aria-hidden />
      </div>

      {/* About 专用半调波浪（勿与 home_p4 / contact 共用资源） */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-1 h-[min(610px,55vh)] opacity-20"
        aria-hidden
      >
        <Image
          src="/images/about_us_wave.webp"
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
          /* 标题 y≈204：在 Header 下留出与稿接近的顶距 */
          "px-8 pb-24 pt-[168px] md:px-[136px] md:pt-[176px] xl:pt-[180px]",
        )}
      >
        {/*
          内容区宽 329×3 + 48×2 = 1083，在 1920 上水平居中后左缘 ≈418，与 Figma 对齐
        */}
        <div className="mx-auto w-full max-w-[1083px]">
          <h1 className="text-left font-misans text-[52px] font-black leading-normal text-white">
            INTRODUCING OUR TEAM
          </h1>

          <div
            className={cn(
              "mt-[92px] grid w-full justify-items-center gap-x-12 gap-y-12",
              "grid-cols-1 sm:grid-cols-2",
              "xl:grid-cols-3 xl:justify-items-center",
            )}
          >
            {TEAM.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeamSection;
