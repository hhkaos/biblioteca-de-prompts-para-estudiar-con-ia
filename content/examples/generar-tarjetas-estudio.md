---
wizard:
  fields:
    - key: CONTENIDO
      label: Contenido base
      hint: Pega apuntes, conceptos, definiciones o fragmentos del tema
      type: textarea
      placeholder: Ej. definiciones de ecosistema, tipos de rocas, fórmulas básicas...

    - key: TEMA
      label: Tema de estudio
      type: text
      placeholder: Ej. ecosistemas, rocas, ecuaciones lineales...

    - key: EDAD/NIVEL
      label: Edad o nivel
      type: text
      placeholder: Ej. 13 años, 4º ESO, universidad...

    - key: CURSO
      label: Curso o etapa educativa
      type: text
      placeholder: Ej. 1º ESO, 4º ESO, 1º de carrera...

    - key: DEFINICION/EJEMPLO/PROCESO/COMPARACION/MIXTAS
      label: Tipo de tarjetas
      hint: Qué clase de preguntas te conviene más practicar
      type: select
      options:
        - value: DEFINICION
          label: Definición
        - value: EJEMPLO
          label: Aplicación con ejemplo
        - value: PROCESO
          label: Pasos o proceso
        - value: COMPARACION
          label: Comparación entre conceptos
        - value: MIXTAS
          label: Mezcladas

    - key: FACIL/MEDIA/RETADORA
      label: Dificultad deseada
      type: radio
      options:
        - value: FACIL
          label: Fácil
        - value: MEDIA
          label: Media
        - value: RETADORA
          label: Retadora

    - key: NUMERO_TARJETAS
      label: Número aproximado de tarjetas
      type: text
      placeholder: Ej. 10, 15, 20...
---
# Generar tarjetas de estudio

## Cuándo usarlo
Cuando quieres repasar activamente y comprobar si recuerdas conceptos, procesos o diferencias sin limitarte a releer.

## Qué consigues
- Pasar de lectura pasiva a recuerdo activo.
- Separar ideas clave en unidades pequeñas y repasables.
- Tener material listo para autoevaluarte o estudiar en tandas cortas.

## Prompt plantilla
```text
Actúa como especialista en aprendizaje activo y flashcards.

Quiero crear tarjetas de estudio sobre [TEMA] para [EDAD/NIVEL] ([CURSO]).
Contenido base:
[CONTENIDO]

Tipo de tarjetas: [DEFINICION/EJEMPLO/PROCESO/COMPARACION/MIXTAS].
Dificultad: [FACIL/MEDIA/RETADORA].
Cantidad aproximada: [NUMERO_TARJETAS].

Genera tarjetas con este formato:
- Anverso: pregunta o pista breve.
- Reverso: respuesta clara, precisa y corta.

Reglas:
1) No inventes contenido que no esté respaldado por el material base.
2) Prioriza lo más importante y lo que suele confundirse.
3) Si hay listas o procesos, divide en varias tarjetas en vez de meter demasiado en una.
4) Alterna preguntas directas, preguntas de comparación y preguntas de aplicación si el contenido lo permite.
5) Organiza las tarjetas en tres bloques de reto progresivo:
   - bloque 1: recuerdo básico,
   - bloque 2: distinguir conceptos parecidos o detectar errores frecuentes,
   - bloque 3: aplicar el contenido a una situación concreta o ejemplo real.
6) Si el material lo permite, incluye al menos 3 tarjetas conectadas con una situación cotidiana, un caso real o una decisión práctica.

Al final:
- Agrupa las tarjetas en esenciales y ampliación.
- Señala 5 tarjetas especialmente útiles para repaso de último minuto.
- Añade una mini guía de uso: cómo repasarlas en una tanda corta y cómo saber qué tarjetas necesito repetir más.
- Cierra con 3 preguntas de metacognición: qué recuerdo bien, qué confundo todavía y qué tipo de tarjeta me cuesta más.
```

## Ajustes rápidos
- Añade: `incluye una columna extra con mnemotecnia o pista visual`.
- Para imprimir, pide: `devuélvelo en tabla con columnas anverso y reverso`.
