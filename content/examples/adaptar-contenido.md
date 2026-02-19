---
wizard:
  fields:
    - key: RECURSO
      label: Recurso a adaptar
      hint: El material que quieres hacer más comprensible
      type: text
      placeholder: Ej. un artículo de Wikipedia, el capítulo 3 del libro, un vídeo...

    - key: TEMA
      label: Tema del recurso
      hint: De qué trata el contenido
      type: text
      placeholder: Ej. la fotosíntesis, la Revolución Francesa, las derivadas...

    - key: EDAD/NIVEL
      label: Edad o nivel del destinatario
      hint: A quién va dirigida la versión adaptada
      type: text
      placeholder: Ej. 12 años, alumnos de ESO, estudiantes con dificultades...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 1º ESO, 4º Primaria...

    - key: BAJOS/MEDIOS/ALTOS
      label: Conocimientos previos
      hint: ¿Cuánto sabe ya el destinatario del tema?
      type: radio
      options:
        - value: BAJOS
          label: Bajos — sin base previa
        - value: MEDIOS
          label: Medios — conoce conceptos básicos
        - value: ALTOS
          label: Altos — base sólida

    - key: VOCABULARIO/DENSIDAD/FALTA_DE_EJEMPLOS/OTRA
      label: Dificultad principal del recurso
      hint: El mayor obstáculo para entenderlo
      type: radio
      options:
        - value: VOCABULARIO
          label: Vocabulario muy técnico
        - value: DENSIDAD
          label: Demasiada información de golpe
        - value: FALTA_DE_EJEMPLOS
          label: Falta de ejemplos cercanos
        - value: OTRA
          label: Otra dificultad

    - key: LISTA/PASOS/SECCIONES
      label: Formato de la versión adaptada
      type: radio
      options:
        - value: LISTA
          label: Lista de puntos clave
        - value: PASOS
          label: Pasos secuenciales
        - value: SECCIONES
          label: Secciones con subtítulos
---
# Adaptar contenido

## Cuándo usarlo
Cuando existe buen material, pero no se entiende por nivel de lenguaje, densidad o formato.

## Qué consigues
- Contenido accesible sin perder significado.
- Menor carga cognitiva.
- Más conexión con intereses del estudiante.

## Prompt plantilla
```text
Actúa como experto/a en adaptación de contenidos educativos.

Adapta [RECURSO] sobre [TEMA] para [EDAD/NIVEL] ([CURSO]).
Conocimientos previos: [BAJOS/MEDIOS/ALTOS].
Dificultad principal: [VOCABULARIO/DENSIDAD/FALTA_DE_EJEMPLOS/OTRA].

Quiero que:
1) Mantengas el significado y las ideas clave.
2) Simplifiques lenguaje cuando sea necesario.
3) Añadas ejemplos y comparaciones cercanas.
4) Organices la salida en formato [LISTA/PASOS/SECCIONES].

Restricciones:
- No inventes información nueva.
- No cambies el sentido del contenido original.
```

## Ajustes rápidos
- Añade: `señala con etiqueta [CLAVE] las ideas imprescindibles`.
- Pide dos salidas: `versión corta (5 min)` y `versión extendida (15 min)`.
