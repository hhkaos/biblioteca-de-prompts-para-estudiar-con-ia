---
wizard:
  fields:
    - key: TEMA
      label: Tema de aprendizaje
      hint: El tema sobre el que quieres despertar la curiosidad
      type: text
      placeholder: Ej. La Segunda Guerra Mundial, las fracciones, el cuerpo humano...

    - key: EDAD/NIVEL
      label: Edad o nivel
      hint: Ayuda a calibrar el lenguaje y los ejemplos
      type: text
      placeholder: Ej. 13 años, adulto, universitario...

    - key: CURSO
      label: Curso o etapa educativa
      hint: El nivel académico actual
      type: text
      placeholder: Ej. 2º ESO, 1º Bachillerato, FP...
---
# Despertar la curiosidad antes de aprender

## Cuándo usarlo
Cuando se empieza un tema nuevo y todavía no está claro por qué importa ni cómo conecta con la vida diaria.

## Qué consigues
- Activar interés antes de estudiar contenido técnico.
- Relacionar el tema con experiencias cercanas.
- Reducir rechazo inicial hacia materias difíciles.

## Prompt plantilla
```text
Actúa como un docente que explica de forma práctica y motivadora.

Quiero prepararme para aprender sobre [TEMA].
Tengo [EDAD/NIVEL] y estoy en [CURSO].

No quiero una explicación técnica todavía. Quiero que me ayudes a:
1) Entender por qué este tema es importante.
2) Ver cómo se relaciona con situaciones de mi día a día.
3) Conectar el tema con cosas que ya conozco.
4) Ver para qué me puede servir ahora y en el futuro.
5) Recibir 3 ideas para hacerlo más divertido al estudiarlo.

Usa lenguaje claro, ejemplos concretos y comparaciones fáciles de entender para mi nivel.
```

## Ajustes rápidos
- Cambia el rol inicial por `[profesor/a de [ASIGNATURA]]` o `[mentor/a de estudio]`.
- Añade una restricción: `responde en menos de 300 palabras` para respuestas breves.
