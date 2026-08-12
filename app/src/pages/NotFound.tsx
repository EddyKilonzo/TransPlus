import { Link } from "react-router";
import Seo from "@/components/Seo";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <Seo title="Page Not Found" noindex />
      <span className="eyebrow">404</span>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        This page doesn't exist.
      </h1>
      <p className="mt-4 max-w-sm text-ink/60">
        The page you're looking for may have moved or never existed.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-pine px-6 py-3.5 font-display text-sm font-medium text-white transition-transform hover:-translate-y-0.5 hover:bg-moss"
      >
        Back to home
      </Link>
    </div>
  );
}
