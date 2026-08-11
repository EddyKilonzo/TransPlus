export type Testimony = {
  quote: string;
  attribution: string;
  source: string;
  reportSlug: string;
  image: string;
};

/**
 * Community testimony published in the Trans+ advocacy briefing series.
 * Identities are withheld for safety, exactly as they are in the source papers.
 */
export const TESTIMONIES: Testimony[] = [
  {
    quote:
      "Stopped three times in one week by different officers at the same checkpoint, each demanding payment to let her continue — despite carrying no contraband and committing no offense beyond being visibly trans and traveling alone.",
    attribution: "A trans woman who crossed from Uganda into Kenya through Busia",
    source: "Criminalized in Transit",
    reportSlug: "criminalized-in-transit",
    image: "/images/4.jpeg",
  },
  {
    quote:
      "She stopped taking her antiretroviral medication for several weeks after being displaced from a border town, because she had no way to safely carry it without risking questions from officers about what it was and why she had it.",
    attribution: "A community health worker, describing a client",
    source: "Health Without a Fixed Address",
    reportSlug: "health-without-a-fixed-address",
    image: "/images/5.jpeg",
  },
  {
    quote:
      "The officer scrolled through her messages in front of her and other travelers, then demanded payment to avoid having the contents “reported” — despite there being no formal charge or process involved.",
    attribution: "A community member asked to unlock her phone at a checkpoint",
    source: "Tracked, Targeted, Trapped",
    reportSlug: "tracked-targeted-trapped",
    image: "/images/1.jpeg",
  },
];

export type Finding = {
  label: string;
  detail: string;
};

/** Systemic patterns documented across Trans+ legal support and outreach case files. */
export const DOCUMENTED_PATTERNS: Finding[] = [
  {
    label: "Extortion in place of prosecution",
    detail:
      "Officers use the threat of arrest to demand cash, phones, or sexual services in exchange for release — without ever filing charges, leaving no paper trail and no avenue for redress.",
  },
  {
    label: "Targeted stops based on gender presentation",
    detail:
      "Transgender and gender-nonconforming people, particularly trans women, are stopped disproportionately at checkpoints based on appearance alone.",
  },
  {
    label: "Prolonged detention without charge",
    detail:
      "Community members report being held for days without charges, with access to legal counsel, medical care, or family contact frequently denied.",
  },
  {
    label: "Confiscation of phones as leverage",
    detail:
      "Phones are seized during stops and payment demanded for their return, regardless of what — if anything — is actually on them.",
  },
];
