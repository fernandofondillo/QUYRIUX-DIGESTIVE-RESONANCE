import React, { useState } from 'react';
import { CheckSquare, Check, X, ShieldCheck, Sparkles, Trophy, Info } from 'lucide-react';
import { DailyHabit } from '../types';
import { storageService } from '../services/storageService';

export const DigestiveHabitsView: React.FC = () => {
  const [habits, setHabits] = useState<DailyHabit[]>(storageService.getHabits());

  const handleToggle = (id: string) => {
    const updated = storageService.toggleHabit(id);
    setHabits(updated);
  };

  const completedCount = habits.filter(h => h.completed).length;
  const score = Math.round((completedCount / habits.length) * 100);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2.5 py-0.5 rounded-full">
              Módulo 8: Hábitos Digestivos Diarios
            </span>
            <span className="text-xs text-slate-400">
              Checklist de Adherencia
            </span>
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-emerald-400" />
            Hábitos con Evidencia Gastroenterológica
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mt-0.5">
            Registro diario de acciones posturales y conductuales que reducen mecánicamente el reflujo y la dispepsia.
          </p>
        </div>

        {/* Daily Habit Score Badge */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shrink-0 shadow-inner">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="28" cy="28" r="22" stroke="#1e293b" strokeWidth="4" fill="transparent" />
              <circle
                cx="28"
                cy="28"
                r="22"
                stroke="#10b981"
                strokeWidth="4"
                strokeDasharray="138"
                strokeDashoffset={138 - (138 * score) / 100}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <span className="absolute font-extrabold text-sm text-emerald-400 font-mono">{score}%</span>
          </div>

          <div>
            <div className="text-xs font-bold text-white">Puntuación de Hábitos</div>
            <div className="text-[11px] text-slate-400 mt-0.5">{completedCount} de {habits.length} completados</div>
          </div>
        </div>
      </div>

      {/* Habits Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {habits.map(habit => {
          return (
            <div
              key={habit.id}
              onClick={() => handleToggle(habit.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                habit.completed
                  ? 'bg-emerald-950/40 border-emerald-500/80 shadow-md shadow-emerald-950/20'
                  : 'bg-slate-900 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  habit.completed ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 border border-slate-700 text-transparent'
                }`}
              >
                <Check className="w-4 h-4 stroke-[3]" />
              </div>

              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={`text-sm font-bold ${habit.completed ? 'text-emerald-300 line-through opacity-90' : 'text-white'}`}>
                    {habit.title}
                  </h3>
                  <span className="text-[9px] uppercase font-bold text-slate-400 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-md">
                    Impacto {habit.impact}
                  </span>
                </div>

                <p className="text-xs text-slate-300">{habit.description}</p>

                <div className="pt-2 text-[11px] text-slate-400 italic flex items-center gap-1.5 border-t border-slate-800/50 mt-2">
                  <Info className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{habit.scientificTip}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
