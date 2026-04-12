---
wizard:
  fields:
    - key: RECURSO
      label: Recurso de partida
      hint: El material que quieres organizar visualmente (apuntes, texto, etc.)
      type: textarea
      placeholder: Pega aquí tus apuntes, el texto del libro o describe el tema...

    - key: TEMA
      label: Tema
      type: text
      placeholder: Ej. El sistema nervioso, la Revolución Francesa...

    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 14 años, 3º ESO...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 3º ESO, 1º Bachillerato...

    - key: BAJOS/MEDIOS/ALTOS
      label: Conocimientos previos
      type: radio
      options:
        - value: BAJOS
          label: "Bajos — poca o ninguna base"
        - value: MEDIOS
          label: "Medios — algunos conceptos"
        - value: ALTOS
          label: "Altos — buena base"

    - key: MAPA_MENTAL/DIAGRAMA_DE_FLUJO/GRAFO/LINEA_DE_TIEMPO
      label: Tipo de representación visual
      type: select
      options:
        - value: MAPA_MENTAL
          label: Mapa mental
        - value: DIAGRAMA_DE_FLUJO
          label: Diagrama de flujo
        - value: GRAFO
          label: Grafo de relaciones
        - value: LINEA_DE_TIEMPO
          label: Línea de tiempo
---
# Crear diagramas o mapas mentales

## Cuándo usarlo
Cuando hay mucha información y cuesta ver jerarquías, relaciones o secuencias.

## Qué consigues
- Visión global del tema.
- Relaciones explícitas entre conceptos.
- Mejor organización mental para repasar.

## Prompt plantilla
```text
Actúa como experto/a en organización visual del conocimiento.

A partir de [RECURSO] sobre [TEMA], crea una representación para [EDAD/NIVEL] ([CURSO]).
Conocimientos previos: [BAJOS/MEDIOS/ALTOS].

Devuélveme en formato [MAPA_MENTAL/DIAGRAMA_DE_FLUJO/GRAFO/LINEA_DE_TIEMPO].
Debe incluir:
1) Nodos o bloques con títulos claros.
2) Relaciones explícitas entre ideas.
3) Jerarquía: principal, secundario, detalle.
4) Si encaja, un ejemplo, caso o aplicación real conectado al mapa.
5) Una segunda salida breve en texto lineal para quien necesite leer además de ver la estructura.
6) Una mini guía final: cómo recorrer el mapa para estudiar de lo básico a lo avanzado.

Restricciones:
- No añadir información nueva.
- Mantener profundidad y vocabulario adecuados al nivel.
```

## Ajustes rápidos
- Añade: `marca con "*" los 5 conceptos imprescindibles`.
- Pide salida doble: `visual textual + resumen en 8 líneas`.
