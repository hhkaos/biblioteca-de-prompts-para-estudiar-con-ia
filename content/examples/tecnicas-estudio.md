---
wizard:
  fields:
    - key: EDAD/NIVEL
      label: Edad o nivel
      hint: El perfil del estudiante
      type: text
      placeholder: Ej. 15 años, adulto que retoma estudios...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 3º ESO, 2º Bachillerato, FP...

    - key: VISUAL/PRACTICO/VERBAL/MIXTO
      label: Estilo de aprendizaje
      hint: Cómo procesas mejor la información
      type: radio
      options:
        - value: VISUAL
          label: Visual — diagramas, colores, mapas
        - value: PRACTICO
          label: Práctico — ejercicios, hacer y repetir
        - value: VERBAL
          label: Verbal — leer, explicar, escuchar
        - value: MIXTO
          label: Mixto — combino varios estilos

    - key: ASIGNATURAS
      label: Asignaturas que estudias
      hint: Las materias con las que más trabajas ahora mismo
      type: text
      placeholder: Ej. Matemáticas, Historia, Inglés...

    - key: PROBLEMA
      label: Dificultad principal
      hint: Lo que más te cuesta a la hora de estudiar
      type: text
      placeholder: Ej. me distraigo mucho, no sé por dónde empezar, me bloqueo en los exámenes...

    - key: TIEMPO
      label: Tiempo real disponible para estudiar
      type: text
      placeholder: Ej. 1 hora después de clase, solo los fines de semana...

    - key: DESCRIPCION
      label: Cómo estudias ahora
      hint: Describe brevemente tu método actual
      type: textarea
      placeholder: Ej. leo el libro, subrayo y luego hago un esquema. Pero me cuesta concentrarme más de 20 minutos...
---
# Explorar técnicas de estudio

## Cuándo usarlo
Cuando hay desorganización, procrastinación o dificultad para sostener el hábito de estudio.

## Qué consigues
- Diagnóstico claro del problema principal.
- Estrategias concretas y realistas.
- Aplicación directa a una asignatura real.

## Prompt plantilla
```text
Actúa como mentor/a educativo/a en organización del estudio.

Mi perfil: [EDAD/NIVEL], [CURSO], estilo de aprendizaje [VISUAL/PRACTICO/VERBAL/MIXTO].
Situación actual:
- Asignaturas: [ASIGNATURAS]
- Dificultad principal: [PROBLEMA]
- Tiempo real disponible: [TIEMPO]
- Cómo estudio hoy: [DESCRIPCION]

Ayúdame con este formato:
1) Diagnóstico breve del problema principal.
2) 2-4 estrategias concretas (qué son, cuándo usarlas y por qué me sirven).
3) Un ejemplo aplicado a mi caso real.
4) Una herramienta simple para empezar (agenda, checklist, app, etc.).
5) Una pregunta clave previa al estudio + un error típico a evitar.

No hagas horarios rígidos y evita recomendar demasiadas cosas a la vez.
```

## Ajustes rápidos
- Añade: `prioriza técnicas de bajo esfuerzo para empezar`.
- Para familias, añade: `incluye una pauta de acompañamiento semanal de 10 minutos`.
