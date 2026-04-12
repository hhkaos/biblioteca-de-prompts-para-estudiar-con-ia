---
wizard:
  fields:
    - key: RECURSO
      label: Recurso a transformar
      hint: El material cuyo formato quieres cambiar
      type: text
      placeholder: Ej. mis apuntes del tema 4, el capítulo 2 del libro, un artículo...

    - key: TEMA
      label: Tema del contenido
      type: text
      placeholder: Ej. la fotosíntesis, los números decimales...

    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 15 años, 3º ESO...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 3º ESO, 2º Bachillerato...

    - key: BAJOS/MEDIOS/ALTOS
      label: Conocimientos previos
      type: radio
      options:
        - value: BAJOS
          label: Bajos — sin base previa
        - value: MEDIOS
          label: Medios — algunos conceptos
        - value: ALTOS
          label: Altos — buena base

    - key: ESQUEMA/TABLA/LISTA/PASOS/PREGUNTAS_Y_RESPUESTAS/CRONOLOGIA
      label: Nuevo formato deseado
      hint: Cómo quieres que quede organizado el contenido
      type: select
      options:
        - value: ESQUEMA
          label: Esquema jerárquico
        - value: TABLA
          label: Tabla comparativa
        - value: LISTA
          label: Lista de puntos
        - value: PASOS
          label: Pasos secuenciales
        - value: PREGUNTAS_Y_RESPUESTAS
          label: Preguntas y respuestas
        - value: CRONOLOGIA
          label: Cronología / línea del tiempo

    - key: PROBLEMA_CON_FORMATO_ACTUAL
      label: ¿Por qué no te sirve el formato actual?
      hint: El problema concreto que quieres resolver con el cambio de formato
      type: text
      placeholder: Ej. es demasiado denso para leer, no puedo estudiarlo en el metro...
---
# Cambiar formato de contenidos

## Cuándo usarlo
Cuando el problema principal no es el contenido, sino cómo está presentado.

## Qué consigues
- Mismo contenido en una estructura más usable.
- Mejor comprensión según preferencia de aprendizaje.
- Material listo para repaso.

## Prompt plantilla
```text
Actúa como especialista en transformación de contenidos.

Transforma [RECURSO] sobre [TEMA] para [EDAD/NIVEL] ([CURSO]).
Conocimientos previos: [BAJOS/MEDIOS/ALTOS].

Necesito cambiar el formato a: [ESQUEMA/TABLA/LISTA/PASOS/PREGUNTAS_Y_RESPUESTAS/CRONOLOGIA].
Motivo: [PROBLEMA_CON_FORMATO_ACTUAL].

Reglas:
1) Mantén significado e ideas clave.
2) No añadas información externa.
3) No resumas en exceso.
4) Entrega estructura clara y ordenada.
5) Si el formato elegido lo permite, haz visible qué es principal, qué es secundario y qué se puede usar para repaso rápido.
6) Añade una mini guía de uso: cómo estudiar con este nuevo formato y qué tipo de tarea facilita mejor.
7) Cierra con una pregunta de comprobación y otra de metacognición.
```

## Ajustes rápidos
- Añade: `incluye una versión imprimible en texto plano`.
- Para estudiar, pide: `termina con checklist de repaso de 8 puntos`.
