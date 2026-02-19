# Guía de contribución

Para añadir un prompt nuevo (registro en JSON, estructura de secciones, despliegue), consulta el [README](README.md). Este fichero se centra en lo que el README no cubre: **el frontmatter YAML** que alimenta el modo guiado de la app.

---

## Frontmatter del wizard

Cada fichero `.md` puede incluir un bloque YAML al principio, entre delimitadores `---`. Si existe, la app muestra automáticamente un formulario ("modo guiado") que rellena los placeholders de la plantilla en tiempo real. Si no existe, el prompt funciona exactamente igual que antes.

```
archivo .md
│
├── bloque YAML (opcional)  ←── define los campos del wizard
│     ---
│     wizard:
│       fields: [...]
│     ---
│
└── markdown del prompt     ←── secciones habituales (# Título, ## Cuándo usarlo, ...)
```

---

### Estructura mínima

```yaml
---
wizard:
  fields:
    - key: TEMA
      label: Tema de aprendizaje
      type: text
      placeholder: Ej. La célula, la Revolución Francesa...
---
```

Cada elemento de `fields` genera un input en el formulario. Cuando el usuario lo rellena, el texto `[TEMA]` del template se sustituye por el valor introducido.

---

### Propiedades de un campo

| Propiedad     | Obligatoria | Descripción |
|---------------|-------------|-------------|
| `key`         | Sí          | Texto exacto del placeholder en el template, sin corchetes |
| `label`       | Sí          | Etiqueta visible en el formulario |
| `type`        | Sí          | Tipo de input (ver sección siguiente) |
| `hint`        | No          | Texto de ayuda pequeño bajo el input |
| `placeholder` | No          | Texto de ejemplo dentro del input (solo `text` y `textarea`) |
| `options`     | Solo radio/select/checkbox | Lista de opciones disponibles |

---

### Tipos de campo

#### `text` — Texto libre en una línea

Para placeholders simples como `[TEMA]` o `[CURSO]`.

```yaml
- key: TEMA
  label: Tema de aprendizaje
  hint: El tema concreto que quieres estudiar
  type: text
  placeholder: Ej. La fotosíntesis, los números complejos...
```

#### `textarea` — Texto libre multilínea

Para placeholders de entrada larga, como pegar apuntes o enunciados.

```yaml
- key: PEGA AQUÍ EL EJERCICIO O PROBLEMA
  label: El ejercicio o problema
  hint: Copia el enunciado completo del ejercicio
  type: textarea
  placeholder: Ej. Un tren parte de la estación A a 120 km/h...
```

> El `key` debe ser el texto exacto del placeholder, incluyendo espacios y tildes.

#### `radio` — Una opción entre varias (2–4 opciones)

Para placeholders del tipo `[BAJOS/MEDIOS/ALTOS]`. La opción seleccionada sustituye al placeholder completo.

```yaml
- key: BAJOS/MEDIOS/ALTOS
  label: Conocimientos previos
  type: radio
  options:
    - value: BAJOS
      label: "Bajos — poca o ninguna base"
    - value: MEDIOS
      label: "Medios — algunos conceptos"
    - value: ALTOS
      label: "Altos — buena base"
```

#### `select` — Una opción entre varias (5 o más opciones)

Igual que `radio` pero se presenta como desplegable. Útil cuando hay muchas opciones.

```yaml
- key: ESQUEMA/TABLA/LISTA/PASOS/PREGUNTAS_Y_RESPUESTAS/CRONOLOGIA
  label: Nuevo formato deseado
  type: select
  options:
    - value: ESQUEMA
      label: Esquema jerárquico
    - value: TABLA
      label: Tabla comparativa
    - value: LISTA
      label: Lista de puntos
    - value: PASOS
      label: Pasos secuenciales
    - value: PREGUNTAS_Y_RESPUESTAS
      label: Preguntas y respuestas
    - value: CRONOLOGIA
      label: Cronología / línea del tiempo
```

#### `checkbox` — Varias opciones seleccionables

Para placeholders donde el usuario puede elegir varias cosas a la vez. Los valores marcados se unen con `/` al sustituir el placeholder.

```yaml
- key: VISUAL/PRACTICO/VERBAL/MIXTO
  label: Estilo de aprendizaje
  type: checkbox
  options:
    - value: VISUAL
      label: Visual
    - value: PRACTICO
      label: Práctico
    - value: VERBAL
      label: Verbal
    - value: MIXTO
      label: Mixto
```

---

### Cómo se resuelven los placeholders

El `key` de cada campo debe coincidir **exactamente** con el texto entre corchetes en la plantilla:

| Placeholder en el template          | `key` en el frontmatter               |
|--------------------------------------|---------------------------------------|
| `[TEMA]`                             | `TEMA`                                |
| `[BAJOS/MEDIOS/ALTOS]`              | `BAJOS/MEDIOS/ALTOS`                  |
| `[PEGA AQUÍ EL CONTENIDO]`          | `PEGA AQUÍ EL CONTENIDO`              |
| `[MAPA_MENTAL/DIAGRAMA_DE_FLUJO]`   | `MAPA_MENTAL/DIAGRAMA_DE_FLUJO`       |

La sustitución es sensible a mayúsculas/minúsculas. Si el `key` no coincide exactamente con el placeholder, el campo se mostrará en el formulario pero no sustituirá nada.

---

### Reglas del parser YAML

La app usa un parser propio (sin dependencias externas) que soporta el subconjunto de YAML necesario para este esquema. Hay que respetar estas restricciones:

- **Solo 2 espacios de sangría** por nivel. No uses tabuladores.
- **Niveles fijos**: la estructura tiene exactamente 5 niveles de sangría (0 → 2 → 4 → 6 → 8 → 10 espacios). No añadas niveles intermedios.
- **Strings con caracteres especiales** (`:`, `—`, `"`, `#`) deben ir entre comillas dobles: `label: "Bajos — sin base"`.
- **Comentarios** (`# texto`) son válidos en cualquier línea.
- El bloque debe empezar en la **primera línea del fichero** con `---`.

---

### Ejemplo completo

Este es el frontmatter de `cambiar-formato.md`, que ilustra los tipos principales:

```yaml
---
wizard:
  fields:
    - key: RECURSO
      label: Recurso a transformar
      hint: El material cuyo formato quieres cambiar
      type: text
      placeholder: Ej. mis apuntes del tema 4, un artículo...

    - key: TEMA
      label: Tema del contenido
      type: text
      placeholder: Ej. la fotosíntesis, los números decimales...

    - key: BAJOS/MEDIOS/ALTOS
      label: Conocimientos previos
      type: radio
      options:
        - value: BAJOS
          label: Bajos — sin base previa
        - value: MEDIOS
          label: Medios — algunos conceptos
        - value: ALTOS
          label: Altos — buena base

    - key: ESQUEMA/TABLA/LISTA/PASOS/PREGUNTAS_Y_RESPUESTAS/CRONOLOGIA
      label: Nuevo formato deseado
      hint: Cómo quieres que quede organizado el contenido
      type: select
      options:
        - value: ESQUEMA
          label: Esquema jerárquico
        - value: TABLA
          label: Tabla comparativa
        - value: LISTA
          label: Lista de puntos
        - value: PASOS
          label: Pasos secuenciales
        - value: PREGUNTAS_Y_RESPUESTAS
          label: Preguntas y respuestas
        - value: CRONOLOGIA
          label: Cronología / línea del tiempo

    - key: PROBLEMA_CON_FORMATO_ACTUAL
      label: ¿Por qué no te sirve el formato actual?
      hint: El problema concreto que quieres resolver con el cambio de formato
      type: text
      placeholder: Ej. es demasiado denso para leer...
---
```

---

### Checklist para añadir el wizard a un prompt

1. Identifica todos los placeholders `[...]` en la plantilla.
2. Para cada placeholder, decide el tipo de campo apropiado:
   - Texto libre → `text` o `textarea` (usa `textarea` si el contenido puede ser largo)
   - Opciones mutuamente excluyentes (≤4) → `radio`
   - Opciones mutuamente excluyentes (>4) → `select`
   - Varias opciones a la vez → `checkbox`
3. Asegúrate de que el `key` de cada campo coincide exactamente con el placeholder.
4. Usa `hint` cuando el campo necesite aclaración adicional.
5. Verifica la sangría: exactamente 2 espacios por nivel, sin tabuladores.
