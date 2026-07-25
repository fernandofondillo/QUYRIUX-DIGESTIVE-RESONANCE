import React, { useState } from 'react';
import { BookOpen, ShieldCheck, CheckCircle2, FileText, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { EDU_ARTICLES } from '../data/initialData';
import { EduArticle } from '../types';

export const EducationCenterView: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<EduArticle>(EDU_ARTICLES[0]);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: '¿Por qué la respiración afecta directamente al reflujo?',
      a: 'El diafragma rodea el Esfínter Esofágico Inferior (EEI). Al realizar inspiraciones abdominales profundas con exhalaciones lentas, fortaleces el tono mecánico de este esfínter y estimulas el freno vagal que disminuye la hiperacidez.'
    },
    {
      q: '¿Cuánto tiempo tarda en hacer efecto el tarareo (humming)?',
      a: 'La estimulación vagal mediante resonancia faríngea suele generar una bajada perceptible de la frecuencia cardíaca y relajación en la boca del estómago tras 3 a 5 minutos de práctica continuada.'
    },
    {
      q: '¿Qué diferencia hay entre evidencia sólida, moderada y preliminar?',
      a: 'La evidencia sólida proviene de ensayos clínicos aleatorizados con metaanálisis; la moderada de estudios observacionales y ensayos pequeños; la preliminar de modelos mecánicos y experiencias en fisiología aplicada.'
    },
    {
      q: '¿Puedo usar esta aplicación si tengo hernia de hiato?',
      a: 'Sí, las técnicas de respiración diafragmática y los hábitos posturales (como elevar la cama y dormir sobre el lado izquierdo) están respaldados por guías gastroenterológicas para el manejo de síntomas de hernia de hiato. Recuerda siempre consultar a tu médico.'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-sky-400 bg-sky-950 border border-sky-800 px-2.5 py-0.5 rounded-full">
              Módulo 7: Centro Educativo & Neurociencia
            </span>
            <span className="text-xs text-slate-400">
              Divulgación Científica Rigurosa
            </span>
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-400" />
            Eje Intestino-Cerebro & Fisiología Vagal
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mt-0.5">
            Artículos explicativos sencillos, diagramas y respuestas a preguntas frecuentes sobre la modulación digestiva.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Article Selector List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">Guías Educativas</h3>
          {EDU_ARTICLES.map(art => (
            <button
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className={`w-full text-left p-4 rounded-2xl border transition-all ${
                selectedArticle.id === art.id
                  ? 'bg-sky-950/80 border-sky-500 text-white font-bold shadow-lg shadow-sky-950/50'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span className="text-[9px] uppercase font-bold text-sky-400 bg-sky-950 border border-sky-900 px-2 py-0.5 rounded-md">
                {art.category}
              </span>
              <h4 className="text-sm font-bold text-white mt-1.5">{art.title}</h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{art.summary}</p>
            </button>
          ))}
        </div>

        {/* Selected Article Viewer */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2.5 py-0.5 rounded-full">
              Evidencia {selectedArticle.evidenceLevel.toUpperCase()}
            </span>
            <h2 className="text-xl font-bold text-white mt-2">{selectedArticle.title}</h2>
            <p className="text-xs text-slate-400 mt-1">Tiempo de lectura estimado: {selectedArticle.readTimeMinutes} minutos</p>
          </div>

          {/* Key Takeaways */}
          <div className="bg-slate-950 border border-sky-900/50 rounded-xl p-4 space-y-2">
            <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Puntos Clave de Neurociencia:
            </span>
            <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
              {selectedArticle.keyTakeaways.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Article Markdown Render */}
          <div className="prose prose-invert prose-xs text-slate-300 leading-relaxed whitespace-pre-line">
            {selectedArticle.contentMarkdown}
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-sky-400" /> Preguntas Frecuentes (FAQ)
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaqIndex === idx;
            return (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 text-xs font-bold text-white flex items-center justify-between gap-2 hover:bg-slate-900/60 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-sky-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-300 border-t border-slate-800/80 pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
