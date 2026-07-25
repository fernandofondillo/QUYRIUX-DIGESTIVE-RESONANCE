import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX, 
  Info, 
  CheckCircle2, 
  Sparkles,
  Wind,
  Layers,
  Sliders,
  ShieldCheck
} from 'lucide-react';
import { BREATHING_PROTOCOLS } from '../data/initialData';
import { BreathingProtocol } from '../types';
import { audioEngine } from '../services/audioEngine';
import { hapticEngine } from '../services/hapticEngine';

interface BreathingSessionViewProps {
  onSessionComplete: (protocolName: string, durationSeconds: number) => void;
  hapticsEnabled: boolean;
  soundVolume: number;
}

export const BreathingSessionView: React.FC<BreathingSessionViewProps> = ({
  onSessionComplete,
  hapticsEnabled,
  soundVolume
}) => {
  const [selectedProtocol, setSelectedProtocol] = useState<BreathingProtocol>(BREATHING_PROTOCOLS[0]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [phase, setPhase] = useState<'inhale' | 'holdIn' | 'exhale' | 'holdOut'>('inhale');
  const [phaseProgress, setPhaseProgress] = useState<number>(0); // 0 to 1
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [visualMode, setVisualMode] = useState<'circulos' | 'ondas' | 'particulas' | 'gradientes' | 'luz'>('circulos');
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const phaseStartTimeRef = useRef<number>(0);

  const pattern = selectedProtocol.pattern;

  // Cycle phase handler
  const getPhaseDuration = (p: 'inhale' | 'holdIn' | 'exhale' | 'holdOut') => {
    switch (p) {
      case 'inhale': return pattern.inhale;
      case 'holdIn': return pattern.holdIn;
      case 'exhale': return pattern.exhale;
      case 'holdOut': return pattern.holdOut;
    }
  };

  const getNextPhase = (current: 'inhale' | 'holdIn' | 'exhale' | 'holdOut') => {
    if (current === 'inhale') return pattern.holdIn > 0 ? 'holdIn' : 'exhale';
    if (current === 'holdIn') return 'exhale';
    if (current === 'exhale') return pattern.holdOut > 0 ? 'holdOut' : 'inhale';
    return 'inhale';
  };

  // Main Timer & Animation Loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);

      phaseStartTimeRef.current = performance.now();

      const loop = () => {
        const now = performance.now();
        const durationSec = getPhaseDuration(phase);
        const durationMs = durationSec * 1000;
        const elapsedInPhase = now - phaseStartTimeRef.current;

        const prog = Math.min(1, elapsedInPhase / durationMs);
        setPhaseProgress(prog);

        if (prog >= 1) {
          const next = getNextPhase(phase);
          setPhase(next);
          phaseStartTimeRef.current = performance.now();

          // Trigger audio & haptics on phase transition
          if (soundVolume > 0) {
            audioEngine.playBreathingCue(next);
          }
          if (hapticsEnabled) {
            hapticEngine.triggerPhase(next);
          }
        }

        animationFrameRef.current = requestAnimationFrame(loop);
      };

      animationFrameRef.current = requestAnimationFrame(loop);
    } else {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isActive, phase, selectedProtocol]);

  const toggleSession = () => {
    if (!isActive) {
      setIsActive(true);
      setPhase('inhale');
      phaseStartTimeRef.current = performance.now();
      if (soundVolume > 0) audioEngine.playBreathingCue('inhale');
      if (hapticsEnabled) hapticEngine.triggerPhase('inhale');
    } else {
      setIsActive(false);
      if (elapsedSeconds > 30) {
        onSessionComplete(selectedProtocol.name, elapsedSeconds);
      }
    }
  };

  const resetSession = () => {
    setIsActive(false);
    setElapsedSeconds(0);
    setPhase('inhale');
    setPhaseProgress(0);
  };

  const toggleFullscreenMode = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Compute visual circle scale
  let circleScale = 1.0;
  if (phase === 'inhale') {
    circleScale = 1.0 + phaseProgress * 0.8; // 1.0 -> 1.8
  } else if (phase === 'holdIn') {
    circleScale = 1.8;
  } else if (phase === 'exhale') {
    circleScale = 1.8 - phaseProgress * 0.8; // 1.8 -> 1.0
  } else {
    circleScale = 1.0;
  }

  // Compute SVG parameters for animated circle guide
  const getPhaseColors = (p: 'inhale' | 'holdIn' | 'exhale' | 'holdOut') => {
    switch (p) {
      case 'inhale':
        return { start: '#38bdf8', end: '#10b981', main: '#38bdf8', glow: 'rgba(56, 189, 248, 0.4)' };
      case 'holdIn':
        return { start: '#a855f7', end: '#6366f1', main: '#a855f7', glow: 'rgba(168, 85, 247, 0.4)' };
      case 'exhale':
        return { start: '#10b981', end: '#14b8a6', main: '#10b981', glow: 'rgba(16, 185, 129, 0.4)' };
      case 'holdOut':
        return { start: '#f59e0b', end: '#d97706', main: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)' };
    }
  };

  const theme = getPhaseColors(phase);

  const minSvgRadius = 42;
  const maxSvgRadius = 108;
  let svgRadius = minSvgRadius;
  if (phase === 'inhale') {
    svgRadius = minSvgRadius + (maxSvgRadius - minSvgRadius) * phaseProgress;
  } else if (phase === 'holdIn') {
    svgRadius = maxSvgRadius;
  } else if (phase === 'exhale') {
    svgRadius = maxSvgRadius - (maxSvgRadius - minSvgRadius) * phaseProgress;
  } else {
    svgRadius = minSvgRadius;
  }

  const guideCircumference = 2 * Math.PI * 120; // ~753.98
  const strokeOffset = guideCircumference * (1 - phaseProgress);

  const phaseLabelMap = {
    inhale: 'INHALAR',
    holdIn: 'RETENER',
    exhale: 'EXHALAR',
    holdOut: 'PAUSA'
  };

  return (
    <div ref={containerRef} className="space-y-6 animate-in fade-in duration-300">
      {/* Header Selector & Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-sky-400 bg-sky-950 border border-sky-800 px-2.5 py-0.5 rounded-full">
              Módulo 1: Respiración Guiada
            </span>
            <span className="text-xs text-slate-400">
              {selectedProtocol.targetRpm} rpm
            </span>
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Wind className="w-5 h-5 text-sky-400" />
            {selectedProtocol.name}
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mt-0.5">
            {selectedProtocol.subtitle}
          </p>
        </div>

        {/* Protocol Selector Dropdown */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedProtocol.id}
            onChange={(e) => {
              const p = BREATHING_PROTOCOLS.find(item => item.id === e.target.value);
              if (p) {
                setSelectedProtocol(p);
                resetSession();
              }
            }}
            className="bg-slate-950 border border-slate-800 text-white text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none focus:border-sky-500"
          >
            {BREATHING_PROTOCOLS.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.pattern.inhale}-{p.pattern.holdIn}-{p.pattern.exhale}-{p.pattern.holdOut})
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowInfo(!showInfo)}
            className={`p-2 rounded-xl border text-xs font-medium transition-colors ${
              showInfo ? 'bg-sky-950 border-sky-800 text-sky-300' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Información y Fundamento Científico"
          >
            <Info className="w-4 h-4" />
          </button>

          <button
            onClick={toggleFullscreenMode}
            className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
            title="Modo Pantalla Completa"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Scientific Info Box */}
      {showInfo && (
        <div className="bg-slate-900/90 border border-sky-900/50 rounded-2xl p-5 text-xs space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-sky-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Fundamento Fisiológico & Evidencia</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            {selectedProtocol.description}
          </p>
          <div className="space-y-1">
            <span className="font-semibold text-white block">Beneficios Demostrados:</span>
            <ul className="list-disc list-inside text-slate-300 space-y-0.5">
              {selectedProtocol.scientificBenefits.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Main Interactive Animated Breathing Stage */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[420px] relative overflow-hidden shadow-inner">
        {/* Visual Background Glow */}
        <div
          className="absolute rounded-full blur-3xl transition-all duration-300 opacity-20 pointer-events-none"
          style={{
            width: `${circleScale * 200}px`,
            height: `${circleScale * 200}px`,
            backgroundColor: phase === 'inhale' ? '#38bdf8' : phase === 'exhale' ? '#10b981' : '#a855f7'
          }}
        />

        {/* Visual Mode Selector Pills */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-slate-900/80 border border-slate-800 p-1 rounded-xl text-[10px]">
          {(['circulos', 'ondas', 'particulas', 'gradientes', 'luz'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setVisualMode(mode)}
              className={`px-2 py-1 rounded-lg uppercase tracking-wider font-semibold transition-all ${
                visualMode === mode ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Timer Display */}
        <div className="absolute top-4 right-4 z-10 text-xs font-mono text-slate-400 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl">
          {Math.floor(elapsedSeconds / 60).toString().padStart(2, '0')}:
          {(elapsedSeconds % 60).toString().padStart(2, '0')}
        </div>

        {/* Central Animated Breathing Canvas / SVG Pacing Guide Circle */}
        <div className="relative flex items-center justify-center my-6">
          <svg viewBox="0 0 300 300" className="w-72 h-72 sm:w-80 sm:h-80 select-none overflow-visible">
            <defs>
              {/* Main Phase Gradient */}
              <linearGradient id="breathPhaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={theme.start} />
                <stop offset="100%" stopColor={theme.end} />
              </linearGradient>

              {/* Glowing Radial Fill */}
              <radialGradient id="breathOrbRadial" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={theme.start} stopOpacity="0.85" />
                <stop offset="70%" stopColor={theme.end} stopOpacity="0.5" />
                <stop offset="100%" stopColor={theme.end} stopOpacity="0.1" />
              </radialGradient>

              {/* Subtle Neon Drop Shadow Filter */}
              <filter id="svgGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Static Max Expansion Guide Track Ring */}
            <circle
              cx="150"
              cy="150"
              r="120"
              fill="none"
              stroke="#1e293b"
              strokeWidth="2"
              strokeDasharray="4 6"
            />

            {/* Cardinal Direction Tick Marks on Guide Ring */}
            {[0, 90, 180, 270].map((angle, idx) => (
              <line
                key={idx}
                x1={150 + 114 * Math.cos((angle * Math.PI) / 180)}
                y1={150 + 114 * Math.sin((angle * Math.PI) / 180)}
                x2={150 + 126 * Math.cos((angle * Math.PI) / 180)}
                y2={150 + 126 * Math.sin((angle * Math.PI) / 180)}
                stroke="#334155"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ))}

            {/* Phase Progress Arc Overlay around Guide Ring */}
            <circle
              cx="150"
              cy="150"
              r="120"
              fill="none"
              stroke="url(#breathPhaseGrad)"
              strokeWidth="4"
              strokeDasharray={guideCircumference}
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
              transform="rotate(-90 150 150)"
              className="transition-[stroke-dashoffset] duration-75"
            />

            {/* Expanding/Contracting SVG Outer Wave Ripple */}
            <circle
              cx="150"
              cy="150"
              r={Math.min(130, svgRadius + 16)}
              fill="none"
              stroke={theme.start}
              strokeWidth="1.5"
              opacity={0.35}
              strokeDasharray="6 6"
            />

            {/* Main Expanding and Contracting Animated SVG Circle */}
            <circle
              cx="150"
              cy="150"
              r={svgRadius}
              fill="url(#breathOrbRadial)"
              stroke="url(#breathPhaseGrad)"
              strokeWidth="3.5"
              filter="url(#svgGlowFilter)"
              className="transition-[r] duration-75 ease-linear"
            />

            {/* Center Phase Text in SVG */}
            <text
              x="150"
              y="146"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white font-extrabold text-sm uppercase tracking-widest select-none pointer-events-none drop-shadow-md"
            >
              {phaseLabelMap[phase]}
            </text>

            {/* Center Subtext / Countdown inside Circle */}
            <text
              x="150"
              y="166"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-slate-200 font-mono font-bold text-xs select-none pointer-events-none"
            >
              {Math.ceil(getPhaseDuration(phase) * (1 - phaseProgress))}s
            </text>
          </svg>
        </div>

        {/* Phase Duration Countdown Indicator */}
        <div className="text-center space-y-1 z-10">
          <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
            {Math.ceil(getPhaseDuration(phase) * (1 - phaseProgress))}s
          </div>
          <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
            {phaseLabelMap[phase]} ({getPhaseDuration(phase)}s)
          </div>
        </div>

        {/* Controls Bar */}
        <div className="mt-8 flex items-center gap-4 z-10">
          <button
            onClick={resetSession}
            className="p-3 bg-slate-900 border border-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
            title="Reiniciar"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={toggleSession}
            className={`px-8 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-xl transition-all transform active:scale-95 ${
              isActive
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950'
                : 'bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white shadow-sky-950'
            }`}
          >
            {isActive ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            <span>{isActive ? 'Pausar Sesión' : 'Iniciar Respiración'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
