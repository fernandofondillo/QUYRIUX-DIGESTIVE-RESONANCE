import React, { useState } from 'react';
import { X, Settings, Eye, Type, Volume2, Vibrate, Check, Moon, Sun } from 'lucide-react';
import { UserProfile } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfile: (p: UserProfile) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile
}) => {
  const [formProfile, setFormProfile] = useState<UserProfile>(profile);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-sky-400" />
            Configuración y Preferencias
          </h2>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
          {/* User Name */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Nombre o Apodo:</label>
            <input
              type="text"
              value={formProfile.name}
              onChange={(e) => setFormProfile({ ...formProfile, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Daily Goal */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Meta Diaria de Relajación (minutos):</label>
            <input
              type="number"
              min="5"
              max="60"
              value={formProfile.dailyGoalMinutes}
              onChange={(e) => setFormProfile({ ...formProfile, dailyGoalMinutes: parseInt(e.target.value) || 15 })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium flex items-center gap-2">
                <Eye className="w-4 h-4 text-sky-400" /> Modo Alto Contraste
              </span>
              <input
                type="checkbox"
                checked={formProfile.highContrast}
                onChange={(e) => setFormProfile({ ...formProfile, highContrast: e.target.checked })}
                className="w-4 h-4 accent-sky-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium flex items-center gap-2">
                <Type className="w-4 h-4 text-emerald-400" /> Modo Texto Grande
              </span>
              <input
                type="checkbox"
                checked={formProfile.largeText}
                onChange={(e) => setFormProfile({ ...formProfile, largeText: e.target.checked })}
                className="w-4 h-4 accent-sky-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium flex items-center gap-2">
                <Vibrate className="w-4 h-4 text-purple-400" /> Vibración Háptica Activada
              </span>
              <input
                type="checkbox"
                checked={formProfile.hapticsEnabled}
                onChange={(e) => setFormProfile({ ...formProfile, hapticsEnabled: e.target.checked })}
                className="w-4 h-4 accent-sky-500"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-800 text-slate-400 font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
