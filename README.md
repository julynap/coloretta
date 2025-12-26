# Coloretta Coffee Art - Sitio Web

**Código fuente oficial** del sitio web de **Coloretta Coffee Art**, un espacio donde el arte se encuentra con el aroma del café. Página web de una sola página (SPA) con diseño moderno, efectos parallax y navegación fluida.

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Análisis Técnico](#análisis-técnico)
- [Funcionalidades](#funcionalidades)
- [Sistema de Diseño](#sistema-de-diseño)
- [Guía de Desarrollo](#guía-de-desarrollo)
- [Mantenimiento](#mantenimiento)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)

---

## 📝 Descripción del Proyecto

Este es el código fuente oficial del sitio web de Coloretta Coffee Art. El sitio presenta un estudio de arte y café donde los visitantes pueden pintar cerámica mientras disfrutan de bebidas y comida. El sitio incluye información sobre servicios, eventos, galería de creaciones y formulario de contacto.

### Características Principales

- ✨ **Diseño moderno y atractivo** con elementos decorativos únicos
- 📱 **Completamente responsive** (móviles, tablets y desktop)
- 🎨 **Efectos parallax** para una experiencia inmersiva
- ⚡ **Animaciones suaves** con IntersectionObserver
- 🔍 **Navegación fluida** con scroll suave y sidebar fijo
- 🎯 **SEO optimizado** con estructura semántica HTML5

---

## 📁 Estructura del Proyecto

```
coloretta/
├── index.html              # Página principal HTML
├── script.js               # Lógica JavaScript (Vanilla JS)
├── styles.css              # Estilos CSS completos
├── README.md               # Documentación del proyecto
└── assets/
    └── images/
        ├── logo.png                    # Logo principal
        ├── fondo-violeta.png           # Fondo sección hero
        ├── fondo-amarillo.png          # Fondo sección experiencia
        ├── fondo-verde.png              # Fondo sección galería
        ├── foto-escaparate.png         # Imagen principal "Nosotros"
        ├── pegatina.png                # Decoración pegatina
        ├── pincel.png                   # Decoración pincel
        ├── cafe.png                     # Decoración café
        ├── churro-rosado.png            # Decoración churro
        ├── flor-azul.png                # Decoración flor azul
        ├── flores-rojas.png             # Decoración flores rojas
        ├── flores-rosa.svg              # Decoración flores rosa (SVG)
        ├── carita-manos.png             # Decoración carita
        ├── pintura-azul.png             # Decoración navegación
        ├── pintura-rojo.png             # Decoración navegación
        └── puntura-azul-turqueza.png   # Decoración navegación
```

---

## 🔍 Análisis Técnico

### `index.html`

**Estructura:**
- HTML5 semántico con secciones bien definidas
- Meta tags para viewport y charset
- Enlaces a Google Fonts (Caveat Brush, Nunito, Open Sauce One)
- 6 secciones principales con IDs para navegación por anclas

**Secciones:**
1. **Sidebar** (`.sidebar`) - Menú de navegación fijo lateral derecho
2. **Navegación** (`.nav`) - Barra superior fija con logo y decoraciones
3. **Hero/Inicio** (`#inicio`) - Sección principal con título y descripción
4. **Nosotros** (`#nosotros`) - Información sobre Coloretta con layout de dos columnas
5. **Experiencia** (`#experiencia`) - Reconocimientos y logros
6. **Eventos y Planes** (`#eventos`) - Servicios ofrecidos (talleres, cumpleaños, etc.)
7. **Galería** (`#galeria`) - Grid de imágenes con placeholders
8. **Contáctanos** (`#contacto`) - Formulario de contacto
9. **Footer** (`.footer`) - Enlaces y redes sociales

**Elementos Decorativos:**
- Múltiples imágenes decorativas posicionadas absolutamente
- Efectos parallax aplicados mediante atributos `data-parallax-speed`
- Decoraciones con formas orgánicas (pintura chorreada)

### `script.js`

**Funcionalidades Implementadas:**

#### 1. Smooth Scroll (Líneas 1-16)
```javascript
// Maneja el scroll suave para todos los enlaces de anclaje
// Ajusta la posición considerando la altura de la navegación
```

#### 2. Efecto de Scroll en Navegación (Líneas 18-32)
```javascript
// Cambia la sombra de la barra de navegación según el scroll
// Activa efecto visual después de 100px de scroll
```

#### 3. Efecto Parallax (Líneas 34-82)
```javascript
// Función initParallax() - Implementa efecto parallax en secciones
// Usa requestAnimationFrame para optimizar rendimiento
// Calcula offset basado en data-parallax-speed de cada sección
// Recalcula en resize para mantener consistencia
```

**Velocidades Parallax por Sección:**
- Hero: `0.5`
- Nosotros: `0.4`
- Experiencia: `0.35`
- Eventos: `0.3`
- Galería: `0.4`
- Contacto: `0.3`

#### 4. Animaciones de Entrada (Líneas 89-138)
```javascript
// IntersectionObserver para animar elementos al entrar en viewport
// Aplica fade-in y slide-up con delays escalonados
// Elementos observados:
//   - .galeria-item
//   - .evento-card
//   - .experiencia-item
//   - .feature-item
```

#### 5. Manejo de Formulario (Líneas 140-159)
```javascript
// Previene envío por defecto
// Recopila datos del formulario
// Muestra alerta de confirmación (TODO: implementar backend)
// Resetea formulario después del envío
```

**Optimizaciones de Rendimiento:**
- Throttling de eventos scroll con `requestAnimationFrame`
- Uso de `will-change` y `transform` para aceleración por hardware
- IntersectionObserver para animaciones eficientes

### `styles.css`

**Organización:**
1. **Reset & Base Styles** (Líneas 1-18)
   - Reset CSS universal
   - Variables CSS (Custom Properties)

2. **Sidebar Menu** (Líneas 20-114)
   - Posicionamiento fijo
   - Formas orgánicas con border-radius personalizado
   - Colores específicos por sección

3. **Navigation** (Líneas 128-242)
   - Barra fija superior
   - Decoraciones de pintura con posicionamiento absoluto
   - Logo con transformaciones específicas

4. **Parallax Sections** (Líneas 244-258)
   - Estilos base para secciones con efecto parallax
   - Optimizaciones de rendimiento

5. **Secciones Específicas:**
   - Hero (Líneas 260-461)
   - Nosotros (Líneas 530-695)
   - Experiencia (Líneas 697-757)
   - Eventos (Líneas 474-528)
   - Galería (Líneas 759-851)
   - Contacto (Líneas 853-934)
   - Footer (Líneas 936-1010)

6. **Responsive Design** (Líneas 1012-1105)
   - Media queries para tablets (968px)
   - Media queries para móviles (576px)

---

## ⚙️ Funcionalidades

### Navegación
- **Sidebar fijo**: Menú lateral derecho con enlaces a todas las secciones
- **Scroll suave**: Transiciones fluidas entre secciones
- **Navegación superior**: Logo fijo con decoraciones de pintura

### Efectos Visuales
- **Parallax**: Diferentes velocidades por sección para profundidad
- **Animaciones de entrada**: Fade-in y slide-up al hacer scroll
- **Hover effects**: Transformaciones y sombras en elementos interactivos

### Formulario de Contacto
- Validación HTML5 (campos requeridos)
- Manejo de eventos con JavaScript
- **Pendiente**: Integración con backend para envío real

### Responsive Design
- Breakpoints:
  - Desktop: > 968px
  - Tablet: 576px - 968px
  - Móvil: < 576px
- Grid adaptativo con `auto-fit` y `minmax`
- Imágenes responsivas con `object-fit`

---

## 🎨 Sistema de Diseño

### Variables CSS

```css
:root {
    --primary-green: #c4dc49;        /* Verde principal */
    --primary-green-dark: #b9d750;   /* Verde oscuro */
    --beige: #f4e4c3;                 /* Beige */
    --pink: #fea7ef;                  /* Rosa */
    --text-dark: #000000;             /* Texto oscuro */
    --white: #ffffff;                 /* Blanco */
    
    /* Fuentes */
    --font-caveat: 'Caveat Brush', cursive;
    --font-nunito: 'Nunito', sans-serif;
    --font-open: 'Open Sauce One', sans-serif;
}
```

### Paleta de Colores por Sección

| Sección | Color de Fondo | Uso |
|---------|---------------|-----|
| Hero | `fondo-violeta.png` | Imagen de fondo |
| Nosotros | `rgb(49, 167, 104)` | Verde |
| Experiencia | `fondo-amarillo.png` | Imagen de fondo |
| Eventos | `rgb(254, 167, 239)` | Rosa |
| Galería | `fondo-verde.png` | Imagen de fondo |
| Contacto | `rgb(244, 228, 195)` | Beige |

### Tipografías

- **Caveat Brush**: Títulos principales (`.section-title`, `.hero-title`)
- **Nunito**: Texto general, botones, navegación
- **Open Sauce One**: Elementos específicos (actualmente no usado en HTML)

### Espaciado

- Padding de secciones: `100px 40px` (desktop)
- Gaps en grids: `30px - 40px`
- Márgenes entre elementos: `20px - 60px`

---

## 🛠️ Guía de Desarrollo

### Configuración del Entorno

1. **Clonar o descargar el proyecto**
2. **Abrir en editor de código** (VS Code recomendado)
3. **Servir con servidor local** (importante para efectos parallax):

```bash
# Opción 1: Python
python -m http.server 8000

# Opción 2: Node.js (http-server)
npx http-server

# Opción 3: VS Code Live Server
# Instalar extensión "Live Server" y hacer clic derecho en index.html
```

### Estructura de Archivos para Modificar

#### Para cambiar contenido:
- **Textos**: Editar `index.html` directamente
- **Imágenes**: Reemplazar archivos en `assets/images/` manteniendo nombres

#### Para cambiar estilos:
- **Colores**: Modificar variables CSS en `:root` (líneas 8-18 de `styles.css`)
- **Layout**: Ajustar clases específicas en `styles.css`
- **Responsive**: Modificar media queries (líneas 1012-1105)

#### Para cambiar funcionalidad:
- **Animaciones**: Modificar `script.js` sección IntersectionObserver
- **Parallax**: Ajustar valores `data-parallax-speed` en HTML o función `initParallax()`
- **Formulario**: Implementar backend en función de submit (línea 143)

### Agregar Nueva Sección

1. **HTML**: Agregar nueva `<section>` con clase `parallax-section` y atributo `data-parallax-speed`
2. **CSS**: Crear estilos específicos para la nueva sección
3. **JavaScript**: Si necesita animaciones, agregar al IntersectionObserver
4. **Sidebar**: Agregar nuevo enlace en `.sidebar-content`

### Agregar Nueva Imagen a la Galería

1. Agregar imagen a `assets/images/`
2. En `index.html`, reemplazar `.galeria-image-placeholder` con:
```html
<img src="assets/images/nueva-imagen.jpg" alt="Descripción">
```

---

## 🔧 Mantenimiento

### Tareas Comunes

#### Actualizar Contenido de Texto
- Editar directamente en `index.html`
- Buscar por ID de sección o clase específica

#### Cambiar Imágenes
- Reemplazar archivos en `assets/images/`
- Mantener nombres de archivo o actualizar referencias en HTML

#### Modificar Colores
- Editar variables CSS en `styles.css` (líneas 8-18)
- Los cambios se aplicarán automáticamente en todo el sitio

#### Ajustar Efectos Parallax
- Modificar valores `data-parallax-speed` en HTML
- Valores más altos = movimiento más rápido
- Rango recomendado: `0.2` - `0.6`

#### Optimizar Rendimiento
- Comprimir imágenes antes de subir
- Usar formatos modernos (WebP) cuando sea posible
- Revisar uso de `will-change` en CSS

### Problemas Comunes y Soluciones

#### Parallax no funciona
- **Causa**: Servir desde `file://` en lugar de servidor local
- **Solución**: Usar servidor local (ver sección "Configuración del Entorno")

#### Imágenes no se cargan
- **Causa**: Rutas incorrectas
- **Solución**: Verificar que las rutas en HTML coincidan con estructura de carpetas

#### Animaciones no aparecen
- **Causa**: JavaScript no cargado o errores en consola
- **Solución**: Abrir consola del navegador (F12) y revisar errores

#### Formulario no envía
- **Causa**: Backend no implementado
- **Solución**: Implementar endpoint en backend y actualizar función `submit` en `script.js`

### Checklist de Mantenimiento Mensual

- [ ] Verificar que todas las imágenes se cargan correctamente
- [ ] Probar formulario de contacto
- [ ] Revisar responsive en diferentes dispositivos
- [ ] Actualizar contenido si es necesario
- [ ] Verificar enlaces externos (redes sociales)
- [ ] Revisar rendimiento con herramientas de desarrollo
- [ ] Actualizar galería con nuevas imágenes

### Mejoras Futuras Recomendadas

1. **Backend para Formulario**
   - Implementar endpoint para recibir mensajes
   - Agregar validación del lado del servidor
   - Enviar confirmación por email

2. **Galería Dinámica**
   - Cargar imágenes desde API o CMS
   - Implementar lightbox para ver imágenes en grande
   - Agregar filtros o categorías

3. **Optimizaciones**
   - Lazy loading para imágenes
   - Preload de fuentes críticas
   - Minificación de CSS/JS para producción

4. **SEO**
   - Agregar meta descriptions
   - Implementar Open Graph tags
   - Agregar sitemap.xml

5. **Accesibilidad**
   - Mejorar contraste de colores
   - Agregar aria-labels donde falten
   - Implementar navegación por teclado

---

## 💻 Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: 
  - Variables CSS (Custom Properties)
  - Grid Layout
  - Flexbox
  - Media Queries
  - Transformaciones y transiciones
- **JavaScript (Vanilla)**: 
  - ES6+
  - IntersectionObserver API
  - requestAnimationFrame
  - Event Listeners

### Recursos Externos
- **Google Fonts**: 
  - Caveat Brush
  - Nunito
  - Open Sauce One

### Herramientas de Desarrollo Recomendadas
- VS Code con extensiones:
  - Live Server
  - Prettier
  - CSS Peek
  - HTML CSS Support

---

## 🌐 Navegadores Compatibles

- ✅ Chrome (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ Edge (últimas 2 versiones)

**Nota**: Efectos parallax pueden variar ligeramente entre navegadores debido a diferencias en renderizado.

---

## 📝 Notas de Desarrollo

### Convenciones de Código

- **Nombres de clases**: BEM-like (`.seccion-elemento-modificador`)
- **Indentación**: 4 espacios
- **Comentarios**: En español para secciones importantes
- **Variables CSS**: Prefijo descriptivo (`--primary-`, `--font-`)

### Archivos a NO Modificar sin Revisión

- Estructura base de `index.html` (puede romper JavaScript)
- Variables CSS sin actualizar referencias
- Funciones de parallax sin entender la lógica

### Testing

Antes de hacer deploy, probar:
1. Navegación entre secciones
2. Formulario de contacto
3. Responsive en móvil, tablet y desktop
4. Efectos parallax al hacer scroll
5. Animaciones de entrada
6. Carga de todas las imágenes

---

## 📞 Soporte

Para preguntas sobre el código o problemas técnicos:
1. Revisar esta documentación
2. Verificar consola del navegador para errores
3. Revisar comentarios en el código

---

## 📄 Licencia

Este es el código fuente oficial y propiedad de Coloretta Coffee Art.

---

**Última actualización**: 2024
**Versión del documento**: 2.0
