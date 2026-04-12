---
wizard:
  fields:
    - key: TEMA_O_DUDA
      label: Tema, idea o duda
      hint: El asunto que quieres explorar a base de preguntas
      type: textarea
      placeholder: Ej. ¿qué es la justicia?, no entiendo por qué suben los precios, creo que la energía nuclear es mala...

    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 14 años, Bachillerato, adulto...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 3º ESO, 2º Bachillerato, universidad...

    - key: DEFINIR/PROFUNDIZAR/CUESTIONAR/APLICAR
      label: Tipo de exploración
      hint: Qué clase de trabajo mental quieres provocar
      type: radio
      options:
        - value: DEFINIR
          label: Definir mejor
        - value: PROFUNDIZAR
          label: Profundizar
        - value: CUESTIONAR
          label: Cuestionar supuestos
        - value: APLICAR
          label: Aplicar a casos reales

    - key: OBJETIVO
      label: Objetivo de la conversación
      type: text
      placeholder: Ej. aclarar mi postura, preparar una exposición, pensar con más profundidad...
---
# Generar preguntas socráticas

## Cuándo usarlo
Cuando no quieres una respuesta cerrada sino un acompañamiento que te obligue a pensar mejor, definir tus ideas y revisar tus supuestos.

## Qué consigues
- Pensamiento más profundo y menos automático.
- Mejores preguntas para entender un tema complejo.
- Claridad sobre lo que sabes, lo que supones y lo que te falta.

## Prompt plantilla
```text
Actúa como mentor/a socrático/a.

Quiero reflexionar sobre esto:
[TEMA_O_DUDA]

Tengo [EDAD/NIVEL] y estoy en [CURSO].
Tipo de exploración que busco: [DEFINIR/PROFUNDIZAR/CUESTIONAR/APLICAR].
Objetivo: [OBJETIVO].

Guíame solo con preguntas, sin darme la respuesta final al principio.

Hazlo así:
1) Empieza con 3 preguntas para aclarar qué quiero decir exactamente.
2) Continúa con 5 preguntas que hagan visibles supuestos, huecos o ambigüedades.
3) Añade 3 preguntas que me obliguen a pensar en ejemplos, consecuencias o contraejemplos.
4) Incluye al menos 2 preguntas que conecten el tema con una situación real, una decisión concreta o una experiencia cercana.
5) Introduce al menos 2 preguntas desde otra perspectiva posible sobre el tema.
6) Termina con 2 preguntas de síntesis para que reformule mi postura mejor y 2 de metacognición sobre qué ha cambiado en mi forma de pensar.

Reglas:
- Ordena las preguntas de más accesibles a más profundas.
- Usa lenguaje ajustado a mi nivel.
- Si detectas una confusión frecuente, formula una pregunta que me ayude a verla por mí mismo/a.
- No conviertas la actividad en interrogatorio abstracto: combina definición, contraste y aplicación.
```

## Ajustes rápidos
- Añade: `espera mi respuesta a cada pregunta antes de pasar a la siguiente`.
- Para clase, pide: `marca cuáles sirven mejor para debate en grupo`.
