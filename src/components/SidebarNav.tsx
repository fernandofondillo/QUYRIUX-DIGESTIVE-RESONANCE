import React, { useState } from 'react';
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
  Stethoscope,
  Grid,
  X,
  ChevronRight
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileSelect = (tab: NavTab) => {
    onSelectTab(tab);
    setIsMobileMenuOpen(false);
  };

  const mainCategories = ['Principal', 'Técnicas', 'Gestión', 'Inteligencia'];

  return (
    <>
      {/* Desktop Vertical Sidebar */}
      <aside className="hidden lg:block w-64 bg-slate-950/80 border-r border-slate-800/80 p-3 shrink-0">
        <div className="flex flex-col gap-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all w-full text-left ${
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

      {/* Mobile Fixed Bottom Navigation Bar (Smartphones) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/90 px-2 py-1.5 flex items-center justify-around shadow-2xl">
        {[
          { id: 'dashboard', label: 'Inicio', icon: LayoutDashboard },
          { id: 'respiracion', label: 'Respirar', icon: Wind },
          { id: 'checkin', label: 'Check-In', icon: Stethoscope },
          { id: 'coach', label: 'Coach', icon: Bot },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id && !isMobileMenuOpen;
          return (
            <button
              key={item.id}
              onClick={() => handleMobileSelect(item.id as NavTab)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive ? 'text-sky-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}

        {/* More Modules Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            isMobileMenuOpen ? 'text-emerald-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Grid className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Módulos</span>
        </button>
      </nav>

      {/* Mobile Full Screen Modules Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col p-4 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Grid className="w-5 h-5 text-sky-400" />
                Módulos de Quyriux
              </h2>
              <p className="text-xs text-slate-400">Selecciona cualquier herramienta para abrirla</p>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-5 pb-20">
            {mainCategories.map((cat) => {
              const catItems = NAV_ITEMS.filter((i) => i.category === cat);
              return (
                <div key={cat} className="space-y-2">
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-sky-400 px-1">
                    {cat}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {catItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleMobileSelect(item.id)}
                          className={`flex items-center justify-between p-3.5 rounded-xl border transition-all text-left ${
                            isActive
                              ? 'bg-gradient-to-r from-sky-600/90 to-emerald-600/90 border-sky-400 text-white font-bold shadow-md'
                              : 'bg-slate-900/90 border-slate-800 text-slate-200 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-slate-950 text-sky-400'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-semibold">{item.label}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-500" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

