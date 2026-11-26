import { useState } from "react";

const BG_OPTIONS = [
  { name: "Pure White", color: "#ffffff", textColor: "#111827" },
  { name: "Studio Blue", color: "#1d4ed8", textColor: "#ffffff" },
  { name: "Soft Sky", color: "#bae6fd", textColor: "#0f172a" },
  { name: "Warm Gray", color: "#e5e7eb", textColor: "#111827" },
];

const QUICK_PROMPTS = [
  {
    title: "Passport Studio Retouch",
    prompt:
      "Clean studio portrait, remove pimples and harsh shadows, smooth natural skin texture, balanced brightness, sharp focus, centered head alignment, solid studio background.",
  },
  {
    title: "Formal Attire Conversion",
    prompt:
      "Convert casual outfit into a clean formal suit with tie and crisp white shirt, natural lighting, realistic fabric texture, keep original facial identity.",
  },
  {
    title: "Traditional Panjabi Look",
    prompt:
      "Convert casual clothing into an elegant traditional panjabi with clean studio lighting, natural fabric folds, balanced colors, keep facial identity and expression unchanged.",
  },
  {
    title: "Old Photo Restoration",
    prompt:
      "Restore vintage damaged photograph, remove scratches, dust, and blur, enhance facial clarity and natural tones while preserving authentic details.",
  },
  {
    title: "Banner, Jersey & Print Layout",
    prompt:
      "High-resolution commercial print layout, crisp typography, balanced CMYK-ready colors, clean edges, studio lighting, isolated composition.",
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("studio");
  const [imageUrl, setImageUrl] = useState("");
  const [bgIndex, setBgIndex] = useState(0);
  const [aspectRatio, setAspectRatio] = useState("35 / 45");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [copiedTitle, setCopiedTitle] = useState("");
  const [artworksCount, setArtworksCount] = useState(4);
  const [downloading, setDownloading] = useState(false);

  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: "ai",
      text: "স্বাগতম AI Universe Pro-তে! আপনার ছবি বা ডিজাইনের ধরন লিখুন—আমি মুহূর্তেই স্টুডিও প্রম্পট সাজিয়ে দিচ্ছি।",
      time: "0.8s",
    },
  ]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);
    setArtworksCount((prev) => prev + 1);
  };

  const handleDownloadPreview = () => {
    if (!imageUrl) return;
    setDownloading(true);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const isSquare = aspectRatio === "1 / 1";
      const canvasWidth = isSquare ? 900 : 700;
      const canvasHeight = 900;

      const canvas = document.createElement("canvas");
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = BG_OPTIONS[bgIndex].color;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

      const imgRatio = img.width / img.height;
      const canvasRatio = canvasWidth / canvasHeight;
      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        drawHeight = canvasHeight;
        drawWidth = img.width * (canvasHeight / img.height);
        offsetX = (canvasWidth - drawWidth) / 2;
      } else {
        drawWidth = canvasWidth;
        drawHeight = img.height * (canvasWidth / img.width);
        offsetY = (canvasHeight - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      const link = document.createElement("a");
      link.download = `ai-universe-studio-${isSquare ? "1x1" : "35x45"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setDownloading(false);
    };
    img.onerror = () => setDownloading(false);
    img.src = imageUrl;
  };

  const handleCopy = async (item) => {
    try {
      await navigator.clipboard.writeText(item.prompt);
      setCopiedTitle(item.title);
      setTimeout(() => setCopiedTitle(""), 1800);
    } catch {
      setCopiedTitle("");
    }
  };

  const handleChatSend = (e) => {
    e.preventDefault();
    const trimmed = chatInput.trim();
    if (!trimmed) return;

    const generatedPrompt = `Ultra-detailed commercial studio output for "${trimmed}", sharp focus, balanced studio lighting, clean composition, high resolution 4K, print-ready finish.`;

    setChatHistory((prev) => [
      ...prev,
      { role: "user", text: trimmed },
      {
        role: "ai",
        text: `তৈরি প্রম্পট: ${generatedPrompt}`,
        time: "0.8s",
        copyable: generatedPrompt,
      },
    ]);
    setChatInput("");
  };

  const currentBg = BG_OPTIONS[bgIndex];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 80% 10%, rgba(56, 189, 248, 0.14), transparent 35%), radial-gradient(circle at 15% 20%, rgba(139, 92, 246, 0.16), transparent 40%), #070b14",
        color: "#f8fafc",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "24px",
      }}
    >
      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>

      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "14px",
            marginBottom: "24px",
            paddingBottom: "16px",
            borderBottom: "1px solid rgba(148, 163, 184, 0.16)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #38bdf8, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(99, 102, 241, 0.45)",
                fontWeight: 800,
                fontSize: "16px",
              }}
            >
              AI
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: "22px", letterSpacing: "0.2px" }}>
                AI Universe Pro
              </h1>
              <p style={{ margin: "2px 0 0", color: "#94a3b8", fontSize: "13px" }}>
                Universe Chat & Virtual Image Studio
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              background: "#0f172a",
              padding: "4px",
              borderRadius: "10px",
              border: "1px solid #1e293b",
              gap: "4px",
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab("studio")}
              style={{
                padding: "8px 14px",
                borderRadius: "8px",
                border: "none",
                background:
                  activeTab === "studio"
                    ? "linear-gradient(135deg, #2563eb, #7c3aed)"
                    : "transparent",
                color: "#fff",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              Image Studio
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("chat")}
              style={{
                padding: "8px 14px",
                borderRadius: "8px",
                border: "none",
                background:
                  activeTab === "chat"
                    ? "linear-gradient(135deg, #2563eb, #7c3aed)"
                    : "transparent",
                color: "#fff",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              Universe Chat
            </button>
          </div>

          <label
            style={{
              background: "linear-gradient(135deg, #0284c7, #2563eb)",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "13px",
              boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
            }}
          >
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>
        </header>

        <section
          style={{
            position: "relative",
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(17, 24, 39, 0.85))",
            border: "1px solid rgba(99, 102, 241, 0.25)",
            borderRadius: "16px",
            padding: "20px 24px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
            overflow: "hidden",
          }}
        >
          <div
            onClick={() => setActiveTab("chat")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "rgba(15, 23, 42, 0.9)",
              border: "1px solid rgba(139, 92, 246, 0.4)",
              borderRadius: "14px",
              padding: "12px 16px",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(139, 92, 246, 0.15)",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #a855f7, #6366f1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              ✦
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "14px" }}>Universe Chat</div>
              <div style={{ fontSize: "12px", color: "#a5b4fc" }}>Answer ready in 0.8s</div>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              width: "120px",
              height: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "112px",
                height: "44px",
                borderRadius: "50%",
                border: "2px solid rgba(56, 189, 248, 0.75)",
                boxShadow: "0 0 14px rgba(56, 189, 248, 0.5)",
                animation: "spinSlow 10s linear infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "112px",
                height: "44px",
                borderRadius: "50%",
                border: "2px solid rgba(168, 85, 247, 0.75)",
                boxShadow: "0 0 14px rgba(168, 85, 247, 0.5)",
                animation: "spinReverse 8s linear infinite",
              }}
            />
            <div
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, #ffffff 0%, #38bdf8 40%, #7c3aed 85%, transparent 100%)",
                boxShadow: "0 0 30px #38bdf8, 0 0 50px #8b5cf6",
              }}
            />
          </div>

          <div
            onClick={() => setActiveTab("studio")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "rgba(15, 23, 42, 0.9)",
              border: "1px solid rgba(56, 189, 248, 0.4)",
              borderRadius: "14px",
              padding: "12px 16px",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(56, 189, 248, 0.15)",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #06b6d4, #0284c7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              ▣
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "14px" }}>Image Studio</div>
              <div style={{ fontSize: "12px", color: "#7dd3fc" }}>
                {artworksCount} artworks generated
              </div>
            </div>
          </div>
        </section>

        {activeTab === "studio" ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
              gap: "24px",
            }}
          >
            <section
              style={{
                background: "rgba(17, 24, 39, 0.9)",
                border: "1px solid #1f2937",
                borderRadius: "14px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <h2 style={{ margin: 0, fontSize: "18px" }}>Virtual Studio Preview</h2>
                <button
                  type="button"
                  onClick={handleDownloadPreview}
                  disabled={!imageUrl || downloading}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    border: "none",
                    background: imageUrl
                      ? "linear-gradient(135deg, #10b981, #059669)"
                      : "#1e293b",
                    color: imageUrl ? "#fff" : "#64748b",
                    cursor: imageUrl ? "pointer" : "not-allowed",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  {downloading ? "Saving..." : "Download PNG"}
                </button>
              </div>

              <div
                style={{
                  width: "260px",
                  aspectRatio,
                  margin: "16px auto",
                  backgroundColor: currentBg.color,
                  borderRadius: "10px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #374151",
                }}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                    }}
                  />
                ) : (
                  <span
                    style={{
                      color: currentBg.textColor,
                      fontSize: "13px",
                      padding: "12px",
                      textAlign: "center",
                      fontWeight: 600,
                    }}
                  >
                    {currentBg.name} Canvas
                    <br />
                    Upload a photo to test
                  </span>
                )}
              </div>

              <div style={{ marginTop: "16px" }}>
                <div style={{ fontSize: "13px", color: "#cbd5e1", marginBottom: "8px" }}>
                  Background Tone
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {BG_OPTIONS.map((bg, idx) => (
                    <button
                      key={bg.name}
                      type="button"
                      onClick={() => setBgIndex(idx)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        border: bgIndex === idx ? "2px solid #38bdf8" : "1px solid #334155",
                        background: "#1e293b",
                        color: "#f8fafc",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                    >
                      {bg.name}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "14px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={() => setAspectRatio("35 / 45")}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: aspectRatio === "35 / 45" ? "2px solid #38bdf8" : "1px solid #334155",
                    background: "#1e293b",
                    color: "#f8fafc",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  Passport (35×45)
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio("1 / 1")}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: aspectRatio === "1 / 1" ? "2px solid #38bdf8" : "1px solid #334155",
                    background: "#1e293b",
                    color: "#f8fafc",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  Square (1:1)
                </button>
              </div>

              <div style={{ marginTop: "16px", display: "grid", gap: "10px" }}>
                <label style={{ fontSize: "12px", color: "#cbd5e1" }}>
                  Brightness: {brightness}%
                  <input
                    type="range"
                    min="70"
                    max="130"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    style={{ width: "100%" }}
                  />
                </label>
                <label style={{ fontSize: "12px", color: "#cbd5e1" }}>
                  Contrast: {contrast}%
                  <input
                    type="range"
                    min="70"
                    max="130"
                    value={contrast}
                    onChange={(e) => setContrast(Number(e.target.value))}
                    style={{ width: "100%" }}
                  />
                </label>
              </div>
            </section>

            <section
              style={{
                background: "rgba(17, 24, 39, 0.9)",
                border: "1px solid #1f2937",
                borderRadius: "14px",
                padding: "20px",
              }}
            >
              <h2 style={{ marginTop: 0, fontSize: "18px" }}>Quick Studio Prompts</h2>
              <div style={{ display: "grid", gap: "12px" }}>
                {QUICK_PROMPTS.map((item) => (
                  <div
                    key={item.title}
                    style={{
                      background: "#0f172a",
                      border: "1px solid #1e293b",
                      borderRadius: "10px",
                      padding: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "6px",
                      }}
                    >
                      <strong style={{ fontSize: "14px" }}>{item.title}</strong>
                      <button
                        type="button"
                        onClick={() => handleCopy(item)}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "6px",
                          border: "1px solid #334155",
                          background: "#1e293b",
                          color: "#7dd3fc",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        {copiedTitle === item.title ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8", lineHeight: 1.5 }}>
                      {item.prompt}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <section
            style={{
              background: "rgba(17, 24, 39, 0.9)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "14px",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "14px",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "18px" }}>Universe Chat — Prompt Assistant</h2>
              <span style={{ fontSize: "12px", color: "#a5b4fc" }}>Answer ready in 0.8s</span>
            </div>

            <div
              style={{
                display: "grid",
                gap: "10px",
                maxHeight: "320px",
                overflowY: "auto",
                marginBottom: "14px",
                padding: "12px",
                background: "#0b0f19",
                borderRadius: "10px",
                border: "1px solid #1e293b",
              }}
            >
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: msg.role === "user" ? "end" : "start",
                    background: msg.role === "user" ? "#1d4ed8" : "#1e293b",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    fontSize: "13px",
                    lineHeight: 1.5,
                  }}
                >
                  <div>{msg.text}</div>
                  {msg.copyable && (
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy({ title: `chat-${idx}`, prompt: msg.copyable })
                      }
                      style={{
                        marginTop: "6px",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        border: "1px solid #475569",
                        background: "#0f172a",
                        color: "#7dd3fc",
                        cursor: "pointer",
                        fontSize: "11px",
                      }}
                    >
                      {copiedTitle === `chat-${idx}` ? "Copied!" : "Copy Prompt"}
                    </button>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleChatSend} style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="যেমন: পাসপোর্ট ছবির ব্যাকগ্রাউন্ড নীল ও ফরমাল কোট..."
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #334155",
                  background: "#0f172a",
                  color: "#f8fafc",
                  fontSize: "13px",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "10px 18px",
                  borderRadius: "8px",
                  border: "none",
                  background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                Generate Prompt
              </button>
            </form>
          </section>
        )}
      </div>
    </div>
  );
}