# 📋 Guía Detallada de Diseño: Componentes y Funciones

Esta guía detalla los componentes visuales y las interacciones funcionales necesarias para cada pantalla, facilitando el diseño en Stitch.

---

## 1. 🔍 Buscador y Catálogo (`/search`)
**Objetivo:** Permitir al usuario explorar, filtrar y seleccionar habilidades.

### 🎨 Componentes Visuales
- **Barra de Búsqueda (Search Header):**
    - Container sticky (fijo al hacer scroll).
    - Input tipo "cápsula" (bordes `999px`) con icono de lupa.
    - Botón "Search" integrado o adyacente (Color Turquesa).
- **Filtros de Categoría (Chips):**
    - Botones horizontales con scroll.
    - Estado Desactivado: Fondo blanco, borde gris, icono gris.
    - Estado Activo: Fondo Turquesa, texto oscuro, sin borde.
- **Grid de Resultados:**
    - Layout responsivo (1 columna móvil, 3-4 escritorio).
- **Skill Card (Tarjeta de Habilidad):**
    - **Imagen:** Aspect ratio 16:9 o 4:3, esquinas redondeadas sup. (`16px`).
    - **Badge de Rating:** Pill flotante sobre la imagen (e.g., "⭐ 4.9").
    - **Avatar:** Círculo superpuesto en el borde inferior de la imagen.
    - **Contenido:** Título (Bold), Categoría (Texto pequeño color acento), Nombre Instructor.
    - **Footer:** Botón sutil "Ver más" o flecha.

### ⚡ Funciones e Interacciones
- **Filtrado:** Al hacer clic en un Chip, la grid se actualiza (AJAX o recarga).
- **Búsqueda:** Escribir y presionar Enter filtra los resultados.
- **Hover Card:** Al pasar el mouse, la tarjeta se eleva (`transform: translateY(-5px)`) y la sombra aumenta.
- **Click Card:** Lleva al detalle de la skill.

---

## 2. 📄 Detalle de Skill (`/detail/:id`)
**Objetivo:** Mostrar información profunda y convencer al usuario de contactar.

### 🎨 Componentes Visuales
- **Hero de Detalle:**
    - Título H1 grande.
    - Badge de Categoría.
    - Imagen principal grande (ancho completo o container).
- **Panel de Instructor (Sidebar/Bottom):**
    - Tarjeta contorneada (borde fino).
    - Avatar grande (`80px+`).
    - Nombre y "Member since...".
    - Botón "Contactar" (Grande, Turquesa).
- **Rating Breakdown:**
    - Número grande de nota media (e.g., "4.9").
    - Barras de progreso por estrella (5, 4, 3...).
- **Lista de Reviews:**
    - Avatar pequeño + Nombre + Fecha.
    - Estrellas individuales.
    - Texto del comentario.

### ⚡ Funciones e Interacciones
- **Contactar:** Abre modal de mensaje o lleva a mailto/chat.
- **Navegación:** Breadcrumbs (Inicio > Búsqueda > Detalle) para volver.
- **Galería (Opcional):** Si hay más fotos, permitir hacer clic para ampliar (Lightbox).

---

## 3. 👤 Perfil de Usuario (`/profile/:id`)
**Objetivo:** Construir confianza y mostrar el inventario de habilidades del usuario.

### 🎨 Componentes Visuales
- **Header Personal:**
    - Fondo de portada (Color sólido Midnight Blue o gradiente).
    - Avatar centrado superpuesto.
    - Nombre y Role/Headline.
- **Tabs de Navegación:**
    - "About" | "Skills" | "Reviews".
    - Indicador de tab activa (subrayado Turquesa).
- **Lista de Inventario (Skills):**
    - Versión "List View" de las cards (Horizontal).
    - Botones de acción (Editar/Borrar) si es mi perfil.

### ⚡ Funciones e Interacciones
- **Switch Tabs:** Cambiar entre vistas de contenido sin recargar.
- **Editar Perfil:** Botón visible solo para el dueño, lleva a formulario.
- **CRUD Skills:** Iconos de lápiz (editar) y basura (borrar) con tooltips.

---

## 4. 🔐 Login / Register (`/login`, `/register`)
**Objetivo:** Entrada rápida y sin fricción.

### 🎨 Componentes Visuales
- **Layout Split (Escritorio):**
    - Izquierda: Imagen inspiradora / Branding / Testimonio.
    - Derecha: Formulario limpio.
- **Formulario:**
    - Título "Welcome Back".
    - Inputs con labels flotantes o placeholders claros.
    - Checkbox "Remember me".
    - Link "¿Olvidaste contraseña?".
- **Botón Principal:** Ancho completo (Full width), Turquesa.
- **Separador:** "Or continue with".
- **Social Login:** Botones con logo Google/Facebook (Outlined).

### ⚡ Funciones e Interacciones
- **Validación Inline:** Bordes rojos y mensaje si el email es inválido al perder foco.
- **Show/Hide Password:** Icono de ojo en el input de contraseña.
- **Loading State:** El botón se vuelve gris y muestra spinner al enviar.

---

## 5. � Formularios (`/skills/new`, `/edit`)
**Objetivo:** Creación de contenido cómoda.

### 🎨 Componentes Visuales
- **Container Centrado:** Ancho limitado (`700px`) para lectura fácil.
- **Steps (Opcional):** "Info Básica" > "Detalles" > "Fotos".
- **Upload Area:**
    - Recuadro con borde discontinuo (Dashed border).
    - Icono de nube/cámara en el centro.
    - Texto "Arrastra tu foto aquí".
- **Selects Personalizados:** Estilo igual a los inputs de texto.

### ⚡ Funciones e Interacciones
- **Preview Imagen:** Al seleccionar archivo, mostrar miniatura inmediatamente.
- **Autosize Textarea:** El campo de descripción crece al escribir.
- **Cancel:** Botón secundario (Gris/Outline) para volver sin guardar.
