import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Flame, 
  Brain, 
  Moon, 
  Activity, 
  PlusCircle, 
  Filter 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  AreaChart, 
  Area 
} from 'recharts';
import { CheckInLog } from '../types';

interface SymptomAnalyticsViewProps {
  checkIns: CheckInLog[];
  onOpenCheckIn: () => void;
}

export const SymptomAnalyticsView: React.FC<SymptomAnalyticsViewProps> = ({
  checkIns,
  onOpenCheckIn
}) => {
  const [selectedMetric, setSelectedMetric] = useState<'acidez' | 'estres' | 'reflujo' | 'sueno'>('acidez');

  // Format data for Recharts
  const chartData = checkIns
    .slice()
    .reverse()
    .map(log => ({
      fecha: new Date(log.timestamp).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      acidez: log.ratings.acidez,
      estres: log.ratings.estres,
      reflujo: log.ratings.reflujo,
      sueno: log.ratings.sueno,
      dolor: log.ratings.dolor,
      nauseas: log.ratings.nauseas
    }));

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-sky-400 bg-sky-950 border border-sky-800 px-2.5 py-0.5 rounded-full">
              Módulo 9: Registro de Síntomas & Analítica
            </span>
            <span className="text-xs text-slate-400">
              {checkIns.length} Evaluaciones Registradas
            </span>
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-sky-400" />
            Evolución Somática y Tendencias
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mt-0.5">
            Visualización longitudinal de acidez, reflujo, estrés y calidad de sueño para identificar desencadenantes.
          </p>
        </div>

        <button
          onClick={onOpenCheckIn}
          className="px-4 py-2.5 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-sky-950 transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Añadir Evaluación</span>
        </button>
      </div>

      {/* Metric Filter Tabs */}
      <div className="flex items-center gap-2">
        {[
          { id: 'acidez', label: 'Acidez Gástrica', color: '#f59e0b' },
          { id: 'reflujo', label: 'Reflujo', color: '#f43f5e' },
          { id: 'estres', label: 'Estrés', color: '#38bdf8' },
          { id: 'sueno', label: 'Sueño Reparador', color: '#818cf8' }
        ].map(m => (
          <button
            key={m.id}
            onClick={() => setSelectedMetric(m.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedMetric === m.id
                ? 'bg-slate-800 text-white border border-slate-700 shadow-md'
                : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Main Recharts Area */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-sky-400" />
          Tendencia de {selectedMetric.toUpperCase()} (Últimos Registros)
        </h3>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="fecha" stroke="#64748b" fontSize={11} />
              <YAxis domain={[0, 10]} stroke="#64748b" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey={selectedMetric} stroke="#38bdf8" strokeWidth={3} fillOpacity={1} fill="url(#colorMetric)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* History Log Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-400" />
          Historial Reciente de Registros
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Fecha y Hora</th>
                <th className="py-2.5 px-3">Momento</th>
                <th className="py-2.5 px-3">Acidez</th>
                <th className="py-2.5 px-3">Reflujo</th>
                <th className="py-2.5 px-3">Estrés</th>
                <th className="py-2.5 px-3">Sueño</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {checkIns.map(log => (
                <tr key={log.id} className="hover:bg-slate-950/50 transition-colors">
                  <td className="py-3 px-3 font-mono text-slate-300">
                    {new Date(log.timestamp).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}
                  </td>
                  <td className="py-3 px-3 uppercase text-[10px] font-bold text-sky-400">
                    {log.timeOfDay}
                  </td>
                  <td className="py-3 px-3 font-bold text-amber-400">{log.ratings.acidez}/10</td>
                  <td className="py-3 px-3 font-bold text-rose-400">{log.ratings.reflujo}/10</td>
                  <td className="py-3 px-3 font-bold text-sky-400">{log.ratings.estres}/10</td>
                  <td className="py-3 px-3 font-bold text-indigo-400">{log.ratings.sueno}/10</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
