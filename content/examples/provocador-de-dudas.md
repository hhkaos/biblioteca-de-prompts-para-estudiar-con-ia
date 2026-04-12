---
wizard:
  fields:
    - key: TEMA_O_PREGUNTA
      label: Tema o pregunta
      hint: El asunto sobre el que quieres entrenar detección de errores
      type: textarea
      placeholder: Ej. ¿por qué flotan los barcos?, causas de la Primera Guerra Mundial, cómo funciona la fotosíntesis...

    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 13 años, 4º ESO, Bachillerato...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 2º ESO, 4º ESO, 1º Bachillerato...

    - key: SUAVE/MEDIA/RETADORA
      label: Dificultad del juego
      hint: Cuánto quieres que cueste detectar los fallos
      type: radio
      options:
        - value: SUAVE
          label: Suave
        - value: MEDIA
          label: Media
        - value: RETADORA
          label: Retadora

    - key: OBJETIVO
      label: Qué quieres practicar
      type: text
      placeholder: Ej. encontrar errores, hacer mejores preguntas, revisar argumentos...
---
# Provocador de dudas

## Cuándo usarlo
Cuando quieres entrenar pensamiento crítico comparando explicaciones fiables con otras dudosas para aprender a detectar señales de alerta.

## Qué consigues
- Afinar la detección de errores, huecos y afirmaciones sospechosas.
- Practicar preguntas de verificación más inteligentes.
- No conformarte con respuestas que “suenan bien”.

## Prompt plantilla
```text
Actúa como entrenador/a de pensamiento crítico.

Quiero practicar con este tema o pregunta:
[TEMA_O_PREGUNTA]

Tengo [EDAD/NIVEL] y estoy en [CURSO].
Dificultad deseada: [SUAVE/MEDIA/RETADORA].
Objetivo: [OBJETIVO].

Prepara una actividad así:
1) Dame 4 respuestas o explicaciones breves sobre el tema.
2) Al menos 2 deben ser sólidas y 1 o 2 deben contener errores, lagunas o afirmaciones dudosas.
3) No me digas al principio cuáles son correctas y cuáles no.
4) Después de las 4 respuestas, propón una guía para analizarlas:
   - qué señales revisar,
   - qué preguntas hacer,
   - qué datos o conceptos convendría comprobar.
5) Haz que la dificultad sea progresiva: una diferencia fácil de detectar, otra media y otra más sutil.
6) Si el tema lo permite, sitúa al menos una explicación en un contexto real, cotidiano o práctico.
7) Solo al final, en una sección separada, revela qué tenía cada respuesta: correcta, incompleta o problemática, y por qué.
8) Cierra con 3 preguntas de metacognición para que piense qué pistas he usado y qué sesgo me podría haber engañado.

Reglas:
- Los errores deben ser verosímiles, no ridículos.
- Ajusta la dificultad a mi nivel.
- Evita mezclar hechos verdaderos y falsos de forma imposible de distinguir sin justificación.
- No conviertas el ejercicio en adivinanza: debe poder resolverse razonando.
```

## Ajustes rápidos
- Añade: `incluye una rúbrica rápida para puntuar mi análisis`.
- Para trabajo en pareja, pide: `haz que una respuesta sea debatible y no simplemente falsa`.
