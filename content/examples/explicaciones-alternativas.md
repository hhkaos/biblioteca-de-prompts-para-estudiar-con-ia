---
wizard:
  fields:
    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 14 años, 3º ESO...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 3º ESO, 1º Bachillerato...

    - key: CONCEPTO
      label: Concepto que no entiendes
      hint: El concepto concreto que quieres que te expliquen de otra manera
      type: text
      placeholder: Ej. la derivada, la fotosíntesis, los números imaginarios...

    - key: ASIGNATURA
      label: Asignatura
      type: text
      placeholder: Ej. Matemáticas, Biología, Física...

    - key: EXPLICA LO QUE CREES QUE SABES, AUNQUE SEA POCO O INCORRECTO
      label: Lo que crees entender hasta ahora
      hint: Escribe tu comprensión actual aunque sea incompleta o incorrecta
      type: textarea
      placeholder: Ej. Creo que la derivada mide cómo cambia algo, pero no entiendo bien qué significa el resultado...

    - key: DESCRIBE TU DUDA CONCRETA
      label: Lo que no te queda claro
      hint: El punto exacto donde te pierdes o te bloqueas
      type: textarea
      placeholder: Ej. No entiendo por qué cuando derivo x² obtengo 2x y no x...
---
# Crear explicaciones alternativas

## Cuándo usarlo
Cuando la explicación del libro o del profesor no termina de entenderse y se necesita otra forma de abordar el mismo concepto.

## Qué consigues
- Varias perspectivas distintas para entender un mismo concepto.
- Encontrar la explicación que mejor encaja con tu forma de aprender.
- Superar bloqueos de comprensión con enfoques frescos.

## Prompt plantilla
```text
Actúa como un/a profesor/a creativo/a que domina múltiples formas de explicar.

Tengo [EDAD/NIVEL] y estoy en [CURSO].
Estoy intentando entender [CONCEPTO] de [ASIGNATURA], pero la explicación que tengo no me queda clara.

Lo que entiendo hasta ahora: [EXPLICA LO QUE CREES QUE SABES, AUNQUE SEA POCO O INCORRECTO].
Lo que no me queda claro: [DESCRIBE TU DUDA CONCRETA].

Necesito que me lo expliques de 3 formas diferentes:
1) Explicación técnica simplificada: usa el vocabulario correcto pero con frases cortas y claras.
2) Explicación cotidiana: explícalo como si se lo contaras a alguien que no sabe nada del tema, usando situaciones del día a día.
3) Explicación visual/narrativa: descríbelo como una historia, un recorrido o una escena que pueda imaginar mentalmente.

Para cada explicación:
- Señala la idea central en una frase.
- Indica qué parte de mi comprensión actual es correcta y cuál hay que corregir.
- Termina con una pregunta de comprobación para ver si lo he entendido.
```

## Ajustes rápidos
- Si aprendes mejor con datos: `añade una cuarta explicación basada en números, datos o estadísticas`.
- Para profundizar: `después de las 3 explicaciones, indica qué debería estudiar a continuación para dominar el tema`.
- Si tienes apuntes: `pego mis apuntes; dime qué explicación les falta y mejóralos`.
