---
wizard:
  fields:
    - key: CONTENIDO
      label: Contenido a memorizar
      hint: Datos, conceptos, definiciones o secuencias que quieres fijar con ritmo verbal
      type: textarea
      placeholder: Ej. preposiciones, reyes godos, tipos de energía...

    - key: TEMA
      label: Tema
      type: text
      placeholder: Ej. gramática, historia, física...

    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 9 años, 2º ESO, oposición...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. Primaria, 2º ESO, preparación de examen...

    - key: RIMA_CORTA/POEMA_BREVE/VERSO_RITMICO
      label: Formato deseado
      hint: El tipo de pieza verbal que más te ayuda a repetir y recordar
      type: radio
      options:
        - value: RIMA_CORTA
          label: Rima corta
        - value: POEMA_BREVE
          label: Poema breve
        - value: VERSO_RITMICO
          label: Verso rítmico sin mucha rima

    - key: OBJETIVO
      label: Qué quieres fijar mejor
      type: text
      placeholder: Ej. recordar el orden, no olvidar palabras clave, diferenciar categorías...
---
# Crear rimas o poemas para memorizar

## Cuándo usarlo
Cuando quieres usar ritmo y repetición verbal para retener datos, vocabulario o secuencias de una forma más ligera y pegadiza.

## Qué consigues
- Dar musicalidad a contenidos difíciles de retener.
- Recordar mejor palabras clave y secuencias.
- Tener una pieza corta fácil de repetir antes de un examen o actividad.

## Prompt plantilla
```text
Actúa como especialista en recursos verbales para memorizar.

Necesito convertir este contenido sobre [TEMA] en una pieza fácil de recordar para [EDAD/NIVEL] ([CURSO]):
[CONTENIDO]

Formato deseado: [RIMA_CORTA/POEMA_BREVE/VERSO_RITMICO].
Objetivo principal: [OBJETIVO].

Crea una versión que:
1) Mantenga los datos esenciales.
2) Use ritmo y repetición para facilitar el recuerdo.
3) Destaque las palabras clave de forma natural.
4) Sea fácil de recitar en menos de 1 minuto.
5) Si el contenido lo permite, avance de lo más básico a lo más difícil o confuso.
6) Incluya al menos una imagen concreta o escena cercana que ayude a anclar el contenido.

Después:
- Explica qué parte del contenido ayuda a recordar cada verso o bloque.
- Señala si alguna rima simplifica demasiado el contenido.
- Ofrece una segunda versión todavía más corta para repaso exprés.
- Añade una variante en formato lista o esquema ultrabreve para quien recuerde mejor viendo la estructura.
- Cierra con 3 preguntas de autoevaluación para comprobar si la rima me ayuda a comprender además de repetir.
```

## Ajustes rápidos
- Añade: `usa un tono más divertido y pegadizo aunque siga siendo fiel al contenido`.
- Para repaso oral, pide: `marca dónde conviene hacer pausas al recitar`.
