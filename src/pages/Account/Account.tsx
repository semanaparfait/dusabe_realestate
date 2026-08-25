import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  House,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";
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
      await signInWithEmailAndPassword(auth, email.trim(), password);
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
    <div className="auth-page">
      <div className="auth-shell glass-panel">
        <div className="auth-visual">
          <div className="auth-visual-overlay" />

          <div className="auth-visual-topbar">
            <span className="auth-brand">DUSABE</span>
            <span className="auth-pill">Luxury Property Access</span>
          </div>

          <div className="auth-visual-content">
            <span className="auth-kicker text-6xl"  >Private client portal</span>
            <h1>Find the home that fits your future.</h1>
            <p>
              Sign in to manage appointments, save favourite homes, and receive
              tailored investment recommendations.
            </p>

            <div className="auth-trust-list">
              {trustPoints.map((point) => (
                <div key={point} className="auth-trust-item">
                  <CheckCircle2 size={16} />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="auth-highlight-grid">
            {highlights.map((item) => (
              <div key={item.label} className="auth-highlight-card">
                <strong>{item.label}</strong>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="auth-card-panel">
          <div className="auth-card-top">
            <div className="auth-logo-wrap">
              <div className="auth-logo-mark">
                <House size={18} />
              </div>
              <span>DUSABE</span>
            </div>
          </div>

          <div className="auth-form-wrap">
            <div className="auth-headline">
              <h2>Welcome back</h2>
              <p>Access your saved homes, documents and agent conversations.</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <label className="auth-field">
                <span>Email address</span>
                <div className="auth-input-wrap">
                  <Mail size={16} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </label>

              <label className="auth-field">
                <span>Password</span>
                <div className="auth-input-wrap">
                  <LockKeyhole size={16} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="auth-visibility-toggle"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </label>

              <div className="auth-row">
                <label className="auth-checkbox">
                  <input type="checkbox" defaultChecked />
                  <span>Keep me signed in</span>
                </label>

                <button type="button" className="auth-link-button">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="luxury-gold-button auth-submit-button"
              >
                Sign in
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="auth-divider">
              <span>or continue with</span>
            </div>

            {/* <div className="auth-socials">
              <button type="button" className="auth-social-button">
                <Facebook size={16} />
                Facebook
              </button>
              <button type="button" className="auth-social-button">
                <Sparkles size={16} />
                Google
              </button>
            </div> */}

            <div className="auth-footer-note">
              <ShieldCheck size={16} />
              <span>Secure access with bank-grade encryption.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
