import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";

type Dict = Record<string, string>;

const ar: Dict = {
// Invitation
tap_open: "اضغط لفتح الدعوة",
invite_to: "2",
invite_join: "الأيام الجميلة لا تكتمل إلا بكم",
invite_day: "والأوقات السعيدة لا تبدأ إلا معكم",
invite_with_love: "تتشرف حرم /",
word1: "السيدة",
word2: "السيدة",
mother_name1: "حسسـن رمضـان",
and: "&",
mother_name2: "الزُبيدي",
invite_attend: "بدعوتكم لحضور حفل زفاف نجلها",
invite_before_bride: "ابنها",
invite_before_bride_2: "ابنتها",
bride_name: "محمـد",
groom_name: "نســور",
bride_family_name: "رمضان",
groom_family_name: "الزُبيدي",
invite_god_willing: "وذلك بمشيئة الله تعالى يوم السبت",
date_line: "٢٦ . ١٢ . ٢٠٢٦",

// Countdown
countdown_date: "٢٦ ديسمبر ٢٠٢٦",
countdown_title: "المتبقي حتى فرحتنا",
days: "أيام",
hours: "ساعات",
minutes: "دقائق",
seconds: "ثواني",

// Details
details_title: "تفاصيل يوم الفرح",
details_subtitle: "كل ما تحتاج معرفته",

// Venue
venue_title: "موقع حفلنا",
venue_name: "Sapphire Hotel",
venue_city: "الدور التاسع",

hall_name: "Sapphire Hotel",
hall_city: "الدور التاسع",
arrival_time: " ",
open_map: "افتح في الخريطة",
add_calendar: "إضافة إلى التقويم",

// Program
program_title: "برنامج المناسبة",
program_subtitle: " ",
program_reception: "الاستقبال",
reception_time: "الساعة ٨:٠٠ مساءً",
program_zaffa: "الزفة",
zaffa_time: "الساعة ٩:٠٠ مساءً",
program_dinner: "العشاء",
dinner_time: "الساعة ١٠:٠٠ مساءً",
no_cameras: "يمنع التصوير",
no_kids: "يمنع اصطحاب الأطفال",
swipe_more: " ",

// Event Timeline
event_reception: "الاستقبال",
event_reception_time: "الساعة ٨:٠٠ مساءً",
event_wedding: "مراسيم الزفاف",
event_wedding_time: "الساعة ٩:٠٠ مساءً",
event_dinner: "العشاء",
event_dinner_time: "الساعة ١٠:٠٠ مساءً",
event_end: "الانتهاء",
event_end_time: "الساعة ١١:٠٠ مساءً",

// RSVP
rsvp_title: "الدعوة شخصية",
rsvp_sub: "نتشرف بحضوركم",
rsvp_deadline: "نتشرف بحضوركم",

name_label: "الاسم الكريم",
name_placeholder: "أدخل اسمك الكريم",
message_label: "رسالة إلى العروسين",
message_placeholder: "اكتب تهنئتك أو رسالتك هنا…",
sending: "جاري الإرسال…",
send_message: "إرسال الرسالة",

welcome: "أهلاً وسهلاً",
guest_count: "عدد المرافقين",
already_registered: "تم التسجيل مسبقاً من هذا الجهاز",
error_try_again: "حدث خطأ، حاول مرة أخرى",
see_you_next_time: "ونراك في مناسبة أخرى بإذن الله",
save_qr_warning: "يرجى حفظ الباركود لأنه مطلوب عند الدخول",
dont_scan_qr: "الرجاء عدم مسح الباركود",

thanks_attending: "شكراً لتأكيد حضورك",
thanks_declined: "نقدّر اعتذارك",
redirect_wa: "سيتم تحويلك إلى الواتساب لإرسال الرد…",

// QR
qr_title: "باركود الدخول الخاص بك",
qr_sub: "يرجى تقديم هذا الباركود عند البوابة",
save_qr: "حفظ الباركود",
redirecting_in: "سيتم تحويلك إلى الواتساب خلال",
seconds_short: "ث",

// Footer
made_by: " ",
store: "غيمة",
designer_name1: "محمـد",
designer_and: "&",
designer_name2: "نســور",
tiktok: "@shim2t.TikTok",

// Calendar
date_full: "السبت ٢٦ ديسمبر ٢٠٢٦",
cal_day: "Saturday",
cal_month: "December",
cal_year: "2026",
guests_1: "١",
guests_2: "٢",
guests_3: "٣",
guests_4: "٤",
guests_5: "٥"
};

const en: Dict = {
// Invitation
tap_open: "Tap to open the invitation",
invite_to: "2",
invite_join: "Beautiful days are only complete with you",
invite_day: "And joyful moments begin only with you",
invite_with_love: "Mrs. /",
word1: "Mrs.",
word2: "Mrs.",
mother_name1: "Hassan Ramadan",
and: "&",
mother_name2: "Al zubiedi",
invite_attend: "is honored to invite you to attend the wedding ceremony of her son",
invite_before_bride: "her son",
invite_before_bride_2: "her daughter",
bride_name: "Noor",
groom_name: "Mohammed",
bride_family_name: "Al zubiedi",
groom_family_name: "Ramadan",
invite_god_willing: "God willing, on Saturday",
date_line: "26 . 12 . 2026",

// Countdown
countdown_date: "26 December 2026",
countdown_title: "Until Our Celebration",
days: "Days",
hours: "Hours",
minutes: "Minutes",
seconds: "Seconds",

// Details
details_title: "Event Details",
details_subtitle: "Everything you need to know",

// Venue
venue_title: "Our Venue",
venue_name: "Sapphire Hotel",
venue_city: "9th Floor",

hall_name: "Sapphire Hotel",
hall_city: "9th Floor",
arrival_time: " ",
open_map: "Open in Maps",
add_calendar: "Add to Calendar",

// Program
program_title: "Event Program",
program_subtitle: " ",
program_reception: "Reception",
reception_time: "8:00 PM",
program_zaffa: "Bridal Entrance",
zaffa_time: "9:00 PM",
program_dinner: "Dinner",
dinner_time: "10:00 PM",
no_cameras: "No Photography",
no_kids: "Children are not permitted",
swipe_more: " ",

// Event Timeline
event_reception: "Reception",
event_reception_time: "8:00 PM",
event_wedding: "Wedding Ceremony",
event_wedding_time: "9:00 PM",
event_dinner: "Dinner",
event_dinner_time: "10:00 PM",
event_end: "End of Celebration",
event_end_time: "11:00 PM",

// RSVP
rsvp_title: "Personal Invitation",
rsvp_sub: "We would be honored by your presence",
rsvp_deadline: "We would be honored by your presence",

name_label: "Your Name",
name_placeholder: "Enter your name",
message_label: "Message to the Couple",
message_placeholder: "Write your wishes or message here…",
sending: "Sending…",
send_message: "Send Message",

welcome: "Welcome",
guest_count: "Number of Companions",
already_registered: "This device has already been registered",
error_try_again: "An error occurred, please try again",
see_you_next_time: "We hope to see you on another occasion",
save_qr_warning: "Please save this QR code. It is required for entry",
dont_scan_qr: "Please do not scan the QR code",

thanks_attending: "Thank you for confirming your attendance",
thanks_declined: "We appreciate your response",
redirect_wa: "Redirecting you to WhatsApp…",

// QR
qr_title: "Your Entry QR Code",
qr_sub: "Please present this QR code at the entrance",
save_qr: "Save QR Code",
redirecting_in: "Redirecting to WhatsApp in",
seconds_short: "s",

// Footer
made_by: " ",
store: "Ghaimah",
designer_name1: "Mohammed",
designer_and: "&",
designer_name2: "Noor",
tiktok: "@shim2t.TikTok",

// Calendar
date_full: "Saturday, December 26, 2026",
cal_day: "Saturday",
cal_month: "December",
cal_year: "2026",
guests_1: "1",
guests_2: "2",
guests_3: "3",
guests_4: "4",
guests_5: "5"
};

const dicts = { ar, en };

interface LangCtx {
  lang: Lang;
  t: (k: keyof typeof ar) => string;
  toggle: () => void;
  dir: "rtl" | "ltr";
}

const Ctx = createContext<LangCtx | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState(() => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("lang")
        : null;

    return saved === "en" || saved === "ar" ? saved : "ar";
  });

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const t = (k: keyof typeof ar) => dicts[lang][k] ?? k;

  const toggle = () => {
    setLang((l) => (l === "ar" ? "en" : "ar"));
  };

  return (
    <Ctx.Provider value={{ lang, t, toggle, dir }}>
      {children}
    </Ctx.Provider>
  );
};

export const useLang = () => {
  const c = useContext(Ctx);

  if (!c) {
    throw new Error("useLang must be inside LanguageProvider");
  }

  return c;
};
