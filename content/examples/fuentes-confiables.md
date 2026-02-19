---
wizard:
  fields:
    - key: TEMA
      label: Tema para el que necesitas fuentes
      type: text
      placeholder: Ej. el cambio climático, la Segunda Guerra Mundial, el álgebra lineal...

    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 16 años, 2º Bachillerato...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 2º Bachillerato, universitario...

    - key: BAJOS/MEDIOS/ALTOS
      label: Conocimientos previos
      type: radio
      options:
        - value: BAJOS
          label: "Bajos — poca o ninguna base"
        - value: MEDIOS
          label: "Medios — algunos conceptos"
        - value: ALTOS
          label: "Altos — buena base"

    - key: OBJETIVO
      label: Objetivo de aprendizaje
      hint: ¿Para qué necesitas estas fuentes?
      type: text
      placeholder: Ej. preparar un trabajo, estudiar para el examen, profundizar por interés...
---
# Identificar fuentes confiables para aprender

## Cuándo usarlo
Cuando se necesita criterio para elegir materiales fiables y evitar ruido o baja calidad.

## Qué consigues
- Priorización de fuentes por credibilidad.
- Justificación clara de por qué una fuente es fiable.
- Selección por nivel y objetivo de aprendizaje.

## Prompt plantilla
```text
Actúa como curador/a académico/a de recursos.

Necesito fuentes confiables para aprender [TEMA].
Mi perfil: [EDAD/NIVEL], [CURSO], conocimientos previos [BAJOS/MEDIOS/ALTOS].
Objetivo: [OBJETIVO].

Quiero que:
1) Identifiques 8-12 fuentes de alta credibilidad.
2) Expliques por qué cada fuente es fiable.
3) Clasifiques cada recurso por uso: introducción, práctica, profundización.
4) Indiques señales de alerta para descartar fuentes dudosas.
5) Priorización final: "empieza por aquí" en 3 pasos.

Evita recomendar contenido sin autoría clara o sin respaldo experto.
```

## Ajustes rápidos
- Añade restricción: `incluye solo recursos en español` xxx.
- Si necesitas rapidez, pide: `dame solo top 5 con máxima relación calidad/tiempo`.
