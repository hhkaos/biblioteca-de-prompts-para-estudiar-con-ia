---
wizard:
  fields:
    - key: OBJETIVO_O_TAREA
      label: Objetivo o tarea a aprender
      hint: El proceso o habilidad concreta que quieres dominar paso a paso
      type: text
      placeholder: Ej. aprender a resolver ecuaciones, montar un circuito básico...

    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 15 años, 4º ESO...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 4º ESO, 1º Bachillerato...

    - key: NULA/BAJA/MEDIA/ALTA
      label: Experiencia previa
      type: radio
      options:
        - value: NULA
          label: "Nula — empiezo desde cero"
        - value: BAJA
          label: "Baja — algo he visto"
        - value: MEDIA
          label: "Media — tengo base"
        - value: ALTA
          label: "Alta — quiero profundizar"
---
# Crear una guía interactiva

## Cuándo usarlo
Cuando se quiere aprender una tarea o proceso con pasos concretos y verificación continua.

## Qué consigues
- Ruta paso a paso accionable.
- Detección temprana de bloqueos.
- Práctica guiada con mini comprobaciones.

## Prompt plantilla
```text
Actúa como instructor/a práctico/a.

Quiero una guía para [OBJETIVO_O_TAREA].
Perfil: [EDAD/NIVEL], [CURSO], experiencia previa [NULA/BAJA/MEDIA/ALTA].

Diseña una guía interactiva con:
1) Pasos cortos y numerados.
2) Qué hacer y por qué en cada paso.
3) Mini reto de comprobación por paso.
4) Errores normales y corrección rápida.
5) Señal de "listo para pasar al siguiente nivel".

No hagas explicación larga sin acciones concretas.
```

## Ajustes rápidos
- Añade: `adapta la guía a sesiones de [20/30/45] minutos`.
- Si la tarea es compleja, pide: `divide la guía en nivel básico y nivel intermedio`.
