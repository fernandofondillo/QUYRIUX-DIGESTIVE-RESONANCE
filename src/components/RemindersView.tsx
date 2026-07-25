import React, { useState } from 'react';
import { BellRing, Check, Clock, Plus, ShieldCheck } from 'lucide-react';
import { notificationService, ReminderItem } from '../services/notificationService';

export const RemindersView: React.FC = () => {
  const [reminders, setReminders] = useState<ReminderItem[]>(notificationService.getReminders());

  const toggleReminder = (id: string) => {
    const updated = notificationService.toggleReminder(id);
    setReminders(updated);
  };

  const handleRequestPermission = () => {
    notificationService.requestPermission().then(granted => {
      if (granted) {
        notificationService.sendNotification('Quyriux Notificaciones Activas', 'Recibirás recordatorios para cuidar tu tono vagal y salud digestiva.');
      }
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-sky-400 bg-sky-950 border border-sky-800 px-2.5 py-0.5 rounded-full">
              Módulo 12: Notificaciones & Recordatorios
            </span>
            <span className="text-xs text-slate-400">
              Gestor de Alertas
            </span>
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BellRing className="w-5 h-5 text-sky-400" />
            Alertas de Adherencia Vagal
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mt-0.5">
            Recordatorios programables en el navegador para mantener una rutina constante de respiración, caminata e hidratación.
          </p>
        </div>

        <button
          onClick={handleRequestPermission}
          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-colors shadow-md shadow-sky-950"
        >
          <BellRing className="w-4 h-4" />
          <span>Permitir Notificaciones Web</span>
        </button>
      </div>

      {/* Reminders List */}
      <div className="space-y-3">
        {reminders.map(rem => (
          <div
            key={rem.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-slate-950 border border-slate-800 text-sky-400 rounded-xl">
                <Clock className="w-5 h-5" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{rem.title}</h3>
                <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2 font-mono">
                  <span>{rem.time} hs</span>
                  <span>•</span>
                  <span>{rem.days.join(', ')}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => toggleReminder(rem.id)}
              className={`w-12 h-6 rounded-full p-1 transition-colors relative ${
                rem.enabled ? 'bg-sky-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                  rem.enabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
