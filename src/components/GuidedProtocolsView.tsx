import React, { useState } from 'react';
import { 
  Compass, 
  Play, 
  Pause, 
  CheckCircle2, 
  Wind, 
  Music, 
  Vibrate, 
  Clock, 
  Info, 
  RotateCcw,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { GUIDED_PROTOCOLS, BREATHING_PROTOCOLS } from '../data/initialData';
import { GuidedProtocol } from '../types';
import { audioEngine } from '../services/audioEngine';
import { hapticEngine } from '../services/hapticEngine';

interface GuidedProtocolsViewProps {
  onSessionComplete: (name: string, durationSeconds: number) => void;
  soundVolume: number;
  hapticsEnabled: boolean;
}

export const GuidedProtocolsView: React.FC<GuidedProtocolsViewProps> = ({
  onSessionComplete,
  soundVolume,
  hapticsEnabled
}) => {
  const [selectedProto, setSelectedProto] = useState<GuidedProtocol>(GUIDED_PROTOCOLS[0]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const startSession = (proto: GuidedProtocol) => {
    setSelectedProto(proto);
    setActiveStep(0);
    setIsSessionActive(true);
    setElapsedSeconds(0);

    // Start background soundscape
    if (soundVolume > 0) {
      audioEngine.startAmbientTrack(proto.id, 'ocean', 0.4, 120);
    }
  };

  const stopSession = () => {
    setIsSessionActive(false);
    audioEngine.stopAllAmbient();
    if (elapsedSeconds > 30) {
      onSessionComplete(selectedProto.title, elapsedSeconds);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-sky-400 bg-sky-950 border border-sky-800 px-2.5 py-0.5 rounded-full">
              Módulo 6: Protocolos Combinados Multimodales
            </span>
            <span className="text-xs text-slate-400">
              Respiración + Sonido + Vibración + Hábitos
            </span>
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-sky-400" />
            Rutinas Terapéuticas Guiadas
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mt-0.5">
            Intervenciones secuenciales paso a paso adaptadas a momentos específicos del día y picos sintomáticos.
          </p>
        </div>
      </div>

      {/* Active Session Stage */}
      {isSessionActive ? (
        <div className="bg-slate-950 border border-sky-500/80 rounded-2xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-sky-400 bg-sky-950 border border-sky-900 px-2.5 py-0.5 rounded-full">
                Sesión en Curso
              </span>
              <h3 className="text-xl font-bold text-white mt-1">{selectedProto.title}</h3>
            </div>

            <button
              onClick={stopSession}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition-colors"
            >
              Finalizar Sesión
            </button>
          </div>

          {/* Steps Carousel / Progress */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>Paso {activeStep + 1} de {selectedProto.instructions.length}</span>
              <span>Evidencia {selectedProto.evidenceLevel.toUpperCase()}</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-sm font-medium text-slate-100 leading-relaxed shadow-inner">
              {selectedProto.instructions[activeStep]}
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 disabled:opacity-40"
              >
                Paso Anterior
              </button>

              <button
                onClick={() => {
                  if (activeStep < selectedProto.instructions.length - 1) {
                    setActiveStep(prev => prev + 1);
                  } else {
                    stopSession();
                  }
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-sky-600 to-emerald-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-sky-950"
              >
                <span>{activeStep === selectedProto.instructions.length - 1 ? 'Completar Rutina' : 'Siguiente Paso'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Protocol Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GUIDED_PROTOCOLS.map(proto => (
            <div
              key={proto.id}
              className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-sky-700/80 transition-all shadow-md"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-sky-400 bg-sky-950 border border-sky-900 px-2.5 py-0.5 rounded-full">
                    {proto.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {proto.durationMinutes} min
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">{proto.title}</h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{proto.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <Wind className="w-3.5 h-3.5 text-sky-400" />
                  <Music className="w-3.5 h-3.5 text-emerald-400" />
                  <Vibrate className="w-3.5 h-3.5 text-purple-400" />
                </div>

                <button
                  onClick={() => startSession(proto)}
                  className="px-5 py-2 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-sky-950 transition-all transform active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Iniciar Protocolo</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
