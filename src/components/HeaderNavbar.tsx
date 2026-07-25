import React from 'react';
import { 
  Activity, 
  Sparkles, 
  Eye, 
  Type, 
  Volume2, 
  VolumeX, 
  Settings, 
  HeartPulse,
  PlusCircle
} from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderNavbarProps {
  profile: UserProfile;
  onUpdateProfile: (p: UserProfile) => void;
  onOpenCheckIn: () => void;
  onOpenSettings: () => void;
  vagalScore: number;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  profile,
  onUpdateProfile,
  onOpenCheckIn,
  onOpenSettings,
  vagalScore
}) => {
  const toggleHighContrast = () => {
    onUpdateProfile({ ...profile, highContrast: !profile.highContrast });
  };

  const toggleLargeText = () => {
    onUpdateProfile({ ...profile, largeText: !profile.largeText });
  };

  const toggleMute = () => {
    onUpdateProfile({ 
      ...profile, 
      soundVolume: profile.soundVolume > 0 ? 0 : 0.8 
    });
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 p-0.5 shadow-lg shadow-sky-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Activity className="w-5 h-5 text-sky-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold tracking-tight text-white text-base md:text-lg">
                QUYRIUX
              </h1>
              <span className="text-[10px] uppercase tracking-widest bg-sky-950 text-sky-300 border border-sky-800 px-2 py-0.5 rounded-full font-semibold">
                Digestive Resonance
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Modulación Vagal & Bienestar Digestivo
            </p>
          </div>
        </div>

        {/* Action Controls & Score */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Vagal Score Badge */}
          <div className="hidden md:flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs">
            <HeartPulse className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-slate-400 block text-[10px]">Tono Vagal</span>
              <span className="font-bold text-emerald-400">{vagalScore}/100</span>
            </div>
          </div>

          {/* Quick Check-In Button */}
          <button
            onClick={onOpenCheckIn}
            className="flex items-center gap-1.5 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-md shadow-sky-950 transition-all transform active:scale-95"
            title="Registrar cómo te encuentras ahora"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Check-In Síntomas</span>
          </button>

          {/* Quick Accessibility Toggles */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={toggleHighContrast}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                profile.highContrast ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Modo Alto Contraste"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={toggleLargeText}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                profile.largeText ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="Modo Texto Grande"
            >
              <Type className="w-4 h-4" />
            </button>
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
              title={profile.soundVolume === 0 ? "Activar Sonido" : "Silenciar Audio"}
            >
              {profile.soundVolume === 0 ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              )}
            </button>
          </div>

          {/* Settings Trigger */}
          <button
            onClick={onOpenSettings}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition-colors"
            title="Configuración"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
