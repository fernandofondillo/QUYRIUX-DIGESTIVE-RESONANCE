import { 
  CheckInLog, 
  SessionRecord, 
  DailyHabit, 
  UserProfile, 
  SymptomRating 
} from '../types';
import { DAILY_HABITS } from '../data/initialData';

const STORAGE_KEYS = {
  PROFILE: 'quyriux_user_profile',
  CHECK_INS: 'quyriux_checkin_logs',
  SESSIONS: 'quyriux_session_records',
  HABITS: 'quyriux_daily_habits',
  HABIT_LAST_RESET: 'quyriux_habits_last_reset',
  FAVORITE_SOUNDS: 'quyriux_fav_sounds',
  FAVORITE_PROTOCOLS: 'quyriux_fav_protocols'
};

export const defaultProfile: UserProfile = {
  name: 'Usuario Quyriux',
  highContrast: false,
  largeText: false,
  darkTheme: true,
  soundVolume: 0.8,
  hapticsEnabled: true,
  voiceGuideEnabled: true,
  voicePitch: 1.0,
  animationStyle: 'circulos',
  streakDays: 3,
  totalRelaxationMinutes: 45,
  totalSessionsCompleted: 8,
  totalBreathsTaken: 380,
  notificationsEnabled: true,
  dailyGoalMinutes: 15
};

class StorageService {
  // --- Profile ---
  public getProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (data) return { ...defaultProfile, ...JSON.parse(data) };
    } catch {}
    return defaultProfile;
  }

  public saveProfile(profile: UserProfile) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch {}
  }

  // --- Check-Ins & Symptoms ---
  public getCheckIns(): CheckInLog[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHECK_INS);
      if (data) return JSON.parse(data);
    } catch {}
    // Default seed logs for instant rich analytics display
    const seedLogs: CheckInLog[] = [
      {
        id: 'seed-1',
        timestamp: Date.now() - 86400000 * 3,
        ratings: { acidez: 7, dolor: 5, estres: 8, nauseas: 4, reflujo: 6, energia: 4, sueno: 5, ansiedad: 7 },
        timeOfDay: 'mañana'
      },
      {
        id: 'seed-2',
        timestamp: Date.now() - 86400000 * 2,
        ratings: { acidez: 5, dolor: 3, estres: 6, nauseas: 2, reflujo: 4, energia: 6, sueno: 7, ansiedad: 5 },
        timeOfDay: 'tarde'
      },
      {
        id: 'seed-3',
        timestamp: Date.now() - 86400000 * 1,
        ratings: { acidez: 3, dolor: 2, estres: 4, nauseas: 1, reflujo: 2, energia: 8, sueno: 8, ansiedad: 3 },
        timeOfDay: 'tarde'
      }
    ];
    this.saveCheckIns(seedLogs);
    return seedLogs;
  }

  public saveCheckIns(logs: CheckInLog[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.CHECK_INS, JSON.stringify(logs));
    } catch {}
  }

  public addCheckIn(ratings: SymptomRating, timeOfDay: CheckInLog['timeOfDay']): CheckInLog {
    const logs = this.getCheckIns();
    const newLog: CheckInLog = {
      id: 'checkin_' + Date.now(),
      timestamp: Date.now(),
      ratings,
      timeOfDay
    };
    logs.unshift(newLog);
    this.saveCheckIns(logs);
    return newLog;
  }

  // --- Sessions & Progress ---
  public getSessions(): SessionRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      if (data) return JSON.parse(data);
    } catch {}
    return [
      { id: 's1', timestamp: Date.now() - 86400000 * 2, type: 'breathing', protocolName: 'Respiración Coherente', durationSeconds: 600, perceivedStressBefore: 8, perceivedStressAfter: 4 },
      { id: 's2', timestamp: Date.now() - 86400000 * 1, type: 'guided', protocolName: 'Reposo Post-Prandial', durationSeconds: 480, perceivedStressBefore: 7, perceivedStressAfter: 3 },
      { id: 's3', timestamp: Date.now() - 3600000 * 4, type: 'humming', protocolName: 'Tarareo Vagal Mmmmm', durationSeconds: 300, perceivedStressBefore: 6, perceivedStressAfter: 2 }
    ];
  }

  public addSession(session: Omit<SessionRecord, 'id' | 'timestamp'>) {
    const sessions = this.getSessions();
    const newSession: SessionRecord = {
      ...session,
      id: 'sess_' + Date.now(),
      timestamp: Date.now()
    };
    sessions.unshift(newSession);
    try {
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
    } catch {}

    // Update Profile Totals
    const profile = this.getProfile();
    profile.totalSessionsCompleted += 1;
    profile.totalRelaxationMinutes += Math.round(session.durationSeconds / 60);
    profile.totalBreathsTaken += Math.round((session.durationSeconds / 60) * 6); // ~6 rpm average
    this.saveProfile(profile);
    return newSession;
  }

  // --- Daily Habits Checklist ---
  public getHabits(): DailyHabit[] {
    try {
      const lastReset = localStorage.getItem(STORAGE_KEYS.HABIT_LAST_RESET);
      const todayStr = new Date().toDateString();

      const data = localStorage.getItem(STORAGE_KEYS.HABITS);
      let habits: DailyHabit[] = data ? JSON.parse(data) : DAILY_HABITS;

      // Auto-reset completion at midnight
      if (lastReset !== todayStr) {
        habits = habits.map(h => ({ ...h, completed: false }));
        localStorage.setItem(STORAGE_KEYS.HABIT_LAST_RESET, todayStr);
        this.saveHabits(habits);
      }

      return habits;
    } catch {}
    return DAILY_HABITS;
  }

  public saveHabits(habits: DailyHabit[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
    } catch {}
  }

  public toggleHabit(habitId: string): DailyHabit[] {
    const habits = this.getHabits();
    const updated = habits.map(h => h.id === habitId ? { ...h, completed: !h.completed } : h);
    this.saveHabits(updated);
    return updated;
  }

  // --- Data Export & Privacy ---
  public exportDataJSON() {
    const exportObject = {
      app: 'Quyriux Digestive Resonance',
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      profile: this.getProfile(),
      checkIns: this.getCheckIns(),
      sessions: this.getSessions(),
      habits: this.getHabits()
    };

    const blob = new Blob([JSON.stringify(exportObject, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quyriux_report_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  public downloadPDFSummary() {
    const profile = this.getProfile();
    const checkIns = this.getCheckIns();
    const sessions = this.getSessions();
    const habits = this.getHabits();

    const recentCheckIn = checkIns[0]?.ratings;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Reporte de Bienestar Vagal y Digestivo - Quyriux</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1e293b; padding: 40px; line-height: 1.6; }
          h1 { color: #0f172a; border-bottom: 2px solid #38bdf8; padding-bottom: 10px; }
          .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
          .section { margin-bottom: 30px; background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; }
          .metric { display: inline-block; width: 30%; margin-bottom: 15px; }
          .metric-val { font-size: 20px; font-weight: bold; color: #0284c7; }
          .disclaimer { font-size: 11px; color: #64748b; margin-top: 40px; border-top: 1px dashed #cbd5e1; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1>Quyriux Digestive Resonance</h1>
            <p>Reporte de Evaluación Somática y Modulación Vagal</p>
          </div>
          <div>
            <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-ES')}</p>
            <p><strong>Usuario:</strong> ${profile.name}</p>
          </div>
        </div>

        <div class="section">
          <h2>Resumen de Progreso</h2>
          <div class="metric"><div class="metric-val">${profile.totalRelaxationMinutes} min</div><div>Tiempo de Relajación</div></div>
          <div class="metric"><div class="metric-val">${profile.totalSessionsCompleted}</div><div>Sesiones Realizadas</div></div>
          <div class="metric"><div class="metric-val">${profile.streakDays} días</div><div>Racha Activa</div></div>
        </div>

        <div class="section">
          <h2>Último Registro de Síntomas</h2>
          ${recentCheckIn ? `
            <p><strong>Acidez / Reflujo:</strong> ${recentCheckIn.acidez}/10 | <strong>Estrés:</strong> ${recentCheckIn.estres}/10 | <strong>Dolor:</strong> ${recentCheckIn.dolor}/10 | <strong>Sueño:</strong> ${recentCheckIn.sueno}/10</p>
          ` : '<p>Sin registros recientes.</p>'}
        </div>

        <div class="section">
          <h2>Historial de Sesiones Recientes (${sessions.length})</h2>
          <ul>
            ${sessions.slice(0, 5).map(s => `<li><strong>${s.protocolName}</strong> - ${Math.round(s.durationSeconds / 60)} min (${new Date(s.timestamp).toLocaleDateString('es-ES')})</li>`).join('')}
          </ul>
        </div>

        <div class="disclaimer">
          <p><strong>Aviso Médico Importante:</strong> Este documento es un resumen de autorregistro de hábitos de bienestar y relajación. Quyriux Digestive Resonance no afirma curar ni diagnosticar patologías médicas. Consulte siempre a un profesional sanitario o gastroenterólogo matriculado.</p>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 300);
    }
  }
}

export const storageService = new StorageService();
