export type Report = {
  slug: string;
  series: string;
  title: string;
  subtitle: string;
  summary: string;
  pages: number;
  file: string;
  image: string;
};

export const REPORTS: Report[] = [
  {
    slug: "criminalized-in-transit",
    series: "Series 1 of 4",
    title: "Criminalized in Transit",
    subtitle:
      "The Case for Decriminalizing Sex Work Along the Kenya-Uganda Border, and Why Queer Migrants Pay the Highest Price",
    summary:
      "Overlapping criminalization of sex work and same-sex conduct creates a border zone where movement itself becomes dangerous. This paper sets out the legal background, documents patterns of harassment and police brutality, and makes the case for decriminalization as the foundation every other protection depends on.",
    pages: 5,
    file: "/reports/TransPlus_Criminalized_in_Transit_Decriminalization.pdf",
    image: "/images/6.jpeg",
  },
  {
    slug: "health-without-a-fixed-address",
    series: "Series 3 of 4",
    title: "Health Without a Fixed Address",
    subtitle:
      "Sexual and Reproductive Health Access for LGBTQ Migrants and Sex Workers in Transit Along the Kenya-Uganda Border",
    summary:
      "Legal risk, stigma, and constant movement combine to push people away from care at precisely the moments they need it most. This paper examines that double exclusion and describes Trans+'s peer-led model for closing the gap.",
    pages: 4,
    file: "/reports/TransPlus_Health_Without_a_Fixed_Address_SRHR.pdf",
    image: "/images/5.jpeg",
  },
  {
    slug: "tracked-targeted-trapped",
    series: "Series 4 of 4",
    title: "Tracked, Targeted, Trapped",
    subtitle:
      "Digital Risk and Digital Safety for Queer Sex Workers Facing Surveillance, Harassment, and Arrest Along the Kenya-Uganda Border",
    summary:
      "The same phones that let people find clients and coordinate safety are routinely turned against them as evidence and leverage. This paper documents how digital risk intersects with policing, and how Trans+ builds tools that treat anonymity as non-negotiable.",
    pages: 4,
    file: "/reports/TransPlus_Tracked_Targeted_Trapped_Digital.pdf",
    image: "/images/1.jpeg",
  },
];
