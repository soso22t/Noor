import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Reveal from "./Reveal";
import { useLang } from "@/i18n/LanguageContext";
type State =
  | { kind: "form" }
  | { kind: "loading" }
  | { kind: "success"; name: string; status: "confirmed" | "declined" }
  | { kind: "error"; msg: string };
const RSVP = () => {
  const { t, lang } = useLang();
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"confirmed" | "declined" | "">("");
  const [state, setState] = useState<State>({ kind: "form" });
  useEffect(() => {
    const savedSubmission = localStorage.getItem("guest_message_sent");
    if (savedSubmission) {
      const data = JSON.parse(savedSubmission);
      setState({
        kind: "success",
        name: data.name,
        status: data.status || "confirmed",
      });
    }
  }, []);
  const submit = async () => {
    if (!name.trim() || !status) return;
    setState({ kind: "loading" });
    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSdKN7zeV3SoXNisF2gEw5X7JIEkUN5ETn7PJcAq2aP85G50OQ/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            "entry.280584690": name.trim(),
            "entry.196820683":
              status === "confirmed"
                ? "تأكيد الحضور"
                : "الاعتذار عن الحضور",
          }),
        }
      );
    } catch {
      setState({
        kind: "error",
        msg: t("error_try_again"),
      });
      return;
    }
    localStorage.setItem(
      "guest_message_sent",
      JSON.stringify({
        name: name.trim(),
        status,
      })
    );
    setState({
      kind: "success",
      name: name.trim(),
      status,
    });
  };
  // ===== Render states =====
  if (state.kind === "success") {
    return (
      <Reveal>
        <div
          className="mx-auto max-w-md rounded-2xl p-8 text-center"
          style={{
            background: "#FFFFFF",
            border: "1px solid #E7D8B7",
            boxShadow: "0 12px 30px rgba(166,124,46,.12)",
          }}
        >
          <Heart
            className="mx-auto w-10 h-10 mb-4"
            style={{
              color: "#A67C2E",
              fill: "#A67C2E",
            }}
          />
          {state.status === "confirmed" ? (
            <>
              <div
                className="font-arabic text-2xl mb-4"
                style={{
                  color: "#2F2A24",
                  fontWeight: 700,
                }}
              >
                أهلًا وسهلًا
              </div>
              <p
                className="font-arabic text-xl leading-loose"
                style={{ color: "#2F2A24" }}
              >
                <span
                  style={{
                    color: "#A67C2E",
                    fontWeight: 700,
                  }}
                >
                  {state.name}
                </span>
                <br />
                يشرفنا حضورك
              </p>
            </>
          ) : (
            <>
              <div
                className="font-arabic text-2xl mb-4"
                style={{
                  color: "#2F2A24",
                  fontWeight: 700,
                }}
              >
                نقدر اعتذارك
              </div>
              <p
                className="font-arabic text-xl leading-loose"
                style={{ color: "#2F2A24" }}
              >
                يا{" "}
                <span
                  style={{
                    color: "#A67C2E",
                    fontWeight: 700,
                  }}
                >
                  {state.name}
                </span>
              </p>
            </>
          )}
        </div>
      </Reveal>
    );
  }
  // Form
  return (
    <Reveal>
      <div
        className="mx-auto max-w-md rounded-2xl p-6 text-center"
        style={{
          background: "#FFFFFF",
          border: "1px solid #E7D8B7",
          boxShadow: "0 12px 30px rgba(166,124,46,.12)",
        }}
      >
        {/* الاسم */}
        <div className="mb-5 text-right">
          <label
            className="block font-arabic text-sm mb-2"
            style={{ color: "#2F2A24" }}
          >
            الاسم الكريم
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
            placeholder="اكتب اسمك الكريم"
            className="w-full px-4 py-3 rounded-xl font-arabic text-right outline-none transition-all focus:border-[#A67C2E]"
            style={{
              background: "#FCFBF8",
              border: "1px solid #E7D8B7",
              color: "#2F2A24",
            }}
            dir={lang === "ar" ? "rtl" : "ltr"}
          />
        </div>
        {/* حالة الحضور */}
        <div className="mb-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setStatus("confirmed")}
            className="py-3 rounded-xl font-arabic text-sm transition-all"
            style={{
              background:
                status === "confirmed" ? "#C8A96A" : "#FCFBF8",
              color:
                status === "confirmed" ? "#FFFFFF" : "#2F2A24",
              border: "1px solid #E7D8B7",
              fontWeight: 600,
            }}
          >
            تأكيد الحضور
          </button>
          <button
            type="button"
            onClick={() => setStatus("declined")}
            className="py-3 rounded-xl font-arabic text-sm transition-all"
            style={{
              background:
                status === "declined" ? "#C8A96A" : "#FCFBF8",
              color:
                status === "declined" ? "#FFFFFF" : "#2F2A24",
              border: "1px solid #E7D8B7",
              fontWeight: 600,
            }}
          >
            الاعتذار عن الحضور
          </button>
        </div>
        {/* زر الإرسال */}
        <button
          onClick={submit}
          disabled={
            !name.trim() ||
            !status ||
            state.kind === "loading"
          }
          className="w-full py-3 rounded-xl font-arabic text-base transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
          style={{
            background: "#C8A96A",
            color: "#FFFFFF",
            boxShadow: "0 4px 18px rgba(200,169,106,.2)",
            fontWeight: 700,
          }}
        >
          {state.kind === "loading" ? "جاري الإرسال..." : "إرسال"}
        </button>
        {state.kind === "error" && (
          <p
            className="font-arabic text-sm text-center mt-3"
            style={{ color: "hsl(0 70% 45%)" }}
          >
            {state.msg}
          </p>
        )}
      </div>
    </Reveal>
  );
};
export default RSVP;
