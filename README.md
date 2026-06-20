# Dervis Gómez - Portfolio

Portfolio personal de **Dervis Gómez**, Full Stack Developer con más de 9 años de experiencia construyendo productos web, aplicaciones móviles y plataformas empresariales para compañías en Latinoamérica.

El proyecto está pensado como una pieza técnica y profesional para reclutadores: no solo muestra una interfaz visual, también presenta case studies reales, responsabilidades, impacto de negocio, stack usado y experiencia profesional de forma clara.

## Demo

- Español: `/`
- Inglés: `/en`
- Producción: <https://dervisgomez.dev>

## Qué Demuestra

- Arquitectura con **Next.js App Router** y rutas localizadas.
- Internacionalización completa con **next-intl**.
- UI responsive con **Tailwind CSS v4**, tokens CSS y componentes reutilizables.
- Tema claro, oscuro y sistema.
- Case studies con información estructurada: rol, stack, responsabilidades, plataformas, enlaces y resultados.
- Separación entre contenido traducible, metadata técnica y componentes visuales.
- Accesibilidad base: skip link, foco visible, navegación por anclas y respeto por `prefers-reduced-motion`.

## Stack

| Área | Tecnologías |
| --- | --- |
| Framework | Next.js 16, App Router |
| Lenguaje | TypeScript |
| UI | React 19, shadcn/ui, Radix UI, Lucide Icons |
| Estilos | Tailwind CSS v4, CSS custom properties |
| Animaciones | Framer Motion |
| i18n | next-intl |
| Tema | next-themes |
| Calidad | ESLint, TypeScript strict |

## Inicio Rápido

### Requisitos

- Node.js 20+
- npm 10+

### Instalación

```bash
git clone <url-del-repositorio>
cd dervis-portfolio
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### Producción

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Arquitectura

El contenido del portfolio está dividido para que sea fácil mantenerlo y extenderlo:

- `messages/es.json` y `messages/en.json`: textos traducibles de la interfaz.
- `lib/data.ts`: metadata técnica y estructural de proyectos, experiencia, enlaces, métricas y stack.
- `components/sections`: secciones principales del sitio como hero, proyectos, experiencia, stack y contacto.
- `components/shared`: componentes transversales para animación, headings, contadores y navegación.
- `components/ui`: componentes base reutilizables.
- `i18n`: configuración de rutas, navegación localizada y request config de `next-intl`.
- `app/[locale]`: layout y página principal localizada.

Esta separación permite actualizar proyectos o traducciones sin mezclar copy, metadata y presentación en el mismo archivo.

## Estructura del proyecto

```txt
dervis-portfolio/
├── app/
│   ├── [locale]/
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── layout/
│   ├── sections/
│   ├── shared/
│   └── ui/
├── hooks/
├── i18n/
├── lib/
├── messages/
├── public/
├── middleware.ts
├── next.config.ts
└── package.json
```

## Internacionalización

El sitio soporta dos idiomas:

| Locale | Ruta | Descripción |
| --- | --- | --- |
| `es` | `/` | Idioma por defecto |
| `en` | `/en` | Versión en inglés |

Para agregar o editar contenido:

1. Actualiza las claves correspondientes en `messages/es.json`.
2. Replica la misma estructura en `messages/en.json`.
3. Si el contenido corresponde a proyectos, revisa también `lib/data.ts`.

Los títulos pueden usar `<highlight>` en los archivos JSON. El renderizado enriquecido vive en `lib/design-system.tsx`.

## Proyectos Y Casos

Los proyectos se configuran principalmente en `lib/data.ts`:

- `primaryProductIds`: proyectos principales con mayor protagonismo.
- `secondaryProductIds`: proyectos adicionales mostrados en la sección expandible.
- `productMeta`: metadata de cada proyecto, incluyendo imagen, URL, stack, plataformas, estado y responsabilidades.

El contenido narrativo de cada proyecto vive en `messages/{locale}.json`, dentro de `projects.items`.

Para agregar un nuevo proyecto:

1. Agrega el identificador en `featuredProductIds`.
2. Define su metadata en `productMeta`.
3. Decide si aparece en `primaryProductIds` o `secondaryProductIds`.
4. Agrega sus traducciones en `messages/es.json` y `messages/en.json`.
5. Opcionalmente, agrega una imagen en `public/`.

## Assets Requeridos

Antes de publicar, verifica que estos archivos existan en `public/`:

| Archivo | Uso |
| --- | --- |
| `Profile.png` | Foto de perfil usada en hero y header |
| `hero.png` | Imagen principal de escritorio |
| `hero-movil.png` | Imagen principal de móvil |
| `CV.pdf` | Descarga de currículum |
| `veyco.png`, `enaex.png`, etc. | Screenshots de proyectos |

Si `CV.pdf` no está presente, el botón de descarga del currículum apuntará a un archivo inexistente.

## Calidad Previa

Ejecuta al menos:

```bash
npm run lint
npm run build
```

También es recomendable agregar un script de typecheck:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit"
  }
}
```

Para un repositorio público orientado a reclutadores, una GitHub Action con `npm ci`, `npm run lint`, `npm run typecheck` y `npm run build` ayuda a mostrar disciplina técnica.

## Despliegue

El proyecto está preparado para desplegarse en [Vercel](https://vercel.com). Incluye `vercel.json` con `framework: nextjs` para evitar detección incorrecta del framework.

Configuración recomendada:

| Setting | Valor |
| --- | --- |
| Framework Preset | Next.js |
| Root Directory | `.` |
| Build Command | `npm run build` |
| Output Directory | Dejar vacío |
| Install Command | `npm install` |

No requiere variables de entorno para funcionar en su versión base.

## Notas Técnicas

- El build puede requerir acceso a Google Fonts si se usan fuentes desde `next/font/google`.
- Las imágenes grandes en `public/` pueden optimizarse a WebP o AVIF para mejorar Lighthouse.
- Si Next.js marca `middleware.ts` como deprecado, revisar la migración a la convención vigente de Next.js y `next-intl`.

## Autor

**Dervis Gómez** - Full Stack Developer

- LinkedIn: <https://linkedin.com/in/dervisgomez>
- GitHub: <https://github.com/dervisgomez>
- Email: <mailto:dervisgomez77@gmail.com>

## Licencia

Código publicado con fines de presentación profesional. Todos los derechos reservados, salvo que se indique otra licencia.
