---
wizard:
  fields:
    - key: EDAD/NIVEL
      label: Edad o nivel del niño/a
      hint: Ayuda a ajustar el lenguaje y el tipo de propuestas
      type: text
      placeholder: Ej. 5 años, 3º de Primaria, 11 años...

    - key: JUEGOS_O_ACTIVIDADES_FAVORITAS
      label: Juegos o actividades favoritas
      hint: Cosas que el niño/a elige por iniciativa propia o disfruta especialmente
      type: textarea
      placeholder: Ej. construir con LEGO, inventar historias, puzzles, fútbol, dibujar, juegos de reglas...

    - key: ACTIVIDADES_EN_LAS_QUE_DESTACA
      label: Actividades en las que destaca
      hint: Situaciones donde suele hacerlo bien o con facilidad
      type: textarea
      placeholder: Ej. recuerda canciones rápido, explica muy bien, se orienta bien en espacios, crea dibujos detallados...

    - key: COMO_APRENDE
      label: Cómo suele aprender mejor
      hint: Lo que observas sobre memoria, razonamiento, creatividad, lenguaje, atención o necesidad de movimiento
      type: textarea
      placeholder: Ej. memoriza escuchando, entiende mejor si manipula objetos, hace muchas preguntas, detecta patrones rápido...

    - key: COMPORTAMIENTO_ANTE_DIFICULTAD
      label: Cómo reacciona cuando algo le cuesta
      hint: Lo que hace ante el error, la frustración o los retos
      type: textarea
      placeholder: Ej. insiste mucho, se frustra y abandona, pide ayuda enseguida, busca otra forma de hacerlo...

    - key: INTERESES_GENERALES
      label: Intereses generales o temas que le atraen
      hint: Temas, conversaciones o curiosidades que aparecen a menudo
      type: textarea
      placeholder: Ej. animales, mapas, máquinas, música, cocinar, planetas, personas, historias del pasado...
---
# Identificar fortalezas e intereses de un niño/a

## Cuándo usarlo
Cuando quieres observar mejor cómo aprende un niño/a y detectar qué tipos de fortalezas o intereses podrían estar apareciendo en su día a día, sin convertirlo en un diagnóstico.

## Qué consigues
- Ordenar observaciones dispersas en una lectura más clara y útil.
- Detectar posibles fortalezas e intereses a seguir explorando.
- Sacar ideas prácticas para acompañar mejor en casa o en el aula.

## Prompt plantilla
```text
Actúa como experto/a en educación y desarrollo cognitivo infantil, con enfoque práctico para familias y educadores.

Quiero entender mejor las posibles fortalezas cognitivas e intereses de un niño/a a partir de observaciones cotidianas, sin hacer diagnósticos.

Perfil:
- Edad o nivel: [EDAD/NIVEL]
- Juegos o actividades favoritas: [JUEGOS_O_ACTIVIDADES_FAVORITAS]
- Actividades en las que destaca: [ACTIVIDADES_EN_LAS_QUE_DESTACA]
- Cómo suele aprender: [COMO_APRENDE]
- Cómo se comporta ante la dificultad: [COMPORTAMIENTO_ANTE_DIFICULTAD]
- Intereses generales: [INTERESES_GENERALES]

Analiza esta información y responde con esta estructura:
1) Resumen breve del perfil observado en lenguaje claro.
2) Posibles fortalezas cognitivas o formas de aprender que podrían estar apareciendo.
   - Exprésalo como hipótesis, no como certezas.
   - Explícalas con palabras sencillas y ejemplos concretos.
3) Posibles intereses a seguir explorando.
4) Actividades, juegos o propuestas prácticas para casa o aula que ayuden a reforzar y comprobar esas fortalezas o intereses.
5) Señales concretas que conviene observar en las próximas semanas para entender mejor al niño/a.
6) Posibles áreas a desarrollar, explicadas sin dramatizar y con ideas de apoyo realistas.
7) Si es posible, sugiere propuestas de dificultad progresiva: una muy accesible, una intermedia y una más retadora.
8) Añade una breve nota metacognitiva para el adulto: qué observar sobre motivación, persistencia y forma de pensar, no solo resultados.

Reglas:
- No diagnostiques ni etiquetes.
- No uses lenguaje clínico ni técnico complejo.
- No presentes hipótesis como hechos cerrados.
- Prioriza ejemplos concretos, observables y fáciles de aplicar en casa.
- Ajusta las recomendaciones a la edad y al contexto descrito.
- Si faltan datos importantes, señala qué convendría observar mejor antes de sacar conclusiones.
```

## Ajustes rápidos
- Para familia con varios hijos, añade: `compáralos sin etiquetar ni establecer jerarquías y sugiere una propuesta breve para cada uno`.
- Para aula, añade: `adáptalo a observaciones de clase y propone señales que un docente pueda detectar`.
- Para futuro, añade: `incluye intereses o entornos que podrían encajar bien más adelante, sin hablar de profesiones como si fueran destinos fijos`.
