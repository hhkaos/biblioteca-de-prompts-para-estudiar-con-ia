---
wizard:
  fields:
    - key: TEMA_INICIAL
      label: Tema de partida
      hint: El tema que ya te interesa o estás estudiando
      type: text
      placeholder: Ej. volcanes, programación, Egipto antiguo, música barroca...

    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 12 años, 3º ESO, adulto...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 1º ESO, Bachillerato, autodidacta...

    - key: INTERESES
      label: Otros intereses
      hint: Cosas que también te gustan o te llaman la atención
      type: textarea
      placeholder: Ej. videojuegos, animales, astronomía, diseño, debates...

    - key: CERCANOS/SORPRENDENTES/MEZCLA
      label: Tipo de conexiones
      hint: Si prefieres temas muy cercanos o conexiones más inesperadas
      type: radio
      options:
        - value: CERCANOS
          label: Cercanos
        - value: SORPRENDENTES
          label: Sorprendentes
        - value: MEZCLA
          label: Mezcla de ambos

    - key: OBJETIVO
      label: Qué buscas al explorar
      type: text
      placeholder: Ej. ampliar curiosidad, elegir próximo tema, preparar proyecto...
---
# Encontrar temas relacionados

## Cuándo usarlo
Cuando quieres ampliar un interés actual y descubrir ramas conectadas que puedan abrir nuevas preguntas o motivaciones de aprendizaje.

## Qué consigues
- Un mapa de conexiones más rico alrededor de un tema.
- Nuevas rutas de exploración ajustadas a tus intereses.
- Más ideas para seguir aprendiendo sin perder el hilo.

## Prompt plantilla
```text
Actúa como orientador/a de exploración intelectual.

Mi tema de partida es [TEMA_INICIAL].
Tengo [EDAD/NIVEL] y estoy en [CURSO].
Otros intereses que me motivan: [INTERESES].
Tipo de conexiones que prefiero: [CERCANOS/SORPRENDENTES/MEZCLA].
Objetivo: [OBJETIVO].

Ayúdame así:
1) Identifica entre 6 y 10 temas relacionados con [TEMA_INICIAL].
2) Para cada uno, explica brevemente por qué conecta con el tema inicial.
3) Señala si la conexión es conceptual, histórica, práctica, científica, artística o social.
4) Marca cuáles serían mejores para empezar si quiero avanzar sin perderme.
5) Incluye al menos una conexión cercana y útil, una sorprendente y una que abra una aplicación práctica o proyecto.
6) Para 3 de los temas, añade una pregunta potente, una actividad breve o una observación de primera mano que pueda hacer.
7) Termina con una ruta sugerida de 3 pasos: qué explorar primero, después y más adelante.
8) Cierra con 3 preguntas de metacognición sobre qué conexión me atrae más, cuál me reta más y cuál encaja mejor con mi objetivo.

Reglas:
- Evita propuestas genéricas o demasiado obvias si no aportan valor.
- Ajusta el nivel a mi perfil.
- Prioriza conexiones que realmente puedan despertar curiosidad o abrir proyectos.
- Muestra variedad real de enfoques, no solo subtemas casi iguales.
```

## Ajustes rápidos
- Añade: `convierte las conexiones en mapa mental textual`.
- Para conversación, pide: `incluye una pregunta curiosa por cada tema relacionado`.
