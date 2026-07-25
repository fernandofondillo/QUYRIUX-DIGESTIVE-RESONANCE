import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  Info, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles,
  Radio
} from 'lucide-react';
import { HUMMING_PROTOCOLS } from '../data/initialData';
import { HummingProtocol } from '../types';
import { audioEngine } from '../services/audioEngine';
import { hapticEngine } from '../services/hapticEngine';

interface HummingSessionViewProps {
  onSessionComplete: (name: string, durationSeconds: number) => void;
  soundVolume: number;
  hapticsEnabled: boolean;
}

export const HummingSessionView: React.FC<HummingSessionViewProps> = ({
  onSessionComplete,
  soundVolume,
  hapticsEnabled
}) => {
  const [selectedHum, setSelectedHum] = useState<HummingProtocol>(HUMMING_PROTOCOLS[0]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [phase, setPhase] = useState<'inhale' | 'humming'>('inhale');
  const [phaseProgress, setPhaseProgress] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [showGuide, setShowGuide] = useState<boolean>(false);

  const phaseStartTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);

      phaseStartTimeRef.current = performance.now();

      const loop = () => {
        const now = performance.now();
        const durationSec = phase === 'inhale' ? selectedHum.inhaleSeconds : selectedHum.hummingSeconds;
        const durationMs = durationSec * 1000;
        const elapsed = now - phaseStartTimeRef.current;

        const prog = Math.min(1, elapsed / durationMs);
        setPhaseProgress(prog);

        if (prog >= 1) {
          const next = phase === 'inhale' ? 'humming' : 'inhale';
          setPhase(next);
          phaseStartTimeRef.current = performance.now();

          if (next === 'humming' && soundVolume > 0) {
            audioEngine.startHummingTone(selectedHum.frequencyHz);
            if (hapticsEnabled) hapticEngine.triggerPhase('humming');
          } else {
            audioEngine.stopHummingTone();
          }
        }

        animationFrameRef.current = requestAnimationFrame(loop);
      };

      animationFrameRef.current = requestAnimationFrame(loop);
    } else {
      audioEngine.stopHummingTone();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    }

    return () => {
      audioEngine.stopHummingTone();
      if (interval) clearInterval(interval);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isActive, phase, selectedHum, soundVolume, hapticsEnabled]);

  const toggleSession = () => {
    if (!isActive) {
      setIsActive(true);
      setPhase('inhale');
      phaseStartTimeRef.current = performance.now();
    } else {
      setIsActive(false);
      audioEngine.stopHummingTone();
      if (elapsedSeconds > 20) {
        onSessionComplete(`Tarareo ${selectedHum.vowelSound}`, elapsedSeconds);
      }
    }
  };

  const resetSession = () => {
    setIsActive(false);
    audioEngine.stopHummingTone();
    setElapsedSeconds(0);
    setPhase('inhale');
    setPhaseProgress(0);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2.5 py-0.5 rounded-full">
              Módulo 2: Tarareo Vagal (Humming)
            </span>
            <span className="text-xs text-slate-400">
              Resonancia Vagal Aferente
            </span>
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mic className="w-5 h-5 text-emerald-400" />
            Estimulación Sonora Vagal
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mt-0.5">
            Generación de tono continuo grave para estimular las cuerdas vocales y liberar óxido nítrico nasal.
          </p>
        </div>

        <button
          onClick={() => setShowGuide(!showGuide)}
          className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-colors ${
            showGuide ? 'bg-emerald-950 border-emerald-800 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Info className="w-4 h-4" />
          <span>Guía Técnica & Errores</span>
        </button>
      </div>

      {/* Vowel Selector Tabs */}
      <div className="grid grid-cols-3 gap-3">
        {HUMMING_PROTOCOLS.map(h => (
          <button
            key={h.id}
            onClick={() => {
              setSelectedHum(h);
              resetSession();
            }}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selectedHum.id === h.id
                ? 'bg-gradient-to-br from-emerald-950/80 to-slate-900 border-emerald-500/80 shadow-lg shadow-emerald-950/40'
                : 'bg-slate-900 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xl font-extrabold text-white">{h.vowelSound}</span>
              <span className="text-xs font-mono text-emerald-400 font-bold">{h.frequencyHz} Hz</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{h.description}</p>
          </button>
        ))}
      </div>

      {/* Guide Box */}
      {showGuide && (
        <div className="bg-slate-900 border border-emerald-900/50 rounded-2xl p-5 text-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Fundamento Científico & Mecanismo Vagal</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            {selectedHum.vagalMechanism}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div>
              <span className="font-bold text-white block mb-1">Cómo realizarlo correctamente:</span>
              <ul className="list-disc list-inside text-slate-300 space-y-1">
                <li>Junta los labios suavemente sin apretar los dientes.</li>
                <li>Inhala profundo en 4 segundos por la nariz.</li>
                <li>Exhala emitiendo el sonido vocal continuo sintiendo la vibración en la garganta.</li>
              </ul>
            </div>

            <div>
              <span className="font-bold text-rose-400 block mb-1 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Errores Frecuentes:
              </span>
              <ul className="list-disc list-inside text-slate-300 space-y-1">
                <li>Apretar la mandíbula o forzar el cuello.</li>
                <li>Hacer el sonido demasiado agudo o fuerte.</li>
                <li>Quedarse sin aire antes de completar los 8-10 segundos.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Stage Canvas */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden shadow-inner">
        <div className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl absolute top-4 right-4">
          {Math.floor(elapsedSeconds / 60).toString().padStart(2, '0')}:
          {(elapsedSeconds % 60).toString().padStart(2, '0')}
        </div>

        {/* Humming Pulsing Wave Circle */}
        <div className="relative flex items-center justify-center my-6">
          <div className="w-64 h-64 border border-slate-800 rounded-full flex items-center justify-center">
            <div
              className={`w-40 h-40 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-300 ${
                phase === 'humming'
                  ? 'bg-gradient-to-tr from-emerald-500 to-teal-500 shadow-emerald-500/40 animate-pulse'
                  : 'bg-gradient-to-tr from-sky-600 to-indigo-600 shadow-sky-500/20'
              }`}
              style={{
                transform: `scale(${phase === 'humming' ? 1.1 + Math.sin(phaseProgress * Math.PI) * 0.2 : 0.9 + phaseProgress * 0.2})`
              }}
            >
              <span className="text-2xl font-black text-white tracking-widest">
                {selectedHum.vowelSound}
              </span>
              <span className="text-[10px] font-bold uppercase text-white/80 mt-1">
                {phase === 'inhale' ? 'Inhalar aire (4s)' : 'Vibrar garganta (8s)'}
              </span>
            </div>
          </div>
        </div>

        {/* Phase Duration Indicator */}
        <div className="text-center space-y-1">
          <div className="text-3xl font-extrabold text-white font-mono">
            {Math.ceil((phase === 'inhale' ? selectedHum.inhaleSeconds : selectedHum.hummingSeconds) * (1 - phaseProgress))}s
          </div>
          <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
            {phase === 'inhale' ? 'Inspiración Nasal' : 'Exhalación Vagal VIBRANTE'}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={resetSession}
            className="p-3 bg-slate-900 border border-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={toggleSession}
            className={`px-8 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-xl transition-all ${
              isActive
                ? 'bg-rose-600 hover:bg-rose-500 text-white'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-950'
            }`}
          >
            {isActive ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            <span>{isActive ? 'Pausar Tarareo' : 'Iniciar Tarareo'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
