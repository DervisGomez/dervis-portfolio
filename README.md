# Dervis Gómez — Portfolio

Portafolio personal de **Dervis Gómez**, Full Stack Developer con más de 9 años de experiencia construyendo productos web, móviles y plataformas empresariales para compañías en Latinoamérica.

Diseñado con enfoque minimalista y orientado a producto: case studies reales, métricas de trayectoria y experiencia profesional presentada con claridad.

## Características

- **Case studies premium** — Proyectos destacados con screenshot, impacto de negocio, rol, responsabilidades y stack tecnológico
- **Internacionalización** — Español (por defecto) e inglés con [next-intl](https://next-intl.dev)
- **Tema claro / oscuro / sistema** — Soporte completo con `next-themes`
- **Design system** — Tokens CSS, acento `#2563EB` y componentes reutilizables
- **Responsive & accesible** — Skip link, focus visible, `prefers-reduced-motion`, navegación por anclas
- **Optimizado para producción** — SSG con App Router, TypeScript estricto y ESLint

## Stack tecnológico

| Área | Tecnologías |
|------|-------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 |
| UI | shadcn/ui, Radix UI, Lucide Icons |
| Animaciones | Framer Motion |
| i18n | next-intl |
| Fuentes | Inter, Geist Mono |

## Inicio rápido

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

Abre [http://localhost:3000](http://localhost:3000) — español en `/`, inglés en `/en`.

### Producción

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Estructura del proyecto

```
dervis-portfolio/
├── app/
│   ├── [locale]/          # Rutas localizadas (es, en)
│   ├── globals.css        # Tokens, utilidades y design system
│   └── layout.tsx         # Fuentes globales
├── components/
│   ├── layout/            # Header, footer, theme & language switchers
│   ├── sections/          # Hero, proyectos, experiencia, contacto…
│   ├── shared/            # SectionHeader, FadeIn, AnimatedCounter…
│   └── ui/                # Button, Badge, Card (shadcn)
├── hooks/                 # useActiveSection
├── i18n/                  # Routing, navegación y request config
├── lib/
│   ├── data.ts            # Proyectos, métricas, navegación
│   └── design-system.tsx  # Tokens y helpers i18n (richHighlight)
├── messages/
│   ├── es.json            # Traducciones español
│   └── en.json            # Traducciones inglés
├── public/                # Assets estáticos
└── middleware.ts          # Locale detection (next-intl)
```

## Assets en `public/`

Coloca estos archivos antes de desplegar:

| Archivo | Uso |
|---------|-----|
| `Profile.png` | Foto de perfil (hero) |
| `CV.pdf` | Descarga de currículum |
| `veyco.png` | Screenshot VE&CO |
| `enaex.png` | Screenshot Espíritu Enaex |

## Internacionalización

- **Español:** `/` (locale por defecto)
- **Inglés:** `/en`

Las traducciones viven en `messages/`. Para resaltar palabras en títulos, usa la etiqueta `<highlight>` en los JSON y el helper `richHighlight` de `lib/design-system.tsx`.

## Proyectos destacados

Los case studies principales se configuran en `lib/data.ts` (`primaryProductIds`, `productMeta`) y su contenido en `messages/{locale}.json` bajo `projects.items`.

Para añadir un proyecto:

1. Agrega el `id` en `featuredProductIds` y `productMeta`
2. Completa las traducciones en `es.json` y `en.json`
3. Opcional: añade screenshot en `public/`

## Despliegue

Compatible con [Vercel](https://vercel.com). El proyecto incluye `vercel.json` con **framework: nextjs** para evitar detección incorrecta como Remix.

```bash
npm run build
```

### Vercel — configuración recomendada

| Setting | Valor |
|---------|--------|
| Framework Preset | **Next.js** |
| Root Directory | `.` (raíz del repo) |
| Build Command | `npm run build` |
| Output Directory | *(dejar vacío — Next.js lo gestiona)* |
| Install Command | `npm install` |

Si aparece el error `Failed to resolve "@remix-run/dev"`, el preset está en **Remix** por error. Cámbialo a **Next.js** en *Project Settings → General → Framework Preset* y redeploy.

No instales `@remix-run/dev`: este proyecto no usa Remix.

No requiere variables de entorno para funcionamiento básico.

## Autor

**Dervis Gómez** — Full Stack Developer

- [LinkedIn](https://linkedin.com/in/dervisgomez)
- [GitHub](https://github.com/dervisgomez)
- [Email](mailto:dervis@appi.cl)

## Licencia

Proyecto privado. Todos los derechos reservados.
