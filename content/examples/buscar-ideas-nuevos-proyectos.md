---
wizard:
  fields:
    - key: TEMA_O_APRENDIZAJE
      label: Tema o aprendizaje base
      hint: El contenido desde el que quieres generar proyectos
      type: textarea
      placeholder: Ej. energías renovables, geometría, escritura creativa, ecosistemas...

    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 13 años, 4º ESO, FP...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 2º ESO, 4º ESO, FP, Bachillerato...

    - key: INTERESES_Y_RECURSOS
      label: Intereses y recursos disponibles
      hint: Qué te gusta y con qué tiempo, materiales o herramientas cuentas
      type: textarea
      placeholder: Ej. me gustan los videojuegos y el diseño; tengo cartulina, Canva y fines de semana...

    - key: CORTO/MEDIO/LARGO
      label: Tamaño del proyecto
      hint: Cuánto quieres que dure o exija
      type: radio
      options:
        - value: CORTO
          label: Corto
        - value: MEDIO
          label: Medio
        - value: LARGO
          label: Largo

    - key: PRACTICO/CREATIVO/INVESTIGACION/SOCIAL/MIXTO
      label: Tipo de proyecto
      hint: El enfoque que más te motiva
      type: select
      options:
        - value: PRACTICO
          label: Práctico
        - value: CREATIVO
          label: Creativo
        - value: INVESTIGACION
          label: Investigación
        - value: SOCIAL
          label: Impacto social
        - value: MIXTO
          label: Mezcla

    - key: OBJETIVO
      label: Qué quieres conseguir
      type: text
      placeholder: Ej. aprender haciendo, preparar feria escolar, crear portafolio, motivarme más...
---
# Buscar ideas para nuevos proyectos

## Cuándo usarlo
Cuando quieres pasar de estudiar teoría a construir algo, investigar, crear o resolver un reto que te obligue a aplicar lo aprendido.

## Qué consigues
- Ideas de proyectos más motivadoras y concretas.
- Conexión entre aprendizaje y acción.
- Propuestas ajustadas a tu tiempo, intereses y recursos reales.

## Prompt plantilla
```text
Actúa como generador/a de proyectos educativos motivadores.

Quiero sacar ideas de proyecto a partir de este tema o aprendizaje:
[TEMA_O_APRENDIZAJE]

Mi perfil: [EDAD/NIVEL], [CURSO].
Intereses y recursos disponibles:
[INTERESES_Y_RECURSOS]

Tamaño deseado del proyecto: [CORTO/MEDIO/LARGO].
Tipo de proyecto: [PRACTICO/CREATIVO/INVESTIGACION/SOCIAL/MIXTO].
Objetivo principal: [OBJETIVO].

Propón entre 5 y 8 ideas de proyecto. Para cada una indica:
1) Qué habría que hacer.
2) Qué se aprendería o pondría en práctica.
3) Qué materiales o recursos harían falta.
4) Nivel de dificultad aproximado.
5) Una primera acción concreta para empezar.
6) Qué parte del proyecto sería reto inicial, qué parte permitiría profundizar y qué parte serviría para transferir lo aprendido a una situación real.

Después:
- Destaca las 2 ideas más realistas para mi contexto.
- Explica cuál sería la mejor si quiero motivación rápida y cuál si quiero profundizar más.
- Para al menos 3 ideas, añade un producto final visible, una experiencia práctica de primera mano y una pregunta de reflexión final.

Reglas:
- Evita ideas imposibles para mi nivel o recursos.
- Haz que cada propuesta sea suficientemente concreta para imaginarla de verdad.
- Si un proyecto puede dividirse en fases, menciónalo.
- Asegúrate de que haya variedad real de enfoques: no propongas 5 ideas casi iguales.
```

## Ajustes rápidos
- Añade: `incluye una versión pensada para hacer en grupo`.
- Para portfolio, pide: `indica cómo documentar el proyecto paso a paso`.
