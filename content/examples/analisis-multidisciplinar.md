---
wizard:
  fields:
    - key: CASO_O_SITUACION
      label: Caso o situación
      hint: El problema, noticia, dilema o caso práctico que quieres analizar
      type: textarea
      placeholder: Ej. uso de móviles en clase, construcción de una presa, edición genética en embriones...

    - key: TEMA
      label: Tema general
      type: text
      placeholder: Ej. tecnología, medioambiente, salud, historia...

    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 16 años, Bachillerato, universidad...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 4º ESO, 1º Bachillerato, grado...

    - key: CIENCIA/HISTORIA/ETICA/DERECHO/ECONOMIA
      label: Perspectivas prioritarias
      hint: Qué miradas quieres que aparezcan sí o sí
      type: checkbox
      options:
        - value: CIENCIA
          label: Ciencia
        - value: HISTORIA
          label: Historia
        - value: ETICA
          label: Ética
        - value: DERECHO
          label: Derecho
        - value: ECONOMIA
          label: Economía

    - key: OBJETIVO
      label: Qué quieres conseguir con el análisis
      type: text
      placeholder: Ej. detectar dilemas, preparar un comentario, comprender mejor el caso...
---
# Analizar un caso con perspectiva multidisciplinar

## Cuándo usarlo
Cuando un problema no se entiende bien desde una sola asignatura y conviene cruzar varias miradas para detectar tensiones, límites o dilemas.

## Qué consigues
- Salir de análisis simplistas o unidireccionales.
- Ver cómo cambian las conclusiones según la perspectiva.
- Detectar contradicciones, riesgos y preguntas más potentes.

## Prompt plantilla
```text
Actúa como analista multidisciplinar.

Quiero estudiar este caso sobre [TEMA]:
[CASO_O_SITUACION]

Mi perfil: [EDAD/NIVEL], [CURSO].
Perspectivas prioritarias: [CIENCIA/HISTORIA/ETICA/DERECHO/ECONOMIA].
Objetivo: [OBJETIVO].

Analízalo así:
1) Resume el caso en lenguaje claro.
2) Estúdialo desde cada perspectiva indicada, explicando:
   - qué preguntas haría esa disciplina,
   - qué datos o criterios le importarían,
   - qué conclusión provisional podría sacar.
3) Señala los puntos donde esas perspectivas chocan entre sí.
4) Identifica 2 dilemas o tensiones difíciles de resolver.
5) Añade un ejemplo, situación real o decisión concreta donde se vea por qué ese análisis importa.
6) Ofrece dos formas de representar el análisis: un texto razonado y una tabla comparativa breve.
7) Termina con una síntesis equilibrada, 3 preguntas para seguir investigando y 3 preguntas de metacognición sobre qué perspectiva me ha resultado más convincente o incómoda.

Reglas:
- No reduzcas el caso a una sola causa.
- Distingue hechos, interpretaciones y juicios de valor.
- Si falta información importante, indícalo antes de concluir.
- Si una perspectiva parece dominante, explica también qué puede dejar fuera.
```

## Ajustes rápidos
- Añade: `incluye una tabla comparativa por disciplinas`.
- Para comentario escrito, pide: `termina con un posible esquema de introducción, desarrollo y conclusión`.
