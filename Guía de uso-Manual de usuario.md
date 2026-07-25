# 📘 Quyriux: Guía de Uso y Manual de Usuario Oficial

Bienvenido a la **Guía de Uso y Manual de Usuario Oficial de Quyriux**, la plataforma de biofeedback multimodal, autorregulación neurovegetativa y gestión somática del **Reflujo Gastroesofágico (ERGE)**, **Acidez Gástrica**, **Hernia de Hiato**, **Dispepsia Funcional** y trastornos del **Eje Intestino-Cerebro**.

Este documento ha sido redactado con máxima exhaustividad para guiarte paso a paso por **cada pantalla, botón, menú, ajuste, frecuencia de sonido, patrón de vibración y elemento gráfico** de la aplicación.

---

## 📑 Índice General

1. [Principios Fundamentales y Filosofía Local-First](#1-principios-fundamentales-y-filosofía-local-first)
2. [Estructura de la Interfaz y Control de Navegación](#2-estructura-de-la-interfaz-y-control-de-navegación)
   - [Barra Superior Permanente (Header Navbar)](#barra-superior-permanente-header-navbar)
   - [Navegación en Ordenadores (Sidebar Vertical Desktop)](#navegación-en-ordenadores-sidebar-vertical-desktop)
   - [Navegación en Smartphones (Barra Fija Inferior y Cajón de Módulos)](#navegación-en-smartphones-barra-fija-inferior-y-cajón-de-módulos)
3. [Explicación Detallada Módulo por Módulo](#3-explicación-detallada-módulo-por-módulo)
   - [Módulo 1: Dashboard / Panel de Control Principal](#módulo-1-dashboard--panel-de-control-principal)
   - [Módulo 2: Entrenamiento de Respiración Guiada (Pacing SVG)](#módulo-2-entrenamiento-de-respiración-guiada-pacing-svg)
   - [Módulo 3: Biofeedback de Tarareo Vagal (Humming 110 Hz)](#módulo-3-biofeedback-de-tarareo-vagal-humming-110-hz)
   - [Módulo 4: Mezclador de Paisajes Sonoros (Soundscapes)](#módulo-4-mezclador-de-paisajes-sonoros-soundscapes)
   - [Módulo 5: Generador de Tonos Puros y Frecuencias Isocrónicas](#módulo-5-generador-de-tonos-puros-y-frecuencias-isocrónicas)
   - [Módulo 6: Motor de Vibración Háptica Sincronizada](#módulo-6-motor-de-vibración-háptica-sincronizada)
   - [Módulo 7: Rutinas Terapéuticas Guiadas](#módulo-7-rutinas-terapéuticas-guiadas)
   - [Módulo 8: Hábitos Digestivos Diarios (Checklist)](#módulo-8-hábitos-digestivos-diarios-checklist)
   - [Módulo 9: Registro de Síntomas & Analítica Evolutiva](#módulo-9-registro-de-síntomas--analítica-evolutiva)
   - [Módulo 10: Centro Educativo & Neurociencia Vagal](#módulo-10-centro-educativo--neurociencia-vagal)
   - [Módulo 11: Asistente Coach Autónomo (Motor de Reglas Offline)](#módulo-11-asistente-coach-autónomo-motor-de-reglas-offline)
   - [Módulo 12: Planificador de Rutinas Circadianas](#módulo-12-planificador-de-rutinas-circadianas)
   - [Módulo 13: Notificaciones y Alertas de Adherencia](#módulo-13-notificaciones-y-alertas-de-adherencia)
   - [Módulo 14: Progreso, Privacidad & Exportación de Datos](#módulo-14-progreso-privacidad--exportación-de-datos)
   - [Módulo 15: Configuración y Accesibilidad](#módulo-15-configuración-y-accesibilidad)
4. [Preguntas Frecuentes y Solución de Problemas](#4-preguntas-frecuentes-y-solución-de-problemas)

---

## 1. Principios Fundamentales y Filosofía Local-First

Quyriux no es una aplicación convencional basada en servidores externos. Ha sido construida bajo la filosofía **Local-First (Privacidad Absoluta)**:

* **Tus Datos se Quedan en tu Dispositivo:** Toda tu información de acidez, estrés, horarios, hábitos e historial de respiración se guarda exclusivamente en el almacenamiento de tu navegador (`LocalStorage` e `IndexedDB`).
* **Sin Registro de Cuentas ni Contraseñas:** No necesitas ingresar correos electrónicos ni crear contraseñas. Tu sesión existe en tu navegador de forma directa.
* **Funcionalidad 100% Offline:** Todas las herramientas (sintetizador de audio, animaciones SVG, gráficos, motor de inteligencia y vibraciones) funcionan incluso sin conexión a Internet o en modo avión.
* **Aviso Médico Permanente:** Quyriux es un sistema educativo y de entrenamiento somático complementario. No sustituye la valoración de tu médico o gastroenterólogo.

---

## 2. Estructura de la Interfaz y Control de Navegación

### Barra Superior Permanente (Header Navbar)

La barra superior está visible en todo momento y contiene las métricas clave y accesos globales:

1. **Banner Médico de Advertencia (Disclaimer):** Situado en la parte superior con fondo oscuro y texto claro. Recuerda que la aplicación no realiza diagnósticos clínicos.
2. **Isotipo y Logotipo "Quyriux":** Ubicado a la izquierda. Al hacer clic sobre el logo o el nombre, regresarás de inmediato al **Dashboard Principal**.
3. **Badge de Puntuación de Tono Vagal (Score Porcentual):** Muestra tu porcentaje de equilibrio parasimpático actual (ejemplo: `85% Tono Vagal`).
   * *Verde (75% - 100%):* Estado parasimpático óptimo.
   * *Azul / Ámbar (45% - 74%):* Estado moderado que requiere pausas respiratorias.
   * *Rojo / Rosa (0% - 44%):* Alerta de hiperactivación simpática o alta acidez.
4. **Botón "Evaluar Síntomas" (Ícono de Estetoscopio):** Al pulsarlo, abre directamente el cuadro modal de Check-In diario para registrar tus niveles de acidez, reflujo y estrés en menos de 30 segundos.
5. **Botón de Configuración (Engranaje):** Abre el panel de personalización de perfil, accesibilidad, alto contraste y opciones de sonido/vibración.

---

### Navegación en Ordenadores (Sidebar Vertical Desktop)

En pantallas de ordenador o tabletas horizontales, el menú se despliega verticalmente a la izquierda en 4 categorías claramente organizadas:

* **Categoría Principal:**
  * **Dashboard:** Resumen general de estado, recomendaciones y métricas.
* **Categoría Técnicas:**
  * **Respiración:** Entrenador visual con el círculo dinámico SVG.
  * **Tarareo (Humming):** Estimulación vagal a 110 Hz.
  * **Paisajes Sonoros:** Mezclador multicanal de relajación.
  * **Tonos Puros:** Generador de ondas e impulsos isocrónicos.
  * **Vibración Háptica:** Panel de prueba y control de respuesta táctil.
* **Categoría Gestión:**
  * **Protocolos Guiados:** Rutinas estructuradas paso a paso.
  * **Hábitos Digestivos:** Checklist postural y conductual.
  * **Analítica de Síntomas:** Gráficos evolutivos y tendencias temporales.
  * **Centro Educativo:** Guías científicas y preguntas frecuentes.
* **Categoría Inteligencia:**
  * **Asistente Coach:** Asistente interactivo offline.
  * **Planificador de Rutinas:** Cronograma diario de salud.
  * **Recordatorios:** Gestor de alertas en el navegador.
  * **Progreso y Exportación:** Generador de informes PDF para el médico.

---

### Navegación en Smartphones (Barra Fija Inferior y Cajón de Módulos)

Para garantizar una experiencia óptima con una sola mano en teléfonos inteligentes (iOS y Android), el menú cambia automáticamente a un formato táctil adaptado:

1. **Barra Fija Inferior (Bottom Bar):** Ubicada al alcance del pulgar con 5 accesos directos principales:
   * **Inicio:** Te lleva al Dashboard.
   * **Respirar:** Abre de inmediato la sesión de respiración con el círculo SVG.
   * **Check-In:** Abre la autoevaluación rápida de síntomas.
   * **Coach:** Abre el chat con el asistente de salud.
   * **Módulos (Ícono de Rejilla):** Despliega el cajón completo de herramientas.

2. **Cajón Desplegable de Módulos (Full Screen Drawer):** Al pulsar "Módulos", se abre un menú modal a pantalla completa con tarjetas táctiles organizadas por categorías. Puedes cerrar este menú en cualquier momento tocando el botón `X` en la esquina superior derecha.

---

## 3. Explicación Detallada Módulo por Módulo

---

### Módulo 1: Dashboard / Panel de Control Principal

El Dashboard es tu cuadro de mando personal. Al entrar, observarás:

#### Componentes Visuales:
* **Tarjeta de Bienvenida:** Saludo personalizado con tu nombre o apodo, indicando tu racha actual de días practicando consecutivamente.
* **Círculo de Puntuación Somática (Score 0-100%):** Muestra el estado del tono vagal en tiempo real. Un círculo dinámico coloreado representa la combinación de tus últimos síntomas registrados y los hábitos saludables completados hoy.
* **Caja de Prescripción/Recomendación Personalizada:** El motor de reglas examina tu hora actual y tus niveles de acidez. Por ejemplo:
  * Si detecta acidez alta por la tarde, sugerirá: *"Practicar 10 min de Respiración 4-7-8"*.
  * Si es después de comer, sugerirá: *"Realizar un paseo digestivo suave de 10 min y evitar acostarse"*.
* **Cuadro de Métricas Acumuladas:**
  * **Minutos de Relajación:** Total de minutos invertidos en respiración y tarareo.
  * **Horas de Respiración Consciente:** Cálculo estimado de ciclos respiratorios completados.
  * **Sesiones Completadas:** Contador total de ejercicios finalizados.

#### Botones Interactivos:
* **"Evaluar Síntomas Ahora":** Abre el formulario modal para introducir una nueva autoevaluación.
* **"Iniciar Protocolo Recomendado":** Te redirige directamente a la técnica respiratoria o hábito prescrito para este momento.

---

### Módulo 2: Entrenamiento de Respiración Guiada (Pacing SVG)

Este módulo es el núcleo de autorregulación somática para reducir el reflujo gástrico mediante el fortalecimiento diafragmático.

#### El Círculo Guía SVG Animado (Visual Pacing Guide):
En el centro de la pantalla verás un **círculo vectorial SVG interactivo** rodeado por un anillo estático de referencia con marcas de puntos cardinales.

#### Las 4 Fases de la Respiración y lo que Ocurre en Cada Una:

1. **Fase de Inhalación (INHALAR):**
   * **Lo que Verás:** El círculo central SVG se expande suave y continuamente desde un tamaño pequeño hasta llenar el anillo de referencia. El color cambia a **Cian/Azul brillante** (`#38bdf8`). Un arco de progreso dibuja el borde exterior en sentido horario. En el centro del círculo verás la palabra *"INHALAR"* y el contador descendente de segundos.
   * **Lo que Escucharás:** Si el sonido está activado, un tono armónico suave **sube progresivamente de frecuencia** acompañando la entrada de aire.
   * **Lo que Sentirás (Vibración Háptica):** El motor físico de tu smartphone emitirá **pulsos de vibración progresivamente más intensos** a medida que tus pulmones se llenan. Si no dispones de motor físico, verás un halo de luz azul pulsando en la pantalla.

2. **Fase de Retención en Lleno (RETENER - Hold In):**
   * **Lo que Verás:** El círculo se mantiene fijo en su tamaño máximo dilatado. Su color se transforma en **Púrpura/Violeta** (`#a855f7`).
   * **Lo que Escucharás:** El sonido se estabiliza en una nota sostenida y envolvente.
   * **Lo que Sentirás:** Tu dispositivo emitirá **dobles micro-taps periódicos** (pequeños golpecitos táctiles) para indicarte que debes mantener el aire sin realizar esfuerzo.

3. **Fase de Exhalación (EXHALAR):**
   * **Lo que Verás:** El círculo SVG se **contrae de forma fluida y pausada** desde el borde exterior hasta el centro. El color cambia a **Verde Esmeralda** (`#10b981`), indicando la activación de la respuesta de relajación parasimpática.
   * **Lo que Escucharás:** El tono de audio **desciende gradualmente en frecuencia**, simulando una exhalación profunda y liberadora.
   * **Lo que Sentirás:** Tu teléfono transmitirá una **vibración continua, tenue y prolongada**, permitiéndote seguir el ritmo de vaciado pulmonar con los ojos cerrados.

4. **Fase de Retención en Vacío (RETENER - Hold Out):**
   * **Lo que Verás:** El círculo permanece en su tamaño mínimo contraído. El color cambia a **Ámbar/Cálido** (`#f59e0b`).
   * **Lo que Escucharás:** El sonido entra en un reposo silencioso.
   * **Lo que Sentirás:** La vibración se detiene por completo, indicando el momento de pausa previa al siguiente ciclo.

#### Controles y Parámetros del Módulo:
* **Selector de Patrones Respiratorios:**
  * **Coherencia Cardíaca (5s Inhalar / 5s Exhalar):** Equilibra la variabilidad de la frecuencia cardíaca (VFC).
  * **Relajación Profunda 4-7-8 (4s In / 7s Retener / 8s Exhalar):** Indicado para picos de acidez, ansiedad o insomnio.
  * **Paso Post-Comida (3s In / 6s Exhalar):** Estimula la motilidad gástrica y previene la apertura del esfínter.
* **Selector de Modos Visuales:**
  * *Círculos SVG:* Círculo dinámico tradicional con degradados.
  * *Ondas:* Forma geométrica pulsante suave.
  * *Gradientes:* Anillo de luz en transición de color.
  * *Neón:* Modo de alto contraste con resplandor luminoso.
* **Botones de Control de Sesión:**
  * **Iniciar / Pausar:** Inicia o congela el temporizador y las animaciones.
  * **Reiniciar:** Restablece el tiempo de la sesión a cero.
  * **Interruptor de Sonido (Ícono de Altavoz):** Enciende o silencia los tonos armónicos.
  * **Interruptor Háptico (Ícono de Vibración):** Enciende o apaga las pulsaciones táctiles.

---

### Módulo 3: Biofeedback de Tarareo Vagal (Humming 110 Hz)

El tarareo con la boca cerrada (*"Mmmmm"*) genera una vibración física en la faringe y en la caja torácica que estimula mecánicamente las ramas del Nervio Vago.

#### Cómo Utilizar este Módulo:
1. Pulsa el botón **"Iniciar Tarareo (110 Hz)"**.
2. **Lo que Escucharás:** Un tono puro y grave sintetizado a **110 Hz** (frecuencia óptima de resonancia vagal).
3. **Lo que Verás:** Un anillo concéntrico de ondas sonoras que se expande desde el centro de la pantalla al ritmo de la frecuencia.
4. **Instrucciones de Ejecución:** Inhala aire por la nariz y, al exhalar, emite un sonido de tarareo continuo con los labios sellados (*"Mmmmm"*), haciendo que tu garganta y tu pecho vibren al unísono con el tono de la pantalla.
5. **Duración Recomendada:** 3 a 5 minutos. Al finalizar, pulsa **"Detener Tarareo"**. Tu sesión se guardará automáticamente en tu historial.

---

### Módulo 4: Mezclador de Paisajes Sonoros (Soundscapes)

Permite crear una atmósfera de audio envolvente para calmar el sistema nervioso central y reducir la hiperalgesia visceral (sensibilidad al dolor estomacal).

#### Canales de Audio Disponibles (Deslizadores de Volumen 0% a 100%):
* **Olas de Mar (Ocean Waves):** Sonido de oleaje rítmico que simula la frecuencia respiratoria natural.
* **Lluvia Suave (Gentle Rain):** Ruido blanco/rosa relajante que ayuda a desenfocar la atención de las molestias digestivas.
* **Bosque Nocturno (Night Forest):** Paisaje acústico con grillos y brisa nocturna.
* **Ruido Marrón (Brown Noise):** Frecuencias graves profundas que ayudan a calmar estados de hipervigilancia y facilitan el descanso nocturno.

#### Cómo Usar el Mezclador:
1. Mueve el deslizador de cualquier canal para ajustar su intensidad. Puedes combinar varios canales a la vez (ejemplo: 50% Olas de Mar + 30% Ruido Marrón).
2. Pulsa el botón **"Silenciar Todo"** si deseas detener rápidamente todos los canales de sonido.

---

### Módulo 5: Generador de Tonos Puros y Frecuencias Isocrónicas

Para usuarios experimentados que buscan estimulación acústica mediante frecuencias puras generadas en tiempo real por el navegador (Web Audio API).

#### Frecuencias Seleccionables:
* **432 Hz:** Frecuencia armónica de afinación natural.
* **528 Hz:** Tono de transformación y relajación profunda.
* **136.1 Hz (Om Tone):** Frecuencia de resonancia de baja tonalidad para meditación.
* **Pulsos Isocrónicos:** Tonos intermitentes que ayudan a sincronizar las ondas cerebrales en rangos Alfa y Zeta.

#### Mandos de Control:
* **Selector de Tipo de Onda:** Sinusoidal (*Sine* - tono suave), Triangular (*Triangle* - tono medio) o Cuadrada (*Square* - tono rico en armónicos).
* **Deslizador de Frecuencia Manual:** Permite ajustar la frecuencia exacta en Hertz (Hz) desde 40 Hz hasta 800 Hz.
* **Botón Encendido / Apagado (Play/Stop):** Activa o corta la generación de la onda de sonido.

---

### Módulo 6: Motor de Vibración Háptica Sincronizada

Este módulo explica y te permite probar el sistema de **Retroalimentación Táctil Sincronizada**.

#### 📳 ¿Qué es y cómo funciona?
> *"Siente el ritmo respiratorio directamente en tu dispositivo sin necesidad de mirar constantemente la pantalla."*

El objetivo principal es permitirte entrenar tu respiración en la cama, en el sofá o con los ojos cerrados, guiándote únicamente por el tacto.

#### Comportamiento Según el Dispositivo que Utilices:

1. **En Smartphones Android y Navegadores Compatibles con Motor Físico:**
   * La aplicación utiliza la API nativa de vibración del teléfono (`navigator.vibrate`).
   * **Patrón de Inhalación:** Emitirá pulsos que aumentan de intensidad.
   * **Patrón de Exhalación:** Emitirá una vibración suave y continua de relajación.
   * **Patrón de Retención:** Emitirá un doble toque corto.
   * **Patrón de Fin de Sesión:** Emitirá una secuencia festiva de 3 vibraciones armónicas.

2. **Sin Motor Físico (Simulación en Pantalla en PC, Mac, iPhones/iOS):**
   * Debido a que iOS de Apple y los ordenadores de escritorio bloquean la vibración física en páginas web por motivos del sistema operativo, Quyriux activa automáticamente el **Modo de Simulación en Pantalla**.
   * **¿Qué ocurrirá en pantalla?** Al probar o ejecutar cualquier patrón, la pantalla mostrará **impulsos luminosos periféricos, ráfagas de luz de color y contracciones rítmicas del marco**. Esto te proporciona una guía táctil-visual equivalente sin necesitar un motor de vibración interno.

#### Tarjetas de Prueba Disponibles en el Módulo:
Puedes pulsar el botón **"Probar Patrón Háptico"** en cualquiera de las 5 tarjetas para sentir o ver instantáneamente cómo responderá la aplicación en cada fase.

---

### Módulo 7: Rutinas Terapéuticas Guiadas

Intervenciones combinadas multicapa que unen **Respiración + Sonido Ambient + Vibración + Instrucciones Escritas**.

#### Protocolos Disponibles:
1. **Despertar Vagal Matutino (5 min):** Activa la arritmia sinusal respiratoria al levantarte.
2. **Pausa Post-Prandial Anti-Reflujo (10 min):** Diseñado para realizarse tras el almuerzo o la cena. Incluye pautas de posición erguida y respiración diafragmática baja.
3. **Descompresión Antiestrés de Tarde (8 min):** Combina tarareo a 110 Hz con paisajes sonoros para cortar la tensión laboral acumulada.
4. **Desconexión Pre-Sueño Parasimpática (12 min):** Preparación nocturna para prevenir el reflujo nocturno y conciliar el sueño.

#### Cómo Ejecutar una Rutina:
1. Pulsa el botón **"Iniciar Protocolo"** en la tarjeta deseada.
2. La pantalla cambiará al **Paso Actual de la Rutina**, mostrando el texto instructivo en grande.
3. El sonido ambiente de fondo se activará automáticamente.
4. Utiliza los botones **"Siguiente Paso"** y **"Paso Anterior"** para avanzar a tu propio ritmo.
5. Al llegar al último paso, pulsa **"Completar Rutina"** para registrar la sesión en tu historial de progreso.

---

### Módulo 8: Hábitos Digestivos Diarios (Checklist)

Listado de acciones conductuales y posturales con evidencia científica comprobada en gastroenterología para reducir mecánicamente el reflujo gástrico.

#### Hábitos Incluidos:
1. **Elevar la Cabecera de la Cama 10-15 cm:** Mantiene el estómago por debajo del nivel del esófago durante la noche gracias a la gravedad.
2. **Dormir sobre el Lado Izquierdo (Decúbito Lateral Izquierdo):** Anatómicamente, esta posición mantiene la unión gastroesofágica por encima del nivel del jugo gástrico.
3. **Cenar 2.5 a 3 Horas Antes de Acostarse:** Asegura el vaciado gástrico parcial antes de la posición horizontal.
4. **Masticar Lentamente cada Bocado (Mínimo 20 veces):** Facilita la digestión enzimática salival y reduce el volumen de aire tragado (aerofagia).
5. **Evitar Ropa Ajustada en la Cintura:** Previene el incremento de la presión intraabdominal que empuja el ácido hacia el esófago.
6. **Paseo Digestivo Suave de 10 Minutos:** Acelera la motilidad gástrica sin generar impacto físico.

#### Cómo Funciona la Pantalla:
* Haz clic sobre cualquier tarjeta de hábito para **marcarla como completada** (aparecerá una casilla verde con un ícono de verificación).
* En la parte superior verás tu **Puntuación de Hábitos Diarios (0% a 100%)**.
* Completar tus hábitos suma puntos directamente a tu **Puntuación Vagal Global** en el Dashboard.

---

### Módulo 9: Registro de Síntomas & Analítica Evolutiva

Permite visualizar la evolución temporal de tus síntomas y verificar si las técnicas de respiración están reduciendo tu acidez y estrés a lo largo de las semanas.

#### Formulario Modal de Check-In (Autoevaluación):
Al pulsar el botón **"Añadir Evaluación"**, se abre un formulario emergente con deslizadores interactivos de 0 a 10:
* **Acidez Gástrica / Ardor (0 = Nulo, 10 = Máximo)**
* **Reflujo / Regurgitación Ácida (0 a 10)**
* **Nivel de Estrés / Tensión Percibida (0 a 10)**
* **Calidad de Sueño Reparador (0 = Pésimo, 10 = Excelente)**
* **Momento del Día:** Selector para indicar si el registro es por la *Mañana*, *Mediodía*, *Tarde* o *Noche*.
* Pulsa **"Guardar Registro"** para confirmar.

#### Gráficos Interactivos de Tendencia (Recharts):
* **Pestañas de Filtrado de Métricas:** Haz clic en los botones *Acidez Gástrica*, *Reflujo*, *Estrés* o *Sueño Reparador* para cambiar la curva analizada.
* **Gráfico de Área Dinámico:** Muestra la evolución temporal con fechas. Al pasar el cursor o tocar con el dedo sobre cualquier punto del gráfico, aparecerá una ventana flotante (*Tooltip*) con el valor exacto registrado en ese día.
* **Tabla de Historial Cronológico:** En la parte inferior se muestra una tabla con la fecha, hora exactas y puntuaciones detalladas de todos tus registros anteriores.

---

### Módulo 10: Centro Educativo & Neurociencia Vagal

Un espacio de divulgación científica para entender el porqué médico de cada ejercicio.

#### Secciones del Módulo:
1. **Listado de Guías Educativas:** Artículos ordenados con su tiempo de lectura estimado (ejemplo: *El Esfínter Esofágico Inferior y el Diafragma*, *La Neurociencia del Tarareo*). Haz clic en cualquier artículo para abrirlo en el visor principal.
2. **Visor de Artículos:** Muestra el contenido detallado con etiquetas de nivel de evidencia médica (Sólida, Moderada, Preliminar) y una caja con los **Puntos Clave de Neurociencia**.
3. **Sección de Preguntas Frecuentes (FAQ Accordion):** Haz clic sobre cualquier pregunta para desplegar su respuesta explicativa (ejemplo: *¿Puedo usar esta app si tengo hernia de hiato?*, *¿Por qué la respiración afecta directamente al reflujo?*).

---

### Módulo 11: Asistente Coach Autónomo (Motor de Reglas Offline)

Un chat interactivo con inteligencia preprogramada mediante motores de reglas y árboles de decisión que responde a tus preguntas sin necesidad de conexión a Internet.

#### Cómo Interactuar con el Coach:
1. **Preguntas Rápidas Sugeridas (Chips):** En la parte superior del chat verás botones con consultas frecuentes como:
   * *¿Cómo estimula el tarareo al nervio vago?*
   * *¿Qué hago si tengo acidez intensa tras comer?*
   * *¿Por qué es clave dormir sobre el lado izquierdo?*
   Haz clic en cualquiera de ellas para enviarla al instante.
2. **Campo de Texto Libre:** Escribe tu pregunta en el cuadro inferior y pulsa **"Enviar"** o presiona la tecla `Enter`.
3. **Tarjetas de Acción Recomendada:** Si el Coach detecta que necesitas realizar una sesión respiratoria o revisar tus hábitos, mostrará un botón azul interactivo dentro de su respuesta. Al pulsarlo, serás redirigido automáticamente al módulo adecuado.

---

### Módulo 12: Planificador de Rutinas Circadianas

Estructura tu día en 4 bloques cronológicos alineados con el reloj biológico del sistema digestivo:

1. **Rutina Mañana (08:00 hs):** Despertar vagal y estabilización de la frecuencia cardíaca.
2. **Rutina Post-Comidas (14:30 hs):** Reposo erguido post-prandial y caminata breve.
3. **Rutina Tarde (18:30 hs):** Pausa de despresurización y tarareo antiestrés.
4. **Rutina Noche (22:30 hs):** Desconexión parasimpática pre-sueño y acondicionamiento de la cama.

Cada bloque dispone del botón **"Ejecutar Rutina"**, el cual abre directamente el ejercicio programado para ese horario.

---

### Módulo 13: Notificaciones y Alertas de Adherencia

Permite activar avisos en tu teléfono móvil o navegador web para mantener la constancia en tus hábitos:

#### Configuración de Alertas:
1. Pulsa el botón **"Permitir Notificaciones Web"** en la esquina superior derecha y acepta los permisos que solicitará tu navegador.
2. En la lista de recordatorios verás alertas programadas como:
   * *Pausa de Respiración Coherente (11:00 hs)*
   * *Caminata Digestiva Post-Almuerzo (15:00 hs)*
   * *Acondicionamiento de Cama Anti-Reflujo (22:00 hs)*
3. Utiliza el **Interruptor Deslizante (Toggle)** a la derecha de cada alarma para activarla (color azul) o desactivarla (color gris).

---

### Módulo 14: Progreso, Privacidad & Exportación de Datos

Este módulo te permite auditar tus estadísticas globales y extraer tu información en formatos estándar para tu médico.

#### Métricas Globales Acumuladas:
* **Tiempo de Relajación Acumulado:** Total de minutos en ejercicios.
* **Horas Totales de Respiración:** Estimación de volumen de aire consciente.
* **Sesiones Completadas:** Número de prácticas finalizadas con éxito.
* **Racha Activa:** Días consecutivos utilizando la aplicación.

#### Opciones de Exportación:

1. **Botón "Exportar JSON":**
   Descarga instantáneamente un archivo `.json` con todos tus registros crudos guardados en el navegador. Ideal para hacer una copia de seguridad o migrar tus datos a otro dispositivo.

2. **Botón "Generar Reporte PDF":**
   Abre automáticamente la interfaz de impresión/generación de documento PDF formateada con un diseño clínico profesional. Este informe incluye:
   * Tu nombre y fecha del reporte.
   * Gráficos de evolución de acidez y estrés.
   * Resumen de adherencia a hábitos digestivos.
   * Historial de sesiones de respiración.
   Puedes guardarlo en PDF o imprimirlo en papel para entregárselo a tu gastroenterólogo.

---

### Módulo 15: Configuración y Accesibilidad

Se accede desde el ícono de engranaje en la esquina superior derecha del encabezado.

#### Opciones Disponibles en la Ventana Emergente:
* **Nombre o Apodo:** Campo para modificar cómo te saluda el sistema.
* **Meta Diaria de Relajación (Minutos):** Ajusta tu objetivo diario (por defecto 15 minutos).
* **Modo Alto Contraste (Casilla de Verificación):** Aumenta el contraste de bordes y colores para facilitar la visualización en personas con baja visión o bajo la luz del sol.
* **Modo Texto Grande (Casilla de Verificación):** Incrementa la escala tipográfica de toda la interfaz.
* **Vibración Háptica Activada (Casilla de Verificación):** Permite encender o silenciar la respuesta vibratoria global.
* Pulsa **"Guardar Cambios"** para aplicar la configuración.

---

## 4. Preguntas Frecuentes y Solución de Problemas

### 1. ¿Por qué mi teléfono iPhone o mi ordenador no vibra durante la sesión de respiración?
El sistema operativo iOS de Apple y los navegadores web de escritorio (Windows/Mac) prohíben por política de privacidad que las páginas web hagan vibrar el hardware físico. Cuando Quyriux detecta esto, **activa automáticamente el Modo de Simulación Háptica en Pantalla**. Observarás destellos de luz, halos pulsantes e impulsos visuales que te guiaran con la misma precisión que un pulso físico. En dispositivos Android con Google Chrome, la vibración física funcionará de forma nativa si tu teléfono no está en modo "No Molestar".

### 2. No escucho ningún sonido durante la sesión o al usar el mezclador, ¿qué debo hacer?
La mayoría de los navegadores modernos (Chrome, Safari, Firefox) bloquean la reproducción automática de audio hasta que el usuario realiza un primer toque en la pantalla. Para solucionar esto:
1. Asegúrate de que el volumen multimedia de tu teléfono u ordenador no esté silenciado.
2. Comprueba que el ícono de altavoz en el módulo de respiración esté activo (no tachado).
3. Pulsa el botón de inicio de sesión para activar el motor de audio (`Web Audio API`).

### 3. ¿Cómo puedo instalar Quyriux en la pantalla de inicio de mi móvil como si fuera una App nativa?
* **En iPhone (Safari):** Toca el botón *Compartir* (cuadrado con flecha hacia arriba) en la barra del navegador y selecciona *"Agregar a la pantalla de inicio"*.
* **En Android (Chrome):** Toca el menú de tres puntos verticales en la esquina superior derecha y selecciona *"Instalar aplicación"* o *"Agregar a la pantalla principal"*.

### 4. ¿Qué ocurre si borro el historial o los datos de navegación de mi navegador?
Dado que Quyriux almacena tus registros localmente por privacidad, al borrar la memoria caché o datos de sitios web de tu navegador se eliminarán tus registros locales. Te recomendamos utilizar periódicamente la función **"Exportar JSON"** en el Módulo de Progreso para conservar siempre una copia de seguridad de tus datos.

---

*Quyriux — Plataforma de Modulación Vagal & Salud Somática Digestiva.*  
*Manual de Usuario Versión 1.0 — Guía Completa de Funcionamiento.*
