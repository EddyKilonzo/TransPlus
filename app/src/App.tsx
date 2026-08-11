import { useEffect, useRef, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HexBackground from "./components/three/HexBackground";
import Home from "./pages/Home";
import { useReducedMotion } from "./hooks/useReducedMotion";

const About = lazy(() => import("./pages/About"));
const Work = lazy(() => import("./pages/Work"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Support = lazy(() => import("./pages/Support"));
const Reports = lazy(() => import("./pages/Reports"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-pine via-moss to-leaf"
      style={{ scaleX }}
    />
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.main
      id="main"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
      transition={{ duration: reduced ? 0.15 : 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}

export default function App() {
  const location = useLocation();
  const reduced = useReducedMotion();

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  // Reset scroll on route change. Lenis owns the scroll position while it is
  // running, so window.scrollTo alone gets overwritten on its next frame.
  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-paper text-ink">
      <HexBackground />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-pine focus:px-5 focus:py-2.5 focus:font-display focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <PageShell key={location.pathname}>
            <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/work" element={<Work />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="/support" element={<Support />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Footer />
          </PageShell>
        </AnimatePresence>
      </div>
    </div>
  );
}
