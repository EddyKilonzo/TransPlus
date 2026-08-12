import { useEffect } from "react";

export const SITE_NAME = "Trans+";
export const SITE_ORIGIN = "https://transplug.org";
export const DEFAULT_DESCRIPTION =
  "Trans+ works alongside queer and transgender sex workers along the Kenya-Uganda border through legal advocacy, direct support, SRHR access, and digital safety tools.";

type SeoProps = {
  /** Page title; " — Trans+" is appended unless already present. */
  title: string;
  description?: string;
  /** Canonical path, e.g. "/about". Defaults to the current pathname. */
  path?: string;
  /** Keep the page out of search indexes (e.g. the 404 page). */
  noindex?: boolean;
};

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/** Per-page document metadata. Google renders JS, so client-set tags are indexed. */
export default function Seo({ title, description = DEFAULT_DESCRIPTION, path, noindex = false }: SeoProps) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
    const url = SITE_ORIGIN + (path ?? window.location.pathname);

    document.title = fullTitle;
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, path, noindex]);

  return null;
}
