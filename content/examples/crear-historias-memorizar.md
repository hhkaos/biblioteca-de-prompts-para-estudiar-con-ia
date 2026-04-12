---
wizard:
  fields:
    - key: CONTENIDO
      label: Contenido que quieres memorizar
      hint: Lista de términos, pasos, fechas, conceptos o datos
      type: textarea
      placeholder: Ej. los pasos del método científico, capas de la atmósfera, tipos de nutrientes...

    - key: TEMA
      label: Tema
      type: text
      placeholder: Ej. método científico, atmósfera, nutrición...

    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 10 años, 1º ESO, adulto...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. Primaria, 1º ESO, Bachillerato...

    - key: AVENTURA/HUMOR/MISTERIO/COTIDIANA
      label: Tipo de historia
      hint: El tono narrativo que te engancha mejor
      type: radio
      options:
        - value: AVENTURA
          label: Aventura
        - value: HUMOR
          label: Humor
        - value: MISTERIO
          label: Misterio
        - value: COTIDIANA
          label: Situación cotidiana

    - key: ORDEN/RELACIONES/DEFINICIONES
      label: Qué necesitas recordar mejor
      hint: La historia puede priorizar secuencia, conexiones o significado
      type: radio
      options:
        - value: ORDEN
          label: Orden
        - value: RELACIONES
          label: Relaciones entre elementos
        - value: DEFINICIONES
          label: Definiciones o significado
---
# Crear historias para memorizar

## Cuándo usarlo
Cuando recordar una lista o conjunto de conceptos te resulta más fácil si los conviertes en escenas conectadas con lógica narrativa.

## Qué consigues
- Unir datos aislados en una secuencia con sentido.
- Crear imágenes mentales más fáciles de recuperar.
- Recordar mejor orden, relaciones o significado según el objetivo.

## Prompt plantilla
```text
Actúa como creador/a de historias didácticas para memorizar.

Quiero convertir este contenido sobre [TEMA] en una historia para [EDAD/NIVEL] ([CURSO]):
[CONTENIDO]

Tipo de historia: [AVENTURA/HUMOR/MISTERIO/COTIDIANA].
Necesito recordar mejor: [ORDEN/RELACIONES/DEFINICIONES].

Crea una historia que:
1) Incluya todos los elementos importantes del contenido.
2) Los conecte en una secuencia fácil de imaginar.
3) Haga visible qué representa cada escena o personaje.
4) No distorsione los datos esenciales.
5) Introduzca una progresión clara: presentación, desarrollo y cierre para reforzar el orden mental.
6) Si encaja, sitúe alguna escena en un contexto cotidiano o reconocible para mi edad.

Después de la historia:
- Explica el mapa de correspondencias entre historia y contenido real.
- Resume la historia en 5 hitos clave para repasarla rápido.
- Señala qué parte conviene repetir en voz alta para fijarla mejor.
- Añade una versión en formato lista de escenas o viñetas para quien recuerde mejor con estructura visual.
- Cierra con 3 preguntas de metacognición para comprobar si recuerdo la historia, el contenido real y dónde puedo confundir ambos.
```

## Ajustes rápidos
- Añade: `haz una segunda versión mucho más corta para repaso antes del examen`.
- Si quieres visualizarla, pide: `divide la historia en escenas que pueda dibujar`.
