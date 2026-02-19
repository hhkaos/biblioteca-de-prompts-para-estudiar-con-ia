---
wizard:
  fields:
    - key: RECURSO
      label: Contenido de partida
      hint: Pega aquí el texto, apuntes o fragmento que quieres convertir en podcast
      type: textarea
      placeholder: Pega aquí tus apuntes o el texto del libro...

    - key: TEMA
      label: Tema del contenido
      type: text
      placeholder: Ej. La mitosis, la Guerra Civil, la ley de Ohm...

    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 16 años, 2º Bachillerato...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 2º Bachillerato, 1º de carrera...

    - key: CORTA/MEDIA/LARGA
      label: Duración del podcast
      type: radio
      options:
        - value: CORTA
          label: "Corta — 5 minutos aprox."
        - value: MEDIA
          label: "Media — 10-15 minutos aprox."
        - value: LARGA
          label: "Larga — 20-30 minutos aprox."

    - key: OBJETIVO
      label: Objetivo de aprendizaje
      hint: ¿Qué quieres que el oyente entienda al terminar?
      type: text
      placeholder: Ej. entender las fases de la mitosis, repasar antes del examen...
---
# Transformar contenido en podcast

## Cuándo usarlo
Cuando se quiere repasar escuchando o convertir material denso en una secuencia narrativa clara.

## Qué consigues
- Repaso en audio más ligero.
- Mejor priorización de ideas.
- Material reutilizable para desplazamientos o caminatas.

## Prompt plantilla
```text
Actúa como guionista pedagógico para audio educativo.

Transforma [RECURSO] sobre [TEMA] en un guion de podcast para [EDAD/NIVEL] ([CURSO]).
Duración objetivo: [CORTA/MEDIA/LARGA].
Objetivo de aprendizaje: [OBJETIVO].

Estructura obligatoria:
1) Apertura con contexto (30-60 segundos).
2) Bloque de ideas clave en secuencia lógica.
3) Ejemplos concretos.
4) Recapitulación al cierre.
5) 3 preguntas de autoevaluación.

Reglas:
- No añadir información fuera del contenido original.
- Priorizar claridad oral y frases cortas.
- Señalar explícitamente lo esencial vs. secundario.
```

## Ajustes rápidos
- Añade: `incluye pausas de recapitulación cada 3 minutos`.
- Si hay poco tiempo, pide `versión micro de 5 minutos`.
