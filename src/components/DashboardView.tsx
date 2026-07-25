import React from 'react';
import { 
  HeartPulse, 
  Wind, 
  Clock, 
  Flame, 
  CheckCircle2, 
  Play, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Stethoscope, 
  Activity, 
  ChevronRight 
} from 'lucide-react';
import { UserProfile, CheckInLog } from '../types';
import { VagalWellnessScore } from '../services/ruleEngine';
import { GuidedProtocol, BreathingProtocol } from '../types';

interface DashboardViewProps {
  profile: UserProfile;
  vagalScore: VagalWellnessScore;
  recommended: {
    primaryGuided: GuidedProtocol;
    secondaryBreathing: BreathingProtocol;
    reasoning: string;
  };
  checkIns: CheckInLog[];
  onOpenCheckIn: () => void;
  onNavigateTab: (tab: any) => void;
  onStartProtocol: (protocolId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  vagalScore,
  recommended,
  checkIns,
  onOpenCheckIn,
  onNavigateTab,
  onStartProtocol
}) => {
  const latestCheckIn = checkIns[0]?.ratings;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Hero Welcome & Vagal Wellness Index Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/40 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 bg-sky-950 border border-sky-800/80 px-2.5 py-1 rounded-full">
                Estado del Día
              </span>
              <span className="text-xs text-slate-400">
                Racha activa: <strong className="text-amber-400">{profile.streakDays} días</strong>
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Bienvenido, {profile.name}
            </h2>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              {vagalScore.primaryDriver}
            </p>
          </div>

          {/* Vagal Score Dial */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shrink-0 shadow-inner">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="32" stroke="#1e293b" strokeWidth="6" fill="transparent" />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="#10b981"
                  strokeWidth="6"
                  strokeDasharray="201"
                  strokeDashoffset={201 - (201 * vagalScore.score) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-extrabold text-emerald-400">{vagalScore.score}</span>
                <span className="text-[9px] uppercase font-bold text-slate-400">Score</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-200">Índice Vagal</div>
              <div className="text-xs font-bold text-emerald-400 mt-0.5">{vagalScore.levelLabel}</div>
              <p className="text-[10px] text-slate-400 mt-1 max-w-[150px]">
                {vagalScore.recommendation}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-sky-400 mb-2">
            <Wind className="w-5 h-5" />
            <span className="text-[10px] text-slate-500 font-semibold uppercase">Acumulado</span>
          </div>
          <div className="text-2xl font-bold text-white">{profile.totalBreathsTaken}</div>
          <div className="text-xs text-slate-400 mt-1">Respiraciones Realizadas</div>
        </div>

        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <Clock className="w-5 h-5" />
            <span className="text-[10px] text-slate-500 font-semibold uppercase">Total</span>
          </div>
          <div className="text-2xl font-bold text-white">{profile.totalRelaxationMinutes} <span className="text-xs font-normal text-slate-400">min</span></div>
          <div className="text-xs text-slate-400 mt-1">Tiempo de Relajación</div>
        </div>

        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-purple-400 mb-2">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-[10px] text-slate-500 font-semibold uppercase">Sesiones</span>
          </div>
          <div className="text-2xl font-bold text-white">{profile.totalSessionsCompleted}</div>
          <div className="text-xs text-slate-400 mt-1">Ejercicios Completados</div>
        </div>

        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <Flame className="w-5 h-5" />
            <span className="text-[10px] text-slate-500 font-semibold uppercase">Adherencia</span>
          </div>
          <div className="text-2xl font-bold text-white">{profile.streakDays} <span className="text-xs font-normal text-slate-400">días</span></div>
          <div className="text-xs text-slate-400 mt-1">Racha Consecutiva</div>
        </div>
      </div>

      {/* Autonomous Recommendation Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-white text-base">Recomendación Personalizada Autónoma</h3>
          </div>
          <span className="text-[10px] bg-slate-950 text-slate-400 border border-slate-800 px-2.5 py-1 rounded-full">
            Motor de Reglas v1.0
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
          <strong>Fundamento:</strong> {recommended.reasoning}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Primary Recommended Guided Protocol */}
          <div className="bg-slate-950 border border-sky-900/50 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-sky-700/80 transition-all">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">
                  Protocolo Guiado Sugerido
                </span>
                <span className="text-[10px] text-slate-400">{recommended.primaryGuided.durationMinutes} min</span>
              </div>
              <h4 className="text-sm font-bold text-white">{recommended.primaryGuided.title}</h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{recommended.primaryGuided.description}</p>
            </div>
            <button
              onClick={() => {
                onNavigateTab('protocolos');
                onStartProtocol(recommended.primaryGuided.id);
              }}
              className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Iniciar Protocolo
            </button>
          </div>

          {/* Secondary Recommended Breathing Protocol */}
          <div className="bg-slate-950 border border-emerald-900/50 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-emerald-700/80 transition-all">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  Respiración Directa Sugerida
                </span>
                <span className="text-[10px] text-slate-400">{recommended.secondaryBreathing.recommendedDurationMinutes} min</span>
              </div>
              <h4 className="text-sm font-bold text-white">{recommended.secondaryBreathing.name}</h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{recommended.secondaryBreathing.description}</p>
            </div>
            <button
              onClick={() => {
                onNavigateTab('respiracion');
              }}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <Wind className="w-3.5 h-3.5" />
              Ir a Respiración Guiada
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={onOpenCheckIn}
          className="bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl p-4 text-left transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-950 border border-sky-800 text-sky-400 rounded-xl">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Nuevo Check-In de Síntomas</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Evalúa acidez, dolor y estrés</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition-colors" />
        </button>

        <button
          onClick={() => onNavigateTab('tarareo')}
          className="bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl p-4 text-left transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-950 border border-emerald-800 text-emerald-400 rounded-xl">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Tarareo Vagal (Humming)</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Vibración fonatoria 110-136 Hz</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
        </button>

        <button
          onClick={() => onNavigateTab('habitos')}
          className="bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl p-4 text-left transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-950 border border-purple-800 text-purple-400 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Checklist de Hábitos</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Paseo post-comida & postura</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
        </button>
      </div>
    </div>
  );
};
