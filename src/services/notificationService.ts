export interface ReminderItem {
  id: string;
  title: string;
  type: 'respirar' | 'caminar' | 'hidratarse' | 'meditar' | 'sintomas' | 'dormir';
  time: string; // "HH:MM"
  enabled: boolean;
  days: string[]; // ["Lun", "Mar", "Mié", ...]
}

export const DEFAULT_REMINDERS: ReminderItem[] = [
  { id: 'rem-1', title: 'Respiración Coherente Matutina', type: 'respirar', time: '08:30', enabled: true, days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] },
  { id: 'rem-2', title: 'Paseo Corto Post-Almuerzo', type: 'caminar', time: '14:30', enabled: true, days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'] },
  { id: 'rem-3', title: 'Registro de Síntomas & Check-In', type: 'sintomas', time: '19:00', enabled: true, days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] },
  { id: 'rem-4', title: 'Desconexión Vagal Nocturna', type: 'dormir', time: '22:30', enabled: true, days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] }
];

class NotificationService {
  private key = 'quyriux_reminders_list';

  public getReminders(): ReminderItem[] {
    try {
      const data = localStorage.getItem(this.key);
      if (data) return JSON.parse(data);
    } catch {}
    return DEFAULT_REMINDERS;
  }

  public saveReminders(reminders: ReminderItem[]) {
    try {
      localStorage.setItem(this.key, JSON.stringify(reminders));
    } catch {}
  }

  public toggleReminder(id: string) {
    const reminders = this.getReminders();
    const updated = reminders.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r);
    this.saveReminders(updated);
    return updated;
  }

  public requestPermission(): Promise<boolean> {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.requestPermission().then(perm => perm === 'granted');
    }
    return Promise.resolve(false);
  }

  public sendNotification(title: string, body: string) {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, { body, icon: '/favicon.ico' });
      } catch {}
    }
  }
}

export const notificationService = new NotificationService();
