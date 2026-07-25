import { 
  CheckInLog, 
  DailyHabit, 
  GuidedProtocol, 
  BreathingProtocol, 
  UserProfile, 
  AiChatMessage 
} from '../types';
import { GUIDED_PROTOCOLS, BREATHING_PROTOCOLS } from '../data/initialData';

export interface VagalWellnessScore {
  score: number; // 0 - 100
  levelLabel: 'Óptimo' | 'Moderado' | 'En Riesgo de Hipervigilancia' | 'Estrés Elevado';
  primaryDriver: string;
  recommendation: string;
}

class RuleEngine {
  // --- 1. VAGAL WELLNESS SCORE COMPUTATION (HEURISTIC) ---
  public computeVagalScore(checkIns: CheckInLog[], habits: DailyHabit[]): VagalWellnessScore {
    if (!checkIns || checkIns.length === 0) {
      return {
        score: 75,
        levelLabel: 'Moderado',
        primaryDriver: 'Pocos registros recientes.',
        recommendation: 'Realiza un Check-In inicial para evaluar tu estado digestivo y nivel de estrés.'
      };
    }

    const latest = checkIns[0].ratings;

    // Weighting formula
    // High acidity/reflux/stress/nausea/pain penalty; High energy/sleep bonus
    const stressPenalty = latest.estres * 2.5;
    const acidityPenalty = latest.acidez * 2.5;
    const refluxPenalty = latest.reflujo * 2.0;
    const painPenalty = latest.dolor * 1.5;
    const nauseaPenalty = latest.nauseas * 1.5;
    const anxietyPenalty = latest.ansiedad * 2.0;

    const sleepBonus = latest.sueno * 2.0;
    const energyBonus = latest.energia * 1.5;

    const habitBonus = (habits.filter(h => h.completed).length / Math.max(1, habits.length)) * 20;

    let baseScore = 100 - (stressPenalty + acidityPenalty + refluxPenalty + painPenalty + nauseaPenalty + anxietyPenalty) + (sleepBonus + energyBonus) + habitBonus;
    baseScore = Math.max(10, Math.min(100, Math.round(baseScore)));

    let levelLabel: VagalWellnessScore['levelLabel'] = 'Moderado';
    let primaryDriver = 'Equilibrio metabólico y vagal aceptable.';
    let recommendation = 'Mantén tu rutina de coherencia respiratoria post-comidas.';

    if (baseScore >= 80) {
      levelLabel = 'Óptimo';
      primaryDriver = 'Baja carga de estrés y buen descanso reparador.';
      recommendation = 'Excelente tono parasimpático. Continúa con tu práctica diaria.';
    } else if (baseScore >= 55) {
      levelLabel = 'Moderado';
      primaryDriver = latest.acidez > 5 ? 'Leve hiperacidez postprandial.' : 'Tensión moderada acumulada.';
      recommendation = 'Se sugiere el Protocolo Reposo Post-Prandial tras la siguiente comida.';
    } else if (latest.estres > 6 || latest.ansiedad > 6) {
      levelLabel = 'Estrés Elevado';
      primaryDriver = 'Hiperactividad del sistema simpático inhibiendo la peristalsis.';
      recommendation = 'Ejecuta el Protocolo SOS Crisis de Estrés con respiración 5-5 y vibración háptica.';
    } else {
      levelLabel = 'En Riesgo de Hipervigilancia';
      primaryDriver = 'Irritación de la mucosa y tensión en el esfínter esofágico.';
      recommendation = 'Aplica la Respiración Diafragmática y evita tumbarte durante 3 horas.';
    }

    return {
      score: baseScore,
      levelLabel,
      primaryDriver,
      recommendation
    };
  }

  // --- 2. RECOMMENDATION ENGINE FOR PROTOCOLS ---
  public getRecommendedProtocols(checkIns: CheckInLog[]): {
    primaryGuided: GuidedProtocol;
    secondaryBreathing: BreathingProtocol;
    reasoning: string;
  } {
    const latest = checkIns[0]?.ratings;

    if (!latest) {
      return {
        primaryGuided: GUIDED_PROTOCOLS[0],
        secondaryBreathing: BREATHING_PROTOCOLS[0],
        reasoning: 'Protocolo equilibrado por defecto para regulación general del tono vagal.'
      };
    }

    // Decision Tree logic
    if (latest.acidez >= 6 || latest.reflujo >= 6) {
      return {
        primaryGuided: GUIDED_PROTOCOLS.find(p => p.id === 'proto-acidez-reflujo') || GUIDED_PROTOCOLS[3],
        secondaryBreathing: BREATHING_PROTOCOLS.find(b => b.id === 'diafragmatica-profunda') || BREATHING_PROTOCOLS[3],
        reasoning: 'Detectada irritación gástrica elevada. La respiración diafragmática ayuda a mantener la presión mecánica del Esfínter Esofágico Inferior.'
      };
    }

    if (latest.estres >= 7 || latest.ansiedad >= 7) {
      return {
        primaryGuided: GUIDED_PROTOCOLS.find(p => p.id === 'proto-estres-elevado') || GUIDED_PROTOCOLS[2],
        secondaryBreathing: BREATHING_PROTOCOLS.find(b => b.id === 'coherente-6') || BREATHING_PROTOCOLS[0],
        reasoning: 'Pico de tensión simpática detectado. La frecuencia de 6 respiraciones por minuto resuena con la variabilidad cardíaca para inducir calma inmediata.'
      };
    }

    if (latest.nauseas >= 5) {
      return {
        primaryGuided: GUIDED_PROTOCOLS.find(p => p.id === 'proto-nauseas') || GUIDED_PROTOCOLS[4],
        secondaryBreathing: BREATHING_PROTOCOLS.find(b => b.id === 'respiracion-4-6') || BREATHING_PROTOCOLS[1],
        reasoning: 'Sensación de malestar estomacal. Exhalación guiada larga con sonidos suaves de agua para reducir la hipervigilancia visceral.'
      };
    }

    if (latest.sueno <= 4) {
      return {
        primaryGuided: GUIDED_PROTOCOLS.find(p => p.id === 'proto-antes-dormir') || GUIDED_PROTOCOLS[1],
        secondaryBreathing: BREATHING_PROTOCOLS.find(b => b.id === 'respiracion-4-7-8') || BREATHING_PROTOCOLS[2],
        reasoning: 'Descanso nocturno deficiente. El patrón 4-7-8 facilita la desactivación mental y estimula la liberación de melatonina.'
      };
    }

    // Default post-meal / maintenance
    return {
      primaryGuided: GUIDED_PROTOCOLS[0],
      secondaryBreathing: BREATHING_PROTOCOLS[0],
      reasoning: 'Mantenimiento del tono vagal basal y prevención de picos de dispepsia.'
    };
  }

  // --- 3. AUTONOMOUS COACH CHAT RESPONSE ENGINE (DECISION TREE & PATTERN MATCHING) ---
  public processCoachMessage(userQuery: string, checkIns: CheckInLog[], profile: UserProfile): AiChatMessage {
    const query = userQuery.toLowerCase().trim();

    let textResponse = '';
    let action: AiChatMessage['suggestedAction'] = undefined;

    // Pattern 1: Vagus Nerve & Science
    if (query.includes('nervio vago') || query.includes('vagal') || query.includes('qué es') || query.includes('ciencia')) {
      textResponse = 'El **Nervio Vago** (X par craneal) es la principal vía de comunicación entre tu cerebro y el estómago. Cuando realizas respiraciones lentas con exhalaciones prolongadas, activas sus receptores de estiramiento, disminuyendo la frecuencia cardíaca y enviando señales de seguridad al tracto digestivo para detener los espasmos y reducir el reflujo.';
      action = { label: 'Aprender en Centro Educativo', targetModule: 'educacion' };
    } 
    // Pattern 2: Acidity & Reflux
    else if (query.includes('acidez') || query.includes('reflujo') || query.includes('ardor') || query.includes('boca del estómago')) {
      textResponse = 'Para la acidez y el reflujo, la maniobra más efectiva es la **Respiración Diafragmática**. El diafragma rodea el Esfínter Esofágico Inferior y actúa como una barrera anatómica natural contra el ascenso de ácido. Recuerda también evitar tumbarte durante al menos 45 minutos tras comer.';
      action = { label: 'Iniciar Protocolo Acidez', targetModule: 'protocolos', protocolId: 'proto-acidez-reflujo' };
    }
    // Pattern 3: Humming / Tarareo
    else if (query.includes('tarareo') || query.includes('humming') || query.includes('vibracion') || query.includes('sonido')) {
      textResponse = 'El tarareo vocal (sonidos "Mmmmm", "Ooooo", "Uuuuu") hace vibrar las cuerdas vocales, estimulando las ramas laríngeas del nervio vago y multiplicando por 15 la producción nasal de Óxido Nítrico, un potente relajante muscular.';
      action = { label: 'Ir al Módulo de Tarareo', targetModule: 'tarareo' };
    }
    // Pattern 4: Pure Tones / Solfeggio / Frequencies
    else if (query.includes('tono') || query.includes('frecuencia') || query.includes('432') || query.includes('528') || query.includes('hz')) {
      textResponse = 'En Quyriux puedes experimentar con tonos puros desde 40 Hz hasta 963 Hz. Recuerda nuestra premisa científica: *no existe evidencia médica de que una frecuencia específica trate patologías gástricas*, pero se utilizan ampliamente como herramienta de enfoque y relajación auditiva.';
      action = { label: 'Generador de Tonos', targetModule: 'tonos' };
    }
    // Pattern 5: Habits & Posture
    else if (query.includes('habito') || query.includes('caminar') || query.includes('dormir') || query.includes('lado izquierdo')) {
      textResponse = 'Dos hábitos clave con sólida evidencia: 1) **Caminar 10-15 min post-comida** acelera el vaciado estomacal. 2) **Dormir sobre el lado izquierdo** evita que el estanque ácido gástrico supere el nivel del esfínter esofágico.';
      action = { label: 'Ver Lista de Hábitos', targetModule: 'habitos' };
    }
    // Pattern 6: Symptoms / Status Evolution
    else if (query.includes('estado') || query.includes('evolucion') || query.includes('como voy') || query.includes('progreso')) {
      const score = this.computeVagalScore(checkIns, []);
      textResponse = `Tu puntuación actual de **Bienestar Vagal es ${score.score}/100 (${score.levelLabel})**. ${score.primaryDriver} Te recomiendo: ${score.recommendation}`;
      action = { label: 'Ver Gráficas de Síntomas', targetModule: 'sintomas' };
    }
    // Pattern 7: Default Help / Encouragement
    else {
      textResponse = `Hola ${profile.name}. Soy tu asistente autónomo de Quyriux. Puedo guiarte sobre técnicas de respiración para la digestión, el fundamento científico del nervio vago, o sugerirte la rutina ideal para este momento. ¿Qué síntomas o inquietudes tienes hoy?`;
      action = { label: 'Realizar Check-In de Síntomas', targetModule: 'checkin' };
    }

    return {
      id: 'msg_' + Date.now(),
      sender: 'assistant',
      text: textResponse,
      timestamp: Date.now(),
      suggestedAction: action
    };
  }
}

export const ruleEngine = new RuleEngine();
