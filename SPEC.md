# SPEC - Prompts Estudio

## 1. Visión general

- **Nombre de la app**: Prompts Estudio.
- **Tipo**: aplicación web estática (frontend puro, sin backend propio).
- **Objetivo**: explorar y reutilizar plantillas de prompts educativos con IA, organizadas por fases del aprendizaje.
- **Público**: alumnado, familias y personas colaboradoras del contenido.
- **Idioma principal**: español (`lang: es`).

## 2. Alcance funcional

La app permite:

1. Navegar ejemplos por fase del aprendizaje.
2. Buscar ejemplos por texto (título y resumen) con coincidencia difusa.
3. Abrir detalle de ejemplo con:
   - Resumen de uso.
   - Plantilla editable.
   - Ajustes rápidos (si existen).
4. Copiar la plantilla al portapapeles.
5. Compartir sugerencias de mejora por email/redes/Telegram.
6. Abrir enlaces profundos mediante URL (`phase`, `example`, `tab`).
7. Instalar la app como PWA cuando el navegador lo permita.

No incluye:

- autenticación,
- persistencia de edición en servidor,
- base de datos,
- panel admin.

## 3. Arquitectura y stack

- **Arquitectura**: cliente estático.
- **Tecnologías**:
  - HTML (`app/index.html`)
  - CSS (`app/styles.css`)
  - JavaScript ES modules (`app/script.js`, `app/collab-config.js`)
  - Web App Manifest (`app/manifest.webmanifest`)
  - Service Worker (`app/service-worker.js`)
- **Dependencias externas en runtime**:
  - Google Fonts (Manrope, Space Grotesk)
  - Font Awesome vía CDN
- **Datos de contenido**:
  - `content/phases.json`
  - `content/examples/index.json`
  - `content/examples/*.md`

## 4. Estructura de datos

### 4.1 `content/phases.json`

Objeto raíz:

- `phases: Phase[]`

Modelo `Phase`:

- `id: string` (único)
- `name: string`
- `icon: string` (emoji u otro)
- `description: string`
- `examples: string[]` (lista de `example.id`)

Reglas:

- Un mismo ejemplo puede aparecer en varias fases.
- Si una fase referencia IDs inexistentes, se ignoran en render.

### 4.2 `content/examples/index.json`

Objeto raíz:

- `examples: Example[]`

Modelo `Example`:

- `id: string` (único)
- `title: string`
- `summary: string`
- `image?: string` (ruta relativa)
- `file?: string` (ruta markdown)
- `status?: string` (valor especial soportado: `under-construction`)

Reglas:

- Un ejemplo es **cargable** si tiene `file` y su `status` no es `under-construction`.
- Si `status` es `under-construction`, la tarjeta se muestra deshabilitada.

### 4.3 Markdown de ejemplo (`content/examples/*.md`)

Formato esperado:

- `# Título`
- `## Cuándo usarlo`
- `## Qué consigues`
- `## Prompt plantilla` (normalmente dentro de bloque ` ```text `)
- `## Ajustes rápidos`

Comportamiento de parseo:

- Si faltan secciones de resumen, se muestra `No definido.`
- La plantilla se extrae desde sección `Prompt plantilla`; si no existe, se usa el texto completo.
- Si la plantilla repetida aparece concatenada, se intenta colapsar automáticamente.

## 5. Estados actuales del contenido

- Fases: **7**
- Ejemplos totales: **34**
- Ejemplos cargables (con detalle): **20**
- Ejemplos en construcción: **14**

## 6. Flujos principales de usuario

### 6.1 Arranque

1. Carga concurrente de `phases.json` y `index.json`.
2. Render de filtros de fase:
   - radio chips (desktop)
   - select (mobile)
3. Aplicación de estado inicial desde URL (`phase`, `example`, `tab`).

### 6.2 Filtrado por fase

- Seleccionar una fase filtra la galería y actualiza título/descripción.
- Pulsar de nuevo la fase activa en radios limpia el filtro (vuelve a “todas”).

### 6.3 Búsqueda

- Campo de búsqueda global por título/resumen.
- Normalización diacrítica (`á` = `a`) y minúsculas.
- Coincidencia difusa:
  - substring exacta prioritaria,
  - comparación por palabras,
  - similitud Levenshtein con umbral ~0.55.
- Ordenado de resultados:
  - ejemplos cargables primero,
  - mayor score después.
- Si no hay resultados: mensaje contextual y acción para quitar filtro de fase.
- Si hay más coincidencias fuera de la fase activa: aviso “Ver todas las fases”.

### 6.4 Apertura de ejemplo

1. Click en tarjeta cargable.
2. Fetch del markdown.
3. Render de cabecera + pestañas:
   - `Resumen`
   - `Plantilla`
4. Mostrar barra de colaboración.
5. Mostrar panel de detalle y desplazamiento suave al panel.

### 6.5 Edición y copia

- `textarea` editable para la plantilla.
- Botón “Copiar plantilla” usa Clipboard API.
- Feedback visual en éxito/error.

### 6.6 Navegación por URL (deep link)

Query params soportados:

- `phase=<id>`
- `example=<id>`
- `tab=summary|prompt`

Reglas:

- Si `tab` inválida, cae a `summary`.
- Si `example` no pertenece a la fase pedida, se intenta la primera fase que sí lo contenga.
- Si el ejemplo no es cargable, se limpia estado de detalle.
- Soporta navegación atrás/adelante (`popstate`).

## 7. UI/UX

### 7.1 Layout

- Hero superior con:
  - botón “Sobre la app”,
  - buscador,
  - filtros de fase.
- Galería principal de tarjetas en footer grande.
- Panel derecho de detalle ocultable.
- Modal “Sobre esta app”.

### 7.2 Tarjetas

- Tarjeta normal: imagen (si existe), título, resumen.
- Sin imagen: placeholder de texto.
- En construcción:
  - estado gris/deshabilitado,
  - chip “En construcción”.
- Siempre se añade una tarjeta especial de colaboración (“¿Echas en falta alguna?”).

### 7.3 Accesibilidad

- Uso de `aria-label`, `aria-live`, roles (`radiogroup`, `dialog`, etc.).
- Navegación por teclado con cierre de modal/tooltips por `Escape`.
- Feedback de copiado e instalación anunciado en zonas de estado.

## 8. Colaboración y canales de contacto

Configuración en `app/collab-config.js`:

- `email`
- `telegramUsername`
- `social.linkedin`
- `social.bluesky`
- `social.x`
- (`instagram` y `tiktok` se guardan en config, pero no tienen intent activo en UI)

Comportamiento:

- Email genera `mailto:` con asunto y cuerpo pre-rellenados.
- Redes generan enlaces de publicación para X, LinkedIn y Bluesky.
- Telegram abre mensaje precompuesto a `t.me/<usuario>`.
- Si falta configuración, se muestran estados informativos.

## 9. SEO y metadatos sociales

La app actualiza dinámicamente:

- `document.title`
- `meta[name=description]`
- `og:type`, `og:title`, `og:description`, `og:image`, `og:url`
- `twitter:title`, `twitter:description`, `twitter:image`, `twitter:card`

Criterio:

- Sin selección: metadatos globales.
- Con fase: metadatos de fase.
- Con ejemplo: metadatos de ejemplo.

## 10. PWA y offline

### 10.1 Manifest

- `display: standalone`
- iconos `192` y `512` (maskable)
- `start_url: ./index.html`

### 10.2 Instalación

- Gestión de `beforeinstallprompt` y `appinstalled`.
- Dos puntos de entrada: barra superior y modal “Sobre la app”.
- Persistencia local en `localStorage`:
  - `prompts-estudio.install-hello-dismissed`
  - `prompts-estudio.install-completed`

### 10.3 Service Worker

- Estrategia principal: `cache-first` para origen propio.
- Precarga de app shell y JSON base.
- Versionado de caché: `prompts-estudio-v2`.
- Limpieza de cachés antiguas en `activate`.
- Fallback en error de red a `./index.html`.

Limitación:

- Recursos de terceros (fuentes/CDN) no se cachean en este SW al filtrar por mismo origen.

## 11. Requisitos no funcionales

- La app debe servirse por HTTP/HTTPS (no abrir `file://`) por uso de `fetch`.
- Debe funcionar en navegadores modernos con soporte ES modules.
- Debe degradar de forma segura si fallan APIs opcionales (clipboard, SW, storage).
- Debe mantener tiempos de carga bajos al ser estática y sin build.

## 12. Despliegue

- Workflow: `.github/workflows/pages.yml`
- Evento: push a `main` (y manual `workflow_dispatch`).
- Estrategia: publicar el repositorio completo como artifact en GitHub Pages.

## 13. Convenciones editoriales del contenido

- Variables recomendadas en prompts: `[TEMA]`, `[EDAD/NIVEL]`, `[CURSO]`, `[OBJETIVO]`, `[CONTEXTO]`.
- Se priorizan plantillas adaptables frente a prompts cerrados.
- Se permite publicar ejemplos “en construcción” sin archivo markdown.

## 14. Criterios de aceptación funcional (resumen)

1. Se pueden cargar fases y ejemplos desde JSON sin build.
2. La búsqueda devuelve coincidencias útiles incluso con variaciones ortográficas simples.
3. Los ejemplos en construcción no abren detalle.
4. El detalle permite editar y copiar la plantilla.
5. La URL refleja fase/ejemplo/pestaña y permite recarga/deep link.
6. La app puede instalarse como PWA cuando el navegador lo soporta.
7. La app sigue siendo usable aunque fallen SW/clipboard/localStorage.
