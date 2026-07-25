import React, { useState } from 'react';
import { Vibrate, Play, ShieldCheck, AlertCircle, Smartphone } from 'lucide-react';
import { hapticEngine } from '../services/hapticEngine';

export const HapticEngineView: React.FC = () => {
  const isSupported = hapticEngine.isSupported();
  const [activePattern, setActivePattern] = useState<string | null>(null);

  const testPattern = (pattern: 'inhale' | 'exhale' | 'holdIn' | 'humming' | 'success') => {
    setActivePattern(pattern);
    if (pattern === 'success') {
      hapticEngine.triggerSuccess();
    } else {
      hapticEngine.triggerPhase(pattern);
    }
    setTimeout(() => setActivePattern(null), 800);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-purple-400 bg-purple-950 border border-purple-800 px-2.5 py-0.5 rounded-full">
              Módulo 5: Vibración Háptica
            </span>
            <span className="text-xs text-slate-400">
              Web Vibration API
            </span>
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Vibrate className="w-5 h-5 text-purple-400" />
            Retroalimentación Táctil Sincronizada
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mt-0.5">
            Siente el ritmo respiratorio directamente en tu dispositivo sin necesidad de mirar constantemente la pantalla.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isSupported ? (
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-950 border border-emerald-800 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Vibración Compatible
            </span>
          ) : (
            <span className="text-xs font-semibold text-amber-400 bg-amber-950 border border-amber-800 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> Sin motor físico (Simulación en Pantalla)
            </span>
          )}
        </div>
      </div>

      {/* Vibration Pattern Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { id: 'inhale', title: 'Patrón Inhalación', desc: 'Pulsos suaves progresivos de subida.', type: 'inhale' },
          { id: 'exhale', title: 'Patrón Exhalación', desc: 'Vibración continua y prolongada de relajación.', type: 'exhale' },
          { id: 'holdIn', title: 'Patrón Retención', desc: 'Doble micro-tap de presencia.', type: 'holdIn' },
          { id: 'humming', title: 'Patrón Tarareo (Humming)', desc: 'Pulsación rítmica sónica.', type: 'humming' },
          { id: 'success', title: 'Patrón Fin de Sesión', desc: 'Secuencia armónica festiva de éxito.', type: 'success' }
        ].map(p => (
          <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div>
              <h3 className="font-bold text-white text-sm">{p.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{p.desc}</p>
            </div>

            <button
              onClick={() => testPattern(p.type as any)}
              className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                activePattern === p.type
                  ? 'bg-purple-500 text-slate-950 shadow-lg shadow-purple-950'
                  : 'bg-slate-950 border border-slate-800 text-purple-300 hover:bg-slate-800'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Probar Patrón Háptico</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
