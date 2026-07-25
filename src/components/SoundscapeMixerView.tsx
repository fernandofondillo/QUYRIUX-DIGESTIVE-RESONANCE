import React, { useState, useEffect } from 'react';
import { 
  Music, 
  Volume2, 
  VolumeX, 
  Clock, 
  Heart, 
  Play, 
  Pause, 
  Sliders, 
  Sparkles,
  Check
} from 'lucide-react';
import { SOUND_TRACKS } from '../data/initialData';
import { SoundTrack } from '../types';
import { audioEngine } from '../services/audioEngine';

interface ActiveTrackState {
  trackId: string;
  volume: number; // 0 to 1
  isPlaying: boolean;
}

export const SoundscapeMixerView: React.FC = () => {
  const [activeTracks, setActiveTracks] = useState<Record<string, ActiveTrackState>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [favorites, setFavorites] = useState<string[]>(['piano-ambient', 'mar-profundo']);
  const [timerMinutes, setTimerMinutes] = useState<number>(0);
  const [timerRemainingSeconds, setTimerRemainingSeconds] = useState<number | null>(null);

  // Sleep timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRemainingSeconds !== null && timerRemainingSeconds > 0) {
      interval = setInterval(() => {
        setTimerRemainingSeconds(prev => (prev && prev > 1 ? prev - 1 : 0));
      }, 1000);
    } else if (timerRemainingSeconds === 0) {
      // Timer finished, stop all sounds
      audioEngine.stopAllAmbient();
      setActiveTracks({});
      setTimerRemainingSeconds(null);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRemainingSeconds]);

  const toggleTrack = (track: SoundTrack) => {
    const existing = activeTracks[track.id];
    if (existing && existing.isPlaying) {
      // Stop
      audioEngine.stopAmbientTrack(track.id);
      setActiveTracks(prev => {
        const copy = { ...prev };
        delete copy[track.id];
        return copy;
      });
    } else {
      // Start
      const vol = existing ? existing.volume : 0.5;
      audioEngine.startAmbientTrack(track.id, track.synthType, vol, track.baseFreq);
      setActiveTracks(prev => ({
        ...prev,
        [track.id]: { trackId: track.id, volume: vol, isPlaying: true }
      }));
    }
  };

  const handleVolumeChange = (trackId: string, synthType: string, baseFreq: number | undefined, vol: number) => {
    const existing = activeTracks[trackId];
    if (existing) {
      audioEngine.setAmbientVolume(trackId, vol);
      setActiveTracks(prev => ({
        ...prev,
        [trackId]: { ...prev[trackId], volume: vol }
      }));
    } else {
      audioEngine.startAmbientTrack(trackId, synthType, vol, baseFreq);
      setActiveTracks(prev => ({
        ...prev,
        [trackId]: { trackId, volume: vol, isPlaying: true }
      }));
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const startSleepTimer = (mins: number) => {
    setTimerMinutes(mins);
    if (mins > 0) {
      setTimerRemainingSeconds(mins * 60);
    } else {
      setTimerRemainingSeconds(null);
    }
  };

  const stopAll = () => {
    audioEngine.stopAllAmbient();
    setActiveTracks({});
    setTimerRemainingSeconds(null);
  };

  const filteredTracks = SOUND_TRACKS.filter(t => {
    if (selectedCategory === 'favoritos') return favorites.includes(t.id);
    if (selectedCategory === 'todos') return true;
    return t.category === selectedCategory;
  });

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'favoritos', label: 'Favoritos' },
    { id: 'piano', label: 'Piano' },
    { id: 'lluvia', label: 'Lluvia' },
    { id: 'bosque', label: 'Bosque' },
    { id: 'mar', label: 'Mar' },
    { id: 'ruido_rosa', label: 'Ruido Rosa' },
    { id: 'ruido_marron', label: 'Ruido Marrón' },
    { id: 'drones', label: 'Drones' },
    { id: 'paisajes', label: 'Paisajes' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-sky-400 bg-sky-950 border border-sky-800 px-2.5 py-0.5 rounded-full">
              Módulo 3: Mezclador de Paisajes Sonoros
            </span>
            <span className="text-xs text-slate-400">
              {Object.keys(activeTracks).length} canales activos
            </span>
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Music className="w-5 h-5 text-sky-400" />
            Biblioteca de Audio Sintético Relajante
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mt-0.5">
            Combina múltiples capas de sonido sintetizado para enmascarar ruidos y reducir el estrés somático.
          </p>
        </div>

        {/* Global Controls & Sleep Timer */}
        <div className="flex items-center gap-2">
          {Object.keys(activeTracks).length > 0 && (
            <button
              onClick={stopAll}
              className="px-3 py-2 bg-rose-950 border border-rose-800 text-rose-300 rounded-xl text-xs font-semibold hover:bg-rose-900 transition-colors"
            >
              Detener Todo
            </button>
          )}

          {/* Timer Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs">
            <Clock className="w-4 h-4 text-slate-400 ml-1.5" />
            {[0, 15, 30, 60].map(m => (
              <button
                key={m}
                onClick={() => startSleepTimer(m)}
                className={`px-2 py-1 rounded-lg font-medium transition-colors ${
                  timerMinutes === m ? 'bg-sky-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {m === 0 ? 'Off' : `${m}m`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timer Countdown Banner */}
      {timerRemainingSeconds !== null && (
        <div className="bg-sky-950/60 border border-sky-800 rounded-xl px-4 py-2 text-xs text-sky-200 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-400 animate-pulse" />
            Temporizador de apagar activo:
          </span>
          <span className="font-mono font-bold text-white">
            {Math.floor(timerRemainingSeconds / 60)}m {(timerRemainingSeconds % 60).toString().padStart(2, '0')}s
          </span>
        </div>
      )}

      {/* Categories Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 ${
              selectedCategory === cat.id
                ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-950'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Sound Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTracks.map(track => {
          const activeState = activeTracks[track.id];
          const isPlaying = !!activeState?.isPlaying;
          const isFav = favorites.includes(track.id);
          const currentVol = activeState ? activeState.volume : 0.5;

          return (
            <div
              key={track.id}
              className={`bg-slate-900 border rounded-2xl p-4 transition-all ${
                isPlaying ? 'border-sky-500/80 shadow-lg shadow-sky-950/50' : 'border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[9px] uppercase font-bold text-sky-400 bg-sky-950 border border-sky-900 px-2 py-0.5 rounded-md">
                    {track.category}
                  </span>
                  <h3 className="font-bold text-white text-sm mt-1.5">{track.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{track.description}</p>
                </div>

                <button
                  onClick={() => toggleFavorite(track.id)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isFav ? 'text-rose-500' : 'text-slate-600 hover:text-slate-300'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Player Controls & Volume Slider */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <button
                  onClick={() => toggleTrack(track)}
                  className={`p-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                    isPlaying
                      ? 'bg-sky-500 text-slate-950 font-extrabold shadow-md'
                      : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isPlaying ? 'Pausar' : 'Reproducir'}</span>
                </button>

                <div className="flex items-center gap-2 flex-1 max-w-[140px]">
                  <Volume2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={currentVol}
                    onChange={(e) => handleVolumeChange(track.id, track.synthType, track.baseFreq, parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
