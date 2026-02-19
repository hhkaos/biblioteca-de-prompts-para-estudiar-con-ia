---
wizard:
  fields:
    - key: TEMA
      label: Tema del contenido
      hint: De qué trata el texto que vas a compartir
      type: text
      placeholder: Ej. la célula, el Romanticismo, la Primera Guerra Mundial...

    - key: EDAD/NIVEL
      label: Edad o nivel del destinatario
      hint: A quién va dirigido el resumen
      type: text
      placeholder: Ej. 13 años, adulto, estudiante de bachillerato...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 2º ESO, 1º Bachillerato...
---
# Resúmeme esto

## Cuándo usarlo
Cuando se tiene un texto largo y hace falta una versión comprensible y útil para estudio.

## Qué consigues
- Resumen adaptado al nivel.
- Diferenciación entre ideas clave y secundarias.
- Base para repasar y memorizar.

## Prompt plantilla
```text
Actúa como tutor/a de comprensión lectora.

Voy a compartir un contenido sobre [TEMA].
Adáptalo para [EDAD/NIVEL] ([CURSO]).

Tu respuesta debe incluir:
1) Resumen breve (máximo 1 página).
2) Ideas clave en viñetas.
3) Tabla con: Concepto | Definición | Ejemplo real | Consejo de estudio.
4) Dudas frecuentes que podrían aparecer al estudiar este contenido.

Reglas:
- Prioriza claridad sobre tecnicismo.
- No inventes información fuera del texto proporcionado.
- Señala explícitamente qué es principal y qué es secundario.
```

## Ajustes rápidos
- Añade: `haz una versión ultrabreve de 10 líneas para repaso rápido`.
- Para evaluar comprensión, pide: `incluye 5 preguntas con respuesta`.
