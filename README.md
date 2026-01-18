# Lynkio

**Lynkio** es un moderno acortador de URL y generador de códigos QR desarrollado con **Next.js**, **Tailwind CSS** y **Supabase**. Permite a los usuarios acortar enlaces rápidamente, copiarlos y generar códigos QR personalizables, todo con una interfaz clara y responsiva.

---

## Características

- Acorta URLs al instante.
- Copia enlaces acortados al portapapeles con un solo clic.
- Genera códigos QR para cualquier URL.
- Personaliza códigos QR con colores.
- Compatible con temas claros/oscuros.
- Diseño responsivo para dispositivos móviles y de escritorio.
- Backend simple con tecnología de Supabase (PostgreSQL).

---

## Pila tecnológica

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Supabase
- **Pruebas:** Playwright para pruebas integrales
- **Implementación:** Vercel

---

## Primeros pasos

### Requisitos

- Node.js (se recomienda LTS)
- pnpm

### Instalación

```bash
git clone https://github.com/yourusername/lynkio.git
cd lynkio
pnpm install
```

### Ejecución local

```bash
pnpm dev
```

- Visita http://localhost:3000 en tu navegador.

### Ejecución de pruebas

- Se incluyen las pruebas de Playwright:

```bash
pnpm exec playwright test
```

## Variables de entorno

- Cree un archivo .env en la raíz del proyecto con las siguientes variables:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```
