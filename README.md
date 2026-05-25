# Markus Bike Configurator

Interactive bike configurator built with **Angular 20** and **PrimeNG**. Customise a bike step by step, define compatibility rules between components, and get a real-time price summary.

---

## Español / Spanish

### ¿Qué hace la aplicación?

Esta app permite configurar una bicicleta seleccionando componentes en 5 pasos:

1. **Tipo de cuadro** — Full-Suspension, Diamond o Step-Through
2. **Acabado** — Mate o Brillante
3. **Ruedas** — Road, Mountain o Fat Bike
4. **Color de llanta** — Rojo, Negro o Azul
5. **Cadena** — Single-Speed o 8-Speed

Cada paso muestra el coste acumulado. En el paso 6 (Resumen) puedes ver la configuración completa y un **código de referencia** generado automáticamente (ej. `FS-M-BLK-SS`).

Además, hay un gestor de reglas de compatibilidad donde puedes definir qué combinaciones de componentes NO son válidas (ej. "cuadro Full-Suspension no compatible con ruedas Road").

### Requisitos previos

- **Node.js** v18 o superior (descargar: https://nodejs.org)
- **npm** (viene con Node.js)
- **Angular CLI** (se instalará automáticamente)

### Cómo arrancar la app (primera vez)

1. **Abrir terminal** en la carpeta del proyecto:
   ```bash
   cd ruta/del/proyecto
   ```

2. **Instalar dependencias** (solo la primera vez):
   ```bash
   npm install
   ```
   Esto descarga todas las librerías necesarias.

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm start
   ```

4. **Abrir el navegador** en `http://localhost:4200/`

La app se recarga automáticamente cada vez que guardes cambios en el código.

### Comandos útiles

| Comando | Qué hace |
|---|---|
| `npm install` | Instala dependencias (solo una vez) |
| `npm start` | Arranca el servidor de desarrollo |
| `ng build` | Genera la versión de producción en `dist/` |
| `ng test` | Ejecuta los tests unitarios |

### Arquitectura

```
src/
├── app/
│   ├── components/
│   │   ├── common/
│   │   │   └── header/           # Cabecera reutilizable
│   │   ├── custom-bike/
│   │   │   ├── bike-preview/     # Visualización SVG de la bici
│   │   │   ├── option-card/      # Tarjeta de selección de componente
│   │   │   ├── price-summary/    # Resumen de precio desplegable
│   │   │   └── stepper/          # Stepper de pasos
│   │   └── rules-manager/
│   │       ├── rules-editor/      # Formulario para crear reglas
│   │       └── rules-list/        # Lista de reglas activas
│   ├── pages/
│   │   ├── custom-bike/           # Página principal del configurador
│   │   └── rules-manager/         # Página del gestor de reglas
│   ├── core/
│   │   └── models/                # Interfaces y modelos de datos
│   ├── config/
│   │   └── rule-options.ts        # Configuración de componentes y reglas
│   └── services/
│       ├── pricing.service.ts     # Cálculo de precios
│       └── rules.service.ts       # Lógica de reglas de compatibilidad
```

**Flujo de datos:**
- `CustomBikeComponent` mantiene el estado (`ConfigSelection`) y lo pasa a los hijos mediante `@Input()`.
- Los eventos de selección suben mediante `@Output()` y modifican el estado central.
- `PricingService` calcula los precios en función de las selecciones actuales.
- `RulesService` valúa la compatibilidad entre componentes y proporciona las reglas guardadas.
- `RulesManagerComponent` es una página independiente que lista y edita reglas, que persisten en `localStorage`.

---

## English

### What does the app do?

This app lets you configure a bike by selecting components in 5 steps:

1. **Frame Type** — Full-Suspension, Diamond or Step-Through
2. **Finish** — Matte or Shiny
3. **Wheels** — Road, Mountain or Fat Bike
4. **Rim Color** — Red, Black or Blue
5. **Chain** — Single-Speed or 8-Speed

Each step shows the running cost. Step 6 (Summary) displays the full configuration and an auto-generated **reference code** (e.g. `FS-M-BLK-SS`).

There's also a compatibility rule manager where you can define which component combinations are NOT allowed (e.g. "Full-Suspension frame is not compatible with Road wheels").

### Prerequisites

- **Node.js** v18 or higher (download: https://nodejs.org)
- **npm** (comes with Node.js)
- **Angular CLI** (will be installed automatically)

### How to start the app (first time)

1. **Open a terminal** in the project folder:
   ```bash
   cd path/to/project
   ```

2. **Install dependencies** (first time only):
   ```bash
   npm install
   ```
   This downloads all required libraries.

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** at `http://localhost:4200/`

The app will automatically reload when you save changes to the source code.

### Useful commands

| Command | What it does |
|---|---|
| `npm install` | Installs dependencies (one-time) |
| `npm start` | Starts the dev server |
| `ng build` | Builds production version into `dist/` |
| `ng test` | Runs unit tests |

### Architecture

```
src/
├── app/
│   ├── components/
│   │   ├── common/
│   │   │   └── header/           # Reusable header
│   │   ├── custom-bike/
│   │   │   ├── bike-preview/     # SVG bike visualization
│   │   │   ├── option-card/      # Component selection card
│   │   │   ├── price-summary/    # Expandable price summary
│   │   │   └── stepper/          # Step stepper
│   │   └── rules-manager/
│   │       ├── rules-editor/      # Rule creation form
│   │       └── rules-list/        # Active rules list
│   ├── pages/
│   │   ├── custom-bike/           # Main configurator page
│   │   └── rules-manager/         # Rules manager page
│   ├── core/
│   │   └── models/                # Data interfaces and models
│   ├── config/
│   │   └── rule-options.ts        # Component & rule configuration
│   └── services/
│       ├── pricing.service.ts     # Price calculation
│       └── rules.service.ts       # Compatibility rule logic
```

**Data flow:**
- `CustomBikeComponent` holds the state (`ConfigSelection`) and passes it to children via `@Input()`.
- Selection events bubble up via `@Output()` and update the central state.
- `PricingService` calculates prices based on current selections.
- `RulesService` validates component compatibility and provides saved rules.
- `RulesManagerComponent` is a standalone page that lists and edits rules, persisted in `localStorage`.
