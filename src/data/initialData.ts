import { 
  BreathingProtocol, 
  HummingProtocol, 
  SoundTrack, 
  ToneFrequency, 
  GuidedProtocol, 
  DailyHabit, 
  EduArticle 
} from '../types';

export const BREATHING_PROTOCOLS: BreathingProtocol[] = [
  {
    id: 'coherente-6',
    name: 'Respiración Coherente (6 respiraciones/min)',
    subtitle: 'Modulación de la variabilidad del ritmo cardíaco (HRV)',
    description: 'Ritmo simétrico de 5 segundos de inhalación y 5 segundos de exhalación. Estimula el barorreflejo y la arritmia sinusal respiratoria para un tono vagal óptimo.',
    scientificBenefits: [
      'Aumenta la variabilidad del ritmo cardíaco (HRV) a ~0.1 Hz',
      'Activa la rama motora dorsal y ventral del nervio vago',
      'Favorece la peristalsis digestiva y reduce el tono simpático'
    ],
    evidenceLevel: 'solida',
    pattern: { inhale: 5, holdIn: 0, exhale: 5, holdOut: 0 },
    targetRpm: 6,
    recommendedDurationMinutes: 10,
    tags: ['Coherencia', 'Uso Diario', 'Estrés', 'Digestión']
  },
  {
    id: 'respiracion-4-6',
    name: 'Respiración Parasimpática 4-6',
    subtitle: 'Exhalación prolongada para relajación digestiva',
    description: 'Inhalación suave en 4 segundos y exhalación en 6 segundos. La exhalación más larga estimula la desaceleración cardíaca vía acetilcolina vagal.',
    scientificBenefits: [
      'Induce un freno vagal más rápido reduciendo la frecuencia cardíaca',
      'Alivia el espasmo gastrointestinal por hipertonía simpática',
      'Ideal para aplicar tras comidas o ante síntomas leves de ansiedad'
    ],
    evidenceLevel: 'solida',
    pattern: { inhale: 4, holdIn: 0, exhale: 6, holdOut: 0 },
    targetRpm: 6,
    recommendedDurationMinutes: 5,
    tags: ['Post-Comida', 'Desaceleración', 'Calma']
  },
  {
    id: 'respiracion-4-7-8',
    name: 'Protocolo Relajante 4-7-8',
    subtitle: 'Sedación vagal profunda y preparación al descanso',
    description: 'Técnica de retención y exhalación muy lenta. La pausa inspiratoria de 7s satura de oxígeno la sangre mientras la exhalación de 8s vacía la tensión acumulada.',
    scientificBenefits: [
      'Inhibe el reflejo de lucha o huida de forma aguda',
      'Promueve ondas cerebrales Alfa y Theta pre-sueño',
      'Reduce la hipervigilancia somática y el malestar gástrico nocturno'
    ],
    evidenceLevel: 'moderada',
    pattern: { inhale: 4, holdIn: 7, exhale: 8, holdOut: 0 },
    targetRpm: 3.2,
    recommendedDurationMinutes: 5,
    tags: ['Sueño', 'Ansiedad Aguda', 'Nocturno']
  },
  {
    id: 'diafragmatica-profunda',
    name: 'Respiración Diafragmática Abdominal',
    subtitle: 'Masaje mecánico del tracto gastrointestinal y esfínter esofágico',
    description: 'Movimiento activo del vientre que estimula mecánicamente el nervio vago en su paso por el hiato diafragmático.',
    scientificBenefits: [
      'Refuerza la presión del Esfínter Esofágico Inferior (EEI)',
      'Ayuda a reducir el reflujo gastroesofágico y la hernia de hiato sintomática',
      'Promueve el drenaje linfático abdominal'
    ],
    evidenceLevel: 'solida',
    pattern: { inhale: 4, holdIn: 2, exhale: 6, holdOut: 2 },
    targetRpm: 4.3,
    recommendedDurationMinutes: 8,
    tags: ['Reflujo', 'Acidez', 'Sostén Diafragmático']
  },
  {
    id: 'respiracion-5-5',
    name: 'Respiración Equilibrada 5-5',
    subtitle: 'Estabilización simpático-parasimpática neutra',
    description: 'Inhalación de 5 segundos e exhalación de 5 segundos sin retenciones. Perfecta para principiantes y momentos de transición.',
    scientificBenefits: [
      'Sincroniza la respiración con la presión arterial (ondas de Mayer)',
      'Sensación de centramiento y presencia sin mareos'
    ],
    evidenceLevel: 'solida',
    pattern: { inhale: 5, holdIn: 0, exhale: 5, holdOut: 0 },
    targetRpm: 6,
    recommendedDurationMinutes: 5,
    tags: ['Principiantes', 'Oficina', 'Cualquier momento']
  }
];

export const HUMMING_PROTOCOLS: HummingProtocol[] = [
  {
    id: 'humming-m',
    vowelSound: 'Mmmmm',
    frequencyHz: 110, // A2 low pitch
    description: 'Sonoridad nasal cerrada con vibración en senos paranasales y zona faríngea.',
    vagalMechanism: 'La vibración de las cuerdas vocales activa las ramas laríngeas y faríngeas del Nervio Vago (X par craneal) y multiplica por 15 la liberación endógena de óxido nítrico nasal.',
    durationMinutes: 5,
    inhaleSeconds: 4,
    hummingSeconds: 8
  },
  {
    id: 'humming-o',
    vowelSound: 'Ooooo',
    frequencyHz: 128, // C3 Harmonic
    description: 'Resonancia bucal redondeada con enfoque en diafragma y pecho.',
    vagalMechanism: 'Pulsación sónica continua que resuena en la caja torácica, modulando el nervio laríngeo recurrente y facilitando la respuesta de relajación digestiva.',
    durationMinutes: 5,
    inhaleSeconds: 4,
    hummingSeconds: 8
  },
  {
    id: 'humming-u',
    vowelSound: 'Uuuuu',
    frequencyHz: 136.1, // Ohm tone frequency
    description: 'Tono grave profundo centrado en la resonancia abdominal inferior.',
    vagalMechanism: 'Transmite micro-vibraciones mecánicas al plexo celíaco y plexo solar, disminuyendo la contracción espasmódica del estómago.',
    durationMinutes: 6,
    inhaleSeconds: 4,
    hummingSeconds: 10
  }
];

export const SOUND_TRACKS: SoundTrack[] = [
  {
    id: 'piano-ambient',
    title: 'Piano Armónico Flotante',
    category: 'piano',
    description: 'Notas de piano filtradas con ecos suaves y frecuencias relajantes en quinta justa.',
    synthType: 'harmonic_piano',
    baseFreq: 220
  },
  {
    id: 'lluvia-serena',
    title: 'Lluvia en las Hojas',
    category: 'lluvia',
    description: 'Ruido acústico suave con filtrado pasa-bajos que imita gotas cayendo suavemente.',
    synthType: 'rain',
    baseFreq: 400
  },
  {
    id: 'bosque-meditativo',
    title: 'Bosque al Atardecer',
    category: 'bosque',
    description: 'Soplos de viento entre ramas con frecuencias armónicas de calma.',
    synthType: 'drone',
    baseFreq: 150
  },
  {
    id: 'mar-profundo',
    title: 'Olas de Mar Sintético',
    category: 'mar',
    description: 'Oscilación periódica de frecuencias relajantes que imitan la marea baja.',
    synthType: 'ocean',
    baseFreq: 110
  },
  {
    id: 'ruido-rosa',
    title: 'Ruido Rosa de Equilibrio (Pink Noise)',
    category: 'ruido_rosa',
    description: 'Energía sónica distribuida inversamente a la frecuencia (1/f). Ideal para calmar el sistema nervioso.',
    synthType: 'pink'
  },
  {
    id: 'ruido-marron',
    title: 'Ruido Marrón Profundo (Brownian Noise)',
    category: 'ruido_marron',
    description: 'Grave denso que envuelve la atención e inhibe acúfenos e hipervigilancia corporal.',
    synthType: 'brown'
  },
  {
    id: 'drone-vagal',
    title: 'Drone Vagal Solfeggio',
    category: 'drones',
    description: 'Zumbido armónico continuo en 432 Hz y 528 Hz para concentración en el descanso.',
    synthType: 'drone',
    baseFreq: 108
  },
  {
    id: 'paisaje-estelar',
    title: 'Paisaje Sonoro Cósmico',
    category: 'paisajes',
    description: 'Sintetizador progresivo de textura espacial limpia y envolvente.',
    synthType: 'harmonic_piano',
    baseFreq: 144
  }
];

export const PURE_TONES: ToneFrequency[] = [
  {
    hz: 40,
    name: '40 Hz - Gama de Sincronización',
    category: 'Ondas Cerebrales',
    suggestedUse: 'Uso experimental en sesión corta para enfoque sin nerviosismo.',
    scientificNotes: 'Asociado en neurociencia experimental a la sincronización de microglía y atención plena.',
    evidenceDisclaimer: 'No existe evidencia científica sólida que demuestre que una frecuencia específica trate el reflujo o la hiperacidez.'
  },
  {
    hz: 60,
    name: '60 Hz - Tono Grave de Anclaje',
    category: 'Frecuencias Armónicas',
    suggestedUse: 'Sonido estático para ejercicios de respiración lenta.',
    scientificNotes: 'Frecuencia de baja vibración auditiva.',
    evidenceDisclaimer: 'No existe evidencia científica sólida que demuestre que una frecuencia específica trate el reflujo o la hiperacidez.'
  },
  {
    hz: 80,
    name: '80 Hz - Resonancia Grave',
    category: 'Frecuencias Armónicas',
    suggestedUse: 'Fondo para el módulo de Tarareo.',
    scientificNotes: 'Estimula la percepción propioceptiva auditiva.',
    evidenceDisclaimer: 'No existe evidencia científica sólida que demuestre que una frecuencia específica trate el reflujo o la hiperacidez.'
  },
  {
    hz: 100,
    name: '100 Hz - Tono Basal Vagal',
    category: 'Frecuencias Armónicas',
    suggestedUse: 'Sostén acústico de meditación diafragmática.',
    scientificNotes: 'Resonancia agradable para tonos graves de relajación.',
    evidenceDisclaimer: 'No existe evidencia científica sólida que demuestre que una frecuencia específica trate el reflujo o la hiperacidez.'
  },
  {
    hz: 120,
    name: '120 Hz - Resonancia Laríngea',
    category: 'Frecuencias Armónicas',
    suggestedUse: 'Sincronización con el sonido de voz tarareada.',
    scientificNotes: 'Frecuencia cercana a la voz humana masculina grave.',
    evidenceDisclaimer: 'No existe evidencia científica sólida que demuestre que una frecuencia específica trate el reflujo o la hiperacidez.'
  },
  {
    hz: 150,
    name: '150 Hz - Tono Neutro Calmante',
    category: 'Frecuencias Armónicas',
    suggestedUse: 'Relajación pasiva con auriculares.',
    scientificNotes: 'Tono intermedio sin fatiga acústica.',
    evidenceDisclaimer: 'No existe evidencia científica sólida que demuestre que una frecuencia específica trate el reflujo o la hiperacidez.'
  },
  {
    hz: 200,
    name: '200 Hz - Armónico Abdominal',
    category: 'Frecuencias Armónicas',
    suggestedUse: 'Sesión de descanso y desaceleración.',
    scientificNotes: 'Aporta calidez acústica.',
    evidenceDisclaimer: 'No existe evidencia científica sólida que demuestre que una frecuencia específica trate el reflujo o la hiperacidez.'
  },
  {
    hz: 250,
    name: '250 Hz - Frecuencia Isocrónica Suave',
    category: 'Frecuencias Armónicas',
    suggestedUse: 'Acompañamiento en el ritmo 4-6.',
    scientificNotes: 'Ayuda a mantener un tempo regular.',
    evidenceDisclaimer: 'No existe evidencia científica sólida que demuestre que una frecuencia específica trate el reflujo o la hiperacidez.'
  },
  {
    hz: 300,
    name: '300 Hz - Claridad Mental',
    category: 'Frecuencias Armónicas',
    suggestedUse: 'Momentos de cansancio con malestar digestivo.',
    scientificNotes: 'Frecuencia limpia de rango medio.',
    evidenceDisclaimer: 'No existe evidencia científica sólida que demuestre que una frecuencia específica trate el reflujo o la hiperacidez.'
  },
  {
    hz: 400,
    name: '400 Hz - Tono de Estabilización',
    category: 'Frecuencias Armónicas',
    suggestedUse: 'Fondo suave en la pausa laboral.',
    scientificNotes: 'Frecuencia de rango medio.',
    evidenceDisclaimer: 'No existe evidencia científica sólida que demuestre que una frecuencia específica trate el reflujo o la hiperacidez.'
  },
  {
    hz: 432,
    name: '432 Hz - Afinación Natural Armónica',
    category: 'Solfeggio',
    suggestedUse: 'Acompañamiento musical de serenidad.',
    scientificNotes: 'Popularizada en musicoterapia por su textura suave para el oído.',
    evidenceDisclaimer: 'No existe evidencia científica sólida que demuestre que una frecuencia específica trate el reflujo o la hiperacidez.'
  },
  {
    hz: 440,
    name: '440 Hz - Tono Estándar L5',
    category: 'Frecuencias Armónicas',
    suggestedUse: 'Pruebas de percepción de tono puro.',
    scientificNotes: 'Afinación estándar de la nota La.',
    evidenceDisclaimer: 'No existe evidencia científica sólida que demuestre que una frecuencia específica trate el reflujo o la hiperacidez.'
  },
  {
    hz: 528,
    name: '528 Hz - Frecuencia Solfeggio "Transformación"',
    category: 'Solfeggio',
    suggestedUse: 'Sesión de meditación e imaginería guiada.',
    scientificNotes: 'Frecuencia tradicional utilizada en disciplinas de biofeedback acústico.',
    evidenceDisclaimer: 'No existe evidencia científica sólida que demuestre que una frecuencia específica trate el reflujo o la hiperacidez.'
  },
  {
    hz: 639,
    name: '639 Hz - Solfeggio Conexión',
    category: 'Solfeggio',
    suggestedUse: 'Manejo de la ansiedad y tensión emocional digestiva.',
    scientificNotes: 'Frecuencia de vibración armónica dulce.',
    evidenceDisclaimer: 'No existe evidencia científica sólida que demuestre que una frecuencia específica trate el reflujo o la hiperacidez.'
  },
  {
    hz: 741,
    name: '741 Hz - Solfeggio Purificación',
    category: 'Solfeggio',
    suggestedUse: 'Espacio de desconexión nocturna.',
    scientificNotes: 'Frecuencia clara de tono agudo moderado.',
    evidenceDisclaimer: 'No existe evidencia científica sólida que demuestre que una frecuencia específica trate el reflujo o la hiperacidez.'
  },
  {
    hz: 852,
    name: '852 Hz - Solfeggio Intuición',
    category: 'Solfeggio',
    suggestedUse: 'Retorno a la calma tras picos de ardor o dolor.',
    scientificNotes: 'Tono puro sin distorsión.',
    evidenceDisclaimer: 'No existe evidencia científica sólida que demuestre que una frecuencia específica trate el reflujo o la hiperacidez.'
  },
  {
    hz: 963,
    name: '963 Hz - Solfeggio Elevación',
    category: 'Solfeggio',
    suggestedUse: 'Finalización de la rutina diaria.',
    scientificNotes: 'Frecuencia aguda de foco meditativo.',
    evidenceDisclaimer: 'No existe evidencia científica sólida que demuestre que una frecuencia específica trate el reflujo o la hiperacidez.'
  }
];

export const GUIDED_PROTOCOLS: GuidedProtocol[] = [
  {
    id: 'proto-post-comida',
    title: 'Protocolo Reposo Post-Prandial',
    category: 'Después de comer',
    description: 'Diseñado específicamente para optimizar la digestión tras las comidas, reduciendo el reflujo, la pesadez y la eructación recurrente.',
    durationMinutes: 8,
    breathingProtocolId: 'diafragmatica-profunda',
    recommendedSoundCategory: 'mar',
    hummingIncluded: true,
    hapticPattern: 'respiracion',
    instructions: [
      'Siéntate con la espalda recta y no te acuestes inmediatamente tras comer.',
      'Siente cómo tu vientre se expande en la inhalación (4s) mientras tu diafragma desciende.',
      'Exhala suavemente en 6s sintiendo el soporte del esfínter esofágico.',
      'Finaliza con 2 minutos de tarareo continuo "Mmmmm" para relajar el píloro.'
    ],
    evidenceLevel: 'solida'
  },
  {
    id: 'proto-antes-dormir',
    title: 'Protocolo Desconexión Vagal Nocturna',
    category: 'Antes de dormir',
    description: 'Prepara el cuerpo para el reposo profundo cambiando la actividad del sistema nervioso autónomo del modo simpático al parasimpático.',
    durationMinutes: 10,
    breathingProtocolId: 'respiracion-4-7-8',
    recommendedSoundCategory: 'ruido_marron',
    hummingIncluded: true,
    hapticPattern: 'coherencia',
    instructions: [
      'Asegúrate de que han pasado al menos 2.5-3 horas desde tu última cena.',
      'Adopta una posición cómoda en la cama (preferentemente sobre tu costado izquierdo).',
      'Inhala en 4s, retén el aire 7s sin forzar y exhala en 8s sintiendo el peso de tu cuerpo.',
      'Deja sonar el ruido marrón de fondo para apagar pensamientos rumiativos.'
    ],
    evidenceLevel: 'solida'
  },
  {
    id: 'proto-estres-elevado',
    title: 'Protocolo SOS Crisis de Estrés',
    category: 'Estrés elevado',
    description: 'Intervención rápida para frenar el bucle de estrés, taquicardia o nudo en la boca del estómago.',
    durationMinutes: 5,
    breathingProtocolId: 'coherente-6',
    recommendedSoundCategory: 'bosque',
    hummingIncluded: false,
    hapticPattern: 'relajacion',
    instructions: [
      'Afloja cualquier ropa ajustada en la cintura o el pecho.',
      'Sigue el pulso visual y háptico en el ritmo exacto de 5s in / 5s out.',
      'Mantén los hombros relajados y suelta la mandíbula.',
      'Observa cómo disminuye la tensión muscular en el abdomen.'
    ],
    evidenceLevel: 'solida'
  },
  {
    id: 'proto-acidez-reflujo',
    title: 'Protocolo Alivio de Ardor y Reflujo',
    category: 'Acidez y Reflujo',
    description: 'Terapia respiratoria enfocada en fortalecer el tono del diafragma para prevenir el ascenso de ácido gástrico.',
    durationMinutes: 7,
    breathingProtocolId: 'diafragmatica-profunda',
    recommendedSoundCategory: 'drones',
    hummingIncluded: true,
    hapticPattern: 'respiracion',
    instructions: [
      'Permanece de pie o sentado en postura erguida.',
      'Coloca una mano en el pecho y otra en el epigastrio (boca del estómago).',
      'Solo debe moverse la mano del vientre durante la inhalación.',
      'Realiza el tarareo "Uuuuu" al exhalar para relajar la musculatura lisa.'
    ],
    evidenceLevel: 'moderada'
  },
  {
    id: 'proto-nauseas',
    title: 'Protocolo Calma Gástrica y Náuseas',
    category: 'Náuseas y Malestar',
    description: 'Técnica de distracción vestibular y modulación vagal para atenuar la sensación de náuseas y dispepsia funcional.',
    durationMinutes: 6,
    breathingProtocolId: 'respiracion-4-6',
    recommendedSoundCategory: 'lluvia',
    hummingIncluded: false,
    hapticPattern: 'tarareo',
    instructions: [
      'Bebe a pequeños sorbos agua fresca a temperatura ambiente.',
      'Sigue la exhalación guiada mientras observas las ondas de luz en pantalla.',
      'Concéntrate en la sensación de la respiración saliendo por las fosas nasales.',
      'Visualiza cómo la tormenta interna del estómago se calma gradualmente.'
    ],
    evidenceLevel: 'preliminar'
  }
];

export const DAILY_HABITS: DailyHabit[] = [
  {
    id: 'habit-caminar',
    title: 'Caminar 10-15 minutos tras la comida',
    description: 'Un paseo suave acelera el vaciamiento gástrico sin aumentar el reflujo.',
    category: 'digestivo',
    impact: 'alto',
    completed: false,
    scientificTip: 'Estudios demuestran que caminar suavemente reduce la retención estomacal y los picos de glucosa postprandial.'
  },
  {
    id: 'habit-cenar-temprano',
    title: 'Cenar al menos 3 horas antes de acostarse',
    description: 'Garantiza que el estómago esté casi vacío al adoptar la posición horizontal.',
    category: 'sueño',
    impact: 'alto',
    completed: false,
    scientificTip: 'El tiempo de vaciado gástrico promedio para comida sólida es de 2 a 3 horas.'
  },
  {
    id: 'habit-elevar-cama',
    title: 'Elevar la cabecera de la cama 10-15 cm',
    description: 'Usa elevadores de cama o almohada en cuña (inclinación en bloque).',
    category: 'postura',
    impact: 'alto',
    completed: false,
    scientificTip: 'La gravedad evita físicamente que el ácido suba por el esófago durante la noche.'
  },
  {
    id: 'habit-dormir-izquierdo',
    title: 'Dormir sobre el lado izquierdo (Decúbito lateral izquierdo)',
    description: 'Mantiene la unción gastroesofágica por encima del nivel del estanque ácido del estómago.',
    category: 'postura',
    impact: 'alto',
    completed: false,
    scientificTip: 'Anatómicamente, el estómago se ubica a la izquierda. Dormir sobre la izquierda disminuye drásticamente los eventos de reflujo nocturno.'
  },
  {
    id: 'habit-comer-despacio',
    title: 'Masticar despacio (al menos 20 veces por bocado)',
    description: 'La digestión comienza en la boca con la amilasa salival y la trituración mecánica.',
    category: 'digestivo',
    impact: 'alto',
    completed: false,
    scientificTip: 'Comer despacio reduce la aerofagia (tragar aire) y da tiempo a los receptores de saciedad leptínicos.'
  },
  {
    id: 'habit-evitar-acostarse',
    title: 'Evitar tumbarse inmediatamente en el sofá tras comer',
    description: 'Mantén el tronco erguido durante al menos 45 minutos post-ingesta.',
    category: 'digestivo',
    impact: 'medio',
    completed: false,
    scientificTip: 'La presión intraabdominal aumenta al estar tumbado o encorvado.'
  },
  {
    id: 'habit-hidratacion',
    title: 'Hidratación adecuada entre comidas',
    description: 'Bebe agua preferiblemente fuera de las comidas principales para no diluir los jugos gástricos.',
    category: 'estilodevida',
    impact: 'medio',
    completed: false,
    scientificTip: 'El agua favorece la motilidad intestinal y la mucosa protectora del estómago.'
  },
  {
    id: 'habit-respiracion-diaria',
    title: 'Realizar al menos 1 sesión diaria de Coherencia Vagal',
    description: 'Entrena la flexibilidad del sistema nervioso autónomo día a día.',
    category: 'estilodevida',
    impact: 'alto',
    completed: false,
    scientificTip: 'La práctica regular fortalece el tono vagal basal, aumentando la tolerancia al estrés somático.'
  }
];

export const EDU_ARTICLES: EduArticle[] = [
  {
    id: 'edu-nervio-vago',
    title: '¿Qué es el Nervio Vago y cómo modula la digestión?',
    category: 'Nervio Vago',
    summary: 'El X par craneal es la autopista de información entre el cerebro y el aparato digestivo, regulando el 80% de la actividad parasimpática.',
    contentMarkdown: `
# El Nervio Vago: La Autopista Intestino-Cerebro

El **Nervio Vago** (X par craneal) es el nervio más largo del sistema nervioso autónomo. Se extiende desde el tronco encefálico hasta los órganos abdominales, incluyendo el corazón, los pulmones, el estómago y los intestinos.

### Funciones Principales en la Digestión:
1. **Motilidad Gástrica**: Ordena al estómago mezclarse y vaciar los alimentos adecuadamente.
2. **Secreción Enzimática y Biliar**: Activa la liberación de enzimas digestivas y bilis.
3. **Cierre del Esfínter Esofágico Inferior**: Mantiene la válvula de la boca del estómago cerrada para impedir el reflujo ácido.
4. **Antiinflamatorio Natural**: A través de la *vía antiinflamatoria colinérgica*, disminuye la liberación de citoquinas inflamatorias en el intestino.

El **tono vagal** representa la salud de este sistema. Un tono vagal elevado se traduce en mejor digestión, menor ansiedad corporal y mejor recuperación tras el estrés.
`,
    evidenceLevel: 'solida',
    readTimeMinutes: 3,
    keyTakeaways: [
      'El nervio vago es el motor del estado de descanso y digestión ("Rest & Digest").',
      'La respiración diafragmática lentificada estimula directamente sus receptores de estiramiento.',
      'Un buen tono vagal protege la mucosa gástrica y regula la acidez.'
    ]
  },
  {
    id: 'edu-eje-intestino-cerebro',
    title: 'El Eje Intestino-Cerebro y la Hipervigilancia Visceral',
    category: 'Eje Intestino-Cerebro',
    summary: 'Cómo el estrés psicológico altera la sensibilidad digestiva produciendo síntomas reales sin lesión física visible.',
    contentMarkdown: `
# El Eje Intestino-Cerebro y la Sensibilidad Visceral

Existe una comunicación bidireccional constante entre el sistema nervioso central (SNC) y el sistema nervioso entérico (SNE, el "segundo cerebro").

### ¿Qué ocurre durante el estrés?
Cuando percibimos estrés o amenaza:
- El cerebro activa el **eje simpático-adrenal**.
- Se desvía la sangre de los órganos digestivos hacia los músculos de las extremidades.
- Se inhibe la secreción de saliva y moco protector gástrico.
- Aumenta la **hipervigilancia visceral**: el cerebro magnifica las señales normales de digestión y las interpreta como dolor o ardor intenso.

Mediante técnicas de **modulación vagal y respiración dirigida**, enviamos señales aferentes de seguridad al cerebro, bajando el volumen de la hipervigilancia somática.
`,
    evidenceLevel: 'solida',
    readTimeMinutes: 4,
    keyTakeaways: [
      'El estómago tiene más de 100 millones de neuronas (Sistema Nervioso Entérico).',
      'La ansiedad incrementa la percepción del ácido gástrico aunque el nivel de pH no haya cambiado.',
      'Entrenar la calma reduce la hipersensibilidad visceral.'
    ]
  },
  {
    id: 'edu-mecanismo-humming',
    title: 'El Principio Científico del Tarareo (Humming)',
    category: 'Fisiología Respiratoria',
    summary: 'Cómo la vibración fonatoria activa las ramas laríngeas del vago e incrementa la síntesis de Óxido Nítrico.',
    contentMarkdown: `
# La Ciencia detrás del Tarareo (Humming)

El tarareo ("humming") no es solo una práctica meditativa; posee una base fisiológica sólida demostrada en medicina respiratoria:

1. **Liberación de Óxido Nítrico (NO)**: Estudios publicados en revistas como *American Journal of Respiratory and Critical Care Medicine* muestran que el tarareo aumenta hasta 15 veces la producción de óxido nítrico en los senos paranasales. El NO es un potente vasodilatador y broncodilatador natural.
2. **Estimulación Laríngea Vagal**: El nervio laríngeo recurrente corre paralelo a las cuerdas vocales. La vibración continua a bajas frecuencias (100-140 Hz) envía impulsos eléctricos aferentes directos al Núcleo del Tracto Solitario (NTS) en el cerebro.
3. **Desaceleración Respiratoria Mecánica**: Al forzar la salida del aire a través de una pequeña vibración vocal, la fase de exhalación se prolonga de forma natural sin esfuerzo.
`,
    evidenceLevel: 'solida',
    readTimeMinutes: 3,
    keyTakeaways: [
      'Multiplica la presencia de Óxido Nítrico en las vías respiratorias superiores.',
      'Resuena mecánicamente en las cuerdas vocales activando fibras vagales.',
      'Facilita la exhalación lenta y la relajación diafragmática.'
    ]
  },
  {
    id: 'edu-habitos-efectivos',
    title: 'Guía de Hábitos: Qué Ayuda y Qué Perjudica a tu Digestión',
    category: 'Hábitos Saludables',
    summary: 'Recomendaciones prácticas basadas en gastroenterología para controlar el reflujo y la dispepsia.',
    contentMarkdown: `
# Hábitos Digestivos: Evidencia Práctica

### 🟢 Hábitos que AYUDAN:
- **Cenar temprano**: Dejar 3 horas de margen antes de dormir.
- **Elevar la cabecera**: Inclinar la cama 10-15 cm físicamente.
- **Dormir sobre el lado izquierdo**: Anatómicamente favorece el vaciado gástrico y previene el reflujo.
- **Masticar concienzudamente**: Facilita el trabajo del ácido estomacal.
- **Respirar diafragmáticamente post-comida**: Mantiene la presión del esfínter esofágico.

### 🔴 Hábitos que PERJUDICAN:
- Tumbarse inmediatamente después de comer.
- Utilizar ropa apretada en la cintura (aumenta la presión intraabdominal).
- Consumir comidas muy copiosas y ricas en grasas saturadas justo antes de descansar.
- Fumar o consumir alcohol (relajan el esfínter esofágico inferior de forma indeseada).
`,
    evidenceLevel: 'solida',
    readTimeMinutes: 4,
    keyTakeaways: [
      'Pqueños cambios posturales tienen un impacto enorme en el reflujo nocturno.',
      'La gravedad es tu aliada física más efectiva.',
      'Evitar la presión sobre el abdomen protege la unión gastroesofágica.'
    ]
  }
];
