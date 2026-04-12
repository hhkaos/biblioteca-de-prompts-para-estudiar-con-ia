---
wizard:
  fields:
    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 16 años, 2º Bachillerato...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 2º Bachillerato, universitario...

    - key: TEMA
      label: Tema del texto
      type: text
      placeholder: Ej. biología celular, historia contemporánea, economía...

    - key: IDIOMA_ORIGEN
      label: Idioma de origen
      hint: Solo necesario si usas la Opción A (traducción de idioma)
      type: text
      placeholder: Ej. inglés, francés, alemán...

    - key: IDIOMA_DESTINO
      label: Idioma de destino
      hint: Solo necesario si usas la Opción A (traducción de idioma)
      type: text
      placeholder: Ej. español...

    - key: PEGA AQUÍ EL TEXTO
      label: Texto a traducir o simplificar
      hint: Pega aquí el texto que quieres traducir o convertir en lenguaje más comprensible
      type: textarea
      placeholder: Pega aquí el texto...
---
# Traducir textos para estudiar

## Cuándo usarlo
Cuando se tiene un texto en otro idioma que se necesita entender, o cuando un texto en el propio idioma es demasiado técnico o denso y hace falta una versión más comprensible.

## Qué consigues
- Acceder a contenido en otros idiomas sin perder matices importantes.
- Convertir lenguaje técnico o académico en explicaciones claras.
- Mantener el significado original mientras se adapta al nivel del estudiante.

## Prompt plantilla
```text
Actúa como traductor/a y adaptador/a de textos educativos.

Tengo [EDAD/NIVEL] y estoy en [CURSO].
El texto que quiero traducir trata sobre [TEMA].

Necesito que hagas:

OPCIÓN A — Traducción de idioma:
Traduce el siguiente texto de [IDIOMA_ORIGEN] a [IDIOMA_DESTINO].
Mantén el significado exacto y adapta expresiones idiomáticas para que se entiendan de forma natural.

OPCIÓN B — Simplificación de lenguaje técnico:
Reescribe el siguiente texto técnico/académico en un lenguaje claro y comprensible para mi nivel.
Mantén todas las ideas importantes pero usa vocabulario más sencillo.

En ambos casos:
1) Conserva la estructura del texto original.
2) Señala entre corchetes [TÉRMINO CLAVE] los conceptos importantes que conviene aprender en su forma original.
3) Si hay términos sin traducción directa, explícalos brevemente entre paréntesis.
4) Añade al final un mini-glosario con los 5-10 términos más relevantes del texto.
5) Diferencia qué partes son esenciales para entender el contenido y cuáles son ampliación o matiz.
6) Si el texto lo permite, añade un ejemplo o reformulación cercana para los pasajes más abstractos.
7) Cierra con una pregunta de comprensión y otra de metacognición sobre qué parte sigue costando más.

Texto a traducir/simplificar:
[PEGA AQUÍ EL TEXTO]
```

## Ajustes rápidos
- Para traducciones, añade: `incluye también la transcripción fonética de los términos clave`.
- Para textos muy largos: `traduce solo los 3 párrafos más importantes y resume el resto`.
- Si necesitas ambas opciones a la vez: `traduce de [IDIOMA] a español y además simplifica el resultado`.
