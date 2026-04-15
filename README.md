# 🎨 Hurlingham PNO — Frontend

Interfaz de usuario moderna y premium para la plataforma informativa del Partido de Hurlingham.  
Desarrollado con **React + Vite**, con enfoque en una experiencia de usuario fluida y animaciones de alta gama.

## 🌟 Características

- **Diseño Glassmorphism**: Estética moderna con transparencias y desenfoques.
- **Notificaciones en Tiempo Real**: Integración dual con **Socket.io** y **SSE**.
- **Consumo Híbrido de API**: Conexión optimizada vía **REST** y **GraphQL**.
- **Animaciones Premium**: Transiciones de página y efectos visuales avanzados (Vara, Swiper).
- **Widgets Dinámicos**: Información meteorológica en tiempo real mediante APIs externas.

## 🚀 Inicio Rápido

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar Entorno:**
   Construir un archivo `.env` basado en `.env.example`:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

3. **Ejecutar en desarrollo:**
   ```bash
   npm run dev
   ```

## 📂 Estructura del Proyecto

- `src/components/`: Componentes reutilizables de Interfaz de Usuario.
- `src/context/`: Gestión de estado global (Autenticación, Notificaciones).
- `src/hooks/`: Lógica de negocio extraída (Consumo de APIs, Datos Externos).
- `src/pages/`: Vistas principales de la aplicación.
- `src/utils/`: Utilidades de red, formateo y constantes.

## 📱 Responsividad

La aplicación ha sido optimizada para dispositivos móviles, tablets y escritorio, adaptando sus layouts de manera dinámica para garantizar la accesibilidad en cualquier resolución.

## 🚀 Despliegue

El proyecto se encuentra desplegado y sincronizado mediante **CI/CD** en **Vercel**, asegurando un entorno de producción estable y accesible para auditorías externas.

---
_Parte del proyecto integrado para el TP Final de Backend - UTN 2026._
