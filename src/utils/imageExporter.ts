/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ImageStylePreset {
  id: string;
  name: Record<string, string>;
  background: {
    stops: { offset: number; color: string }[];
    type: "linear" | "radial";
  };
  frameColor: string;
  frameInnerColor: string;
  glowColor: string;
  textColor: string;
  quoteColor: string;
  citationColor: string;
  fontFamily: string;
}

export const EXPORT_IMAGE_THEMES: ImageStylePreset[] = [
  {
    id: "cosmic",
    name: { fr: "Aube Cosmique", en: "Cosmic Dawn", es: "Amanecer Cósmico", sw: "Alfajiri ya Ango", rw: "Umuseso" },
    background: {
      type: "linear",
      stops: [
        { offset: 0, color: "#0f172a" }, // slate-900
        { offset: 0.5, color: "#1e1b4b" }, // indigo-950
        { offset: 1, color: "#311042" } // dark plum purple
      ]
    },
    frameColor: "rgba(224, 200, 150, 0.25)",
    frameInnerColor: "rgba(224, 200, 150, 0.4)",
    glowColor: "rgba(99, 102, 241, 0.15)",
    textColor: "#f8fafc",
    quoteColor: "rgba(224, 200, 150, 0.15)",
    citationColor: "#f59e0b",
    fontFamily: "'Georgia', serif"
  },
  {
    id: "emerald",
    name: { fr: "Grâce d'Émeraude", en: "Emerald Grace", es: "Gracia de Esmeralda", sw: "Neema ya Zumaridi", rw: "Ubuntu bw'Emerodi" },
    background: {
      type: "linear",
      stops: [
        { offset: 0, color: "#022c22" }, // emerald-950
        { offset: 0.6, color: "#064e3b" }, // emerald-900
        { offset: 1, color: "#115e59" } // teal-800
      ]
    },
    frameColor: "rgba(167, 243, 208, 0.2)",
    frameInnerColor: "rgba(52, 211, 153, 0.45)",
    glowColor: "rgba(16, 185, 129, 0.15)",
    textColor: "#f0fdf4",
    quoteColor: "rgba(110, 231, 183, 0.12)",
    citationColor: "#34d399",
    fontFamily: "'Georgia', serif"
  },
  {
    id: "onyx",
    name: { fr: "Or Royal & Onyx", en: "Royal Gold & Onyx", es: "Oro y Onyx", sw: "Dhahabu na Onyx", rw: "izahabu" },
    background: {
      type: "linear",
      stops: [
        { offset: 0, color: "#09090b" }, // zinc-950
        { offset: 0.5, color: "#18181b" }, // zinc-900
        { offset: 1, color: "#09090b" }
      ]
    },
    frameColor: "rgba(234, 179, 8, 0.3)",
    frameInnerColor: "rgba(234, 179, 8, 0.6)",
    glowColor: "rgba(234, 179, 8, 0.1)",
    textColor: "#fafafa",
    quoteColor: "rgba(234, 179, 8, 0.15)",
    citationColor: "#eab308",
    fontFamily: "'Georgia', serif"
  },
  {
    id: "sharon",
    name: { fr: "Rose de Saron", en: "Rose of Sharon", es: "Rosa de Sarón", sw: "Waridi la Sharoni", rw: "Inyange ya Saroni" },
    background: {
      type: "linear",
      stops: [
        { offset: 0, color: "#4c0519" }, // rose-950
        { offset: 0.5, color: "#2d0b1e" }, // dark ruby
        { offset: 1, color: "#0f172a" } // slate-900
      ]
    },
    frameColor: "rgba(251, 113, 133, 0.2)",
    frameInnerColor: "rgba(244, 63, 94, 0.4)",
    glowColor: "rgba(244, 63, 94, 0.15)",
    textColor: "#fff1f2",
    quoteColor: "rgba(251, 113, 133, 0.12)",
    citationColor: "#fda4af",
    fontFamily: "'Georgia', serif"
  },
  {
    id: "heavenly",
    name: { fr: "Ciel Céleste", en: "Heavenly Skies", es: "Cielo Celestial", sw: "Mbingu za Mbinguni", rw: "Ijuru" },
    background: {
      type: "linear",
      stops: [
        { offset: 0, color: "#0c4a6e" }, // sky-900
        { offset: 0.6, color: "#075985" }, // sky-800
        { offset: 1, color: "#0369a1" } // sky-700
      ]
    },
    frameColor: "rgba(186, 230, 253, 0.2)",
    frameInnerColor: "rgba(125, 211, 252, 0.4)",
    glowColor: "rgba(56, 189, 248, 0.15)",
    textColor: "#f0f9ff",
    quoteColor: "rgba(186, 230, 253, 0.15)",
    citationColor: "#38bdf8",
    fontFamily: "'Georgia', serif"
  }
];

/**
 * Generates and downloads a beautiful Bible verse quote card using the Canvas API.
 * Features customizable gradients, centered formatted text, and "Vitech Africa" watermark.
 */
export function exportVerseToImage(
  text: string,
  citation: string,
  language: string = "fr",
  selectedStyleId: string = "cosmic"
) {
  // Find current theme config
  const theme = EXPORT_IMAGE_THEMES.find((t) => t.id === selectedStyleId) || EXPORT_IMAGE_THEMES[0];

  // Create a canvas element
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 675; // Standard 16:9 ratio
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("Could not obtain canvas 2D context.");
    return;
  }

  // 1. Draw elegant background gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  theme.background.stops.forEach((stop) => {
    gradient.addColorStop(stop.offset, stop.color);
  });

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Draw subtle decorative frame / border
  ctx.strokeStyle = theme.frameColor;
  ctx.lineWidth = 14;
  ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

  ctx.strokeStyle = theme.frameInnerColor;
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

  // 3. Add soft circular glowing aura in the center
  const glow = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    50,
    canvas.width / 2,
    canvas.height / 2,
    400
  );
  glow.addColorStop(0, theme.glowColor);
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 400, 0, Math.PI * 2);
  ctx.fill();

  // 4. Draw decorative quote icons
  ctx.fillStyle = theme.quoteColor;
  ctx.font = `italic 160px ${theme.fontFamily}`;
  ctx.fillText("“", 90, 200);
  ctx.fillText("”", canvas.width - 170, canvas.height - 100);

  // 5. Draw the Verse Text wrapped intelligently to fit the canvas
  ctx.fillStyle = theme.textColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Select suitable fonts
  ctx.font = `normal 34px ${theme.fontFamily}`;

  const maxLineWidth = 900;
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (let i = 0; i < words.length; i++) {
    const testLine = currentLine + words[i] + " ";
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxLineWidth && i > 0) {
      lines.push(currentLine.trim());
      currentLine = words[i] + " ";
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine.trim());

  // Calculate start Y to vertically center the lines + citation
  const lineHeight = 52;
  const totalTextHeight = lines.length * lineHeight + 80; // 80px space for citation
  let startY = (canvas.height - totalTextHeight) / 2 + 30;

  // Render each line of text
  for (const line of lines) {
    ctx.fillText(line, canvas.width / 2, startY);
    startY += lineHeight;
  }

  // 6. Draw Gold divider and citation
  startY += 30;
  ctx.strokeStyle = theme.frameInnerColor;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 120, startY - 15);
  ctx.lineTo(canvas.width / 2 + 120, startY - 15);
  ctx.stroke();

  // Renders citation
  ctx.fillStyle = theme.citationColor;
  ctx.font = "italic bold 28px 'Inter', sans-serif";
  ctx.fillText(citation, canvas.width / 2, startY + 10);

  // 7. Footer design with mandatory brand title: "Vitech Africa"
  ctx.shadowColor = "transparent";
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.font = "500 18px 'Inter', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Bible Électronique – Vitech Africa", canvas.width / 2, canvas.height - 70);

  // Create clean download link
  try {
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    const sanitizedCitation = citation.replace(/[^a-zA-Z0-9]/g, "_");
    link.download = `Vitech_Bible_Verse_${sanitizedCitation}.png`;
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error("Failed to generate data URL from canvas:", err);
  }
}
