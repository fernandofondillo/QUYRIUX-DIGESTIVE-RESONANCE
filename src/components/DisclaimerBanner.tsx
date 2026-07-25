import React from 'react';
import { AlertCircle, ShieldCheck } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-slate-900/90 border-b border-sky-900/50 px-4 py-2.5 text-xs text-sky-200/90 flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-2 max-w-4xl">
        <AlertCircle className="w-4 h-4 text-sky-400 shrink-0" />
        <span>
          <strong>Aviso de Salud:</strong> Quyriux es una herramienta de bienestar, relajación y entrenamiento respiratorio basada en hábitos saludables. <em>No afirma curar patologías y no sustituye la atención médica profesional.</em>
        </span>
      </div>
      <div className="flex items-center gap-1.5 text-emerald-400 font-medium shrink-0">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Modulación Vagal Autónoma</span>
      </div>
    </div>
  );
};
