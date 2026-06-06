/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Heart, ThumbsUp, Copy, Share2, Sparkles, Image, Check, Volume2, VolumeX, Highlighter, Eraser } from "lucide-react";
import { Language } from "../types";
import { exportVerseToImage, EXPORT_IMAGE_THEMES } from "../utils/imageExporter";

interface VerseCardProps {
  key?: any;
  verseNumber: number;
  text: string;
  bookId: string;
  bookName: string;
  chapterNumber: number;
  language: Language;
  isLiked: boolean;
  likeCount: number;
  isFavorited: boolean;
  onLikeToggle: () => void;
  onFavoriteToggle: () => void;
  onExplain: (text: string, citation: string) => void;
  t: (key: string) => string;
  highlightKeyword?: string;
  animationsEnabled?: boolean;
  highlightColor?: string;
  onHighlightUpdate?: (color: string) => void;
}

export function VerseCard({
  verseNumber,
  text,
  bookId,
  bookName,
  chapterNumber,
  language,
  isLiked,
  likeCount,
  isFavorited,
  onExplain,
  onLikeToggle,
  onFavoriteToggle,
  t,
  highlightKeyword = "",
  animationsEnabled = true,
  highlightColor = "",
  onHighlightUpdate
}: VerseCardProps) {
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showStylePicker, setShowStylePicker] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHighlighter, setShowHighlighter] = useState(false);

  const getHighlightClass = (color?: string) => {
    switch (color) {
      case "amber":
        return "bg-amber-100/80 dark:bg-amber-500/20 text-slate-900 dark:text-amber-100 px-1 py-0.5 rounded transition-all";
      case "emerald":
        return "bg-emerald-100/80 dark:bg-emerald-500/20 text-slate-900 dark:text-emerald-100 px-1 py-0.5 rounded transition-all";
      case "sky":
        return "bg-sky-100/80 dark:bg-sky-500/20 text-slate-900 dark:text-sky-100 px-1 py-0.5 rounded transition-all";
      case "purple":
        return "bg-purple-100/80 dark:bg-purple-500/20 text-slate-900 dark:text-purple-100 px-1 py-0.5 rounded transition-all";
      case "rose":
        return "bg-rose-100/80 dark:bg-rose-500/20 text-slate-900 dark:text-rose-100 px-1 py-0.5 rounded transition-all";
      default:
        return "";
    }
  };

  const getHighlightBorderClass = (color?: string) => {
    switch (color) {
      case "amber": return "border-amber-400 dark:border-amber-500/70";
      case "emerald": return "border-emerald-400 dark:border-emerald-500/70";
      case "sky": return "border-sky-400 dark:border-sky-500/70";
      case "purple": return "border-purple-400 dark:border-purple-550/70";
      case "rose": return "border-rose-400 dark:border-rose-550/70";
      default: return "border-indigo-400/50";
    }
  };

  const getHighlighterColorIcon = (color?: string) => {
    switch (color) {
      case "amber": return "#fabf24";
      case "emerald": return "#10b981";
      case "sky": return "#0ea5e9";
      case "purple": return "#a855f7";
      case "rose": return "#f43f5e";
      default: return undefined;
    }
  };

  const citation = `${bookName} ${chapterNumber}:${verseNumber}`;

  // Highlight keywords if search query matched
  const renderHighlightedText = () => {
    if (!highlightKeyword.trim()) return text;

    const regex = new RegExp(`(${escapeRegExp(highlightKeyword)})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 dark:bg-yellow-900/60 text-yellow-900 dark:text-yellow-100 px-1 rounded font-medium">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // Copy verse to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`"${text}" — ${citation} (${t("tagline")})`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy verse:", err);
    }
  };

  // Modern Text To Speech
  const handleTTS = () => {
    if ("speechSynthesis" in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      window.speechSynthesis.cancel(); // Stop any pending speech
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Attempt language detection
      let langCode = "fr-FR";
      if (language === Language.EN) langCode = "en-US";
      else if (language === Language.ES) langCode = "es-ES";
      else if (language === Language.SW) langCode = "sw-TZ";
      else if (language === Language.RW) langCode = "rw-RW";
      
      utterance.lang = langCode;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("TTS not supported in this browser.");
    }
  };

  // Fast social share
  const handleShare = (platform: "whatsapp" | "facebook" | "copy") => {
    const shareText = `"${text}" — ${citation}\n\n📖 ${t("appTitle")} - ${t("tagline")}`;
    const encodedText = encodeURIComponent(shareText);

    if (platform === "whatsapp") {
      window.open(`https://api.whatsapp.com/send?text=${encodedText}`, "_blank");
    } else if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodedText}`, "_blank");
    } else {
      handleCopy();
    }
    setShowShareMenu(false);
  };

  const animationClass = animationsEnabled 
    ? "transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5" 
    : "";

  return (
    <div
      id={`verse-card-${bookId}-${chapterNumber}-${verseNumber}`}
      className={`relative p-3.5 sm:p-5 md:p-6 bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 rounded-2xl flex flex-col gap-3 sm:gap-4 shadow-sm ${animationClass}`}
    >
      {/* Citation indicator top row */}
      <div className="flex justify-between items-center">
        <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
          {citation}
        </span>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
          <button
            onClick={onLikeToggle}
            className={`p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-1 transition-colors ${
              isLiked ? "text-rose-500 font-semibold" : "text-slate-400 dark:text-slate-500"
            }`}
            title="Aimer ce verset"
          >
            <ThumbsUp className={`h-4 w-4 ${isLiked ? "fill-rose-500 stroke-rose-500" : ""}`} />
            <span>{likeCount}</span>
          </button>
          
          <button
            onClick={onFavoriteToggle}
            className={`p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center transition-colors ${
              isFavorited ? "text-amber-500" : "text-slate-400 dark:text-slate-500"
            }`}
            title={isFavorited ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? "fill-amber-500 stroke-amber-500" : ""}`} />
          </button>

          {/* Color-Coded Highlighter button & palette popover */}
          <div className="relative">
            <button
              onClick={() => {
                setShowHighlighter(!showHighlighter);
                setShowShareMenu(false);
                setShowStylePicker(false);
              }}
              className={`p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center transition-colors ${
                highlightColor ? "text-slate-800 dark:text-slate-100" : "text-slate-400 dark:text-slate-500"
              }`}
              title="Surligner ce verset"
            >
              <Highlighter 
                className={`h-4 w-4 transition-transform ${highlightColor ? "scale-110" : ""}`} 
                style={highlightColor ? { stroke: getHighlighterColorIcon(highlightColor), fill: `${getHighlighterColorIcon(highlightColor)}40` } : undefined} 
              />
            </button>
            
            {showHighlighter && (
              <div className="absolute right-0 top-full mt-1.5 z-40 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-xl p-2 flex items-center gap-1.5 animate-fade-in whitespace-nowrap">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
                  Couleur :
                </span>
                {(["amber", "emerald", "sky", "purple", "rose"] as const).map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      if (onHighlightUpdate) onHighlightUpdate(color);
                      setShowHighlighter(false);
                    }}
                    className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-125 hover:shadow-md cursor-pointer shrink-0 ${
                      highlightColor === color 
                        ? "border-slate-600 dark:border-white scale-110 ring-2 ring-amber-500/30" 
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: getHighlighterColorIcon(color) }}
                  />
                ))}
                
                {highlightColor ? (
                  <button
                    onClick={() => {
                      if (onHighlightUpdate) onHighlightUpdate("");
                      setShowHighlighter(false);
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center cursor-pointer shrink-0"
                    title="Effacer"
                  >
                    <Eraser className="w-4 h-4" />
                  </button>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main verse text body */}
      <blockquote className={`text-slate-800 dark:text-slate-100 text-base md:text-lg leading-relaxed font-serif pl-3 border-l-2 transition-all duration-300 ${getHighlightBorderClass(highlightColor)}`}>
        <span className="font-semibold text-xs text-indigo-500 align-super mr-1.5">
          {verseNumber}
        </span>
        <span className={`transition-all duration-300 ${getHighlightClass(highlightColor)}`}>
          {renderHighlightedText()}
        </span>
      </blockquote>

      {/* Action buttons bottom row */}
      <div className="mt-2 pt-3 border-t border-slate-50 dark:border-slate-700/40 flex flex-wrap items-center justify-between gap-2">
        {/* Left features: Audio reading and Gemini AI Explanations */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleTTS}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl transition-colors ${
              isPlaying 
                ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-200" 
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60"
            }`}
            title={isPlaying ? "Arrêter la lecture" : "Écouter la lecture audio"}
          >
            {isPlaying ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            <span>{isPlaying ? "Stop" : "Audio"}</span>
          </button>

          <button
            onClick={() => onExplain(text, citation)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-950/80 border border-indigo-100/30 transition-colors shrink-0"
            title="Demander une explication chrétienne à l'IA Gemini"
          >
            <Sparkles className="h-3.5 w-3.5 fill-indigo-100 dark:fill-indigo-950 shrink-0" />
            <span className="truncate">
              <span className="hidden sm:inline">{t("explainWithAI")}</span>
              <span className="inline sm:hidden">Explication IA</span>
            </span>
          </button>
        </div>

        {/* Right features: Copy, Share menu, Canvas Exporter */}
        <div className="flex items-center gap-1 relative">
          <button
            onClick={handleCopy}
            className="p-1.5 md:p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors"
            title={t("copy")}
          >
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="p-1.5 md:p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors"
              title={t("share")}
            >
              <Share2 className="h-4 w-4" />
            </button>

            {showShareMenu && (
              <div className="absolute right-0 bottom-full mb-2 z-30 w-44 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 p-1 flex flex-col gap-0.5">
                <button
                  onClick={() => handleShare("whatsapp")}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 rounded-lg transition-colors font-medium flex items-center gap-2"
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => handleShare("facebook")}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 rounded-lg transition-colors font-medium flex items-center gap-2"
                >
                  Facebook
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="w-full text-left px-3 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 rounded-lg transition-colors font-medium flex items-center gap-2"
                >
                  {t("copy")}
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowStylePicker(!showStylePicker);
                setShowShareMenu(false);
              }}
              className={`p-1.5 md:p-2 rounded-xl transition-colors flex items-center gap-1 ${
                showStylePicker 
                  ? "bg-indigo-100 text-indigo-700 dark:bg-slate-700 dark:text-indigo-400" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50"
              }`}
              title="Choisir le design du verset et télécharger"
            >
              <Image className="h-4 w-4" />
              <span className="text-[9px] bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 font-mono font-bold px-1 rounded">
                +5
              </span>
            </button>

            {showStylePicker && (
              <div className="absolute right-0 bottom-full mb-2 z-30 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 py-1">
                  Style de carte :
                </span>
                {EXPORT_IMAGE_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      exportVerseToImage(text, citation, language, theme.id);
                      setShowStylePicker(false);
                    }}
                    className="w-full text-left px-2 py-1.5 text-xs text-slate-750 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all font-medium flex items-center justify-between gap-2 border border-transparent hover:border-slate-100 dark:hover:border-slate-800/60"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {/* Circle Preview gradient */}
                      <div 
                        className="w-3.5 h-3.5 rounded-full shrink-0 border border-slate-200 dark:border-zinc-700" 
                        style={{
                          background: `linear-gradient(135deg, ${theme.background.stops[0].color}, ${theme.background.stops[theme.background.stops.length - 1].color})`
                        }}
                      />
                      <span className="truncate">{theme.name[language] || theme.name["fr"]}</span>
                    </div>
                    <span className="text-[9px] text-amber-500 font-mono font-bold uppercase shrink-0">PNG</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
