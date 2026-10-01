import { useEffect, useRef, useState } from "react";
import { MapPin, Heart, QrCode, Baby, Camera, Clock, CameraOff, MailCheck } from "lucide-react";
import invitationImg from "@/assets/Wp.mp4";
import Envelope from "@/components/Envelope";
import SprayParticles from "@/components/SprayParticles";
import Reveal from "@/components/Reveal";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";
import RSVP from "@/components/RSVP";
import gaimIcon from "@/assets/gaim.svg";
import MusicToggle, {
  type MusicToggleRef,
} from "@/components/MusicToggle";
import backgroundImg from "@/assets/Ff.jpeg";
import dividerImg from "@/assets/Photoroom_20260926_153304.png";
import locationIcon from "@/assets/4.png";
import flowerDivider from "@/assets/Photoroom_20260803_031459.png";
import rsvpIcon from "@/assets/Photoroom_20260803_042103.png";
import arabicLetters from "@/assets/Anx.png";
import englishLetters from "@/assets/Ann.png";
import { useLang } from "@/i18n/LanguageContext";

interface EventItem {
  timeAr: string;
  timeEn: string;
  titleAr: string;
  titleEn: string;
}

const events: EventItem[] = [
  {
    timeAr: "٤:٠٠ مساءً",
    timeEn: "4:00 PM",
    titleAr: "الاستقبال",
    titleEn: "Reception",
  },
  {
    timeAr: "٥:٣٠ مساءً",
    timeEn: "5:30 PM",
    titleAr: "مراسيم الزفاف",
    titleEn: "Wedding Ceremony",
  },
  {
    timeAr: "٧:٠٠ مساءً",
    timeEn: "7:00 PM",
    titleAr: "العشاء",
    titleEn: "Dinner",
  },
  {
    timeAr: "١١:٠٠ مساءً",
    timeEn: "11:00 PM",
    titleAr: "الانتهاء",
    titleEn: "Celebration Ends",
  },
];

const EventTimeline = () => {
  const { lang } = useLang();
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
        {lang === "ar" ? "برنامج المناسبة" : "Wedding Program."}
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
                  {lang === "ar" ? event.titleAr : event.titleEn}
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
                  {lang === "ar" ? event.timeAr : event.timeEn}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const AttendanceInstructions = () => {
  const { t, lang } = useLang();

  const instructions = [
    {
      key: "no_kids" as const,
      icon: <Baby className="w-5 h-5" style={{ color: "#C8A96A" }} />,
    },
    {
      key: "no_cameras" as const,
      icon: <CameraOff className="w-5 h-5" style={{ color: "#C8A96A" }} />,
    },
    {
      key: "show_invitation" as const,
      icon: <MailCheck className="w-5 h-5" style={{ color: "#C8A96A" }} />,
    },
  ];

  return (
    <div
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
        {t("details_title")}
      </h3>

      <div className="flex flex-col gap-4">
        {instructions.map((item, index) => (
          <div
            key={index}
            dir="ltr"
            className="w-full rounded-2xl px-5 py-4 flex items-center"
            style={{
              background: "rgba(255,255,255,0.38)",
              border: "1px solid rgba(255,255,255,0.45)",
              boxShadow: "0 8px 20px rgba(200,169,106,.08)",
            }}
          >
            <div
  className="p-2 rounded-full flex justify-center items-center mr-3"
  style={{
    background: "rgba(200, 169, 106, 0.15)",
  }}
>
  {item.icon}
</div>

<div
  className={`font-arabic text-xs sm:text-sm font-bold flex-1 ${
    lang === "ar" ? "text-right" : "text-left"
  }`}
  style={{ color: "#33332B" }}
>
  {t(item.key)}
</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Index = () => {
  const [opened, setOpened] = useState(false);
  const { t, lang, toggle } = useLang();
  const musicRef = useRef<MusicToggleRef | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const autoScrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const autoScrollFrameRef = useRef<number | null>(null);
  const autoScrollStoppedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // تشغيل الفيديو وتعيين الوقت المبدئي على الإطار الأول
    video.currentTime = 0;
    video.play().catch(() => {});
  }, []);

  useEffect(() => {
    if (!opened) return;

    autoScrollStoppedRef.current = false;
    let animationFrameId: number;

    const handleUserInteraction = () => {
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

    window.addEventListener("touchstart", handleUserInteraction, {
      passive: true,
    });
    window.addEventListener("wheel", handleUserInteraction, {
      passive: true,
    });
    window.addEventListener("mousedown", handleUserInteraction, {
      passive: true,
    });
    window.addEventListener("keydown", handleUserInteraction, {
      passive: true,
    });

    autoScrollTimerRef.current = setTimeout(() => {
      if (autoScrollStoppedRef.current) return;

      const startPosition = window.pageYOffset;
      const targetPosition =
        document.documentElement.scrollHeight - window.innerHeight;
      const distance = targetPosition - startPosition;

      if (distance <= 0) return;

      const duration = 40000;
      const startTime = Date.now();

      const animation = () => {
        if (autoScrollStoppedRef.current) return;

        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const run = startPosition + distance * progress;

        window.scrollTo({
          top: run,
          behavior: "instant",
        });

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animation);
          autoScrollFrameRef.current = animationFrameId;
        } else {
          autoScrollFrameRef.current = null;
        }
      };

      animationFrameId = requestAnimationFrame(animation);
      autoScrollFrameRef.current = animationFrameId;
    }, 2500);

    return () => {
      if (autoScrollTimerRef.current) {
        clearTimeout(autoScrollTimerRef.current);
        autoScrollTimerRef.current = null;
      }

      if (autoScrollFrameRef.current) {
        cancelAnimationFrame(autoScrollFrameRef.current);
        autoScrollFrameRef.current = null;
      }

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("mousedown", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  }, [opened]);

  const lettersImage =
    lang === "ar" ? arabicLetters : englishLetters;

  return (
    <div
      className="overflow-x-hidden w-full min-h-screen relative"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* الصور المخفية للتجهيز المسبق */}
      <img
        src={arabicLetters}
        alt=""
        className="fixed w-px h-px opacity-0 pointer-events-none"
        aria-hidden="true"
      />

      <img
        src={englishLetters}
        alt=""
        className="fixed w-px h-px opacity-0 pointer-events-none"
        aria-hidden="true"
      />

      {opened && <SprayParticles />}

      <MusicToggle ref={musicRef} active={true} />

      <Envelope
        onOpen={() => {
          musicRef.current?.playMusic();
          setOpened(true);
        }}
      />

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
                background:
                  lang === "en" ? "#C8A96A" : "transparent",
                color:
                  lang === "en" ? "#FFFFFF" : "#A67C2E",
              }}
            >
              EN
            </button>

            <button
              onClick={() => lang !== "ar" && toggle()}
              className="px-3 py-1 rounded-lg text-sm font-semibold transition-all"
              style={{
                background:
                  lang === "ar" ? "#C8A96A" : "transparent",
                color:
                  lang === "ar" ? "#FFFFFF" : "#A67C2E",
              }}
            >
              AR
            </button>
          </div>

          {/* السلايد الأول */}
          <section className="flex justify-center relative z-20">
            <div className="relative w-full aspect-[9/16] overflow-hidden">
              <video
                ref={videoRef}
                src={`${invitationImg}#t=0.001`}
                preload="auto"
                muted
                playsInline
                autoPlay
                loop
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{
                  backgroundColor: "#F7F5F0",
                }}
              />

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "rgba(0,0,0,0.14)",
                }}
              />

              <div
                dir={lang === "ar" ? "rtl" : "ltr"}
                className="absolute inset-0 pointer-events-none z-10"
              >
                <img
                  src={lettersImage}
                  alt=""
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-contain select-none"
                  style={{
                    filter:
                      "drop-shadow(0 2px 8px rgba(0,0,0,0.55))",
                  }}
                />
              </div>
            </div>
          </section>

          {/* محتوى الدعوة تحت الفيديو */}
          <section className="px-4 pt-14 pb-8">
            <Reveal>
              <div
                dir={lang === "ar" ? "rtl" : "ltr"}
                className="w-[92%] max-w-md p-6 sm:p-8 rounded-3xl text-center relative overflow-hidden my-4 mx-auto"
                style={{
                  background: "rgba(255,255,255,0.28)",
                  border:
                    "1px solid rgba(255,255,255,0.45)",
                  boxShadow:
                    "0 12px 30px rgba(200,169,106,.12)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                <div
                  className={`flex flex-col items-center text-center gap-5 ${
                    lang === "ar" ? "font-arabic" : ""
                  }`}
                >
                  <div className="flex items-center justify-center my-4">
                    <span
                      className="inline-block text-6xl sm:text-7xl font-normal leading-none select-none"
                      style={{
                        fontFamily: "'Monasabat', sans-serif",
                        color: "#A67C2E",
                        transform: "scale(3.4)",
                        transformOrigin: "center",
                        textRendering: "geometricPrecision",
                      }}
                    >
                      {t("invite_to")}
                    </span>
                  </div>

                  <div
                    className="font-tajawal text-base sm:text-lg"
                    style={{
                      color: "#8A7457",
                    }}
                  >
                    {t("invite_join")}
                  </div>

                  <div
                    className="font-tajawal text-base sm:text-lg"
                    style={{
                      color: "#8A7457",
                    }}
                  >
                    {t("invite_day")}
                  </div>

                  {lang === "ar" && (
                    <div
                      className="font-tajawal text-base sm:text-lg pb-2"
                      style={{
                        color: "#8A7457",
                      }}
                    >
                      {t("invite_with_love")}
                    </div>
                  )}

                  {lang === "ar" && (
                    <div
                      className="flex items-center justify-center gap-1 text-3xl sm:text-4xl font-bold py-2"
                      style={{
                        color: "#A67C2E",
                      }}
                    >
                      <span className="font-iran">
                        {t("mother_name1")}
                      </span>
                    </div>
                  )}

                  {lang === "ar" && (
                    <div
                      className="font-tajawal text-base sm:text-lg"
                      style={{
                        color: "#8A7457",
                      }}
                    >
                      {t("invite_attend")}
                    </div>
                  )}

                  {lang === "ar" && (
                    <div className="flex items-center justify-center gap-3 mt-2">
                      <div className="flex flex-col items-center">
                        <span
                          className="font-iran text-5xl sm:text-6xl"
                          style={{
                            color: "#A67C2E",
                          }}
                        >
                          {t("bride_name")}
                        </span>

                        <span
                          className="font-tajawal text-base sm:text-lg"
                          style={{
                            color: "#8A7457",
                          }}
                        >
                          {t("bride_family_name")}
                        </span>
                      </div>

                      <span
                        className="font-sull"
                        style={{
                          fontSize: "1.2em",
                          color: "#A67C2E",
                        }}
                      >
                        {t("and")}
                      </span>

                      <div className="flex flex-col items-center">
                        <span
                          className="font-iran text-5xl sm:text-6xl"
                          style={{
                            color: "#A67C2E",
                          }}
                        >
                          {t("groom_name")}
                        </span>

                        <span
                          className="font-tajawal text-base sm:text-lg"
                          style={{
                            color: "#8A7457",
                          }}
                        >
                          {t("groom_family_name")}
                        </span>
                      </div>
                    </div>
                  )}

                  {lang === "ar" && (
                    <div
                      className="font-tajawal text-base sm:text-lg"
                      style={{
                        color: "#8A7457",
                      }}
                    >
                      {t("invite_god_willing")}
                    </div>
                  )}

                  {lang === "en" && (
                    <>
                      <div
                        className="font-serif flex flex-col items-center justify-center my-3"
                        style={{
                          color: "#A67C2E",
                        }}
                      >
                        <span
                          className="text-3xl sm:text-4xl uppercase tracking-[0.25em] font-bold"
                          style={{
                            fontFamily:
                              "'Snell Roundhand', 'URW Chancery L', 'Brush Script MT', cursive",
                            letterSpacing: "0.08em",
                            fontWeight: 700,
                          }}
                        >
                          MOHAMMED
                        </span>

                        <span
                          className="text-4xl sm:text-5xl my-1"
                          style={{
                            fontFamily:
                              "'Snell Roundhand', 'URW Chancery L', 'Brush Script MT', cursive",
                            color: "#A67C2E",
                            fontStyle: "normal",
                            fontWeight: 700,
                          }}
                        >
                          &
                        </span>

                        <span
                          className="text-3xl sm:text-4xl uppercase tracking-[0.25em] font-bold"
                          style={{
                            fontFamily:
                              "'Snell Roundhand', 'URW Chancery L', 'Brush Script MT', cursive",
                            letterSpacing: "0.08em",
                            fontWeight: 700,
                          }}
                        >
                          NOOR
                        </span>
                      </div>

                      <div
                        className="font-serif text-xs sm:text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 my-1"
                        style={{
                          color: "#8A7457",
                        }}
                      >
                        <span>RAMADAN</span>

                        <span
                          className="inline-block w-[1px] h-4"
                          style={{
                            backgroundColor: "#A67C2E",
                          }}
                        />

                        <span>AL-ZUBIEDI</span>
                      </div>

                      <div
                        className="font-serif text-base sm:text-lg leading-relaxed mt-2"
                        style={{
                          color: "#8A7457",
                        }}
                      >
                        We look forward to sharing this special day with you.
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Reveal>
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
                {lang === "ar"
                  ? t("countdown_title")
                  : "Wedding Countdown."}
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

          {/* Venue */}
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
                  {lang === "ar" ? "موقع الفرح" : "Venue"}
                </h2>

    

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
                    boxShadow:
                      "0 12px 30px rgba(200,169,106,.12)",
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

                  {t("arrival_time").trim() && (
                    <div className="hidden items-center justify-center gap-2 mt-3 mb-5">
                      <Clock
                        className="w-4 h-4"
                        style={{
                          color: "#687451",
                        }}
                      />

                      <span
                        className="font-arabic text-sm"
                        style={{
                          color: "#394132",
                        }}
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

          {/* Details / Wedding Program */}
          <section className="px-4 py-8">
            <EventTimeline />
          </section>

          {/* Attendance Instructions */}
          <section className="px-4 py-8">
            <Reveal>
              <AttendanceInstructions />
            </Reveal>
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
                      lang === "ar"
                        ? "font-sull"
                        : "font-sans"
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
                      />
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
