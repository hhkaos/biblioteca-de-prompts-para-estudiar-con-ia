---
wizard:
  fields:
    - key: TEMA
      label: Tema que quieres aprender
      type: text
      placeholder: Ej. La genética, la Edad Media, las funciones...

    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 14 años, 3º ESO...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 3º ESO, 1º Bachillerato...

    - key: MOTIVACION
      label: Tu motivación para aprenderlo
      hint: ¿Por qué quieres aprender esto? ¿Es por un examen, curiosidad, un proyecto...?
      type: text
      placeholder: Ej. tengo examen, me lo pidieron, me genera curiosidad...

    - key: CONTEXTO
      label: Contexto de aprendizaje
      hint: Dónde y cómo vas a estudiar este tema
      type: text
      placeholder: Ej. en casa solo/a, en clase con profesor/a, con tecnología...
---
# Entender lo que ya sabe y lo que quiere aprender

## Cuándo usarlo
Al inicio de una unidad o cuando hay interés espontáneo por un tema y se quiere orientar bien el aprendizaje.

## Qué consigues
- Identificar conocimientos previos y lagunas.
- Detectar motivaciones reales.
- Elegir un enfoque de aprendizaje más adecuado.

## Prompt plantilla
```text
Actúa como orientador/a educativo/a.

Quiero aprender sobre [TEMA].
Tengo [EDAD/NIVEL], estoy en [CURSO] y mi motivación es [MOTIVACION].
Aprenderé en este contexto: [CONTEXTO] (por ejemplo: en casa, en clase, con apoyo, con tecnología).

Guíame con un proceso breve de metacognición inicial:
1) Hazme 8 preguntas para detectar qué sé ya y qué no.
2) Ayúdame a identificar qué parte del tema me interesa más.
3) Propón 3 subtemas o ramas para empezar.
4) Recomiéndame una forma de estudiar según mi perfil.
5) Incluye una pregunta que conecte el tema con una experiencia, ejemplo cercano o decisión real.
6) Distingue entre lo que parece recuerdo superficial y lo que muestra comprensión real.

Cierra con una síntesis de "punto de partida" en 6-8 líneas y una mini propuesta de primer paso, segundo paso y señal de avance.
```

## Ajustes rápidos
- Si hay prisa, añade: `haz solo 4 preguntas de diagnóstico`.
- Para familias, añade: `incluye cómo puede acompañar un adulto sin hacer la tarea por mí`.
