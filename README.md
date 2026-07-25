# 🌿 Quyriux: Plataforma de Modulación Vagal & Salud Digestiva

**Quyriux** es una aplicación web de biofeedback multimodal, autorregulación neurovegetativa y educación gastroenterológica. Ha sido diseñada específicamente para ayudar en el manejo complementario del **Reflujo Gastroesofágico (ERGE)**, la **Hernia de Hiato**, la **Acidez Gástrica**, la **Dispepsia Funcional** y los trastornos del **Eje Intestino-Cerebro** mediante la estimulación no invasiva del **Nervio Vago**.

---

## 📋 Tabla de Contenidos

1. [Visión General y Filosofía Local-First](#-visión-general-y-filosofía-local-first)
2. [Aviso Médico de Responsabilidad (Disclaimer)](#-aviso-médico-de-responsabilidad-disclaimer)
3. [Flujo Completo de Funcionamiento](#-flujo-completo-de-funcionamiento)
4. [Estructura del Proyecto y Módulos de Código](#-estructura-del-proyecto-y-módulos-de-código)
5. [📖 Manual de Usuario Completo](#-manual-de-usuario-completo)
   - [1. Dashboard / Panel de Control](#1-dashboard--panel-de-control)
   - [2. Módulo de Respiración Guiada (Pacing SVG)](#2-módulo-de-respiración-guiada-pacing-svg)
   - [3. Módulo de Tarareo / Humming Vagal (110 Hz)](#3-módulo-de-tarareo--humming-vagal-110-hz)
   - [4. Mezclador de Paisajes Sonoros (Soundscapes)](#4-mezclador-de-paisajes-sonoros-soundscapes)
   - [5. Generador de Tonos Puros y Frecuencias](#5-generador-de-tonos-puros-y-frecuencias)
   - [6. Motor de Vibración Háptica Sincronizada](#6-motor-de-vibración-háptica-sincronizada)
   - [7. Protocolos Terapéuticos Guiados](#7-protocolos-terapéuticos-guiados)
   - [8. Checklist de Hábitos Digestivos](#8-checklist-de-hábitos-digestivos)
   - [9. Registro de Síntomas & Analítica Interactiva](#9-registro-de-síntomas--analítica-interactiva)
   - [10. Centro Educativo & Neurociencia](#10-centro-educativo--neurociencia)
   - [11. Asistente Coach Autónomo (Motor de Reglas)](#11-asistente-coach-autónomo-motor-de-reglas)
   - [12. Planificador de Rutinas Circadianas](#12-planificador-de-rutinas-circadianas)
   - [13. Recordatorios y Alertas Web](#13-recordatorios-y-alertas-web)
   - [14. Exportación de Datos e Informe PDF Médico](#14-exportación-de-datos-e-informe-pdf-médico)
   - [15. Configuración y Accesibilidad](#15-configuración-y-accesibilidad)
6. [📱 Optimización y Uso en Smartphones](#-optimización-y-uso-en-smartphones)
7. [🛠️ Guía de Instalación y Desarrollo](#️-guía-de-instalación-y-desarrollo)

---

## 🔒 Visión General y Filosofía Local-First

Quyriux opera bajo la arquitectura **Local-First (Privacidad por Diseño)**. Todos los datos de salud, evaluaciones sintomáticas, rachas y configuraciones se almacenan directamente en el dispositivo del usuario (`LocalStorage` / `IndexedDB`).

- **Sin Servidores Externos:** No se requiere creación de cuentas ni se envían datos personales a la nube.
- **Funcionamiento 100% Offline:** Todas las funciones (sintetizador de audio, motor de reglas, gráficos, háptica y consejos) operan sin conexión a Internet.
- **Sin Dependencias de API de Terceros:** El Coach de Inteligencia opera con un motor de reglas y árboles de decisión preprogramados.

---

## ⚠️ Aviso Médico de Responsabilidad (Disclaimer)

> **IMPORTANTE:** Quyriux es una herramienta informática educativa y de autorregulación somática. **No es un dispositivo médico ni sustituye la consulta, diagnóstico o tratamiento de un profesional de la salud.** Si experimenta dolor torácico agudo, dificultad respiratoria severa, disfagia brusca o sangrado digestivo, acuda inmediatamente a un servicio de urgencias médicas.

---

## 🔄 Flujo Completo de Funcionamiento

1. **Check-In Somático Inicial:** El usuario realiza una rápida autoevaluación graduando la intensidad de su acidez, reflujo, nivel de estrés percibido y calidad del descanso (escala 0-10).
2. **Cálculo de la Puntuación Vagal (0-100%):** El motor de reglas (`ruleEngine.ts`) procesa el histórico reciente de síntomas y el porcentaje de hábitos digestivos cumplidos para determinar el estado de modulación parasimpática.
3. **Prescripción de Protocolos Personalizados:** La aplicación recomienda la técnica óptima para el estado actual (ej. *Respiración Diafragmática 4-7-8* para picos de acidez por estrés, o *Paseo Post-Prandial* tras comer).
4. **Ejecución Multimodal Sincronizada:**
   - **Guía Visual:** Círculo SVG que se expande en la inhalación y se contrae en la exhalación.
   - **Guía Auditiva:** Frecuencia acústica o paisaje sonoro binaural que marca el ritmo.
   - **Guía Táctil (Háptica):** Pulsos de vibración física en el teléfono o simulación luminosa en pantalla.
5. **Registro Automático & Análisis:** Al concluir la sesión, el tiempo de relajación se suma al perfil del usuario, actualizando los gráficos evolutivos e informes exportables para el especialista.

---

## 📁 Estructura del Proyecto y Módulos de Código

```
├── public/                  # Artefactos estáticos e íconos
├── src/
│   ├── components/          # Componentes de interfaz de usuario
│   │   ├── AiCoachView.tsx           # Asistente virtual offline
│   │   ├── BreathingSessionView.tsx # Sesión de respiración con pacing SVG
│   │   ├── CheckInModal.tsx          # Modal de autoevaluación somática
│   │   ├── DigestiveHabitsView.tsx   # Checklist de hábitos digestivos
│   │   ├── DisclaimerBanner.tsx      # Banner médico permanente
│   │   ├── DashboardView.tsx         # Panel principal con métricas y score
│   │   ├── EducationCenterView.tsx   # Centro de artículos y FAQ
│   │   ├── GuidedProtocolsView.tsx   # Rutinas secuenciales paso a paso
│   │   ├── HapticEngineView.tsx      # Probador y simulador háptico
│   │   ├── HeaderNavbar.tsx          # Barra superior con score y accesos
│   │   ├── HummingSessionView.tsx    # Biofeedback de tarareo vagal (110 Hz)
│   │   ├── ProgressExportView.tsx    # Generación de informe PDF y JSON
│   │   ├── PureToneGeneratorView.tsx # Generador de ondas e isocrónicos
│   │   ├── RemindersView.tsx         # Gestor de alertas nativas del navegador
│   │   ├── RoutinePlannerView.tsx    # Planificador diario de rutinas
│   │   ├── SettingsModal.tsx         # Configuración y accesibilidad
│   │   ├── SidebarNav.tsx            # Navegación responsiva y menú desplegable
│   │   ├── SoundscapeMixerView.tsx   # Mezclador de audio ambiente
│   │   └── SymptomAnalyticsView.tsx  # Gráficos de tendencias (Recharts)
│   ├── data/
│   │   └── initialData.ts            # Datos iniciales, artículos y preguntas
│   ├── services/
│   │   ├── audioEngine.ts        # Sintetizador Web Audio API (tonos y ruido)
│   │   ├── hapticEngine.ts       # Motor Web Vibration API con simulación
│   │   ├── notificationService.ts# API de Notificaciones de escritorio/móvil
│   │   ├── ruleEngine.ts         # Árboles de decisión y lógica de cálculo
│   │   └── storageService.ts     # Gestor de persistencia e impresión PDF
│   ├── types.ts                  # Definición de tipos TypeScript del sistema
│   ├── App.tsx                   # Módulo raíz y enrutador de vista
│   ├── main.tsx                  # Punto de entrada React
│   └── index.css                 # Estilos globales de Tailwind CSS
├── package.json              # Dependencias del proyecto
└── README.md                 # Manual de usuario y documentación técnica
```

---

## 📖 Manual de Usuario Completo

### 1. Dashboard / Panel de Control
El **Dashboard** es el centro de mando que condensa tu estado actual:
- **Puntuación de Tono Vagal:** Un indicador porcentual (0-100%) calculado según tus últimos registros. A mayor puntuación, mayor equilibrio parasimpático.
- **Acciones Rápidas:** Botón *Evaluar Síntomas Ahora* para abrir el formulario de autoevaluación.
- **Recomendación Personalizada:** Cuadro inteligente que te sugiere el protocolo ideal según la hora del día y tu estado de acidez o estrés.
- **Resumen de Rachas:** Muestra tus días consecutivos practicando, minutos de relajación acumulados y horas de respiración guiada.

### 2. Módulo de Respiración Guiada (Pacing SVG)
Diseñado para guiar la arritmia sinusal respiratoria y fortalecer el tono del Esfínter Esofágico Inferior (EEI):
- **Círculo Guía SVG Animado:** Un gráfico vectorial responsivo que se **expande armónicamente en la inhalación** y se **contrae en la exhalación**, cambiando progresivamente de color (Cian en Inhalación, Púrpura en Retención, Esmeralda en Exhalación, Ámbar en Pausa).
- **Control de Fases:** Temporizador en segundos reales para cada etapa.
- **Selección de Patrones:**
  - *Coherencia Cardíaca (5s / 5s):* Equilibrio del sistema nervioso autónomo.
  - *Relajación Profunda 4-7-8:* Indicada para episodios de acidez por estrés o insomnio.
  - *Paso Post-Comida (3s / 6s):* Exhalación prolongada para favorecer el vaciado gástrico.

### 3. Módulo de Tarareo / Humming Vagal (110 Hz)
El tarareo constante con la boca cerrada (*"Mmmmm"*) genera una vibración acústica en la cavidad nasofaríngea que estimula directamente la rama laríngea del nervio vago:
- **Tono Guía a 110 Hz:** Sintetizado en tiempo real por el motor de audio.
- **Indicador Visual de Resonancia:** Un anillo pulsante que te indica cuándo emitir la resonancia vocal para maximizar la liberación de óxido nítrico y la relajación digestiva.

### 4. Mezclador de Paisajes Sonoros (Soundscapes)
Crea una atmósfera sonora relajante que disminuye la hipersensibilidad visceral:
- **Control Multicanal:** Ajusta individualmente los volúmenes de *Olas de Mar*, *Lluvia Suave*, *Bosque Nocturno* y *Ruido Marrón*.
- **Ruido Marrón (Brown Noise):** Frecuencias graves profundas ideales para enmascarar ruidos y calmar el sistema nervioso central.

### 5. Generador de Tonos Puros y Frecuencias
- **Frecuencias de Resonancia:** Selección de tonos puros como 432 Hz, 528 Hz y impulsos binaurales.
- **Modulación Continua:** Permite reproducir ondas sinusoidales limpias generadas por la Web Audio API sin consumir ancho de banda.

### 6. Motor de Vibración Háptica Sincronizada

#### 📳 Retroalimentación Táctil Sincronizada
> *"Siente el ritmo respiratorio directamente en tu dispositivo sin necesidad de mirar constantemente la pantalla."*

Esta característica revolucionaria permite realizar las sesiones de respiración con los ojos cerrados o sin fijar la vista en la pantalla del smartphone:

- **En Dispositivos Compatibles (Android / Chrome con Motor de Vibración Físico):**
  La aplicación emite pulsos de vibración reales de intensidad variable mediante la `Web Vibration API`. Sentirás un incremento de vibración durante la inhalación, un doble micro-pulsado en la retención y una vibración suave continua durante la exhalación.

- **Sin Motor Físico (Simulación en Pantalla):**
  En ordenadores de escritorio, ordenadores portátiles, dispositivos iOS/iPhone o navegadores donde el motor de vibración físico esté deshabilitado o no sea compatible con la API web, la aplicación activa automáticamente el **Modo de Simulación Háptica Visual**. Este modo sustituye los pulsos físicos por **destellos de luz periférica, pulsaciones de halo en pantalla y expansiones rítmicas** que simulan el impacto táctil para que nunca pierdas el ritmo de la respiración.

### 7. Protocolos Terapéuticos Guiados
Rutinas secuenciales estructuradas para momentos específicos del día:
- *Rutina de Despertar Vagal (Mañana)*
- *Pausa Anti-Reflujo Post-Prandial (Después de comer)*
- *Descompresión Antiestrés (Tarde)*
- *Protocolo de Desconexión Parasimpática Pre-Sueño (Noche)*

### 8. Checklist de Hábitos Digestivos
Registro de acciones posturales y conductuales con respaldo gastroenterológico:
- Elevar la cabecera de la cama 10–15 cm.
- Dormir sobre el lado izquierdo (decúbito lateral izquierdo) para mantener la unión gastroesofágica por encima del nivel de ácido.
- Mantener un intervalo de al menos 2.5 a 3 horas entre la cena y el momento de acostarse.
- Masticación pausada (mínimo 20 veces por bocado).
- Evitar prendas ajustadas en el abdomen que incrementen la presión intraabdominal.

### 9. Registro de Síntomas & Analítica Interactiva
- **Gráficos Evolutivos:** Visualización interactiva desarrollada con **Recharts** para observar la tendencia temporal de tu acidez, reflujo, estrés y calidad de sueño.
- **Tabla de Historial:** Detalle cronológico con hora y momento del día de todas tus autoevaluaciones.

### 10. Centro Educativo & Neurociencia
Artículos explicativos sencillos sobre la ciencia del eje intestino-cerebro, el tono del Esfínter Esofágico Inferior y respuestas a preguntas frecuentes (FAQ) sobre la hernia de hiato y el nervio vago.

### 11. Asistente Coach Autónomo (Motor de Reglas)
Un chatbot interactivo 100% offline que responde a tus dudas de salud digestiva mediante árboles de decisión predefinidos en el código, sin enviar tus mensajes a ningún servidor externo.

### 12. Planificador de Rutinas Circadianas
Cronograma diario estructurado que sincroniza tus hábitos digestivos con los picos de secreción ácida gástrica.

### 13. Recordatorios y Alertas Web
Permite programar notificaciones nativas en el navegador para recordarte tomar pausas respiratorias, realizar paseos digestivos o preparar la habitación antes de dormir.

### 14. Exportación de Datos e Informe PDF Médico
- **Exportar JSON:** Descarga una copia de seguridad de todos tus datos locales.
- **Generar Reporte PDF:** Genera e imprime un resumen estructurado para entregárselo a tu médico o gastroenterólogo en tu próxima consulta.

### 15. Configuración y Accesibilidad
Accesible desde el ícono de engranaje en la barra superior:
- Personalización de nombre y meta diaria de minutos.
- **Modo Alto Contraste:** Para facilitar la lectura a personas con sensibilidad visual o en entornos oscuros.
- **Modo Texto Grande:** Incrementa el tamaño tipográfico global.
- **Interruptor de Vibración y Sonido:** Activa o silencia el feedback háptico y los tonos de audio según tu preferencia.

---

## 📱 Optimización y Uso en Smartphones

Quyriux ha sido adaptada con un enfoque **Mobile-First**:
- **Barra de Navegación Inferior Móvil:** En pantallas táctiles de teléfonos inteligentes, la barra lateral se transforma en un menú inferior accesible con el pulgar (*Inicio*, *Respirar*, *Check-In*, *Coach* y un botón de *Módulos* para desplegar el resto de herramientas).
- **Adaptabilidad Táctil:** Botones con un objetivo táctil mínimo de 44px para evitar pulsaciones erróneas.
- **Layouts Fluidos:** El contenido se ajusta dinámicamente a cualquier orientación y resolución sin desbordamientos horizontales.

---

## 🛠️ Guía de Instalación y Desarrollo

Si deseas ejecutar Quyriux localmente en tu entorno de desarrollo Node.js:

```bash
# 1. Clonar el repositorio o extraer el código fuente
cd quyriux-app

# 2. Instalar las dependencias del proyecto
npm install

# 3. Iniciar el servidor de desarrollo local (Puerto 3000)
npm run dev

# 4. Compilar para producción
npm run build

# 5. Probar el bundle de producción
npm start
```

---

## 📄 Licencia y Privacidad
Este proyecto es software de código abierto enfocado en la salud y el bienestar. **Todos los derechos reservados. Mantiene una política estricta de cero recolección de datos personales.**
