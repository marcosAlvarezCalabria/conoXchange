# 🎨 Guía de Diseño de Pantallas y Componentes

Este documento detalla las pantallas principales de la aplicación y los componentes que las componen, para facilitar el diseño en herramientas como Stitch o similares.

---

## 🔐 1. Autenticación (Login/Register)

### Login (`/views/users/login.hbs`)
**Objetivo:** Permitir el acceso a usuarios registrados.
**Componentes:**
1.  **Título Principal:** `<h1>Login</h1>`
2.  **Formulario:**
    - Input Email (`type="email"`, placeholder="Enter email")
    - Input Password (`type="password"`, placeholder="Password")
    - Label para cada input.
    - Mensajes de validación/error (texto rojo pequeño).
3.  **Botón de Acción:** "Login" (Primary Button).
    - Estado normal
    - Estado hover
    - Estado loading

### Registro (`/views/users/register.hbs`)
**Objetivo:** Crear una nueva cuenta.
**Componentes:**
1.  **Título Principal:** `<h1>Register</h1>`
2.  **Formulario:**
    - Inputs similares al Login + Username.
    - Checkbox de aceptación de términos (si aplica).
3.  **Botón de Acción:** "Register" (Primary Button).

---

## 👤 2. Perfil de Usuario (`/views/users/profile.hbs`)

**Objetivo:** Mostrar la identidad del usuario, sus intereses y sus habilidades ofrecidas.

**Componentes:**
1.  **Header de Perfil:**
    - **Avatar:** Imagen circular grande (150x150px).
    - **Nombre de Usuario:** Texto grande (`<h3>`).
    - **Email:** Texto secundario (visible para el propio usuario).
    - **Descripción:** Texto de "About me".
    - **Botón de Edición:** "Edit profile" (Outline Button + Icono).

2.  **Tarjeta de Intereses (Side Panel):**
    - Título "My interests".
    - **Lista de items:**
        - Icono de categoría (43x36px).
        - Nombre del interés.

3.  **Lista de Skills (Main Content):**
    - Título "Username Skills".
    - **Skill Item (Row):**
        - Nombre de Skill (Bold).
        - Categoría (Texto secundario).
        - **Rating:** Estrellas (5 estrellas, escala visual).
        - **Acciones (Solo dueño):** Botones "Edit" (Primary small) y "Delete" (Danger small).
    - **Botón Flotante/Final:** "New skill" (Outline Light Button + Icono).

---

## 🏠 3. Home / Landing Page (`/views/misc/home.hbs`)

**Objetivo:** Atraer nuevos usuarios y explicar la propuesta de valor.

**Componentes:**
1.  **Hero Section:**
    - **Headline:** Texto grande con palabras en gradiente ("Exchange Your Skills...").
    - **Subtítulo:** Párrafo descriptivo.
    - **Botones CTA:**
        - "Get Started Free" (Primary Hero).
        - "Explore Skills" (Secondary Hero).
    - **Stats:** Números grandes con etiquetas pequeñas (e.g., "50+ Active Users").
    - **Imagen Hero:** Ilustración principal + Cards flotantes decorativas.

2.  **Sección "How It Works":**
    - Título de Sección.
    - **Grid de Pasos (3 Cards):**
        - Número de paso (Circular).
        - Icono grande.
        - Título del paso.
        - Descripción breve.

3.  **Testimonios:**
    - Título de Sección.
    - **Cards de Testimonio:**
        - Icono de cita.
        - Texto del testimonio.
        - **Autor:** Avatar pequeño + Nombre + Rol.
        - **Estrellas:** 5 estrellas fijas.

4.  **CTA Final:**
    - Texto invitando a unirse.
    - Botón "Create Free Account".

---

## 🔍 4. Buscador y Listado (`/views/skills/search.hbs`)

**Objetivo:** Permitir a los usuarios encontrar habilidades para aprender.

**Componentes:**
1.  **Buscador Principal (Header):**
    - Título y Subtítulo.
    - **Barra de Búsqueda:** Input largo con icono de lupa y botón "Search".
    - **Chips de Categoría:** Botones pequeños redondeados con icono + texto.
        - Estado Inactivo (Gris).
        - Estado Activo (Color primario + Sombra).

2.  **Resultados (Grid de Cards):**
    - **Skill Card:**
        - **Header:**
            - Avatar del creador (superpuesto o en esquina).
            - Rating (Estrellas).
            - Nombre del creador.
        - **Cuerpo:**
            - Badge de Categoría (Icono + Texto).
            - Título de la Skill.
        - **Interacción:** Hover lift effect.

---

## 🛠️ Herramientas de Diseño Recomendadas

Para "Stitch" (interpretado como herramienta de diseño/prototipado), se recomienda crear símbolos/componentes reutilizables para:

1.  **Botones:** Primary, Secondary, Outline, Danger.
2.  **Inputs:** Default, Focus, Error.
3.  **Avatares:** Tamaños Small (30px), Medium (50px), Large (150px).
4.  **Cards:** Base container con sombra suave (`box-shadow`).
5.  **Estrellas:** Icono activado (amarillo) y desactivado (gris).
