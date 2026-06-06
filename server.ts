/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK lazily to prevent crashing if the key is missing on start
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Successfully initialized GoogleGenAI client.");
  } catch (error) {
    console.error("Error setting up GoogleGenAI client:", error);
  }
} else {
  console.warn("GEMINI_API_KEY environment variable is not defined or is placeholder. Falling back to local inspirational explanations if requested.");
}

// API Routes
app.post("/api/explain", async (req, res) => {
  const { verseText, bookName, chapter, verseNumber, language } = req.body;

  if (!verseText) {
    return res.status(400).json({ error: "No verse text provided" });
  }

  // System instruction based on the requested language
  let systemInstruction = "You are a warm, wise, and highly inspirational biblical scholar. Provide a structured, uplifting, and clear explanation of the verse for general readers. Keep it to 2-3 short, modern paragraphs. Do not mention technical terms or code.";
  let prompt = `Provide an inspiring explanation of the biblical verse: "${bookName} ${chapter}:${verseNumber}" in the language of this verse, which is "${language}". Here is the verse text:\n\n"${verseText}"`;

  if (language === "fr") {
    systemInstruction = "Vous êtes un théologien bienveillant, sage et très inspirant. Donnez une explication structurée, encourageante et claire du verset pour le grand public. Rédigez 2 ou 3 courts paragraphes modernes et chaleureux.";
    prompt = `Donnez une explication inspirante et édifiante du verset biblique suivant en français: "${bookName} ${chapter}:${verseNumber}"\nTexte du verset : "${verseText}"`;
  } else if (language === "sw") {
    systemInstruction = "Wewe ni mwanatheolojia mwenye fadhili na hekima. Toa ufafanuzi wenye kutia moyo, kuelimisha na ulio wazi wa aya hii kwa wasomaji wote. Andika aya 2-3 fupi na za kisasa.";
    prompt = `Toa ufafanuzi mzuri na wa kutia moyo wa aya hii ya Biblia katika Kiswahili: "${bookName} ${chapter}:${verseNumber}"\nMaandishi ya aya: "${verseText}"`;
  } else if (language === "rw") {
    systemInstruction = "Uri umuhanga mu bumenyi bwa Bibiliya uzi ubwenge n'ubugwaneza. Tanga ibisobanuro bigufi, byubaka kandi bisobanutse neza by'uyu murongo mu Kinyarwanda.";
    prompt = `Tanga ibisobanuro byiza kandi byubaka by'uyu murongo wa Bibiliya mu Kinyarwanda: "${bookName} ${chapter}:${verseNumber}"\nUmurongo: "${verseText}"`;
  } else if (language === "es") {
    systemInstruction = "Eres un teólogo sabio y muy inspirador. Ofrece una explicación estructurada, alentadora y clara del versículo para el público general. Escribe de 2 a 3 párrafos cortos.";
    prompt = `Proporciona una explicación inspiradora y edificante del siguiente versículo bíblico en español: "${bookName} ${chapter}:${verseNumber}"\nTexto del versículo: "${verseText}"`;
  }

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const explanation = response.text || "No explanation text could be generated.";
      return res.json({ explanation });
    } catch (error: any) {
      if (error?.message?.includes("denied access") || error?.message?.includes("403") || error?.message?.includes("PERMISSION_DENIED")) {
        console.warn("[Gemini Advisor] Billing or project access suspended/denied. Falling back to built-in Theological Study Engine.");
      } else {
        console.warn("[Gemini Advisor] API offline state detected:", error?.message || error);
      }
      return res.json({
        explanation: getLocalFallbackExplanation(language, bookName, chapter, verseNumber, error.message)
      });
    }
  } else {
    // Elegant fallback guidance when AI is pending / keys are missing
    return res.json({
      explanation: getLocalFallbackExplanation(language, bookName, chapter, verseNumber)
    });
  }
});

// Real dynamic chapter text fetching using Gemini AI!
app.post("/api/get-chapter", async (req, res) => {
  const { bookId, bookName, chapterNumber, language } = req.body;

  if (!bookId || !bookName || !chapterNumber || !language) {
    return res.status(400).json({ error: "Missing required fields: bookId, bookName, chapterNumber, language" });
  }

  const prompt = `You are an accurate, high-fidelity biblical database.
Return the complete text of chapter ${chapterNumber} of the biblical book of ${bookName} (which is the "${bookId}" book in the standard Protestant 66-book canon) in the language "${language}" (the code coordinates for ${language} are: ${language === 'fr' ? 'French Louis Segond' : language === 'en' ? 'English KJV or ESV' : language === 'sw' ? 'Swahili SUV' : language === 'rw' ? 'Kinyarwanda Bibiliya Yera' : 'Spanish Reina Valera'}).

IMPORTANT: Return ONLY a valid, plain, raw JSON object matching this exact schema:
{
  "verses": [
    { "number": 1, "text": "Verse 1 text here" },
    { "number": 2, "text": "Verse 2 text here" }
  ]
}

DO NOT include any Markdown block markers like \`\`\`json or \`\`\`. Do not write any conversational text, notes, or introductions. Return only the raw valid JSON string. Ensure the verses match the canonical chapter perfectly. If you can only return a limited number of verses due to length, return at least 15 of them.`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are a Bible text server. You output valid JSON with bible verses. Never output anything except JSON.",
          temperature: 0.1,
        }
      });

      const text = response.text || "";
      // Clean up any markdown code blocks returned by Gemini
      const cleanJson = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      const parsedData = JSON.parse(cleanJson);
      if (parsedData && Array.isArray(parsedData.verses)) {
        return res.json({ verses: parsedData.verses });
      } else {
        throw new Error("Invalid output format from Gemini");
      }
    } catch (error: any) {
      if (error?.message?.includes("denied access") || error?.message?.includes("403") || error?.message?.includes("PERMISSION_DENIED")) {
        console.warn("[Gemini Chapter Fetch] Billing or project access suspended/denied. Falling back to built-in Faith Database.");
      } else {
        console.warn("[Gemini Chapter Fetch] API offline state detected:", error?.message || error);
      }
      return res.json(getLocalFallbackChapter(bookId, bookName, chapterNumber, language));
    }
  } else {
    return res.json(getLocalFallbackChapter(bookId, bookName, chapterNumber, language));
  }
});

// Helper function to return beautiful localized spiritual fallback chapters
function getLocalFallbackChapter(bookId: string, bookName: string, chapter: number, language: string) {
  const greetings: Record<string, string[]> = {
    fr: [
      "Que la grâce du Seigneur Jésus-Christ soit avec vous tous en ce jour de méditation.",
      "Le Seigneur est ma lumière et mon salut; de qui aurais-je crainte ?",
      "Approchez-vous du Seigneur avec un cœur sincère, renouvelé par sa parole sainte.",
      "Fortifiez-vous dans le Seigneur, et par sa force toute-puissante.",
      "Sa parole est une lampe à mes pieds, et une lumière sur mon sentier.",
      "Heureux ceux qui gardent ses commandements, et qui le cherchent de tout leur cœur."
    ],
    en: [
      "May the grace of the Lord Jesus Christ be with you all in your daily meditation.",
      "The Lord is my light and my salvation; whom shall I fear?",
      "Draw near to the Lord with a sincere heart, renewed by His holy word.",
      "Be strong in the Lord and in the power of His might.",
      "Thy word is a lamp unto my feet, and a light unto my path.",
      "Blessed are they that keep His testimonies, and that seek Him with the whole heart."
    ],
    sw: [
      "Neema ya Bwana Yesu Kristo iwe nanyi nyote leo katika kutafakari kwenu.",
      "Bwana ni nuru yangu na wokovu wangu; nimuogope nani?",
      "Mkaribieni Bwana kwa moyo mnyofu, mkiuishwa na neno lake takatifu.",
      "Kuweni hodari katika Bwana na katika uweza wa nguvu zake.",
      "Neno lako ni taa ya miguu yangu, na mwanga wa njia yangu.",
      "Heri wazishikao shuhuda zake, wamtafutao kwa moyo wote."
    ],
    rw: [
      "Ubuntu bw'Umwami wacu Yesu Kristo bubane namwe mwese muri uku gutekereza kwayo.",
      "Uwiteka ni we mucyo wanjye n'agakiza kanjye, nzatikitira nde?",
      "Mwegere Uwiteka n'umutima utunganye, mushya mu ijambo rye ryera.",
      "Mukomerere mu Mwami n'imbaraga z'ubushobozi bwe bwinshi.",
      "Ijambo ryawe ni itara ry'ibirenge byanjye, n'umucyo mu nzira yanjye.",
      "Hahirwa abakomeza ibihamya bye, bakamushakashaka n'umutima wose."
    ],
    es: [
      "La gracia del Señor Jesucristo sea con todos vosotros hoy en su meditación diaria.",
      "La palabra del Señor permanece para siempre; esta es la buena nueva que os fue anunciada.",
      "Acercaos al Señor con corazón sincero, renovados por su santa palabra.",
      "Esforzaos en el Señor, y en el poder de su fuerza divina para vencer.",
      "Lámpara es a mis pies tu palabra celestial, y gran lumbrera a mi camino.",
      "Bienaventurados los que guardan sus testimonios sublimes, y con todo el corazón le buscan."
    ]
  };

  const list = greetings[language] || greetings["en"];
  const count = bookId === "psalms" ? 8 : 12; // Adjust length naturally
  const verses = Array.from({ length: count }, (_, i) => {
    const text = list[i % list.length];
    return {
      number: i + 1,
      text: `${text} — [Lecture guidée de ${bookName} ${chapter}:${i + 1}. Clé de l'IA en attente ou hors ligne, méditation locale active.]`
    };
  });
  return { verses };
}

// Helper function to return beautiful localized spiritual fallbacks
function getLocalFallbackExplanation(lang: string, book: string, ch: number, vr: number, errorMsg?: string): string {
  if (lang === "fr") {
    return `Ce verset magnifique de ${book} ${ch}:${vr} nous invite à méditer sur la grandeur divine, la foi agissante et l'espérance quotidienne. Il nous rappelle l'importance de guider nos pas avec amour, intégrité et confiance.\n\n*(Note : Clé de l'IA hors connexion ou en attente d'activation. Cet enseignement local a été généré de manière autonome pour soutenir votre méditation chrétienne.)*`;
  } else if (lang === "sw") {
    return `Aya hii ya ajabu kutoka ${book} ${ch}:${vr} inatualika kutafakari juu ya ukuu wa Mungu, imani yenye nguvu, na tumaini la kila siku. Inatukumbusha umuhimu wa kuongoza hatua zetu kwa upendo na uadilifu.\n\n*(Kumbuka: Kifaa cha IA hakijaoanishwa bado. Mafundisho haya ya kieneo yapo kusaidia tafakari yako ya kibiblia.)*`;
  } else if (lang === "rw") {
    return `Uyu murongo mwiza cyane wo muri ${book} ${ch}:${vr} uduhamagarira gutekereza ku gihagararo cy'Imana, ukwizera gukora, n'ibyiringiro bya buri munsi. Udatwibutsa akamaro ko kuyobora intambwe zacu n'urukundo n'ubudahemuka.\n\n*(Ikitonderwa: IA ntiri gukora kwa masegonda bake. Ibi bisobanuro byateguriwe kugufasha mu gushaka Imana.)*`;
  } else if (lang === "es") {
    return `Este hermoso versículo de ${book} ${ch}:${vr} nos invita a meditar sobre la grandeza divina, la fe activa y la esperanza diaria. Nos recuerda la importancia de guiar nuestros pasos con amor, integridad y confianza de corazón.\n\n*(Nota: Clave de la IA no detectada o esperando activación. Esta enseñanza local se ha provisto para guiar su devocional diario.)*`;
  } else {
    return `This wonderful passage from ${book} ${ch}:${vr} encourages us to reflect on divine wisdom, active faith, and daily hope. It reminds us of the profound strength that comes from guiding our life paths with love, trust, and righteous integrity.\n\n*(Note: Gemini AI is offline or key is waiting to be configured. This local wisdom is provided to sustain your immersive devotions.)*`;
  }
}

// Vite integration
async function startServer() {
  // Ensure public folder and PWA icon assets are copy-initiated
  try {
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    const imagesDir = path.join(process.cwd(), "src", "assets", "images");
    if (fs.existsSync(imagesDir)) {
      const gFiles = fs.readdirSync(imagesDir);
      const latestLogo = gFiles.find(f => f.startsWith("bible_pro_max_logo") && f.endsWith(".png"));
      if (latestLogo) {
        const srcPath = path.join(imagesDir, latestLogo);
        fs.copyFileSync(srcPath, path.join(publicDir, "icon-512.png"));
        fs.copyFileSync(srcPath, path.join(publicDir, "icon-192.png"));
        console.log(`[PWA Initialize] Synced premium high-fidelity launcher icons successfully from ${latestLogo}`);
      }
    }
  } catch (err) {
    console.warn("[PWA Base Engine] Launcher icon replication bypassed:", err);
  }

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Mounted Vite development middleware.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static files from dist production directory.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
