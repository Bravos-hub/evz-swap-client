import React, { useEffect, useState } from "react";

const evzSwapRatingStyles = `
:root {
  --evz-primary: #03cd8c;
  --evz-accent: #f77f00;
  --evz-bg: #f5f7fb;
  --evz-surface: #ffffff;
  --evz-text-primary: #111827;
  --evz-text-secondary: #6b7280;
}

body {
  margin: 0;
  padding: 0;
  background: var(--evz-bg);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Inter",
    "SF Pro Text", sans-serif;
}

.evz-app {
  min-height: 100vh;
  background: var(--evz-bg);
  display: flex;
  justify-content: center;
  align-items: stretch;
}

.evz-screen {
  width: 100%;
  max-width: 430px;
  min-height: 100vh;
  padding: 24px 20px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.evz-header {
  padding-bottom: 8px;
}

.evz-header-title {
  font-size: 20px;
  font-weight: 800;
  margin: 0;
}

.evz-header-subtitle {
  font-size: 13px;
  color: var(--evz-text-secondary);
  margin: 4px 0 0;
}

.evz-content {
  flex: 1;
  padding-top: 16px;
  padding-bottom: 10px;
}

.evz-success-pill {
  width: 72px;
  height: 72px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 20%, #ffffff 0, #ffedd5 40%, #fed7aa 70%, #f97316 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 16px 40px rgba(247, 127, 0, 0.45);
  margin: 0 auto 12px;
}

.evz-success-check {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--evz-primary);
  font-size: 24px;
}

.evz-success-heading {
  text-align: center;
  font-size: 18px;
  font-weight: 800;
  margin: 0 0 4px;
}

.evz-success-body {
  text-align: center;
  font-size: 13px;
  color: var(--evz-text-secondary);
  margin: 0 0 16px;
}

.evz-rating-block {
  margin-top: 8px;
  padding: 14px 16px;
  border-radius: 16px;
  background: var(--evz-surface);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
}

.evz-rating-label {
  font-size: 13px;
  font-weight: 600;
  margin: 0 0 8px;
}

.evz-stars {
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
}

.evz-star-button {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: none;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.16s ease, transform 0.12s ease, box-shadow 0.16s ease;
  font-size: 18px;
}

.evz-star-button--active {
  background: var(--evz-accent);
  color: #ffffff;
  box-shadow: 0 8px 20px rgba(247, 127, 0, 0.55);
  transform: translateY(-1px);
}

.evz-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}

.evz-tag {
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  padding: 4px 10px;
  font-size: 11px;
  color: var(--evz-text-secondary);
  background: #f9fafb;
  cursor: pointer;
  transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease;
}

.evz-tag--active {
  border-color: var(--evz-primary);
  background: rgba(3, 205, 140, 0.1);
  color: #065f46;
}

.evz-feedback-field {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.evz-feedback-label {
  font-size: 12px;
  color: var(--evz-text-secondary);
}

.evz-feedback-textarea {
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 8px 10px;
  font-size: 13px;
  min-height: 72px;
  resize: vertical;
  font-family: inherit;
}

.evz-subtle-note {
  margin-top: 6px;
  font-size: 11px;
  color: var(--evz-text-secondary);
}

.evz-footer {
  padding-top: 12px;
}

.evz-primary-cta {
  width: 100%;
  border: none;
  border-radius: 999px;
  padding: 12px 16px;
  background: var(--evz-accent);
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(247, 127, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.evz-primary-cta:disabled {
  opacity: 0.55;
  box-shadow: none;
  cursor: default;
}

.evz-secondary-link {
  margin-top: 8px;
  width: 100%;
  border: none;
  background: transparent;
  color: var(--evz-text-secondary);
  font-size: 13px;
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
}
`;

function useEvzSwapRatingStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("evz-swap-rating-styles")) return;
    const style = document.createElement("style");
    style.id = "evz-swap-rating-styles";
    style.innerHTML = evzSwapRatingStyles;
    document.head.appendChild(style);
  }, []);
}

function EvzScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="evz-app">
      <div className="evz-screen">{children}</div>
    </div>
  );
}

const TAGS = [
  "Fast service",
  "Friendly operator",
  "Easy process",
  "Clean station",
  "Good battery health",
];

interface SwapCompletedRatingProps {
  stationName?: string;
}

const P07S03SwapCompletedRating: React.FC<SwapCompletedRatingProps> = ({
  stationName = "Station name",
}) => {
  useEvzSwapRatingStyles();

  const [rating, setRating] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((t) => t !== tag)
        : [...current, tag]
    );
  };

  const handleSubmit = () => {
    if (!rating) return;
    // Hook into your analytics / API here
    if (typeof window !== "undefined") {
      console.log("Swap rating submitted", { rating, selectedTags, feedback });
    }
    setSubmitted(true);
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Swap completed</h1>
        <p className="evz-header-subtitle">{stationName}</p>
      </header>

      <main className="evz-content">
        <div className="evz-success-pill">
          <div className="evz-success-check">✓</div>
        </div>
        <p className="evz-success-heading">How was your swap?</p>
        <p className="evz-success-body">
          Rate your experience so we can keep improving EVzone swaps.
        </p>

        <section className="evz-rating-block">
          <p className="evz-rating-label">Rate the operator</p>
          <div className="evz-stars">
            {[1, 2, 3, 4, 5].map((value) => {
              const active = value <= rating;
              return (
                <button
                  key={value}
                  type="button"
                  className={
                    "evz-star-button" + (active ? " evz-star-button--active" : "")
                  }
                  onClick={() => setRating(value)}
                  aria-label={`${value} star${value > 1 ? "s" : ""}`}
                >
                  ★
                </button>
              );
            })}
          </div>

          <div className="evz-tags">
            {TAGS.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  className={"evz-tag" + (active ? " evz-tag--active" : "")}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          <div className="evz-feedback-field">
            <label className="evz-feedback-label" htmlFor="evz-swap-feedback">
              Anything to add? (optional)
            </label>
            <textarea
              id="evz-swap-feedback"
              className="evz-feedback-textarea"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share a quick note for the EVzone team..."
            />
          </div>

          <p className="evz-subtle-note">
            Your feedback helps us improve station quality and operator training.
          </p>
        </section>
      </main>

      <footer className="evz-footer">
        <button
          type="button"
          className="evz-primary-cta"
          disabled={!rating || submitted}
          onClick={handleSubmit}
        >
          {submitted ? "Thank you for rating" : "Submit rating"}
        </button>
        <button
          type="button"
          className="evz-secondary-link"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.location.assign("/dashboard");
            }
          }}
        >
          Skip for now
        </button>
      </footer>
    </EvzScreen>
  );
};

export default P07S03SwapCompletedRating;

/**
 * Manual test cases:
 * 1) Initial load: no star selected → primary CTA disabled.
 * 2) Tap 3rd star → stars 1–3 become orange, CTA enabled.
 * 3) Tap tags (Fast service, Friendly operator, etc.) → they toggle green pill
 *    styles; multiple tags can be active.
 * 4) Enter text in feedback → state updates; submit logs rating + tags +
 *    feedback to console and CTA label changes to "Thank you for rating"
 *    while staying disabled.
 * 5) Tap "Skip for now" → navigates to /dashboard (can be wired to home in app).
 * 6) Mobile viewport 360x780: no horizontal scroll; success pill, rating block
 *    and CTA all fit comfortably.
 */
