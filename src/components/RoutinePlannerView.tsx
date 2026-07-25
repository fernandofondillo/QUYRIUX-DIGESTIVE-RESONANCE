import React from 'react';
import { CalendarDays, Sun, Utensils, Sunrise, Moon, Play, CheckCircle2 } from 'lucide-react';
import { UserProfile, CheckInLog } from '../types';

interface RoutinePlannerViewProps {
  checkIns: CheckInLog[];
  onNavigateTab: (tab: any) => void;
}

export const RoutinePlannerView: React.FC<RoutinePlannerViewProps> = ({ checkIns, onNavigateTab }) => {
  const latestCheck = checkIns[0]?.ratings;

  const routineSlots = [
    {
      timeSlot: 'Rutina Mañana (08:00)',
      icon: Sunrise,
      color: 'text-amber-400',
      bg: 'bg-amber-950/40 border-amber-800/80',
      title: 'Despertar Vagal & Activación Neutra',
      description: '5 minutos de Respiración Coherente (5s in / 5s out) para estabilizar la arritmia sinusal respiratoria al iniciar la jornada.',
      targetTab: 'respiracion'
    },
    {
      timeSlot: 'Rutina Post-Comidas (14:30)',
      icon: Utensils,
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/40 border-emerald-800/80',
      title: 'Reposo Post-Prandial & Paseo Corto',
      description: 'Caminar 10 minutos a paso suave + 5 minutos de respiración diafragmática para favorecer el vaciado estomacal y reforzar el esfínter esofágico.',
      targetTab: 'habitos'
    },
    {
      timeSlot: 'Rutina Tarde (18:30)',
      icon: Sun,
      color: 'text-sky-400',
      bg: 'bg-sky-950/40 border-sky-800/80',
      title: 'Pausa de Despresurización & Tarareo',
      description: '3 minutos de Tarareo Vagal "Mmmmm" (110 Hz) con vibración háptica para cortar la tensión acumulada durante la jornada laboral.',
      targetTab: 'tarareo'
    },
    {
      timeSlot: 'Rutina Noche (22:30)',
      icon: Moon,
      color: 'text-indigo-400',
      bg: 'bg-indigo-950/40 border-indigo-800/80',
      title: 'Desconexión Parasimpática Pre-Sueño',
      description: '10 minutos de Respiración 4-7-8 con ruido marrón de fondo. Elevar la cabecera de la cama 10 cm y acostarse sobre el lado izquierdo.',
      targetTab: 'protocolos'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-sky-400 bg-sky-950 border border-sky-800 px-2.5 py-0.5 rounded-full">
              Módulo 11: Planificador de Rutinas
            </span>
            <span className="text-xs text-slate-400">
              Secuencia Automatizada Diaria
            </span>
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-sky-400" />
            Planificación Vagal Adaptada
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mt-0.5">
            Cronograma diario auto-generado por el motor de reglas según tu nivel de estrés y tolerancia digestiva.
          </p>
        </div>
      </div>

      {/* Routine Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {routineSlots.map((slot, idx) => {
          const Icon = slot.icon;
          return (
            <div key={idx} className={`border rounded-2xl p-5 space-y-3 ${slot.bg}`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${slot.color}`}>
                  <Icon className="w-4 h-4" />
                  {slot.timeSlot}
                </span>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-md">
                  Auto-Asignado
                </span>
              </div>

              <h3 className="text-sm font-bold text-white">{slot.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{slot.description}</p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigateTab(slot.targetTab)}
                  className="w-full py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 text-sky-400 fill-current" />
                  <span>Ejecutar Rutina</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
