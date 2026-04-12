---
wizard:
  fields:
    - key: CONTENIDO
      label: Contenido a evaluar
      hint: Pega apuntes, resumen, temario o conceptos clave
      type: textarea
      placeholder: Ej. tema 5 de historia, fórmulas de física, vocabulario de inglés...

    - key: TEMA
      label: Tema
      type: text
      placeholder: Ej. la célula, cinemática, present perfect...

    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 12 años, 4º ESO, universidad...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 1º ESO, 4º ESO, grado...

    - key: TEST/CORTAS/APLICACION/MIXTO
      label: Tipo de cuestionario
      hint: Qué clase de preguntas quieres practicar
      type: radio
      options:
        - value: TEST
          label: Tipo test
        - value: CORTAS
          label: Respuesta corta
        - value: APLICACION
          label: Aplicación o casos
        - value: MIXTO
          label: Mixto

    - key: FACIL/MEDIA/RETADORA
      label: Dificultad
      type: radio
      options:
        - value: FACIL
          label: Fácil
        - value: MEDIA
          label: Media
        - value: RETADORA
          label: Retadora

    - key: NUMERO_PREGUNTAS
      label: Número aproximado de preguntas
      type: text
      placeholder: Ej. 8, 10, 15...
---
# Crear ejercicios de autoevaluación

## Cuándo usarlo
Cuando quieres comprobar si de verdad recuerdas y entiendes un tema, en lugar de confiar solo en que “te suena”.

## Qué consigues
- Practicar recuperación activa.
- Detectar lagunas antes de examen o entrega.
- Medir si dominas hechos, comprensión y aplicación.

## Prompt plantilla
```text
Actúa como diseñador/a de autoevaluaciones educativas.

Quiero un cuestionario sobre [TEMA] para [EDAD/NIVEL] ([CURSO]).
Contenido base:
[CONTENIDO]

Tipo de cuestionario: [TEST/CORTAS/APLICACION/MIXTO].
Dificultad: [FACIL/MEDIA/RETADORA].
Número aproximado de preguntas: [NUMERO_PREGUNTAS].

Crea una autoevaluación que:
1) Cubra los conceptos esenciales sin repetir siempre lo mismo.
2) Combine recuerdo, comprensión y aplicación si el contenido lo permite.
3) Incluya instrucciones claras para responder.
4) Organice las preguntas en reto progresivo: calentamiento, dominio y transferencia.
5) Incluya al menos una pregunta basada en un error frecuente o confusión típica.
6) Si el tema lo permite, añada al menos una pregunta situada en un contexto cotidiano, práctico o real.

Después del cuestionario, añade:
- plantilla de respuestas,
- solución o clave de corrección,
- breve explicación de por qué cada respuesta es correcta,
- indicación de qué partes del tema debería repasar si fallo cada bloque,
- una pregunta final de reflexión: qué he entendido, qué sigo confundiendo y qué debería practicar después.

Reglas:
- No inventes contenido ajeno al material base.
- Ajusta el nivel de dificultad a mi perfil.
- Si el contenido es amplio, reparte las preguntas por subtemas.
- Si una pregunta exige justificar, indica qué tendría una respuesta sólida.
```

## Ajustes rápidos
- Añade: `incluye una versión oral para que alguien me pregunte en voz alta`.
- Para examen, pide: `marca cuáles serían preguntas trampa frecuentes`.
