import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, ShieldAlert, Compass, BookOpen, Stethoscope } from 'lucide-react';
import { AiChatMessage, CheckInLog, UserProfile } from '../types';
import { ruleEngine } from '../services/ruleEngine';

interface AiCoachViewProps {
  checkIns: CheckInLog[];
  profile: UserProfile;
  onNavigateTab: (tab: any) => void;
}

export const AiCoachView: React.FC<AiCoachViewProps> = ({ checkIns, profile, onNavigateTab }) => {
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: `¡Hola, ${profile.name}! Soy tu Asistente Autónomo de Quyriux. Estoy programado mediante motores de reglas y árboles de decisión para guiarte en técnicas de modulación vagal, explicarte la fisiología del nervio vago y sugerirte protocolos para tu estado actual. ¿En qué te puedo ayudar hoy?`,
      timestamp: Date.now(),
      suggestedAction: {
        label: 'Ver Análisis de Estado Actual',
        targetModule: 'sintomas'
      }
    }
  ]);

  const [inputQuery, setInputQuery] = useState<string>('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userMsg: AiChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: inputQuery,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    const promptText = inputQuery;
    setInputQuery('');

    // Generate autonomous rule-based answer
    setTimeout(() => {
      const coachReply = ruleEngine.processCoachMessage(promptText, checkIns, profile);
      setMessages(prev => [...prev, coachReply]);
    }, 300);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-sky-400 bg-sky-950 border border-sky-800 px-2.5 py-0.5 rounded-full">
              Módulo 10: Asistente Coach Autónomo
            </span>
            <span className="text-xs text-slate-400">
              Core First, AI Optional (Motor de Reglas)
            </span>
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-sky-400" />
            Asistente de Inteligencia Programada
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mt-0.5">
            Orientación instantánea 100% offline basada en evidencia y árboles de decisión sin depender de servidores externos.
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] text-slate-400 flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Nunca diagnostica ni sustituye atención médica.</span>
        </div>
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
        {[
          '¿Cómo estimula el tarareo al nervio vago?',
          '¿Qué hago si tengo acidez intensa tras comer?',
          '¿Por qué es clave dormir sobre el lado izquierdo?',
          '¿Cuál es mi puntuación actual de bienestar vagal?'
        ].map((q, idx) => (
          <button
            key={idx}
            onClick={() => {
              setInputQuery(q);
            }}
            className="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-sky-500 text-slate-300 hover:text-white text-xs font-medium rounded-xl whitespace-nowrap transition-all shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 min-h-[380px] max-h-[500px] overflow-y-auto shadow-inner flex flex-col justify-between">
        <div className="space-y-4">
          {messages.map(msg => {
            const isAsst = msg.sender === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isAsst ? 'justify-start' : 'justify-end'}`}
              >
                {isAsst && (
                  <div className="w-8 h-8 rounded-xl bg-sky-950 border border-sky-800 text-sky-400 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed ${
                    isAsst
                      ? 'bg-slate-950 border border-slate-800 text-slate-200'
                      : 'bg-sky-600 text-white font-medium ml-auto shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {msg.suggestedAction && (
                    <div className="mt-3 pt-2 border-t border-slate-800">
                      <button
                        onClick={() => onNavigateTab(msg.suggestedAction?.targetModule)}
                        className="px-3 py-1.5 bg-sky-600/30 hover:bg-sky-600 border border-sky-500 text-sky-200 hover:text-white rounded-lg font-bold text-[11px] flex items-center gap-1.5 transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{msg.suggestedAction.label}</span>
                      </button>
                    </div>
                  )}
                </div>

                {!isAsst && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="pt-4 border-t border-slate-800/80 flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Escribe tu consulta sobre el nervio vago, reflujo, o ejercicios..."
            className="flex-1 bg-slate-950 border border-slate-800 text-white text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-sky-500"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-sky-950 transition-all"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Enviar</span>
          </button>
        </form>
      </div>
    </div>
  );
};
