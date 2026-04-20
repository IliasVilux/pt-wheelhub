# PT Wheel Hub

Prueba técnica frontend para Wheel Hub. SPA de gestión de usuarios con listado, filtros, paginación, detalle, creación y edición.

## Stack

- **Vue 3** (`<script setup>` + Composition API) + **TypeScript**
- **Vite** como bundler
- **Tailwind CSS v4** + **shadcn-vue** para UI
- **Vue Router** para navegación
- **vee-validate** + **zod** para validación de formularios
- **json-server** como mock API
- **Docker** + **docker-compose** para ejecución

## Funcionalidades

- Listado de usuarios con tabla paginada
- Filtros por nombre, email y rol (sincronizados con la URL → al volver del detalle se mantienen filtros y página)
- Detalle de usuario con botón "Volver"
- Creación y edición de usuarios con validación en la parte del cliente
- Validación desde el servidor para emails duplicados (409 → error bajo el campo)
- Layout con sidebar + header, responsive (sidebar colapsable en móvil)

## Cómo ejecutarlo

### Con Docker (recomendado)

```bash
docker compose up --build
```

- App: http://localhost:8080
- API: http://localhost:3001

### En local

Requiere Node 20+ y pnpm.

```bash
pnpm install
pnpm api       # levanta el mock API en :3001
pnpm dev       # levanta la app en :5173
```

## Estructura

```
src/
├── components/      # UI (Sidebar, Header, UserForm, UserTable, etc.)
├── composables/     # useUsers, useUser, useQueryFilters, useDebounce
├── layouts/         # AppLayout (sidebar + header + outlet)
├── pages/           # UsersList, UserDetail, UserCreate, UserEdit
├── router/          # definición de rutas
├── schemas/         # esquemas zod de validación
├── services/        # users.api.ts (fetch al mock)
└── types/           # tipos TypeScript
mock/
├── db.json          # 50 usuarios seed
└── server.cjs       # middleware para rechazar emails duplicados (409)
```
