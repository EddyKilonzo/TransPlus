export type Location = {
  name: string;
  country: "Kenya" | "Uganda";
  kind: "hub" | "crossing" | "camp" | "city";
  /** relative activity weight, drives the heat radius */
  intensity: number;
  note: string;
  lat: number;
  lon: number;
};

/**
 * Places named in the Trans+ briefing series. Coordinates are approximate and
 * projected onto a simple equirectangular grid by MapSection.
 */
export const LOCATIONS: Location[] = [
  {
    name: "Busia",
    country: "Kenya",
    kind: "hub",
    intensity: 1,
    note: "Primary border crossing and our main base of operations.",
    lat: 0.46,
    lon: 34.11,
  },
  {
    name: "Malaba",
    country: "Kenya",
    kind: "crossing",
    intensity: 0.9,
    note: "The other major official crossing on this corridor.",
    lat: 0.63,
    lon: 34.28,
  },
  {
    name: "Lwakhakha",
    country: "Uganda",
    kind: "crossing",
    intensity: 0.55,
    note: "Smaller crossing where movement is less monitored.",
    lat: 0.9,
    lon: 34.42,
  },
  {
    name: "Suam",
    country: "Kenya",
    kind: "crossing",
    intensity: 0.5,
    note: "Northern crossing point on the corridor.",
    lat: 1.16,
    lon: 34.72,
  },
  {
    name: "Kakuma",
    country: "Kenya",
    kind: "camp",
    intensity: 0.8,
    note: "Refugee camp — documented high rates of violence against LGBTQ residents.",
    lat: 3.72,
    lon: 34.87,
  },
  {
    name: "Kampala",
    country: "Uganda",
    kind: "city",
    intensity: 0.65,
    note: "Origin point for many fleeing after the Anti-Homosexuality Act, 2023.",
    lat: 0.31,
    lon: 32.58,
  },
  {
    name: "Nairobi",
    country: "Kenya",
    kind: "city",
    intensity: 0.7,
    note: "Common destination for those seeking informal safety in a Kenyan city.",
    lat: -1.29,
    lon: 36.82,
  },
  {
    name: "Eldoret",
    country: "Kenya",
    kind: "city",
    intensity: 0.4,
    note: "Transit town along the route inland.",
    lat: 0.52,
    lon: 35.27,
  },
  {
    name: "Kisumu",
    country: "Kenya",
    kind: "city",
    intensity: 0.45,
    note: "Transit town with peer outreach coverage.",
    lat: -0.09,
    lon: 34.77,
  },
];

export const MAP_BOUNDS = { minLon: 31.6, maxLon: 37.6, minLat: -2.2, maxLat: 4.6 };
