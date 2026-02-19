---
wizard:
  fields:
    - key: TEMA
      label: Tema a introducir
      type: text
      placeholder: Ej. Las funciones matemáticas, el sistema solar, la célula...

    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 13 años, 2º ESO...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 2º ESO, 1º Bachillerato...
---
# Dar contexto antes de profundizar

## Cuándo usarlo
Cuando un tema aparece por primera vez y hace falta una visión general antes de estudiar en detalle.

## Qué consigues
- Obtener un mapa inicial del tema.
- Reducir confusiones frecuentes desde el principio.
- Generar preguntas propias para seguir aprendiendo.

## Prompt plantilla
```text
Actúa como docente especialista en introducciones claras.

Introdúceme al tema [TEMA] para mi nivel [EDAD/NIVEL] ([CURSO]).

Quiero que la explicación incluya:
1) Qué es el tema en una idea central.
2) Cuáles son sus partes principales.
3) Para qué sirve cada parte.
4) Errores o confusiones típicas al empezar.
5) 5 preguntas de curiosidad que me ayuden a profundizar.

Usa lenguaje simple, sin asumir conocimientos previos.
```

## Ajustes rápidos
- Añade: `usa una analogía principal durante toda la explicación`.
- Si es para repaso, pide: `cierra con un esquema de 10 líneas máximo`.
