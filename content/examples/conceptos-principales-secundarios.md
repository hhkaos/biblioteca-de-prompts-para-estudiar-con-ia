---
wizard:
  fields:
    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 15 años, 4º ESO...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 4º ESO, 2º Bachillerato...

    - key: TEMA
      label: Tema que estás estudiando
      type: text
      placeholder: Ej. La célula, el Barroco, la termodinámica...

    - key: ASIGNATURA
      label: Asignatura
      type: text
      placeholder: Ej. Biología, Historia del Arte, Física...

    - key: PEGA AQUÍ EL CONTENIDO
      label: Contenido a analizar
      hint: Pega aquí el texto, apuntes o fragmento del libro que quieres que analice
      type: textarea
      placeholder: Pega aquí tus apuntes o el texto del libro...
---
# Identificar conceptos principales y secundarios

## Cuándo usarlo
Cuando se tiene mucho contenido y no se distingue bien qué es fundamental y qué es complementario, o cuando se necesita priorizar qué estudiar primero.

## Qué consigues
- Diferenciar claramente ideas principales de secundarias.
- Crear una jerarquía de conceptos para organizar el estudio.
- Saber qué estudiar primero y qué es de apoyo o ampliación.

## Prompt plantilla
```text
Actúa como tutor/a especialista en técnicas de estudio y comprensión lectora.

Tengo [EDAD/NIVEL] y estoy en [CURSO].
Estoy estudiando [TEMA] de la asignatura [ASIGNATURA].

A partir del contenido que te comparto, necesito que:
1) Identifiques los conceptos principales (los imprescindibles para entender el tema).
2) Identifiques los conceptos secundarios (los que complementan o amplían los principales).
3) Organices todo en una tabla con: Concepto | Tipo (Principal/Secundario) | Por qué es importante | Relación con otros conceptos.
4) Expliques brevemente cómo se conectan los conceptos principales entre sí.
5) Sugiere un orden lógico para estudiarlos.
6) Señala si alguno conviene entender con ejemplo, con comparación o con práctica.
7) Añade una mini ruta de reto progresivo: qué dominar primero, qué contrastar después y qué aplicar al final.
8) Cierra con 3 preguntas de autoevaluación centradas solo en los conceptos principales.

Reglas:
- Usa lenguaje claro adaptado a mi nivel.
- Marca con estrella (*) los conceptos que suelen caer en exámenes.
- Si algún concepto necesita conocimiento previo, indícalo.

Contenido a analizar:
[PEGA AQUÍ EL CONTENIDO]
```

## Ajustes rápidos
- Para un resumen visual, añade: `presenta los conceptos como un esquema con niveles de importancia`.
- Si necesitas estudiar por bloques: `agrupa los conceptos en bloques temáticos de 15 minutos de estudio`.
- Para repasar: `crea 5 preguntas que cubran solo los conceptos principales`.
