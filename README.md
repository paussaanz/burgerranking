# BurgerRank Madrid

Ranking de hamburgueserías madrileñas con CMS headless. Stack: **Astro 4 + React + Decap CMS + Netlify**.

---

## Setup local

```bash
npm install
npm run dev      # → http://localhost:4321
npm run build    # build estático en /dist
npm run preview  # previsualiza el build
```

---

## Estructura de contenido

Cada hamburguesería es un archivo `.md` en `src/content/burgers/`. El nombre del archivo determina la URL:

```
src/content/burgers/la-mancha-burger.md  →  /burger/la-mancha-burger
```

### Campos del frontmatter

| Campo | Tipo | Descripción |
|---|---|---|
| `nombre` | string | Nombre del local |
| `descripcion` | string | Descripción corta |
| `direccion` | string | Dirección completa |
| `barrio` | string | Barrio de Madrid |
| `precio_rango` | `€` / `€€` / `€€€` | Rango de precio |
| `web` | string (URL, opcional) | Web oficial |
| `instagram` | string (opcional) | Handle de Instagram |
| `foto_portada` | string | Ruta a imagen en `/public/images/burgers/` |
| `fotos_galeria` | array (opcional) | Lista de rutas de fotos |
| `rating_general` | número 0–10 | Rating principal |
| `rating_carne` | número 0–10 | Rating de la carne |
| `rating_pan` | número 0–10 | Rating del pan |
| `rating_salsa` | número 0–10 | Rating de la salsa |
| `rating_precio_calidad` | número 0–10 | Relación precio/calidad |
| `rating_ambiente` | número 0–10 | Ambiente del local |
| `hamburguesa_estrella` | string | Descripción del plato estrella |
| `fecha_visita` | fecha `YYYY-MM-DD` | Fecha de la visita |
| `tags` | array | Etiquetas (smash burger, terraza...) |

---

## Añadir una hamburguesería manualmente

1. Crea un archivo `.md` en `src/content/burgers/` con el nombre-slug del local
2. Añade el frontmatter completo (ver campos arriba)
3. Escribe la reseña en el cuerpo del archivo en Markdown
4. Añade las fotos en `public/images/burgers/`
5. Haz commit y push — Netlify desplegará automáticamente

---

## Decap CMS — Panel de administración

El panel CMS está en `/admin/` (solo disponible en producción con Netlify Identity activado).

### Conectar Decap CMS con Netlify Identity

1. **En Netlify Dashboard** → tu sitio → *Identity* → **Enable Identity**
2. Activa **Git Gateway**: Identity → *Services* → **Enable Git Gateway**
3. En Identity → *Registration* → pon en **Invite only** para seguridad
4. Invítate a ti mismo: Identity → *Invite users* → tu email
5. Accede a `https://tu-sitio.netlify.app/admin/` y completa el registro con el enlace del email

### Flujo del CMS

1. El editor entra en `/admin/` e inicia sesión con Netlify Identity
2. Crea o edita hamburgueserías desde la interfaz visual
3. Al guardar, Decap CMS hace commit directo al repositorio de Git
4. Netlify detecta el nuevo commit y redespliega automáticamente (~1 min)

---

## Deploy en Netlify

1. Sube el repositorio a GitHub/GitLab
2. Conecta el repositorio en [Netlify](https://netlify.com)
3. Netlify detecta `netlify.toml` automáticamente
4. Configura Netlify Identity como se describe arriba
5. ¡Listo!

---

## Paleta de colores

| Variable | Valor | Uso |
|---|---|---|
| `--color-bg` | `#1a0a00` | Fondo principal |
| `--color-accent` | `#ff3c00` | Rojo-naranja — acento principal |
| `--color-accent-alt` | `#ffd600` | Amarillo mostaza — acento secundario |
| `--color-text` | `#f5f0e8` | Texto principal |
| `--color-text-muted` | `#a89880` | Texto secundario |
