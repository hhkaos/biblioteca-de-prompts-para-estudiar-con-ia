---
wizard:
  fields:
    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 16 años, 2º Bachillerato...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 2º Bachillerato, 1º de carrera...

    - key: ASIGNATURA
      label: Asignatura del ejercicio
      type: text
      placeholder: Ej. Matemáticas, Física, Química...

    - key: TEMA
      label: Tema o tipo de ejercicio
      type: text
      placeholder: Ej. ecuaciones de segundo grado, cinemática, equilibrio químico...

    - key: PEGA AQUÍ EL EJERCICIO O PROBLEMA
      label: El ejercicio o problema
      hint: Copia el enunciado completo del ejercicio
      type: textarea
      placeholder: Ej. Un tren parte de la estación A a 120 km/h...
---
# Resolver y explicar ejercicios o problemas

## Cuándo usarlo
Cuando se tiene un ejercicio o problema y no se sabe cómo abordarlo, o cuando se ha resuelto pero no se entiende bien el proceso.

## Qué consigues
- Entender el proceso de resolución, no solo el resultado.
- Aprender a identificar qué tipo de problema es y qué estrategia usar.
- Desarrollar autonomía para resolver ejercicios similares en el futuro.

## Prompt plantilla
```text
Actúa como tutor/a paciente y didáctico/a.

Tengo [EDAD/NIVEL] y estoy en [CURSO].
Necesito ayuda con un ejercicio de [ASIGNATURA] sobre [TEMA].

Elige el método que prefieras según tu situación:

MÉTODO A — Paso a paso didáctico (recomendado si quieres ver la solución explicada):
Resuelve el ejercicio explicando cada paso. Para cada paso indica:
- Qué se hace y por qué.
- Qué conocimiento o fórmula se aplica.
- Errores comunes que se suelen cometer en ese paso.
Al final, resume la estrategia general para resolver ejercicios parecidos.

MÉTODO B — Guía socrática (recomendado si quieres aprender a resolverlo por ti mismo/a):
No me des la solución directamente. En su lugar:
- Hazme preguntas que me guíen hacia la respuesta.
- Si me atasco, dame una pista pequeña.
- Solo revela el siguiente paso cuando yo haya intentado responder.

En ambos métodos:
1) Empieza identificando qué tipo de problema es.
2) Señala qué conocimientos previos se necesitan.
3) Si hay varias formas de resolverlo, menciona las alternativas.
4) Distingue entre el paso más básico, el paso que suele atascar y el paso de transferencia a ejercicios parecidos.
5) Si el problema lo permite, conecta la resolución con una situación real o interpretación práctica.
6) Termina con una pregunta metacognitiva: qué parte entendí de verdad y cuál todavía sigo imitando.

Ejercicio:
[PEGA AQUÍ EL EJERCICIO O PROBLEMA]
```

## Ajustes rápidos
- Para practicar más: `después de resolver, genera 3 ejercicios similares de dificultad creciente`.
- Si tienes tu solución: `he obtenido [MI RESULTADO]; dime si es correcto y dónde me he equivocado si no lo es`.
- Para exámenes: `indica cuánto tiempo debería tardar un estudiante de mi nivel en resolver esto`.
