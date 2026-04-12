---
wizard:
  fields:
    - key: TEMA
      label: Tema de aprendizaje
      hint: El tema principal que quieres dominar
      type: text
      placeholder: Ej. Programación en Python, Historia Medieval, Cálculo...

    - key: EDAD/NIVEL
      label: Edad o nivel
      hint: Tu perfil como estudiante
      type: text
      placeholder: Ej. 16 años, adulto, estudiante de FP...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 4º ESO, 1º Bachillerato, autodidacta...

    - key: CONTEXTO
      label: Contexto de aprendizaje
      hint: ¿Dónde y cómo estudias principalmente?
      type: text
      placeholder: Ej. estudio solo en casa, clases presenciales, academia...

    - key: MOTIVACION
      label: Motivación principal
      hint: ¿Por qué quieres aprender esto?
      type: text
      placeholder: Ej. pasar el examen de acceso, curiosidad personal, trabajo...

    - key: BAJOS/MEDIOS/ALTOS
      label: Conocimientos previos
      hint: ¿Cuánto sabes ya del tema? Añade un breve detalle si lo necesitas
      type: radio
      options:
        - value: BAJOS
          label: Bajos — poca o ninguna base
        - value: MEDIOS
          label: Medios — algunos conceptos
        - value: ALTOS
          label: Altos — buena base

    - key: TIEMPO_SEMANAL
      label: Tiempo disponible a la semana
      hint: Horas aproximadas que puedes dedicar
      type: text
      placeholder: Ej. 3 horas a la semana, 30 minutos al día...
---
# Pasar de un interés a un plan de aprendizaje

## Cuándo usarlo
Cuando ya existe interés por un tema y se quiere pasar a un plan sostenido con objetivos progresivos.

## Qué consigues
- Transformar curiosidad en un itinerario realista.
- Organizar etapas con propósito.
- Evitar empezar sin rumbo.

## Prompt plantilla
```text
Actúa como experto/a en diseño de planes de aprendizaje.

Quiero aprender sobre [TEMA].
Perfil: [EDAD/NIVEL], [CURSO], contexto [CONTEXTO].
Motivación principal: [MOTIVACION].
Conocimientos previos: [BAJOS/MEDIOS/ALTOS + detalle].
Tiempo disponible: [TIEMPO_SEMANAL].

Diseña un plan por etapas:
1) Etapas (inicio, base, práctica, consolidación).
2) Objetivo de cada etapa.
3) Indicadores simples para saber si avanzo.
4) Riesgos frecuentes y cómo corregirlos.
5) Primera acción concreta para empezar hoy.
6) Ajusta el reto de cada etapa para que no sea ni demasiado fácil ni desbordante.
7) Incluye al menos una actividad práctica o de primera mano por etapa.
8) Añade una breve revisión metacognitiva semanal: qué entendí, qué me costó y qué cambio haré.

Formato: tabla breve y luego lista de acciones de la semana 1.
```

## Ajustes rápidos
- Sustituye `tabla` por `lista` si prefieres copiar/pegar rápido.
- Añade: `incluye versión mínima de 20 minutos al día`.
