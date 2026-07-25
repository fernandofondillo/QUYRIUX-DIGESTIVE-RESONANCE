import React, { useState } from 'react';
import { 
  X, 
  Flame, 
  Activity, 
  Brain, 
  Smile, 
  ShieldAlert, 
  Zap, 
  Moon, 
  Heart, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import { SymptomRating, CheckInLog } from '../types';

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ratings: SymptomRating, timeOfDay: CheckInLog['timeOfDay']) => void;
}

const RATING_METRICS: {
  key: keyof SymptomRating;
  label: string;
  icon: React.FC<{ className?: string }>;
  color: string;
  lowLabel: string;
  highLabel: string;
}[] = [
  { key: 'acidez', label: 'Acidez / Ardor Gástrico', icon: Flame, color: 'text-amber-400', lowLabel: 'Sin ardor', highLabel: 'Ardor intenso' },
  { key: 'reflujo', label: 'Reflujo / Regurgitación', icon: ShieldAlert, color: 'text-rose-400', lowLabel: 'Sin reflujo', highLabel: 'Reflujo constante' },
  { key: 'estres', label: 'Nivel de Estrés / Tensión', icon: Brain, color: 'text-sky-400', lowLabel: 'Relajado', highLabel: 'Muy estresado' },
  { key: 'ansiedad', label: 'Ansiedad Somática', icon: Heart, color: 'text-purple-400', lowLabel: 'Tranquilo', highLabel: 'Nudo en estómago' },
  { key: 'dolor', label: 'Dolor / Malestar Abdominal', icon: Activity, color: 'text-orange-400', lowLabel: 'Sin dolor', highLabel: 'Dolor agudo' },
  { key: 'nauseas', label: 'Náuseas / Pesadez', icon: Smile, color: 'text-teal-400', lowLabel: 'Digestión ligera', highLabel: 'Náuseas marcadas' },
  { key: 'energia', label: 'Nivel de Energía Vital', icon: Zap, color: 'text-emerald-400', lowLabel: 'Fatiga', highLabel: 'Máxima energía' },
  { key: 'sueno', label: 'Calidad de Sueño Reciente', icon: Moon, color: 'text-indigo-400', lowLabel: 'Mal descanso', highLabel: 'Sueño reparador' }
];

export const CheckInModal: React.FC<CheckInModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [ratings, setRatings] = useState<SymptomRating>({
    acidez: 2,
    reflujo: 2,
    estres: 4,
    ansiedad: 3,
    dolor: 1,
    nauseas: 1,
    energia: 7,
    sueno: 7
  });

  const [timeOfDay, setTimeOfDay] = useState<CheckInLog['timeOfDay']>('tarde');

  if (!isOpen) return null;

  const handleSliderChange = (key: keyof SymptomRating, val: number) => {
    setRatings(prev => ({ ...prev, [key]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(ratings, timeOfDay);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-950 to-emerald-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-sky-400" />
              ¿Cómo te encuentras ahora?
            </h2>
            <p className="text-xs text-slate-400">
              Evaluación multidimensional de estado digestivo y estrés somático
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Time of Day selector */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-400" /> Moment del día:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'mañana', label: 'Mañana' },
                { id: 'post_comida', label: 'Post-Comida' },
                { id: 'tarde', label: 'Tarde' },
                { id: 'noche', label: 'Noche' }
              ].map(slot => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setTimeOfDay(slot.id as CheckInLog['timeOfDay'])}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                    timeOfDay === slot.id
                      ? 'bg-sky-600 border-sky-400 text-white font-bold shadow-md shadow-sky-950'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rating Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RATING_METRICS.map(item => {
              const Icon = item.icon;
              const val = (ratings[item.key] as number) || 0;
              return (
                <div key={item.key} className="bg-slate-950 border border-slate-800/80 p-3.5 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${item.color}`} />
                      {item.label}
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                      val >= 7 ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                      val >= 4 ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {val} / 10
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={val}
                    onChange={(e) => handleSliderChange(item.key, parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  />

                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>{item.lowLabel}</span>
                    <span>{item.highLabel}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Submit */}
          <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 text-xs font-semibold hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-sky-950 transition-all transform active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              Guardar Evaluación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
