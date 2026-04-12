---
wizard:
  fields:
    - key: TAREA_O_PRODUCTO
      label: Tarea, trabajo o producto final
      hint: Lo que quieres evaluar con una rúbrica
      type: textarea
      placeholder: Ej. exposición oral, comentario de texto, experimento, proyecto final, redacción...

    - key: TEMA
      label: Tema o asignatura
      type: text
      placeholder: Ej. historia, lengua, ciencias, proyecto interdisciplinar...

    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 11 años, 3º ESO, Bachillerato...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 6º Primaria, 3º ESO, 2º Bachillerato...

    - key: CONTENIDO/PROCESO/PRESENTACION/MIXTA
      label: Enfoque principal de la rúbrica
      hint: Qué quieres valorar más
      type: radio
      options:
        - value: CONTENIDO
          label: Calidad del contenido
        - value: PROCESO
          label: Proceso de trabajo
        - value: PRESENTACION
          label: Presentación o comunicación
        - value: MIXTA
          label: Equilibrada

    - key: 3/4/5
      label: Número de niveles de logro
      type: radio
      options:
        - value: 3
          label: 3 niveles
        - value: 4
          label: 4 niveles
        - value: 5
          label: 5 niveles

    - key: OBJETIVO
      label: Para qué quieres la rúbrica
      type: text
      placeholder: Ej. autoevaluarme antes de entregar, revisar con mi grupo, mejorar una segunda versión...
---
# Crear rúbricas de autoevaluación

## Cuándo usarlo
Cuando necesitas criterios claros para revisar un trabajo antes de entregarlo o para saber exactamente qué significa “hacerlo bien”.

## Qué consigues
- Criterios visibles y no ambiguos.
- Mejor autoevaluación antes de entregar.
- Más capacidad para detectar qué mejorar y cómo.

## Prompt plantilla
```text
Actúa como especialista en evaluación formativa.

Quiero una rúbrica para autoevaluar esta tarea:
[TAREA_O_PRODUCTO]

Tema o asignatura: [TEMA].
Perfil: [EDAD/NIVEL], [CURSO].
Enfoque principal: [CONTENIDO/PROCESO/PRESENTACION/MIXTA].
Número de niveles de logro: [3/4/5].
Objetivo: [OBJETIVO].

Diseña una rúbrica con:
1) 4 a 6 criterios claros y observables.
2) Descriptores concretos para cada nivel de logro.
3) Lenguaje comprensible para mi nivel.
4) Una columna final o bloque de evidencias: cómo sé que cumplo ese criterio.
5) Al menos un criterio debe valorar comprensión o calidad de ideas, no solo presentación.
6) Si la tarea lo permite, incluye un criterio de aplicación a un caso, ejemplo o situación real.

Además:
- Indica cuáles son los 2 criterios más importantes.
- Añade 3 preguntas de autoevaluación final.
- Termina con una guía breve: qué revisar primero antes de entregar.
- Añade una mini secuencia de revisión en tres pasos: comprobar lo básico, mejorar lo importante y pulir lo avanzado.

Reglas:
- Evita criterios vagos como “está bien hecho”.
- Haz que los niveles se distingan de verdad.
- Si la tarea es creativa, equilibra calidad técnica y originalidad.
- Si un criterio puede malinterpretarse, acompáñalo con un ejemplo observable.
```

## Ajustes rápidos
- Añade: `convierte la rúbrica en checklist rápida para usar en 2 minutos`.
- Para trabajo en grupo, pide: `incluye un criterio de colaboración y reparto de tareas`.
