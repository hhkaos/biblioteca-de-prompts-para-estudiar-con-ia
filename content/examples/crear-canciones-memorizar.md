---
wizard:
  fields:
    - key: CONTENIDO
      label: Contenido que quieres memorizar
      hint: Lista, definición, pasos o datos que te cuesta retener
      type: textarea
      placeholder: Ej. los planetas en orden, los huesos del brazo, las etapas de la meiosis...

    - key: TEMA
      label: Tema del contenido
      type: text
      placeholder: Ej. sistema solar, anatomía, biología celular...

    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 11 años, 2º ESO, adulto...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. Primaria, 2º ESO, 1º Bachillerato...

    - key: POP/RAP/INFANTIL/ACUSTICA/OTRO
      label: Estilo musical
      hint: El tipo de canción que más te ayudaría a recordarlo
      type: select
      options:
        - value: POP
          label: Pop
        - value: RAP
          label: Rap
        - value: INFANTIL
          label: Infantil o muy pegadiza
        - value: ACUSTICA
          label: Acústica o suave
        - value: OTRO
          label: Otro estilo

    - key: BREVE/MEDIA
      label: Longitud de la canción
      type: radio
      options:
        - value: BREVE
          label: Breve — estribillo y una estrofa
        - value: MEDIA
          label: Media — varias estrofas y estribillo

    - key: OBJETIVO
      label: Qué quieres recordar exactamente
      hint: La parte del contenido que más te interesa fijar
      type: text
      placeholder: Ej. recordar el orden, memorizar palabras clave, no confundir conceptos...
---
# Crear canciones para memorizar

## Cuándo usarlo
Cuando necesitas fijar información secuencial o repetitiva y te ayuda más recordarla con ritmo, repetición y sonido.

## Qué consigues
- Convertir datos fríos en una secuencia más memorable.
- Reforzar el recuerdo con ritmo, rima y repetición.
- Tener una versión fácil de repasar en voz alta o mentalmente.

## Prompt plantilla
```text
Actúa como creador/a de canciones educativas para memorizar.

Quiero transformar este contenido sobre [TEMA] en una canción para [EDAD/NIVEL] ([CURSO]).
Contenido a memorizar:
[CONTENIDO]

Estilo musical deseado: [POP/RAP/INFANTIL/ACUSTICA/OTRO].
Longitud: [BREVE/MEDIA].
Objetivo principal: [OBJETIVO].

Crea una canción que:
1) Mantenga los datos esenciales sin inventar contenido.
2) Use frases fáciles de repetir y recordar.
3) Marque claramente el orden, relaciones o palabras clave.
4) Incluya un estribillo que resuma lo más importante.
5) Tenga una progresión clara: primero lo más básico, después lo que suele confundirse y al final una aplicación o ejemplo breve si encaja.
6) Si el contenido lo permite, conecte al menos una estrofa con una situación cotidiana, imagen concreta o experiencia cercana.

Además:
- Explica después qué parte del contenido ayuda a recordar cada estrofa.
- Señala si has simplificado algo para hacerlo más cantable.
- Termina con una versión ultrabreve de 1 o 2 líneas para repaso rápido.
- Añade una propuesta de gesto, palmada o acción sencilla para acompañar cada parte importante.
- Cierra con 3 preguntas de autoevaluación para comprobar si la canción me ayuda a recordar de verdad o solo a repetir.
```

## Ajustes rápidos
- Añade: `usa palmas o sílabas marcadas para seguir el ritmo`.
- Para estudio individual, pide: `incluye una versión recitada sin música`.
