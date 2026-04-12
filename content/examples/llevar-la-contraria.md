---
wizard:
  fields:
    - key: IDEA_O_TESIS
      label: Idea, opinión o tesis
      hint: La afirmación que quieres poner a prueba
      type: textarea
      placeholder: Ej. las redes sociales mejoran siempre el aprendizaje, la Revolución Francesa fue inevitable...

    - key: TEMA
      label: Tema general
      type: text
      placeholder: Ej. educación, historia, ciencia, política...

    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 15 años, 1º Bachillerato, universidad...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 4º ESO, 1º Bachillerato, grado...

    - key: DEBIL/MEDIA/FUERTE
      label: Intensidad del contrargumento
      hint: Qué grado de presión crítica quieres aplicar a la idea
      type: radio
      options:
        - value: DEBIL
          label: Suave
        - value: MEDIA
          label: Media
        - value: FUERTE
          label: Fuerte

    - key: OBJETIVO
      label: Qué quieres entrenar
      type: text
      placeholder: Ej. detectar puntos débiles, preparar un debate, mejorar una redacción...
---
# Llevar la contraria para pensar mejor

## Cuándo usarlo
Cuando quieres comprobar si una idea aguanta bien las objeciones, preparar un debate o evitar quedarte con la primera postura sin analizarla.

## Qué consigues
- Detectar puntos débiles, matices y supuestos ocultos.
- Practicar refutación sin quedarte en opiniones vagas.
- Mejorar la solidez de una idea antes de defenderla.

## Prompt plantilla
```text
Actúa como interlocutor/a crítico/a, riguroso/a y respetuoso/a.

Quiero poner a prueba esta idea sobre [TEMA]:
[IDEA_O_TESIS]

Mi perfil: [EDAD/NIVEL], [CURSO].
Nivel de oposición deseado: [DEBIL/MEDIA/FUERTE].
Objetivo: [OBJETIVO].

Haz este trabajo:
1) Resume mi idea en una frase neutral para comprobar que la has entendido.
2) Genera 3 contrargumentos distintos:
   - uno basado en falta de evidencia,
   - uno basado en excepciones o límites,
   - uno basado en consecuencias no previstas.
3) Para cada contrargumento, explica por qué pone en aprietos la idea.
4) Para cada contrargumento, añade un ejemplo, caso o situación concreta que lo vuelva más claro.
5) Señala qué parte de la tesis seguiría siendo defendible incluso después de la crítica.
6) Indica qué dato, evidencia o matiz podría hacerme revisar mi postura.
7) Termina con una versión mejorada y más matizada de la idea original.
8) Cierra con 3 preguntas de metacognición para que valore qué objeción me ha costado más y por qué.

Reglas:
- No caricaturices mi postura.
- Critica las ideas, no a la persona.
- Si la tesis es ambigua, empieza aclarando qué puede significar.
- Haz que los contraargumentos tengan intensidad progresiva, de menos a más exigentes.
```

## Ajustes rápidos
- Añade: `convierte esto en un mini debate de 2 voces`.
- Para redacción, pide: `termina con una tesis reformulada en 3 frases claras`.
