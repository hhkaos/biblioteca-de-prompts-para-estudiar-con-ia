# AGENTS.md

Guía para agentes que colaboren en este repositorio, especialmente al completar prompts marcados como `under-construction`.

## Objetivo del repositorio

Este proyecto es una biblioteca de prompts educativos con IA organizada por fases del aprendizaje. La app web consume contenido desde:

- `content/phases.json`: define las fases y qué ejemplos aparecen en cada una.
- `content/examples/index.json`: catálogo de ejemplos.
- `content/examples/*.md`: contenido real de cada prompt.

La meta al trabajar aquí no es solo “escribir un prompt”, sino crear una ficha reutilizable, clara y publicable dentro de la app.

## Fuentes de verdad

Antes de editar, toma estas referencias como norma:

- `README.md`: estructura del repositorio y formato base de cada ejemplo.
- `CONTRIBUTING.md`: reglas del frontmatter YAML para el wizard guiado.
- `SPEC.md`: comportamiento esperado de la app.
- `app/script.js`: la app extrae la plantilla desde la sección `## Prompt plantilla` y los ajustes desde `## Ajustes rápidos`.

## Qué significa completar un prompt

Un ejemplo deja de estar “en construcción” cuando:

1. Existe un archivo Markdown en `content/examples/<slug>.md`.
2. El archivo sigue la estructura estándar del proyecto.
3. El ejemplo tiene frontmatter `wizard` útil y coherente con los placeholders del prompt.
4. `content/examples/index.json` incluye `file`.
5. Se elimina `status: "under-construction"` del ejemplo.
6. El `id` del ejemplo sigue presente en las fases adecuadas dentro de `content/phases.json`.

## Flujo recomendado para completar un ejemplo

1. Localiza el ejemplo en `content/examples/index.json`.
2. Conserva su `id`, `title`, `summary` e `image` salvo que haya un motivo claro para cambiarlos.
3. Crea `content/examples/<id>.md`, salvo que el `file` deba usar otro nombre por compatibilidad ya existente.
4. Redacta el Markdown con este orden exacto:
   - `# Título`
   - `## Cuándo usarlo`
   - `## Qué consigues`
   - `## Prompt plantilla`
   - `## Ajustes rápidos`
5. Añade un bloque YAML inicial `wizard` si el prompt tiene placeholders.
6. Comprueba que cada placeholder entre corchetes del prompt tiene un `key` equivalente en el wizard.
7. Actualiza `content/examples/index.json`:
   - añade `file`
   - elimina `status: "under-construction"`
8. Verifica que el ejemplo aparece en la fase correcta o corrige `content/phases.json` si hace falta.

## Estructura estándar de cada prompt

Todos los ejemplos publicados deben parecerse a los ya terminados:

### 1. Título

- Debe ser claro y orientado a la acción.
- Puede coincidir con `title` del JSON o ser una variante muy cercana.

### 2. Cuándo usarlo

- 1 párrafo breve.
- Explica la situación concreta en la que ayuda.
- Debe distinguir bien este prompt de otros similares.

### 3. Qué consigues

- Lista corta de resultados prácticos.
- Prioriza beneficios observables para alumnado o familias.

### 4. Prompt plantilla

- Debe ir dentro de un bloque:

```text
...
```

- Usa placeholders reutilizables con corchetes, por ejemplo:
  - `[TEMA]`
  - `[EDAD/NIVEL]`
  - `[CURSO]`
  - `[OBJETIVO]`
  - `[CONTEXTO]`
- El prompt debe pedir salidas concretas, no solo “explica esto”.
- Es preferible pedir estructura, criterios, límites y formato de salida.

### 5. Ajustes rápidos

- Añade 2 o 3 ajustes breves que el usuario pueda pegar o adaptar.
- Deben ampliar el uso del prompt sin complicarlo.

## Estándar editorial

Al escribir nuevos prompts:

- Usa español claro, práctico y no academicista.
- Prioriza plantillas adaptables frente a prompts demasiado cerrados.
- Piensa en alumnado, familias y uso real en estudio autónomo.
- Evita pedir a la IA que “invente” cuando el caso requiere fidelidad al contenido.
- Pide comprobaciones, límites o criterios cuando ayuden a evitar respuestas vagas.
- Cuando tenga sentido, ofrece modos alternativos dentro del mismo prompt.

## Estándar del wizard

El wizard es opcional a nivel técnico, pero recomendado para ejemplos nuevos o completados.

Reglas importantes:

- El bloque YAML debe empezar en la primera línea del archivo con `---`.
- Usa exactamente 2 espacios por nivel.
- No uses tabuladores.
- El `key` debe coincidir exactamente con el placeholder sin corchetes.
- Si el placeholder es largo, el `key` también debe serlo exactamente.

Tipos de campo recomendados:

- `text`: una sola línea.
- `textarea`: contenido largo que el usuario pegará.
- `radio`: 2 a 4 opciones excluyentes.
- `select`: 5 o más opciones excluyentes.
- `checkbox`: varias opciones a la vez.

Heurísticas útiles:

- Usa `textarea` para ejercicios, textos, apuntes o producciones del alumno.
- Usa `radio` para niveles como `BAJOS/MEDIOS/ALTOS`.
- Usa `select` cuando el placeholder agrupe muchos formatos posibles.
- Añade `hint` cuando el campo pueda generar dudas.

## Convenciones de placeholders

Mantén consistencia con los prompts ya existentes. Reutiliza, cuando encajen:

- `[TEMA]`
- `[EDAD/NIVEL]`
- `[CURSO]`
- `[ASIGNATURA]`
- `[CONTEXTO]`
- `[OBJETIVO]`
- `[BAJOS/MEDIOS/ALTOS]`

Evita crear placeholders casi duplicados si uno ya cubre el caso.

## Criterios de calidad para prompts nuevos

Un buen prompt de este repo suele cumplir esto:

- Se entiende rápido leyendo solo el título y el resumen.
- Resuelve una necesidad concreta de aprendizaje.
- Incluye suficiente contexto para que la IA responda mejor.
- Pide un formato de salida útil para estudiar.
- Puede personalizarse sin reescribirlo entero.
- Tiene ajustes rápidos que extienden su utilidad.

Señales de que el prompt aún no está listo:

- Es demasiado genérico.
- Se solapa mucho con un prompt ya existente.
- Tiene placeholders sin wizard equivalente.
- Pide una salida atractiva pero poco usable para estudiar.
- No deja claro qué debe hacer la IA exactamente.

## Cómo trabajar con prompts `under-construction`

Actualmente los pendientes están concentrados en estas fases:

- `memorizar`
- `reflexionar`
- `evaluar`
- `explorar`

Al completarlos, intenta que cada grupo tenga variedad real y no repita fórmulas:

- `memorizar`: técnicas distintas entre sí, no cinco variantes casi iguales.
- `reflexionar`: fomentar pensamiento crítico, contraste y revisión de supuestos.
- `evaluar`: comprobar comprensión, argumentación, autoevaluación o transferencia.
- `explorar`: abrir conexiones, proyectos o rutas nuevas de aprendizaje.

## Backlog actual

Ejemplos marcados como `under-construction` en `content/examples/index.json`:

- `crear-canciones-memorizar`
- `generar-tarjetas-estudio`
- `crear-reglas-mnemotecnicas`
- `crear-historias-memorizar`
- `crear-rimas-poemas-memorizar`
- `llevar-la-contraria`
- `preguntas-socraticas`
- `analisis-multidisciplinar`
- `provocador-de-dudas`
- `analizar-argumentacion-y-feedback`
- `crear-cuestionarios-autoevaluacion`
- `crear-rubricas-autoevaluacion`
- `encontrar-temas-relacionados`
- `buscar-ideas-nuevos-proyectos`

## Checklist antes de dar un ejemplo por terminado

- Existe el archivo `.md`.
- El frontmatter YAML es válido y usa la sangría correcta.
- Los `key` del wizard coinciden exactamente con los placeholders.
- El Markdown contiene `## Prompt plantilla`.
- El prompt está dentro de bloque ` ```text `.
- Existe `## Ajustes rápidos`.
- `content/examples/index.json` tiene `file`.
- El ejemplo ya no tiene `status: "under-construction"`.
- El tono y la estructura encajan con los prompts ya publicados.

## Criterio de edición

Cuando completes un prompt pendiente, cambia lo mínimo necesario fuera de su ficha:

- No renombres `id` sin una razón fuerte.
- No cambies fases si no mejora claramente la clasificación.
- No alteres prompts ya terminados salvo para mantener coherencia o corregir errores.

## Si tienes dudas entre varias soluciones

Prefiere la opción que:

- reutiliza convenciones ya presentes en el repositorio,
- simplifica la personalización por parte del usuario,
- mejora la utilidad educativa real,
- y evita comportamientos frágiles para el parser de la app.
