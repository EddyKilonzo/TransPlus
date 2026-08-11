import { Fingerprint, HeartPulse, Landmark, ShieldCheck, type LucideIcon } from "lucide-react";

export type Project = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  description: string;
  icon: LucideIcon;
  image: string;
  gallery: string[];
  /** tailwind classes: soft tinted surface + matching text/border accent */
  tint: string;
  accent: string;
  /** the briefing paper this programme draws on, if published */
  reportSlug?: string;
  /** framing pulled from the briefing series */
  context: string;
  /** how the programme actually operates */
  approach: { title: string; detail: string }[];
  /** what we ask of others, from the papers' recommendations */
  asks: { audience: string; ask: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "decriminalization-advocacy",
    tint: "bg-pine/[0.07]",
    accent: "text-pine",
    image: "/images/6.jpeg",
    gallery: ["/images/4.jpeg", "/images/2.jpeg"],
    number: "01",
    icon: Landmark,
    reportSlug: "criminalized-in-transit",
    title: "Decriminalization Advocacy",
    summary:
      "Building the legal, social, and political case for decriminalizing sex work in Kenya and Uganda.",
    description:
      "We work with legal scholars, regional human rights coalitions, and community members to build the case — legally, socially, and politically — for decriminalizing sex work in Kenya and Uganda, with particular attention to how criminalization compounds anti-LGBTQ+ persecution for queer and trans sex workers.",
    context:
      "Sex work is criminalized in whole or in part in both Kenya and Uganda, and same-sex conduct is separately criminalized in both — most severely under Uganda's Anti-Homosexuality Act, 2023. The ambiguity in how these laws are written functions less as legal clarity and more as a tool: it gives officers broad discretion to detain, threaten, or extort without ever securing a conviction.",
    approach: [
      {
        title: "Legal and policy research",
        detail:
          "Working with legal scholars and regional human rights coalitions to document how anti-sex-work and anti-LGBTQ enforcement compound one another — an intersection frequently undercounted in reporting that treats them separately.",
      },
      {
        title: "Community-sourced documentation",
        detail:
          "Case files and interviews gathered through our own legal support and outreach work, so the evidence base comes from the people living the risk rather than from a distance.",
      },
      {
        title: "Decriminalization as foundation",
        detail:
          "Legal aid, health access, and digital safety all work better when the underlying activity is not itself criminalized — removing the primary lever police use to extort and detain with impunity.",
      },
    ],
    asks: [
      {
        audience: "To the Kenyan and Ugandan governments",
        ask: "Repeal or reform laws criminalizing consensual sex work and same-sex conduct, beginning with the loosely defined offenses — loitering, impersonation, “gross indecency” — most frequently used without evidence of any other offense.",
      },
      {
        audience: "To regional and international human rights bodies",
        ask: "Support cross-border monitoring that tracks the specific intersection of anti-sex-work and anti-LGBTQ enforcement.",
      },
    ],
  },
  {
    slug: "legal-support",
    tint: "bg-moss/[0.10]",
    accent: "text-moss",
    image: "/images/2.jpeg",
    gallery: ["/images/6.jpeg", "/images/8.jpeg"],
    number: "02",
    icon: ShieldCheck,
    reportSlug: "criminalized-in-transit",
    title: "Legal Support",
    summary: "Direct legal aid, emergency response, and court accompaniment for community members.",
    description:
      "We provide direct legal aid to community members facing arrest, detention, extortion, or violence, including emergency response, court accompaniment, and a growing network of trained paralegals who understand both the law and the community.",
    context:
      "Because officers often extort rather than charge, there is no paper trail and no clear avenue for redress. Community members report being held for days without charges, with access to counsel, medical care, or family contact denied — and transgender detainees at particular risk of being placed in facilities that do not match their gender identity.",
    approach: [
      {
        title: "Rapid response at the point of risk",
        detail:
          "Emergency legal response positioned at border crossings and transit routes, rather than only at fixed urban service points that people in transit may never reach.",
      },
      {
        title: "A trained paralegal network",
        detail:
          "A growing network of paralegals drawn from the community who understand both the law and the realities of the people they represent.",
      },
      {
        title: "Court accompaniment",
        detail:
          "Physically accompanying community members through proceedings, which measurably changes how people are treated inside the system.",
      },
    ],
    asks: [
      {
        audience: "To police leadership in border counties and districts",
        ask: "Establish clear accountability mechanisms for officers who detain individuals without filing charges, and prohibit confiscation of personal property, including phones, without a documented legal basis.",
      },
      {
        audience: "To donors and civil society partners",
        ask: "Fund legal aid and rapid-response infrastructure at the specific points of highest risk — border crossings and transit routes.",
      },
    ],
  },
  {
    slug: "access-to-srhr",
    tint: "bg-warm/[0.10]",
    accent: "text-warm",
    image: "/images/5.jpeg",
    gallery: ["/images/3.jpeg", "/images/7.jpeg"],
    number: "03",
    icon: HeartPulse,
    reportSlug: "health-without-a-fixed-address",
    title: "Access to SRHR",
    summary: "Peer-led connections to stigma-free sexual and reproductive health services.",
    description:
      "We connect queer sex workers to sexual and reproductive health services — including HIV prevention and treatment, gender-affirming care referrals, and general health care — through peer-led outreach and partnerships with providers trained in stigma-free care.",
    context:
      "Queer sex workers are excluded from health systems twice over: as sex workers in general clinical settings, and as LGBTQ people in services designed around sex worker outreach but not around sexual orientation or gender identity. For people in transit, the absence of a fixed address compounds both — and continuity is exactly what antiretroviral therapy, PrEP, and hormone therapy depend on.",
    approach: [
      {
        title: "Peer-led outreach",
        detail:
          "Outreach conducted by community health workers who are themselves current or former sex workers, reaching people who would not otherwise engage with formal health services.",
      },
      {
        title: "A vetted provider network",
        detail:
          "An informal, community-recommended network of clinics and providers who have demonstrated they deliver genuinely stigma-free care — based on direct community feedback, not formal credentials alone.",
      },
      {
        title: "Continuity support in transit",
        detail:
          "Helping people navigate a change of provider and carry documentation of existing treatment as they move between towns and across the border.",
      },
    ],
    asks: [
      {
        audience: "To health ministries in both countries",
        ask: "Explicitly exempt health workers from duty-to-report requirements tied to sexual orientation or gender identity, given the documented chilling effect on care-seeking.",
      },
      {
        audience: "To international health and donor bodies",
        ask: "Fund continuity-of-care mechanisms designed for mobile and displaced populations, rather than models that assume a stable clinic relationship.",
      },
    ],
  },
  {
    slug: "digital-platforms",
    tint: "bg-night/[0.06]",
    accent: "text-night",
    image: "/images/1.jpeg",
    gallery: ["/images/5.jpeg", "/images/6.jpeg"],
    number: "04",
    icon: Fingerprint,
    reportSlug: "tracked-targeted-trapped",
    title: "Digital Platforms",
    summary: "Secure, anonymous digital tools for screening, safety alerts, and reporting violence.",
    description:
      "We build and maintain digital tools that help sex workers screen clients, share safety alerts, and report violence discreetly, designed with security and anonymity as core requirements rather than afterthoughts.",
    context:
      "A phone is simultaneously an economic necessity, a safety tool, and one of the largest sources of legal risk someone carries. Mainstream screening and safety apps assume contexts where sex work is legal and criminalization is not a factor — they request information that could out a user, store data recoverable in a forensic review, and assume a stable device that never gets confiscated.",
    approach: [
      {
        title: "Security and anonymity by design",
        detail:
          "Every design choice evaluated against the specific, high-stakes threat model this community actually faces — not a generic low-risk global user base.",
      },
      {
        title: "Client screening and safety alerts",
        detail:
          "Tools that let people screen clients and share warnings across the community without creating a record that becomes evidence.",
      },
      {
        title: "Discreet incident reporting",
        detail:
          "Reporting violence without the act of reporting itself becoming visible on a device that may be searched at a checkpoint.",
      },
    ],
    asks: [
      {
        audience: "To police oversight bodies",
        ask: "Prohibit warrantless searches of personal devices during routine stops, and establish consequences for officers who use device content as a basis for extortion.",
      },
      {
        audience: "To technology and platform companies",
        ask: "Engage with organizations serving criminalized and high-risk populations when designing safety and dating features.",
      },
    ],
  },
];
