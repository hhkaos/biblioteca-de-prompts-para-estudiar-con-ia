---
wizard:
  fields:
    - key: CONTENIDO
      label: Información a recordar
      hint: Puede ser una lista, clasificación, pasos, fechas o términos
      type: textarea
      placeholder: Ej. nombres de los planetas, fases de la mitosis, tipos de huesos...

    - key: TEMA
      label: Tema
      type: text
      placeholder: Ej. astronomía, biología, gramática...

    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 12 años, 3º ESO, adulto...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 6º Primaria, 3º ESO, FP...

    - key: SIGLAS/FRASE/IMAGEN_MENTAL/MEZCLADAS
      label: Tipo de mnemotecnia
      hint: El formato que te suele resultar más memorable
      type: radio
      options:
        - value: SIGLAS
          label: Siglas o iniciales
        - value: FRASE
          label: Frase fácil de recordar
        - value: IMAGEN_MENTAL
          label: Imagen mental o escena visual
        - value: MEZCLADAS
          label: Varias opciones

    - key: OBJETIVO
      label: Qué quieres evitar olvidar o confundir
      type: text
      placeholder: Ej. el orden exacto, qué va con qué, no mezclar dos conceptos...
---
# Crear reglas mnemotécnicas

## Cuándo usarlo
Cuando hay datos que necesitas fijar con precisión y te ayuda más una pista artificial pero memorable que releer una y otra vez.

## Qué consigues
- Condensar información en pistas recordables.
- Reducir confusiones entre elementos parecidos.
- Tener apoyos breves para repasar antes de olvidar.

## Prompt plantilla
```text
Actúa como especialista en memoria y mnemotecnia.

Necesito crear reglas mnemotécnicas para recordar contenido de [TEMA] en [EDAD/NIVEL] ([CURSO]).
Contenido:
[CONTENIDO]

Tipo preferido de mnemotecnia: [SIGLAS/FRASE/IMAGEN_MENTAL/MEZCLADAS].
Objetivo principal: [OBJETIVO].

Quiero que:
1) Generes 3 opciones de regla mnemotécnica diferentes.
2) Expliques exactamente qué parte del contenido recuerda cada una.
3) Señales cuál es más útil para recordar orden, cuál para recordar relaciones y cuál para recordar conceptos sueltos.
4) Indiques posibles confusiones o límites de cada opción.
5) Si el contenido lo permite, haz que una opción conecte con una imagen mental concreta y otra con una situación cotidiana o conocida.
6) Ordena las opciones de menos elaborada a más potente o memorable.

Reglas:
- No cambies el significado del contenido original.
- Haz las mnemotecnias fáciles de repetir.
- Si una opción simplifica demasiado, adviértelo.

Termina con una recomendación final: cuál debería usar primero, cómo repasarla en menos de 1 minuto y cómo comprobar si realmente evita mis confusiones.
```

## Ajustes rápidos
- Añade: `haz una versión absurda o humorística para que sea más memorable`.
- Para clase, pide: `propón una opción que se pueda escribir rápido en el margen del cuaderno`.
