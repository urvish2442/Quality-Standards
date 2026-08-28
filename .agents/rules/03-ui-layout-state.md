# UI, Layout, Styling & State Management Rules

---

## 1. Tailwind CSS & Design Tokens
- Use Tailwind CSS utility classes exclusively. Avoid custom `.css` files where possible.
- Mobile-first responsive approach (`md:`, `lg:`, `xl:`). Use `container`, `mx-auto`, `max-w` for structural alignment.
- **Theme Variables**: Use Tailwind theme CSS variables for colors. Support light and dark themes using semantic tokens:
  `--background`, `--foreground`, `--surface`, `--surface-elevated`, `--muted`, `--border`, `--primary`, `--primary-foreground`, `--success`, `--warning`, `--error`, `--info`, `--sidebar`, `--sidebar-foreground`, `--navbar`.
- Avoid hardcoded light/dark colors (e.g. raw `text-black` or `bg-white`) in components.

---

## 2. Light and Dark Mode
- Support light, dark, and system themes using `next-themes` with Tailwind class-based dark mode (`attribute="class"`).
- **ThemeProvider**: Wrap the app in a `ThemeProvider` placed in root layout (`defaultTheme="system"`, `enableSystem`).
- **ThemeToggle**: Small client component for toggling themes. Keep toggle logic isolated; do not make entire layouts client components for theming.
- **WCAG**: Ensure color contrast compliance across both themes for text, icons, borders, and controls.

---

## 3. App Shell & Admin UI Guidelines
- **Reference Style**: Vuexy-style modern admin dashboard layout (responsive shell, collapsible sidebar, sticky navbar, card grid).
- **Layout Variants**:
  - `AdminLayout`: Authenticated dashboards, tables, settings, CRUD pages.
  - `AuthLayout`: Login, registration, forgot password (split panel illustration + form on desktop).
  - `BlankLayout`: Error pages, simple standalone screens.
- **Sidebar**:
  - Logo + product title, scrollable nav menu, collapsible groups, active route highlights.
  - Desktop: expanded or icon-rail when collapsed. Mobile/Tablet: off-canvas drawer overlay with focus trap and keyboard ESC to close.
- **Navbar**:
  - Sticky top header with sidebar toggle, optional search, theme toggle, notifications, user avatar dropdown.
  - Accessible button controls with `aria-label`.

---

## 4. Cards & Tables
- **Cards**: Theme-aware surface background, subtle border/shadow, clear visual hierarchy.
- **Tables**: Responsive containers (horizontal scroll or stacked rows on small screens), sticky headers, pagination, sorting, filtering. Virtualize large table lists when needed. Always use stable list keys (never array indices).

---

## 5. State Management & Redux
- **Redux Toolkit**: Structure under `store/` (`slices/`, `api/`, `middleware/`). Use `configureStore`, `createSlice`, `createAsyncThunk`, and RTK Query.
- **State Scope**:
  - Local component state: `useState`
  - Shared UI state: Redux Slices
  - Server data state: RTK Query
- **Selectors**: Keep slices small and single-purpose. Always use memoized selectors via `createSelector`. Never duplicate state.

---

## 6. Forms & Accessibility
- **Forms**: Use `React Hook Form` with `Yup` validation schema. Never implement manual form validation.
- **Accessibility (WCAG)**: Use semantic HTML, `aria-label`, `aria-describedby`, visible keyboard focus states, and proper keyboard navigation support for all interactive elements.
