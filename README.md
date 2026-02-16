# Biblioteca de prompts educativos con IA

Repositorio para familias y alumnado con plantillas de prompts organizadas por fase del aprendizaje.

## Objetivo

- Inspirar qué se puede hacer con IA en distintas situaciones de aprendizaje.
- Ofrecer prompts como plantillas reutilizables y personalizables.
- Mantener contenido editable, modular y escalable.

## Estructura
- `content/phases.json`: configuración de fases y qué ejemplos se muestran en cada una.
- `content/examples/index.json`: catálogo de ejemplos (`title`, `summary`, `image`, `file`).
- `content/examples/*.md`: un ejemplo por archivo.
- `app/`: aplicación web interactiva para explorar, editar y copiar plantillas.

## Cómo ejecutar la app
La app usa `fetch`, por lo que hay que servirla con un servidor local (no abrir solo el archivo).

```bash
cd /Users/ral97612/workspace/biblioteca-de-prompts-para-estudiar-con-ia
python3 -m http.server 8000
```

Luego abre `http://localhost:8000/app/`.

## Flujo de uso
1. Selecciona una fase del aprendizaje.
2. Elige una tarjeta visual (imagen + título + resumen breve).
3. Abre el detalle en pestañas: `Resumen`, `Plantilla`, `Ajustes`.
4. Edita la plantilla en la pestaña `Plantilla`.
5. Copia y pega en tu IA favorita.

## Imágenes en tarjetas
Si quieres usar imágenes generadas por IA en cada tarjeta:
1. Guarda la imagen en el repositorio (por ejemplo: `app/assets/cards/mi-ejemplo.jpg`).
2. Añade esa ruta en el campo `image` del ejemplo en `content/examples/index.json`.
3. Si `image` está vacío, la app usa un fondo visual por defecto.

## Formato estándar de cada ejemplo
Cada fichero Markdown sigue este patrón:
- `# Título`
- `## Cuándo usarlo`
- `## Qué consigues`
- `## Prompt plantilla` (bloque ` ```text `)
- `## Ajustes rápidos`

En `content/examples/index.json`, cada ejemplo puede incluir además:
- `status: "under-construction"` para mostrar la tarjeta en gris con el chip `En construcción` y sin abrir detalle.

## Añadir un ejemplo nuevo
1. Crea el archivo en `content/examples/nuevo-ejemplo.md` con el formato estándar.
2. Regístralo en `content/examples/index.json` con `id`, `title` y `file`.
3. Añade su `id` en una o varias fases dentro de `content/phases.json`.

Si todavía no está terminado, puedes registrarlo sin `file` y con:
```json
{
  "id": "nuevo-ejemplo",
  "title": "Nuevo ejemplo",
  "summary": "Descripción breve",
  "status": "under-construction"
}
```

## Reutilizar un ejemplo en varias fases
`content/phases.json` permite repetir el mismo `id` en distintas fases.

Ejemplo:
```json
{
  "id": "comprender",
  "examples": ["resumeme-esto", "cambiar-formato"]
}
```

## Sugerencias editoriales
- Mantén variables consistentes: `[TEMA]`, `[EDAD/NIVEL]`, `[CURSO]`, `[OBJETIVO]`, `[CONTEXTO]`.
- Evita prompts cerrados y prioriza plantillas adaptables.
- Mantén texto claro, accionable y orientado a uso práctico.

## Publicar en GitHub Pages
El repositorio ya incluye un workflow en `.github/workflows/pages.yml` para desplegar automáticamente al hacer push a `main`.

Pasos:
1. Haz commit y push de los cambios.
2. En GitHub, ve a `Settings > Pages`.
3. En `Build and deployment`, deja seleccionado `Source: GitHub Actions`.
4. Espera a que termine el workflow `Deploy to GitHub Pages` en la pestaña `Actions`.

URL de publicación para este repo:
- `https://hhkaos.github.io/biblioteca-de-prompts-para-estudiar-con-ia/app/`
