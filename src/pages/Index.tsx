import { useEffect, useRef, useState } from "react";
import { MapPin, Heart, QrCode, Baby, Camera, Clock } from "lucide-react";
import invitationImg from "@/assets/Pl.mp4";
import Envelope from "@/components/Envelope";
import SprayParticles from "@/components/SprayParticles";
import Reveal from "@/components/Reveal";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";
import RSVP from "@/components/RSVP";
import gaimIcon from "@/assets/gaim.svg";
import MusicToggle from "@/components/MusicToggle";
import backgroundImg from "@/assets/Ff.jpeg";
import dividerImg from "@/assets/Photoroom_20260926_153304.png";
import locationIcon from "@/assets/4.png";
import flowerDivider from "@/assets/Photoroom_20260803_031459.png";
import rsvpIcon from "@/assets/Photoroom_20260803_042103.png";
import { useLang } from "@/i18n/LanguageContext";
interface EventItem {
  time: string;
  title: string;
}
const events: EventItem[] = [
  { time: "4:00 PM", title: "الاستقبال" },
  { time: "5:30 PM", title: "مراسيم الزفاف" },
  { time: "7:00 PM", title: "العشاء" },
  { time: "11:00 PM", title: "الانتهاء" },
];
const EventTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight * 0.8;
      const end = windowHeight * 0.2;
      const current = rect.top;
      let progress = (start - current) / (start - end);
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      ref={containerRef}
      className="w-[92%] max-w-md p-6 sm:p-8 rounded-3xl text-center relative overflow-hidden my-4 mx-auto"
      style={{
        background: "rgba(255,255,255,0.28)",
        color: "#C8A96A",
        border: "1px solid rgba(255,255,255,0.45)",
        boxShadow: "0 12px 30px rgba(200,169,106,.12)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <h3
        className="font-arabic text-xl sm:text-2xl font-bold mb-8"
        style={{ color: "#C8A96A" }}
      >
        برنامج المناسبة
      </h3>
      <div className="relative max-w-xs mx-auto py-2">
        <div
          className="absolute left-1/2 top-3 bottom-3 -translate-x-1/2 w-[2px] opacity-30"
          style={{ backgroundColor: "#C8A96A" }}
        />
        <div
          className="absolute left-1/2 top-3 -translate-x-1/2 w-[2.5px] rounded-full transition-all duration-150 ease-out"
          style={{
            height: `${scrollProgress * 88}%`,
            backgroundColor: "#C8A96A",
            boxShadow: "0 0 10px rgba(200, 169, 106, 0.8)",
          }}
        />
        <div className="space-y-12 relative z-10">
          {events.map((event, index) => {
            const threshold = index / (events.length - 1 || 1);
            const isActive = scrollProgress >= threshold - 0.1;
            return (
              <div
                key={index}
                className="grid grid-cols-5 items-center dir-rtl"
              >
                <div
                  className="col-span-2 text-left pl-2 sm:pl-3 font-arabic text-sm sm:text-base font-bold transition-opacity duration-300"
                  style={{
                    color: "#33332B",
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  {event.title}
                </div>
                <div className="col-span-1 flex justify-center items-center">
                  <div
                    className="w-4 h-4 rounded-full border-2 transition-all duration-500 ease-out"
                    style={{
                      borderColor: "#C8A96A",
                      backgroundColor: isActive
                        ? "#C8A96A"
                        : "transparent",
                      transform: isActive ? "scale(1.3)" : "scale(1)",
                      boxShadow: isActive
                        ? "0 0 12px 3px rgba(200, 169, 106, 0.9), 0 0 22px 6px rgba(200, 169, 106, 0.5)"
                        : "none",
                    }}
                  />
                </div>
                <div
                  className="col-span-2 text-right pr-2 sm:pr-3 font-display text-xs sm:text-sm font-semibold tracking-wider dir-ltr transition-opacity duration-300"
                  style={{
                    color: "#33332B",
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  {event.time}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
const Index = () => {
  const [opened, setOpened] = useState(false);
  const { t, lang, toggle } = useLang();
  const autoScrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const autoScrollFrameRef = useRef<number | null>(null);
  const autoScrollStoppedRef = useRef(false);
  useEffect(() => {
    if (!opened) return;
    autoScrollStoppedRef.current = false;
    autoScrollTimerRef.current = setTimeout(() => {
      if (autoScrollStoppedRef.current) return;
      const startPosition = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= startPosition) return;
      const duration = 10000;
      const startTime = performance.now();
      const animateScroll = (currentTime: number) => {
        if (autoScrollStoppedRef.current) return;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // حركة سلسة وطبيعية
        const easedProgress =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        window.scrollTo(
          0,
          startPosition +
            (maxScroll - startPosition) * easedProgress
        );
        if (progress < 1) {
          autoScrollFrameRef.current =
            requestAnimationFrame(animateScroll);
        } else {
          autoScrollFrameRef.current = null;
        }
      };
      autoScrollFrameRef.current =
        requestAnimationFrame(animateScroll);
    }, 3000);
    return () => {
      if (autoScrollTimerRef.current) {
        clearTimeout(autoScrollTimerRef.current);
        autoScrollTimerRef.current = null;
      }
      if (autoScrollFrameRef.current) {
        cancelAnimationFrame(autoScrollFrameRef.current);
        autoScrollFrameRef.current = null;
      }
    };
  }, [opened]);
  useEffect(() => {
    if (!opened) return;
    const stopAutoScroll = () => {
      autoScrollStoppedRef.current = true;
      if (autoScrollTimerRef.current) {
        clearTimeout(autoScrollTimerRef.current);
        autoScrollTimerRef.current = null;
      }
      if (autoScrollFrameRef.current) {
        cancelAnimationFrame(autoScrollFrameRef.current);
        autoScrollFrameRef.current = null;
      }
    };
    window.addEventListener("touchstart", stopAutoScroll, {
      passive: true,
    });
    return () => {
      window.removeEventListener("touchstart", stopAutoScroll);
    };
  }, [opened]);
  return (
    <div
      className="overflow-x-hidden w-full"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      {/* تحميل الفيديو من أول دخول الموقع */}
      <video
        src={invitationImg}
        preload="auto"
        muted
        playsInline
        className="fixed w-px h-px opacity-0 pointer-events-none"
        aria-hidden="true"
      />
      {/* Ornamental gold damask pattern background */}
      <div
        aria-hidden
        className="hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><g fill='none' stroke='%23B8860B' stroke-width='0.7' opacity='0.9'><g transform='translate(30 30)'><circle cx='0' cy='0' r='2.2' fill='%23B8860B'/><path d='M0 0 C -5 -3 -8 -8 -5 -12 C -1 -14 3 -11 4 -7'/><path d='M0 0 C 5 -3 8 -8 5 -12 C 1 -14 -3 -11 -4 -7'/><path d='M0 0 C -7 0 -11 5 -9 10 C -5 12 -1 9 0 5'/><path d='M0 0 C 7 0 11 5 9 10 C 5 12 1 9 0 5'/><path d='M0 5 C -2 9 0 13 3 12'/></g><g transform='translate(90 80)'><circle cx='0' cy='0' r='1.8' fill='%23B8860B'/><path d='M0 0 C -4 -2 -6 -6 -4 -9 C -1 -11 2 -8 3 -5'/><path d='M0 0 C 4 -2 6 -6 4 -9 C 1 -11 -2 -8 -3 -5'/><path d='M0 0 C -5 0 -8 4 -7 8 C -4 9 -1 7 0 4'/><path d='M0 0 C 5 0 8 4 7 8 C 4 9 1 7 0 4'/></g><g transform='translate(75 25)'><circle cx='0' cy='0' r='1.5' fill='%23B8860B'/><path d='M0 -4 C -3 -4 -4 -1 -2 1'/><path d='M0 -4 C 3 -4 4 -1 2 1'/><path d='M-3 2 C -5 4 -3 7 0 6'/><path d='M3 2 C 5 4 3 7 0 6'/></g><g transform='translate(20 95)'><circle cx='0' cy='0' r='1.5' fill='%23B8860B'/><path d='M0 -4 C -3 -4 -4 -1 -2 1'/><path d='M0 -4 C 3 -4 4 -1 2 1'/><path d='M-3 2 C -5 4 -3 7 0 6'/><path d='M3 2 C 5 4 3 7 0 6'/></g><path d='M55 55 q 4 -2 8 0' /><path d='M58 56 q 0 3 -2 5'/></g></svg>")`,
          backgroundSize: "150px 150px",
        }}
      />
      {opened && <SprayParticles />}
      <MusicToggle active={opened} />
      <Envelope onOpen={() => setOpened(true)} />
      {opened && (
        <main
          className="relative z-10 animate-fadeIn"
          style={{
            animation: "fadeIn 0.8s ease forwards",
          }}
        >
          <div
            dir="ltr"
            className="fixed top-5 right-5 z-[9999] flex p-1 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.92)",
              border: "1px solid #E7D8B7",
              boxShadow: "0 8px 25px rgba(200,169,106,.15)",
            }}
          >
            <button
              onClick={() => lang !== "en" && toggle()}
              className="px-3 py-1 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: lang === "en" ? "#C8A96A" : "transparent",
                color: lang === "en" ? "#FFFFFF" : "#A67C2E",
              }}
            >
              EN
            </button>
            <button
              onClick={() => lang !== "ar" && toggle()}
              className="px-3 py-1 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: lang === "ar" ? "#C8A96A" : "transparent",
                color: lang === "ar" ? "#FFFFFF" : "#A67C2E",
              }}
            >
              AR
            </button>
          </div>
          <section className="flex justify-center relative z-20">
            <div className="relative w-full aspect-[9/16] overflow-hidden">
              <video
                src={invitationImg}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover animate-videoFade"
                style={{
                  background: "#F7F5F0",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "rgba(0,0,0,0.08)",
                }}
              />
              <div
                dir={lang === "ar" ? "rtl" : "ltr"}
                className="absolute inset-0 flex items-center justify-center px-5 py-6"
              >
                <div className="">
                  <div
                    className="flex flex-col items-center text-center px-5 py-6 rounded-2xl w-[98%] sm:w-[92%] gap-4 text-reveal"
                    style={{
                      background: "transparent",
                      backdropFilter: "none",
                      WebkitBackdropFilter: "none",
                      color: "#FFFFFF",
                      textShadow:
                        "0 1px 2px hsla(0,0%,0%,0.6), 0 0 10px hsla(0,0%,100%,0.35)",
                    }}
                  >
                    <div
                      className={`font-monasabat ${
                        lang === "ar"
                          ? "text-[14rem] sm:text-[15rem]"
                          : "text-xl sm:text-2xl"
                      } leading-[0.4]`}
                    >
                      {t("invite_to")}
                    </div>
                    <div
                      className={`font-tajawal ${
                        lang === "ar"
                          ? "text-2xl sm:text-3xl"
                          : "text-lg sm:text-xl"
                      } whitespace-nowrap`}
                    >
                      {t("invite_join")}
                    </div>
                    <div
                      className={`font-tajawal ${
                        lang === "ar"
                          ? "text-2xl sm:text-3xl"
                          : "text-lg sm:text-xl"
                      } whitespace-nowrap`}
                    >
                      {t("invite_day")}
                    </div>
                    <div
                      className={`font-tajawal ${
                        lang === "ar"
                          ? "text-2xl sm:text-3xl"
                          : "text-lg sm:text-xl"
                      } whitespace-nowrap`}
                    >
                      {t("invite_with_love")}
                    </div>
                    <div
                      className={`font-iran ${
                        lang === "ar"
                          ? "text-5xl sm:text-6xl"
                          : "text-4xl sm:text-5xl"
                      }`}
                    >
                      {t("mother_name1")}
                    </div>
                    <div
                      className={`font-tajawal ${
                        lang === "ar"
                          ? "text-2xl sm:text-3xl"
                          : "text-lg sm:text-xl"
                      }`}
                    >
                      {t("invite_attend")}
                    </div>
                    <div
                      className={`font-iran ${
                        lang === "ar"
                          ? "text-6xl sm:text-7xl"
                          : "text-5xl sm:text-6xl"
                      } my-6 flex items-center justify-center`}
                    >
                      <div className="flex flex-col items-center">
                        <span>{t("bride_name")}</span>
                        <span
                          className={`${
                            lang === "ar" ? "font-sull" : "font-serif"
                          }`}
                          style={{
                            fontSize: "0.38em",
                            marginTop: "4px",
                          }}
                        >
                          {t("bride_family_name")}
                        </span>
                      </div>
                      <span
                        className={lang === "ar" ? "font-sull" : "font-serif"}
                        style={{
                          fontSize: "0.65em",
                          margin: "0 18px",
                        }}
                      >
                        {t("and")}
                      </span>
                      <div className="flex flex-col items-center">
                        <span>{t("groom_name")}</span>
                        <span
                          className={`${
                            lang === "ar" ? "font-sull" : "font-serif"
                          }`}
                          style={{
                            fontSize: "0.38em",
                            marginTop: "4px",
                          }}
                        >
                          {t("groom_family_name")}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`font-tajawal ${
                        lang === "ar"
                          ? "text-xl sm:text-2xl"
                          : "text-base sm:text-lg"
                      }`}
                    >
                      {t("invite_god_willing")}
                    </div>
                    <div
                      className={`font-tajawal ${
                        lang === "ar"
                          ? "text-2xl sm:text-3xl"
                          : "text-lg sm:text-xl"
                      }`}
                    >
                      {t("date_line")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Countdown */}
          <section className="px-4 py-16">
            <Reveal>
              <p
                className="text-center font-arabic text-sm mb-2"
                style={{ color: "#7C7367" }}
              >
                {t("countdown_date")}
              </p>
              <h2
                className="text-center font-arabic text-3xl mb-10"
                style={{ color: "#A67C2E" }}
              >
                {t("countdown_title")}
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <Countdown />
            </Reveal>
          </section>
          <section className="-mx-4 py-8">
            <img
              src={dividerImg}
              alt=""
              className="block w-full h-auto"
            />
          </section>
          <section className="px-4 py-16">
            <Reveal>
              <div className="text-center mb-8">
                <img
                  src={locationIcon}
                  alt=""
                  className="mx-auto mb-4 w-14 h-auto"
                />
                <h2
                  className="font-arabic text-3xl"
                  style={{ color: "#A67C2E" }}
                >
                  {t("details_title")}
                </h2>
                <div
                  className="font-arabic text-sm mt-2"
                  style={{ color: "#7C7367" }}
                >
                  {t("details_subtitle")}
                </div>
                <img
                  src={flowerDivider}
                  alt=""
                  className="mx-auto mt-4 mb-6 w-24 h-auto select-none"
                  draggable={false}
                />
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div
                style={{
                  transform: "scale(0.9)",
                  transformOrigin: "top center",
                }}
              >
                <div
                  className="max-w-sm mx-auto rounded-3xl p-4"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E7D8B7",
                    boxShadow: "0 12px 30px rgba(200,169,106,.12)",
                  }}
                >
                  <div className="flex flex-col items-center justify-center gap-1 mb-4">
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src={locationIcon}
                        alt=""
                        className="w-7 h-7"
                      />
                      <span
                        className="font-arabic text-sm"
                        style={{
                          color: "#A67C2E",
                          fontWeight: 600,
                        }}
                      >
                        {t("hall_name")}
                      </span>
                    </div>
                    <div
                      className="font-arabic text-sm"
                      style={{
                        color: "#7C7367",
                      }}
                    >
                      {t("venue_city")}
                    </div>
                  </div>
                  <iframe
                    title={t("map_title")}
                    src="https://www.google.com/maps?q=Sapphire+Addis+Hotel,+Namibia+St,+Addis+Ababa,+Ethiopia&output=embed"
                    width="100%"
                    height="230"
                    loading="lazy"
                    style={{
                      border: 0,
                      borderRadius: "16px",
                    }}
                  />
                  <div
                    className="text-center mt-4 font-arabic"
                    style={{
                      color: "#2F2A24",
                      fontSize: "15px",
                      fontWeight: 600,
                    }}
                  >
                    {t("hall_city")}
                  </div>
                  {t("arrival_time").trim() && (
                    <div className="hidden items-center justify-center gap-2 mt-3 mb-5">
                      <Clock
                        className="w-4 h-4"
                        style={{ color: "#687451" }}
                      />
                      <span
                        className="font-arabic text-sm"
                        style={{ color: "#394132" }}
                      >
                        {t("arrival_time")}
                      </span>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="https://maps.app.goo.gl/HLfudh8kqaeihyzU6?g_st=ic"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 rounded-xl text-center font-arabic text-sm"
                      style={{
                        background: "#FFFFFF",
                        border: "1px solid #E7D8B7",
                        color: "#A67C2E",
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      {t("open_map")}
                    </a>
                    <a
                      href="/event.ics"
                      className="py-3 rounded-xl text-center font-arabic text-sm"
                      style={{
                        background: "#C8A96A",
                        color: "#FFFFFF",
                        fontWeight: 600,
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {t("add_calendar")}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
          {/* Details */}
          <section className="px-4 py-16">
            <EventTimeline />
          </section>
          {/* RSVP */}
          <section className="px-4 py-16">
            <Reveal>
              <div className="text-center mb-10">
                <img
                  src={rsvpIcon}
                  alt=""
                  className="mx-auto mb-5 w-28 h-auto select-none"
                  draggable={false}
                />
                <h2
                  className="font-arabic text-3xl"
                  style={{ color: "#A67C2E" }}
                >
                  {t("rsvp_title")}
                </h2>
                <div
                  className="font-arabic text-sm mt-2"
                  style={{ color: "#7B8470" }}
                >
                  {t("rsvp_deadline")}
                </div>
              </div>
            </Reveal>
            <RSVP />
          </section>
          {/* Footer */}
          <footer className="px-4 py-12 text-center">
            <Reveal>
              <div className="flex flex-col items-center gap-1">
                <div
                  className="text-lg inline-flex items-center gap-1.5"
                  style={{ color: "#A67C2E" }}
                >
                  <span className="font-iran">
                    {t("designer_name1")}
                  </span>
                  <span
                    className={`${
                      lang === "ar" ? "font-sull" : "font-sans"
                    }`}
                  >
                    {t("designer_and")}
                  </span>
                  <span className="font-iran">
                    {t("designer_name2")}
                  </span>
                </div>
                <a
                  href="https://www.tiktok.com/@shim2t?_r=1&_t=ZS-95w0d8f7vnk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-col items-center mt-2"
                  style={{ textDecoration: "none" }}
                >
                  <div className="flex items-center gap-1">
                    <img
                      src={gaimIcon}
                      alt="Gaim Store Icon"
                      className="w-4 h-4"
                    />
                    <span
                      className="font-arabic text-base"
                      style={{
                        fontWeight: 400,
                        color: "#A67C2E",
                      }}
                    >
                      {t("store")}
                    </span>
                  </div>
                  <span
                    className="mt-0.5 text-xs inline-flex items-center gap-1"
                    style={{ color: "#7C7367" }}
                  >
                    TikTok @shim2t
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="#C8A96A"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 17L17 7M17 7H7M17 7v10"
                      ></path>
                    </svg>
                  </span>
                </a>
              </div>
            </Reveal>
          </footer>
        </main>
      )}
    </div>
  );
};
export default Index;
