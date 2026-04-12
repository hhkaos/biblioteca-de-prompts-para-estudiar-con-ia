---
wizard:
  fields:
    - key: TEMA
      label: Tema del glosario
      hint: El área o materia de la que quieres construir vocabulario
      type: text
      placeholder: Ej. genética, la Revolución Francesa, análisis matemático...

    - key: EDAD/NIVEL
      label: Edad o nivel del destinatario
      type: text
      placeholder: Ej. 14 años, ESO, universitario...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 3º ESO, 1º Bachillerato...

    - key: DESCRIPCION_BREVE
      label: Conocimientos previos
      hint: ¿Cuánto sabe ya el destinatario del vocabulario del tema?
      type: text
      placeholder: Ej. conoce los conceptos básicos pero no el vocabulario técnico...

    - key: ALFABETICO/POR_IMPORTANCIA
      label: Orden del glosario
      hint: Cómo quieres que se ordenen los términos
      type: radio
      options:
        - value: ALFABETICO
          label: Alfabético
        - value: POR_IMPORTANCIA
          label: Por importancia conceptual
---
# Crear glosario de términos

## Cuándo usarlo
Cuando un tema tiene vocabulario nuevo y se necesita construir base conceptual rápida.

## Qué consigues
- Diccionario útil y contextualizado.
- Menos confusiones entre términos similares.
- Mejor precisión al estudiar o explicar.

## Prompt plantilla
```text
Actúa como especialista en didáctica del vocabulario.

Necesito un glosario sobre [TEMA] para [EDAD/NIVEL] ([CURSO]).
Conocimientos previos: [DESCRIPCION_BREVE].

Para cada término incluye:
1) Definición simple.
2) Ejemplo cercano.
3) Analogía o comparación.
4) Términos con los que suele confundirse.
5) Sinónimos/antónimos cuando aplique.
6) Una pista para distinguirlo de términos parecidos.

Formato final:
- Opción A: solo términos esenciales.
- Opción B: versión completa por categorías.
- Orden: [ALFABETICO/POR_IMPORTANCIA].
- Cierra con 5 preguntas breves para comprobar si ya sé usar los términos y no solo reconocerlos.
```

## Ajustes rápidos
- Para repaso, añade: `incluye mnemotecnia breve por término`.
- Para evaluación, añade: `genera 10 tarjetas tipo pregunta-respuesta`.
