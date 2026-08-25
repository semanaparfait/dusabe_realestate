import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  House,
  LockKeyhole,
  Mail,
  MoveLeft,
  ShieldCheck,
} from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "@/firebaseConfig";
import { db } from "@/firebaseConfig";
import { toast } from "react-toastify";

const trustPoints = [
  "Verified listings and agents",
  "Secure payments and escrow",
  "Private property alerts",
];

const highlights = [
  { label: "1.2K+", value: "Families matched" },
  { label: "98%", value: "Client satisfaction" },
  { label: "24/7", value: "Buyer support" },
];

export default function Account() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Email and password are required.", {
        position: "top-right",
      });
      return;
    }

    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      const userDocument = await getDoc(doc(db, "Users", user.uid));

      if (userDocument.data()?.role === "owner") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

      toast.success("Signed in successfully!", {
        position: "top-right",
      });
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message, {
        position: "top-right",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center px-4 py-6 sm:px-6 sm:py-14">
      <div className="grid min-h-[760px] w-full max-w-[1200px] overflow-hidden rounded-[22px] border border-white/10 bg-[rgba(15,23,22,0.78)] shadow-[0_24px_80px_rgba(0,0,0,0.35)] min-[641px]:rounded-[28px] min-[961px]:grid-cols-[1.15fr_0.85fr]">
        <div className="relative flex min-h-[420px] flex-col justify-between bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center px-5 py-7 min-[641px]:px-8 min-[961px]:min-h-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,24,22,0.12),rgba(15,24,22,0.7))]" />

          <div className="relative z-[1] flex items-center justify-between gap-3">
            <span className="text-[1.15rem] font-extrabold tracking-[0.35em] text-white flex items-center gap-2">
              <MoveLeft /> DUSABE
            </span>
            <span className="rounded-full border border-white/20 bg-white/12 px-3.5 py-2 text-[0.72rem] uppercase tracking-[0.08em] text-white">
              Luxury Property Access
            </span>
          </div>

          <div className="relative z-[1] mt-auto max-w-[520px] px-0 py-6 text-white min-[641px]:py-10">
            <span className="mb-3.5 inline-block text-[0.76rem] font-bold uppercase tracking-[0.24em] text-[var(--accent-gold)]">
              Private client portal
            </span>
            <h1 className="mb-[18px] text-[2.4rem] leading-[1.06] text-white min-[641px]:text-[clamp(2.4rem,3vw,4rem)]">
              Find the home that fits your future.
            </h1>
            <p className="max-w-[480px] text-[1.02rem] text-white/78">
              Sign in to manage appointments, save favourite homes, and receive
              tailored investment recommendations.
            </p>

            <div className="mt-[26px] flex flex-col gap-3.5">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-2.5 text-[0.96rem] text-white/90"
                >
                  <CheckCircle2
                    size={16}
                    className="text-[var(--accent-gold)]"
                  />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-[1] grid grid-cols-1 gap-[18px] min-[641px]:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-2 rounded-2xl border border-white/12 bg-white/8 px-3.5 py-[18px] text-white backdrop-blur-[10px]"
              >
                <strong className="text-2xl text-white">{item.label}</strong>
                <span className="text-[0.78rem] uppercase tracking-[0.08em] text-white/70">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col bg-[rgba(11,18,21,0.8)] px-5 py-[30px] min-[641px]:px-7">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2.5 text-[0.8rem] font-extrabold tracking-[0.18em] text-white">
              <div className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent-gold),var(--accent-gold-dark))] text-[#111]">
                <House size={18} />
              </div>
              <span>DUSABE</span>
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-center">
            <div className="mb-6">
              <h2 className="mb-2 text-[clamp(2rem,2.2vw,2.8rem)] text-white">
                Welcome back
              </h2>
              <p className="text-[0.95rem] text-white/72">
                Access your saved homes, documents and agent conversations.
              </p>
            </div>

            <form className="flex flex-col gap-[18px]" onSubmit={handleSubmit}>
              <label className="flex flex-col gap-2 text-[0.82rem] font-semibold text-white/80">
                <span>Email address</span>
                <div className="flex min-h-[52px] items-center gap-2.5 rounded-xl border border-white/8 bg-white/4 px-3.5 transition-colors focus-within:border-[rgba(200,122,83,0.9)] focus-within:bg-white/6">
                  <Mail size={16} className="text-white/54" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    className="h-full flex-1 border-0 bg-transparent font-inherit text-white outline-none placeholder:text-white/38"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </label>

              <label className="flex flex-col gap-2 text-[0.82rem] font-semibold text-white/80">
                <span>Password</span>
                <div className="flex min-h-[52px] items-center gap-2.5 rounded-xl border border-white/8 bg-white/4 px-3.5 transition-colors focus-within:border-[rgba(200,122,83,0.9)] focus-within:bg-white/6">
                  <LockKeyhole size={16} className="text-white/54" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    className="h-full flex-1 border-0 bg-transparent font-inherit text-white outline-none placeholder:text-white/38"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center justify-center border-0 bg-transparent p-1 text-white/70"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </label>

              <div className="mt-1 flex flex-col items-start justify-between gap-3 min-[641px]:flex-row min-[641px]:items-center">
                <label className="inline-flex items-center gap-2 text-[0.83rem] text-white/75">
                  <input
                    className="accent-[var(--accent-gold)]"
                    type="checkbox"
                    defaultChecked
                  />
                  <span>Keep me signed in</span>
                </label>

                <button
                  type="button"
                  className="cursor-pointer border-0 bg-transparent font-semibold text-[var(--accent-gold)]"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="mt-1.5 inline-flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg border-0 bg-[linear-gradient(135deg,var(--accent-gold),var(--accent-gold-dark))] px-7 py-3 font-[var(--font-heading)] font-semibold text-black shadow-[var(--glow-shadow)] transition hover:-translate-y-0.5 hover:brightness-110"
              >
                Sign in
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="relative my-[28px] text-center">
              <span className="absolute inset-x-0 top-1/2 h-px bg-white/8" />
              <span className="relative z-[1] inline-block bg-[rgba(11,18,21,0.8)] px-3 text-[0.75rem] uppercase tracking-[0.08em] text-white/60">
                or continue with
              </span>
            </div>

            <div className="mt-[22px] inline-flex items-center gap-2.5 rounded-xl border border-[rgba(200,122,83,0.18)] bg-[rgba(200,122,83,0.08)] px-3.5 py-3 text-[0.82rem] text-white/78">
              <ShieldCheck size={16} className="text-[var(--accent-gold)]" />
              <span>
                Your property documents and client details are protected.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
