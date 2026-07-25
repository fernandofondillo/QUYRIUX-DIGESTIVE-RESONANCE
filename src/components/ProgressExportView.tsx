import React from 'react';
import { TrendingUp, Download, FileText, Lock, Calendar, Clock, Wind, CheckCircle2, ShieldCheck } from 'lucide-react';
import { UserProfile, SessionRecord } from '../types';
import { storageService } from '../services/storageService';

interface ProgressExportViewProps {
  profile: UserProfile;
  sessions: SessionRecord[];
}

export const ProgressExportView: React.FC<ProgressExportViewProps> = ({ profile, sessions }) => {
  const handleExportJSON = () => {
    storageService.exportDataJSON();
  };

  const handleDownloadPDF = () => {
    storageService.downloadPDFSummary();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2.5 py-0.5 rounded-full">
              Módulo 15: Progreso, Privacidad & Exportación
            </span>
            <span className="text-xs text-slate-400">
              100% Local First
            </span>
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            Métricas Acumuladas y Exportación
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mt-0.5">
            Tus datos permanecen cifrados localmente en tu dispositivo. Puedes exportarlos en JSON o imprimir un informe PDF para tu médico.
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-sky-400" />
            <span>Exportar JSON</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-950 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Generar Reporte PDF</span>
          </button>
        </div>
      </div>

      {/* Privacy Guarantee Banner */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
        <Lock className="w-5 h-5 text-emerald-400 shrink-0" />
        <div className="text-xs text-slate-300">
          <strong className="text-white block">Garantía de Privacidad Absoluta:</strong>
          Toda la información somática se almacena en el almacenamiento de tu navegador (IndexedDB / LocalStorage). No se envía ningún dato a servidores externos.
        </div>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <Clock className="w-5 h-5 text-sky-400 mb-2" />
          <div className="text-2xl font-bold text-white">{profile.totalRelaxationMinutes} min</div>
          <div className="text-xs text-slate-400 mt-1">Tiempo de Relajación Acumulado</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <Wind className="w-5 h-5 text-emerald-400 mb-2" />
          <div className="text-2xl font-bold text-white">{(profile.totalBreathsTaken / 360).toFixed(1)} h</div>
          <div className="text-xs text-slate-400 mt-1">Horas Totales de Respiración</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <CheckCircle2 className="w-5 h-5 text-purple-400 mb-2" />
          <div className="text-2xl font-bold text-white">{profile.totalSessionsCompleted}</div>
          <div className="text-xs text-slate-400 mt-1">Sesiones Completadas</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <TrendingUp className="w-5 h-5 text-amber-400 mb-2" />
          <div className="text-2xl font-bold text-white">{profile.streakDays} días</div>
          <div className="text-xs text-slate-400 mt-1">Racha Activa de Práctica</div>
        </div>
      </div>

      {/* Sessions History List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
        <h3 className="text-sm font-bold text-white">Historial Completo de Sesiones ({sessions.length})</h3>

        <div className="space-y-2">
          {sessions.map(s => (
            <div key={s.id} className="bg-slate-950 border border-slate-800/80 rounded-xl p-3.5 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-white block">{s.protocolName}</span>
                <span className="text-[10px] text-slate-400">
                  {new Date(s.timestamp).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}
                </span>
              </div>

              <div className="text-right">
                <span className="font-mono font-bold text-sky-400 block">{Math.round(s.durationSeconds / 60)} min</span>
                <span className="text-[10px] text-slate-500 uppercase">{s.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
