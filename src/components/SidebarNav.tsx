import React from 'react';
import { 
  LayoutDashboard, 
  Wind, 
  Mic, 
  Music, 
  Radio, 
  Vibrate, 
  Compass, 
  CheckSquare, 
  BarChart3, 
  BookOpen, 
  Bot, 
  CalendarDays, 
  BellRing, 
  TrendingUp, 
  Stethoscope 
} from 'lucide-react';

export type NavTab = 
  | 'dashboard'
  | 'checkin'
  | 'respiracion'
  | 'tarareo'
  | 'sonidos'
  | 'tonos'
  | 'haptica'
  | 'protocolos'
  | 'habitos'
  | 'sintomas'
  | 'educacion'
  | 'coach'
  | 'rutinas'
  | 'recordatorios'
  | 'progreso';

interface SidebarNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

const NAV_ITEMS: { id: NavTab; label: string; icon: React.FC<{ className?: string }>; category: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, category: 'Principal' },
  { id: 'checkin', label: 'Check-In Síntomas', icon: Stethoscope, category: 'Principal' },
  
  { id: 'respiracion', label: 'Respiración Guiada', icon: Wind, category: 'Técnicas' },
  { id: 'tarareo', label: 'Tarareo Vagal (Humming)', icon: Mic, category: 'Técnicas' },
  { id: 'sonidos', label: 'Sonidos Relajantes', icon: Music, category: 'Técnicas' },
  { id: 'tonos', label: 'Generador de Tonos', icon: Radio, category: 'Técnicas' },
  { id: 'haptica', label: 'Vibración Háptica', icon: Vibrate, category: 'Técnicas' },
  { id: 'protocolos', label: 'Protocolos Guiados', icon: Compass, category: 'Técnicas' },

  { id: 'habitos', label: 'Hábitos Digestivos', icon: CheckSquare, category: 'Gestión' },
  { id: 'sintomas', label: 'Registro & Tendencias', icon: BarChart3, category: 'Gestión' },
  { id: 'educacion', label: 'Centro Educativo', icon: BookOpen, category: 'Gestión' },
  
  { id: 'coach', label: 'IA Coach Autónomo', icon: Bot, category: 'Inteligencia' },
  { id: 'rutinas', label: 'Planificador Rutinas', icon: CalendarDays, category: 'Inteligencia' },
  { id: 'recordatorios', label: 'Notificaciones', icon: BellRing, category: 'Inteligencia' },
  { id: 'progreso', label: 'Progreso & Exportar', icon: TrendingUp, category: 'Inteligencia' },
];

export const SidebarNav: React.FC<SidebarNavProps> = ({ activeTab, onSelectTab }) => {
  return (
    <aside className="w-full lg:w-64 bg-slate-950/80 border-b lg:border-b-0 lg:border-r border-slate-800/80 p-3 shrink-0">
      <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1.5 scrollbar-none">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all shrink-0 whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-sky-600/90 to-emerald-600/90 text-white shadow-md shadow-sky-950/50 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
