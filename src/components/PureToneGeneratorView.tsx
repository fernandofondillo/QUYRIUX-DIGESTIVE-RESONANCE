import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Play, 
  Square, 
  AlertCircle, 
  Volume2, 
  Info, 
  ShieldAlert, 
  Sparkles 
} from 'lucide-react';
import { PURE_TONES } from '../data/initialData';
import { ToneFrequency } from '../types';
import { audioEngine } from '../services/audioEngine';

export const PureToneGeneratorView: React.FC = () => {
  const [selectedTone, setSelectedTone] = useState<ToneFrequency>(PURE_TONES[10]); // 432 Hz default
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.2);

  useEffect(() => {
    return () => {
      audioEngine.stopPureTone();
    };
  }, []);

  const toggleTone = () => {
    if (isPlaying) {
      audioEngine.stopPureTone();
      setIsPlaying(false);
    } else {
      audioEngine.startPureTone(selectedTone.hz, volume);
      setIsPlaying(true);
    }
  };

  const selectFrequency = (tone: ToneFrequency) => {
    setSelectedTone(tone);
    if (isPlaying) {
      audioEngine.startPureTone(tone.hz, volume);
    }
  };

  const handleVolumeChange = (vol: number) => {
    setVolume(vol);
    if (isPlaying) {
      audioEngine.startPureTone(selectedTone.hz, vol);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400 bg-amber-950 border border-amber-800 px-2.5 py-0.5 rounded-full">
              Módulo 4: Generador de Tonos Puros
            </span>
            <span className="text-xs text-slate-400">
              Herramienta Experimental Acústica
            </span>
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Radio className="w-5 h-5 text-amber-400" />
            Síntesis Onda Senoidal Pura
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mt-0.5">
            Genera frecuencias precisas de 40 Hz a 963 Hz para focalización y experimentos de relajación auditiva.
          </p>
        </div>

        {/* Master Player Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 p-2 rounded-xl">
            <Volume2 className="w-4 h-4 text-slate-400" />
            <input
              type="range"
              min="0.01"
              max="0.5"
              step="0.01"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-24 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          <button
            onClick={toggleTone}
            className={`px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg ${
              isPlaying
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950'
                : 'bg-amber-600 hover:bg-amber-500 text-slate-950 font-extrabold shadow-amber-950'
            }`}
          >
            {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isPlaying ? 'Detener Tono' : 'Emitir Tono Puro'}</span>
          </button>
        </div>
      </div>

      {/* Mandatory Scientific Disclaimer Card */}
      <div className="bg-amber-950/40 border border-amber-800/80 rounded-2xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-200/90 leading-relaxed">
          <strong className="text-amber-300 block mb-0.5">Aviso de Responsabilidad Científica:</strong>
          “No existe evidencia científica sólida que demuestre que una frecuencia específica trate el reflujo o la hiperacidez.”
          <span className="block text-slate-400 text-[11px] mt-1">
            Los tonos puros deben utilizarse como herramientas de concentración o ambientación sin fines médicos directos.
          </span>
        </div>
      </div>

      {/* Selected Frequency Detail Banner */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-inner">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-slate-900 border border-amber-500/40 rounded-2xl flex flex-col items-center justify-center shrink-0">
            <span className="text-2xl font-black text-amber-400 font-mono">{selectedTone.hz}</span>
            <span className="text-[10px] font-bold text-slate-400">Hz</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-amber-950 border border-amber-900 px-2 py-0.5 rounded-md">
              {selectedTone.category}
            </span>
            <h3 className="text-base font-bold text-white">{selectedTone.name}</h3>
            <p className="text-xs text-slate-300">
              <strong>Uso sugerido:</strong> {selectedTone.suggestedUse}
            </p>
            <p className="text-xs text-slate-400">
              <strong>Notas:</strong> {selectedTone.scientificNotes}
            </p>
          </div>
        </div>

        {isPlaying && (
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold bg-amber-950/80 border border-amber-800 px-4 py-2 rounded-xl animate-pulse shrink-0">
            <Radio className="w-4 h-4" />
            <span>Emitiendo Onda Senoidal {selectedTone.hz} Hz</span>
          </div>
        )}
      </div>

      {/* Frequencies Grid Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {PURE_TONES.map(t => {
          const isSel = selectedTone.hz === t.hz;
          return (
            <button
              key={t.hz}
              onClick={() => selectFrequency(t)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isSel
                  ? 'bg-amber-950/80 border-amber-500 text-white font-bold shadow-lg shadow-amber-950/50'
                  : 'bg-slate-900 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className="text-lg font-extrabold text-amber-400 font-mono">{t.hz} Hz</div>
              <div className="text-[11px] font-medium text-slate-300 mt-0.5 line-clamp-1">{t.name.split('-')[1] || t.name}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
