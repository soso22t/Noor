import { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Heart,
  QrCode,
  Baby,
  Camera,
  Clock,
  CameraOff,
  MailCheck,
} from "lucide-react";
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
        {lang === "ar" ? "برنامج الحفل" : "Event Program"}
      </h3>

      <div className="relative">
        <div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px"
          style={{ background: "#C8A96A" }}
        />

        <div className="flex flex-col gap-7">
          {events.map((event, index) => (
            <Reveal key={index}>
              <div
                dir="rtl"
                className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 relative"
              >
                <div
                  className="font-arabic text-sm sm:text-base font-bold text-left"
                  style={{ color: "#33332B" }}
                >
                  {lang === "ar" ? event.titleAr : event.titleEn}
                </div>

                <div
                  className="w-3 h-3 rounded-full relative z-10"
                  style={{ background: "#C8A96A" }}
                />

                <div
                  className="font-arabic text-sm sm:text-base font-bold text-right"
                  style={{ color: "#33332B" }}
                >
                  {lang === "ar" ? event.timeAr : event.timeEn}
                </div>
              </div>
            </Reveal>
          ))}
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
  const { lang, setLang, t } = useLang();

  const [opened, setOpened] = useState(false);

  const musicRef = useRef<MusicToggleRef>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const autoScrollRef = useRef<number | null>(null);
  const autoScrollStoppedRef = useRef(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (!opened) return;

    autoScrollStoppedRef.current = false;

    const stopAutoScroll = () => {
      autoScrollStoppedRef.current = true;

      if (autoScrollRef.current !== null) {
        cancelAnimationFrame(autoScrollRef.current);
        autoScrollRef.current = null;
      }
    };

    const startAutoScroll = () => {
      const startTime = performance.now();
      const duration = 40000;

      const scroll = (now: number) => {
        if (autoScrollStoppedRef.current) return;

        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        window.scrollTo({
          top:
            document.documentElement.scrollHeight *
            window.innerHeight *
            0 +
            (document.documentElement.scrollHeight -
              window.innerHeight) *
              progress,
          behavior: "auto",
        });

        if (progress < 1) {
          autoScrollRef.current = requestAnimationFrame(scroll);
        } else {
          autoScrollRef.current = null;
        }
      };

      setTimeout(() => {
        if (!autoScrollStoppedRef.current) {
          autoScrollRef.current = requestAnimationFrame(scroll);
        }
      }, 2500);
    };

    const eventsToStop = [
      "touchstart",
      "wheel",
      "mousedown",
      "keydown",
    ] as const;

    eventsToStop.forEach((event) =>
      window.addEventListener(event, stopAutoScroll, { passive: true })
    );

    startAutoScroll();

    return () => {
      if (autoScrollRef.current !== null) {
        cancelAnimationFrame(autoScrollRef.current);
        autoScrollRef.current = null;
      }

      eventsToStop.forEach((event) =>
        window.removeEventListener(event, stopAutoScroll)
      );
    };
  }, [opened]);

  useEffect(() => {
    const preloadImages = [
      arabicLetters,
      englishLetters,
      dividerImg,
      flowerDivider,
      rsvpIcon,
      locationIcon,
    ];

    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleOpen = () => {
    setOpened(true);

    setTimeout(() => {
      musicRef.current?.play();
    }, 300);
  };

  return (
    <div
      className="min-h-screen w-full relative overflow-x-hidden"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <SprayParticles />

      <MusicToggle ref={musicRef} />

      {!opened && (
        <Envelope
          onOpen={handleOpen}
          musicRef={musicRef}
        />
      )}

      {opened && (
        <>
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="fixed top-4 right-4 z-50 font-arabic text-sm px-4 py-2 rounded-full"
            style={{
              background: "rgba(255,255,255,0.65)",
              color: "#8A7457",
              border: "1px solid rgba(255,255,255,0.5)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            {lang === "ar" ? "EN" : "العربية"}
          </button>

          <main className="relative z-10 flex flex-col items-center">
            <section className="w-full min-h-screen flex items-center justify-center relative overflow-hidden">
              <video
                ref={videoRef}
                src={invitationImg}
                autoPlay
                muted
                playsInline
                loop
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div
                className="absolute inset-0"
                style={{
                  background: "rgba(0,0,0,0.14)",
                }}
              />

              <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                <img
                  src={lang === "ar" ? arabicLetters : englishLetters}
                  alt=""
                  className="w-[70%] max-w-sm object-contain"
                />
              </div>
            </section>

            <section className="w-full flex flex-col items-center py-8">
              <div
                className="w-[92%] max-w-md rounded-3xl p-6 sm:p-8 text-center"
                style={{
                  background: "rgba(255,255,255,0.28)",
                  border: "1px solid rgba(255,255,255,0.45)",
                  boxShadow: "0 12px 30px rgba(200,169,106,.12)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                {lang === "ar" ? (
                  <>
                    <Reveal>
                      <p
                        className="font-arabic text-base sm:text-lg"
                        style={{ color: "#8A7457" }}
                      >
                        {t("mother_name1")}
                      </p>
                    </Reveal>

                    <Reveal>
                      <h1
                        className="font-arabic text-3xl sm:text-4xl font-bold mt-4"
                        style={{ color: "#A67C2E" }}
                      >
                        {t("bride_name")}
                      </h1>
                    </Reveal>

                    <Reveal>
                      <div
                        className="font-arabic text-2xl my-2"
                        style={{ color: "#A67C2E" }}
                      >
                        &
                      </div>
                    </Reveal>

                    <Reveal>
                      <h1
                        className="font-arabic text-3xl sm:text-4xl font-bold"
                        style={{ color: "#A67C2E" }}
                      >
                        {t("groom_name")}
                      </h1>
                    </Reveal>

                    <Reveal>
                      <p
                        className="font-arabic text-base sm:text-lg mt-5"
                        style={{ color: "#8A7457" }}
                      >
                        {t("family_names")}
                      </p>
                    </Reveal>
                  </>
                ) : (
                  <>
                    <Reveal>
                      <p
                        className="font-arabic text-base sm:text-lg"
                        style={{ color: "#8A7457" }}
                      >
                        {t("mother_name1")}
                      </p>
                    </Reveal>

                    <Reveal>
                      <h1
                        className="font-arabic text-3xl sm:text-4xl font-bold mt-4"
                        style={{ color: "#A67C2E" }}
                      >
                        MOHAMMED
                      </h1>
                    </Reveal>

                    <Reveal>
                      <div
                        className="font-arabic text-2xl my-2"
                        style={{ color: "#A67C2E" }}
                      >
                        &
                      </div>
                    </Reveal>

                    <Reveal>
                      <h1
                        className="font-arabic text-3xl sm:text-4xl font-bold"
                        style={{ color: "#A67C2E" }}
                      >
                        NOOR
                      </h1>
                    </Reveal>

                    <Reveal>
                      <p
                        className="font-arabic text-base sm:text-lg mt-5"
                        style={{ color: "#8A7457" }}
                      >
                        RAMADAN & AL-ZUBIEDI
                      </p>
                    </Reveal>
                  </>
                )}
              </div>
            </section>

            <section className="w-full flex justify-center py-6">
              <Countdown />
            </section>

            <section className="w-full flex justify-center py-6">
              <img
                src={dividerImg}
                alt=""
                className="w-[70%] max-w-xs object-contain"
              />
            </section>

            <section className="w-full flex flex-col items-center py-6">
              <div
                className="w-[92%] max-w-md rounded-3xl p-6 sm:p-8 text-center"
                style={{
                  background: "rgba(255,255,255,0.28)",
                  border: "1px solid rgba(255,255,255,0.45)",
                  boxShadow: "0 12px 30px rgba(200,169,106,.12)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                <Reveal>
                  <img
                    src={locationIcon}
                    alt=""
                    className="w-16 h-16 mx-auto object-contain mb-4"
                  />
                </Reveal>

                <Reveal>
                  <h2
                    className="font-arabic text-2xl sm:text-3xl font-bold"
                    style={{ color: "#A67C2E" }}
                  >
                    {t("venue_title")}
                  </h2>
                </Reveal>

                <Reveal>
                  <p
                    className="font-arabic text-sm sm:text-base mt-3"
                    style={{ color: "#8A7457" }}
                  >
                    {t("venue_name")}
                  </p>
                </Reveal>

                <div className="mt-6 rounded-2xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps?q=Sapphire+Addis+Hotel+Namibia+St+Addis+Ababa+Ethiopia&output=embed"
                    className="w-full h-64 border-0"
                    loading="lazy"
                  />
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Sapphire+Addis+Hotel+Namibia+St+Addis+Ababa+Ethiopia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-5 px-5 py-3 rounded-full font-arabic"
                  style={{
                    background: "rgba(200,169,106,0.15)",
                    color: "#8A7457",
                  }}
                >
                  <MapPin className="w-5 h-5" />
                  {t("open_map")}
                </a>
              </div>
            </section>

            <section className="w-full flex justify-center py-6">
              <img
                src={flowerDivider}
                alt=""
                className="w-[70%] max-w-xs object-contain"
              />
            </section>

            <EventTimeline />

            {/* Attendance Instructions */}
            <AttendanceInstructions />

            <section className="w-full flex flex-col items-center py-6">
              <div
                className="w-[92%] max-w-md rounded-3xl p-6 sm:p-8 text-center"
                style={{
                  background: "rgba(255,255,255,0.28)",
                  border: "1px solid rgba(255,255,255,0.45)",
                  boxShadow: "0 12px 30px rgba(200,169,106,.12)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                <img
                  src={rsvpIcon}
                  alt=""
                  className="w-20 h-20 mx-auto object-contain mb-4"
                />

                <RSVP />
              </div>
            </section>

            <footer className="w-full py-10 flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <Heart
                  className="w-4 h-4"
                  style={{ color: "#C8A96A" }}
                />
                <span
                  className="font-arabic text-sm"
                  style={{ color: "#8A7457" }}
                >
                  {t("designer")}
                </span>
                <Heart
                  className="w-4 h-4"
                  style={{ color: "#C8A96A" }}
                />
              </div>

              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-arabic text-sm"
                style={{ color: "#8A7457" }}
              >
                غيمة
              </a>

              <img
                src={gaimIcon}
                alt=""
                className="w-8 h-8 object-contain"
              />
            </footer>
          </main>
        </>
      )}
    </div>
  );
};

export default Index;
