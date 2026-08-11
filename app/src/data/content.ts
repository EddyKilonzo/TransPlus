export type ProgramArea = {
  slug: string;
  title: string;
  icon: "scale" | "shield" | "heart" | "lock";
  summary: string;
  body: string[];
};

export const programAreas: ProgramArea[] = [
  {
    slug: "decriminalization-advocacy",
    title: "Decriminalization Advocacy",
    icon: "scale",
    summary:
      "We work with legal scholars, regional human rights coalitions, and community members to build the case — legally, socially, and politically — for decriminalizing sex work in Kenya and Uganda, with particular attention to how criminalization compounds anti-LGBTQ+ persecution for queer and trans sex workers.",
    body: [
      "Criminalization is the foundation on which most of the harm in our community is built. When sex work is illegal, every other risk — violence, extortion, denial of health care, family rejection, police abuse — becomes harder to challenge, because reporting it means exposing yourself to the very system meant to punish you.",
      "Trans+'s decriminalization advocacy work treats this as the root issue, not a peripheral one.",
      "Our approach operates on multiple tracks simultaneously. We conduct and commission research documenting the specific harms criminalization causes for queer and trans sex workers along the border — harms that are often invisible in advocacy focused on sex work or LGBTQ+ rights separately, but not their intersection. We use this evidence to engage lawmakers, regional human rights bodies, and civil society coalitions in both Kenya and Uganda, building relationships that can move policy incrementally where full decriminalization isn't yet politically possible, while keeping that end goal in view.",
      "We also invest heavily in community-led testimony and storytelling, ensuring that policy conversations are shaped by the people actually affected rather than only by outside experts. This includes training community members to safely and effectively participate in advocacy spaces, from local government forums to regional human rights mechanisms, so that the movement for decriminalization is not just about the community but driven by it.",
      "Given the current political climate around LGBTQ+ rights in both countries, this work is necessarily long-term and often incremental. We track smaller wins — a change in police practice, a favorable court ruling, a shift in how a local official talks about sex work — as meaningful progress, while continuing to build the coalition and evidence base needed for structural change.",
      "We coordinate closely with regional and international decriminalization movements, sharing strategy and avoiding duplication, while staying grounded in the specific realities of the border region.",
    ],
  },
  {
    slug: "legal-support",
    title: "Legal Support",
    icon: "shield",
    summary:
      "We provide direct legal aid to community members facing arrest, detention, extortion, or violence, including emergency response, court accompaniment, and a growing network of trained paralegals who understand both the law and the community.",
    body: [
      "For queer sex workers along the border, an encounter with police or the legal system can happen at any moment and carries risks well beyond the immediate charge — exposure of gender identity or sexual orientation to family or community, loss of housing or income, violence in custody, or prolonged detention without real due process. Trans+'s legal support program exists to reduce that risk and to make sure no one faces these systems alone.",
      "At the center of this work is a growing network of trained paralegals, most of whom are community members themselves, who provide real-time support when someone is arrested or detained: know-your-rights guidance, court accompaniment, connections to sympathetic lawyers, and help navigating bail or bond where applicable. Because timing matters enormously in these situations, we've built rapid-response protocols so that community members can reach someone quickly, day or night, rather than facing the first critical hours of detention alone.",
      "Beyond emergency response, we provide ongoing legal aid for related issues that disproportionately affect our community: extortion by police or others who exploit the threat of exposure, disputes over housing or identity documents, and cases involving violence where survivors want to pursue legal remedies but need support navigating a system that has often failed them before. We also document patterns of abuse we encounter through this work — not just to support individual cases, but to build the evidence base that feeds into our advocacy efforts.",
      "We're honest about the limits of this work: legal support operates within systems that are often hostile to the people we serve, and a paralegal or lawyer cannot always change the outcome of a fundamentally unjust process. What we can do is make sure people are not facing that process without information, accompaniment, or someone in their corner — and that every case we handle adds to a larger picture of what needs to change.",
    ],
  },
  {
    slug: "access-to-srhr",
    title: "Access to SRHR",
    icon: "heart",
    summary:
      "We connect queer sex workers to sexual and reproductive health services — including HIV prevention and treatment, gender-affirming care referrals, and general health care — through peer-led outreach and partnerships with providers trained in stigma-free care.",
    body: [
      "Queer sex workers along the Kenya-Uganda border often face a double exclusion from health systems — stigmatized as sex workers in general health settings, and stigmatized again as queer or trans people in settings meant for sex workers. The result is that many community members delay or avoid care entirely, even for urgent health needs, out of a reasonable fear of judgment, mistreatment, or exposure. Trans+'s SRHR program is built to close that gap.",
      "Our primary approach is peer-led outreach: community health workers, many of whom are current or former sex workers, provide information, referrals, and direct support around HIV prevention and treatment (including PrEP and PEP access), sexually transmitted infection testing and treatment, contraception, and general sexual health. Because these outreach workers share lived experience with the people they're serving, they're often able to reach community members who wouldn't otherwise engage with formal health services at all.",
      "We also work to expand the pool of providers who can be trusted to deliver genuinely stigma-free care. This includes training clinic staff and health workers on providing respectful, non-judgmental services to queer and trans sex workers, and building an informal network of vetted, community-recommended providers that we can refer people to with confidence.",
      "Where gender-affirming care is needed, we help community members navigate what is often a fragmented and inconsistent landscape of services across the two countries, connecting people to providers and, where formal care isn't accessible, harm-reduction information.",
      "This work sits at an intersection that mainstream sexual health programming and mainstream LGBTQ+ health programming often both miss — the specific needs of people who are queer, trans, and doing sex work simultaneously. We treat that intersection as the point, not a complication, and we design our services accordingly, informed continuously by community feedback about what's working and what isn't.",
    ],
  },
  {
    slug: "digital-platforms",
    title: "Digital Platforms",
    icon: "lock",
    summary:
      "We build and maintain digital tools that help sex workers screen clients, share safety alerts, and report violence discreetly, designed with security and anonymity as core requirements rather than afterthoughts.",
    body: [
      "Digital tools have become essential to how sex work is organized and how safety is managed within it — but tools built without the specific needs of queer and trans sex workers in mind can create as much risk as they resolve, particularly around exposure, data security, and the threat of digital evidence being used in criminal proceedings.",
      "Trans+'s digital platforms program builds and maintains tools designed from the ground up with these risks as the starting point, not an afterthought.",
      "Our core tools support two functions: client screening and safety communication. Client-screening tools allow community members to share information about specific individuals or situations to avoid — flagging patterns of violence, non-payment, or police collaboration — while protecting the identity of everyone involved through strong access controls and anonymization.",
      "Our safety communication tools allow for rapid alerts when someone is in danger, discreet check-ins during work, and secure reporting of violence or abuse that can, if the person chooses, feed into our legal support and advocacy documentation work.",
      "Security and anonymity aren't features we add on top of these platforms — they're the design constraints that shape everything else. We build with the assumption that devices may be searched, that networks may be monitored, and that the consequences of exposure can include violence or arrest, not just embarrassment. This means minimizing data collection, encrypting what we do collect, giving users control over what's stored and for how long, and designing interfaces that can be used discreetly, including options that don't obviously signal what the app is for.",
      "We also invest in digital security training, helping community members understand how to protect themselves more broadly — securing personal devices, communicating safely with clients and each other, and understanding what digital traces they may be leaving in daily life.",
      "As the platforms grow, we stay in continuous conversation with the community about new risks and needs, treating this as a living project shaped by the people who depend on it rather than a finished product delivered from outside.",
    ],
  },
];

export const getProgramArea = (slug: string) =>
  programAreas.find((p) => p.slug === slug);
