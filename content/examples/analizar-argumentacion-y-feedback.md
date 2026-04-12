---
wizard:
  fields:
    - key: TEXTO_O_ARGUMENTO
      label: Texto, argumento o respuesta
      hint: Pega la argumentación que quieres revisar
      type: textarea
      placeholder: Ej. una redacción, una respuesta de examen, una opinión razonada, un comentario de texto...

    - key: TEMA
      label: Tema del argumento
      type: text
      placeholder: Ej. cambio climático, ética, historia, literatura...

    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 15 años, 2º Bachillerato, universidad...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 4º ESO, 2º Bachillerato, grado...

    - key: CLARIDAD/COHERENCIA/EVIDENCIA/PERSUASION/COMPLETO
      label: Qué quieres revisar más
      hint: El aspecto principal del feedback
      type: select
      options:
        - value: CLARIDAD
          label: Claridad
        - value: COHERENCIA
          label: Coherencia
        - value: EVIDENCIA
          label: Uso de pruebas o ejemplos
        - value: PERSUASION
          label: Capacidad de convencer
        - value: COMPLETO
          label: Revisión completa

    - key: OBJETIVO
      label: Para qué quieres mejorarlo
      type: text
      placeholder: Ej. entregar una redacción, preparar una exposición, defender una postura...
---
# Analizar argumentación y dar feedback

## Cuándo usarlo
Cuando ya has escrito o pensado una respuesta y quieres saber si está bien razonada, dónde falla y cómo mejorarla sin quedarte en un “está bien/está mal”.

## Qué consigues
- Feedback más concreto y útil que una corrección superficial.
- Detección de lagunas, incoherencias o falacias.
- Una hoja de ruta clara para rehacer mejor el argumento.

## Prompt plantilla
```text
Actúa como revisor/a experto/a en argumentación.

Quiero analizar este texto o argumento sobre [TEMA]:
[TEXTO_O_ARGUMENTO]

Mi perfil: [EDAD/NIVEL], [CURSO].
Aspecto prioritario a revisar: [CLARIDAD/COHERENCIA/EVIDENCIA/PERSUASION/COMPLETO].
Objetivo del texto: [OBJETIVO].

Haz el análisis en este formato:
1) Resume en 2 o 3 líneas qué intenta defender el texto.
2) Señala sus puntos fuertes.
3) Detecta problemas concretos:
   - afirmaciones poco justificadas,
   - saltos lógicos,
   - contradicciones,
   - ejemplos débiles o ausentes,
   - posibles falacias, si las hay.
4) Da feedback accionable: qué cambiar primero y por qué.
5) Añade al menos un contraejemplo, una objeción posible o una perspectiva alternativa que el texto debería considerar.
6) Si el texto lo permite, conecta una parte del análisis con una situación real, caso concreto o ejemplo verificable.
7) Reescribe un fragmento breve como ejemplo de mejora, sin rehacerlo todo.
8) Cierra con 3 preguntas de autoevaluación para que yo mismo/a revise si mi argumento mejora de verdad.

Reglas:
- Sé claro y específico.
- No critiques solo el estilo si el problema es de fondo.
- Diferencia entre problema grave, mejorable y opcional.
- Ordena las observaciones de menos a más exigentes para que pueda rehacer el texto paso a paso.
```

## Ajustes rápidos
- Añade: `puntúa cada criterio del 1 al 5 con una explicación breve`.
- Para examen, pide: `indica qué perdería puntos en una corrección académica`.
