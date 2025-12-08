import React, { useEffect, useMemo } from "react";

const evzStyles = `
:root {
  --evz-primary: #03cd8c;
  --evz-accent: #f77f00;
  --evz-bg: #ffffff;
  --evz-surface-soft: #f2f2f2;
  --evz-text-primary: #111827;
  --evz-text-secondary: #6b7280;
  --evz-border-subtle: rgba(15, 23, 42, 0.08);
}

body {
  margin: 0;
  padding: 0;
  background: var(--evz-bg);
}

.evz-app {
  min-height: 100vh;
  background: var(--evz-bg);
  display: flex;
  justify-content: center;
  align-items: stretch;
  color: var(--evz-text-primary);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Inter", "SF Pro Text", sans-serif;
}

.evz-screen {
  width: 100%;
  max-width: 420px;
  min-height: 100vh;
  padding: 24px 20px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.evz-header {
  padding-bottom: 10px;
}

.evz-header-title {
  font-size: 22px;
  font-weight: 800;
  margin: 0 0 4px;
}

.evz-header-subtitle {
  font-size: 13px;
  color: var(--evz-text-secondary);
  margin: 0;
}

.evz-card {
  border-radius: 16px;
  background-color: var(--evz-surface-soft);
  padding: 12px 14px;
}

.evz-card-danger {
  border-radius: 16px;
  background-color: #fff7f0;
  border: 1px solid var(--evz-accent);
  padding: 12px 14px;
  margin-top: 16px;
}

.evz-row-actions {
  display: flex;
  gap: 8px;
}

.evz-btn-primary,
.evz-btn-secondary {
  flex: 1;
  border-radius: 999px;
  padding: 11px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.evz-btn-primary {
  border: none;
  background-color: var(--evz-accent);
  color: #ffffff;
  box-shadow: 0 10px 22px rgba(247, 127, 0, 0.32);
}

.evz-btn-primary:active {
  transform: translateY(1px);
  box-shadow: 0 6px 14px rgba(247, 127, 0, 0.28);
}

.evz-btn-secondary {
  border: 1px solid #a6a6a6;
  background-color: #ffffff;
  color: var(--evz-text-primary);
}

.evz-btn-secondary:hover {
  background-color: #f9fafb;
}

.evz-danger-title {
  font-size: 13px;
  font-weight: 800;
}

.evz-danger-body {
  margin-top: 2px;
  font-size: 12px;
  color: var(--evz-text-secondary);
}

.evz-danger-link {
  margin-top: 6px;
  border: none;
  background: none;
  padding: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--evz-accent);
  cursor: pointer;
}

.evz-danger-link:hover {
  text-decoration: underline;
}

.evz-footer {
  margin-top: auto;
  padding-top: 24px;
}

.evz-footer-link {
  width: 100%;
  border-radius: 999px;
  border: none;
  background: none;
  padding: 11px 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--evz-accent);
  cursor: pointer;
}

.evz-footer-link:hover {
  text-decoration: underline;
}

/* Responsive styles for 320px - 420px range */
@media (max-width: 420px) {
  .evz-screen {
    max-width: 100%;
    padding: 20px 16px 16px;
  }
  
  .evz-header-title {
    font-size: 20px;
  }
  
  .evz-header-subtitle {
    font-size: 12px;
  }
}

@media (max-width: 370px) {
  .evz-screen {
    padding: 18px 14px 14px;
  }
  
  .evz-header-title {
    font-size: 19px;
  }
  
  .evz-header-subtitle {
    font-size: 11px;
  }
}

@media (max-width: 360px) {
  .evz-screen {
    padding: 16px 12px 12px;
  }
  
  .evz-header-title {
    font-size: 18px;
  }
  
  .evz-header-subtitle {
    font-size: 11px;
  }
}

@media (max-width: 340px) {
  .evz-screen {
    padding: 16px 10px 10px;
  }
  
  .evz-header-title {
    font-size: 17px;
  }
  
  .evz-header-subtitle {
    font-size: 10px;
  }
}

@media (max-width: 320px) {
  .evz-screen {
    padding: 14px 8px 8px;
  }
  
  .evz-header-title {
    font-size: 16px;
  }
  
  .evz-header-subtitle {
    font-size: 10px;
  }
}
  
  .evz-header-title {
    font-size: 16px;
  }
  
  .evz-header-subtitle {
    font-size: 10px;
  }
}
`;

function useEvzStyles(): void {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "evz-mobile-styles-p15-s03";
    // Remove existing style element if it exists
    const existing = document.getElementById(styleId);
    if (existing) {
      existing.remove();
    }
    
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = evzStyles;
    document.head.appendChild(style);
    
    // Cleanup: remove styles when component unmounts
    return () => {
      const styleEl = document.getElementById(styleId);
      if (styleEl) {
        styleEl.remove();
      }
    };
  }, []);
}

function EvzScreen({ children }: any): JSX.Element {
  return (
    <div className="evz-app">
      <div className="evz-screen">{children}</div>
    </div>
  );
}

const SESS_KEY = "evz.swap.sessions";

function safeLocalStorage(): void {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getJSON(key, fallback = []) {
  const ls = safeLocalStorage();
  if (!ls) return fallback;
  try {
    const raw = ls.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setJSON(key, value) {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function downloadPDF(filename, rows) {
  try {
    if (rows.length === 0) {
      alert("No swap history to download.");
      return;
    }

    // Create HTML content for PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>EVZ Swap History</title>
          <style>
            @media print {
              @page {
                margin: 1cm;
              }
            }
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #111827;
              margin: 0;
            }
            h1 {
              color: #111827;
              font-size: 24px;
              margin-bottom: 10px;
            }
            .meta {
              color: #6b7280;
              font-size: 12px;
              margin-bottom: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
              font-size: 11px;
            }
            th, td {
              border: 1px solid #d1d5db;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f3f4f6;
              font-weight: 600;
              color: #111827;
            }
            tr:nth-child(even) {
              background-color: #f9fafb;
            }
            .footer {
              margin-top: 30px;
              font-size: 11px;
              color: #6b7280;
              text-align: center;
              border-top: 1px solid #e5e7eb;
              padding-top: 10px;
            }
          </style>
        </head>
        <body>
          <h1>EVZ Swap History</h1>
          <div class="meta">Generated on: ${new Date().toLocaleString()}</div>
          <table>
            <thead>
              <tr>
                <th>Reservation ID</th>
                <th>Date & Time</th>
                <th>Station</th>
                <th>Area</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Total (UGX)</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map((r) => `
                <tr>
                  <td>${(r.reservationId || "—").toString()}</td>
                  <td>${r.when ? new Date(r.when).toLocaleString() : "—"}</td>
                  <td>${(r.stationName || "—").toString()}</td>
                  <td>${(r.stationArea || "—").toString()}</td>
                  <td>${r.type === "self" ? "Self-service" : r.type === "operator" ? "Operator" : (r.type || "—").toString()}</td>
                  <td>${r.durationMs ? `${Math.floor(r.durationMs / 60000)} min` : "—"}</td>
                  <td>${r.totalUGX ? Number(r.totalUGX).toLocaleString("en-UG") : "—"}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          <div class="footer">
            Total sessions: ${rows.length}
          </div>
        </body>
      </html>
    `;

    // Create a blob with HTML content
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    
    // Open in new window and trigger print (which allows saving as PDF)
    const printWindow = window.open(url, "_blank");
    if (printWindow) {
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          // Clean up after a delay
          setTimeout(() => {
            URL.revokeObjectURL(url);
          }, 1000);
        }, 250);
      };
    } else {
      // Fallback: download as HTML file (user can convert to PDF manually)
      const a = document.createElement("a");
      a.href = url;
      a.download = filename.replace(".pdf", ".html");
      a.click();
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
    }
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Error generating PDF. Please try again.");
  }
}

function downloadCSV(filename, rows) {
  try {
    const header = [
      "reservationId",
      "whenISO",
      "stationName",
      "stationArea",
      "type",
      "durationMs",
      "totalUGX",
      "holdMinutes",
      "feeUGX",
    ];
    const csv = [
      header.join(","),
      ...rows.map((r) =>
        [
          r.reservationId || "",
          r.when ? new Date(r.when).toISOString() : "",
          JSON.stringify(r.stationName || ""),
          JSON.stringify(r.stationArea || ""),
          r.type || "",
          r.durationMs || 0,
          r.totalUGX || 0,
          r.holdMinutes || 0,
          r.feeUGX || 0,
        ].join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  } catch {
    // ignore
  }
}

export default function ExportHistoryScreen(): JSX.Element {
  useEvzStyles();

  const rows = useMemo(() => getJSON(SESS_KEY, []), []);

  const handleClear = (): void => {
    setJSON(SESS_KEY, []);
  };

  const handleBack = (): void => {
    if (typeof window !== "undefined") {
      window.location.assign("/history");
    }
  };

  return (
    <EvzScreen>
      <header className="evz-header">
        <h1 className="evz-header-title">Export history</h1>
        <p className="evz-header-subtitle">
          Download or clear saved sessions
        </p>
      </header>

      <main>
        <section className="evz-card">
          <div className="evz-row-actions">
            <button
              type="button"
              className="evz-btn-primary"
              onClick={() => downloadCSV("EVZ-swap-history.csv", rows)}
            >
              Download CSV
            </button>
            <button
              type="button"
              className="evz-btn-secondary"
              onClick={() => downloadPDF("EVZ-swap-history.pdf", rows)}
            >
              Download PDF
            </button>
          </div>
        </section>

        <section className="evz-card-danger">
          <div className="evz-danger-title">Danger zone</div>
          <div className="evz-danger-body">
            Clearing history removes saved sessions from this device only.
          </div>
          <button
            type="button"
            className="evz-danger-link"
            onClick={handleClear}
          >
            Clear saved history
          </button>
        </section>
      </main>

      <footer className="evz-footer">
        <button
          type="button"
          className="evz-footer-link"
          onClick={handleBack}
        >
          Back to history
        </button>
      </footer>
    </EvzScreen>
  );
}
