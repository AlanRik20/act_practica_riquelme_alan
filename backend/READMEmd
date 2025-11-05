# Sistema de Gestión de Inventario - FORMOTEX

Este proyecto consiste en el desarrollo de una API backend para la gestión centralizada del inventario de equipos informáticos de la empresa FORMOTEX. La aplicación permite realizar operaciones CRUD sobre los equipos, gestionar usuarios y asignar responsables a cada activo, todo ello bajo un esquema de seguridad basado en autenticación JWT y control de acceso por roles.

---

## Instrucciones de Instalación y Ejecución

### Requisitos Previos
* Node.js
* npm (administrador de paquetes de Node)
* Una instancia de base de datos PostgreSQL activa.

### Pasos

1.  **Clonar el repositorio e instalar dependencias:**
    Navegue hasta la carpeta backend y ejecute:
    ```bash
    npm install
    ```

2.  **Configuración del archivo de BD:**
    En el archivo database/db.ts ajuste los valores a su  configuración local de PostgreSQL:
    ```
     user: 'postgres',
    host: 'localhost',
    database: 'formotex',
    password: '123456',
    port: 5432,
    ```

3.  **Ejecución del Servidor:**
    Para iniciar el servidor, dentro de la carpeta backend:
    ```bash
    npm run dev
    ```
    El servidor estará escuchando peticiones en `http://localhost:3000`.

---

## Justificación Técnica

A continuación se detallan las decisiones técnicas tomadas durante el desarrollo del proyecto, conforme a los requerimientos establecidos.

### Organización de Carpetas

Se adoptó una arquitectura en capas para garantizar la separación de responsabilidades y facilitar el mantenimiento:

* `src/controller`: Contiene los controladores que manejan las peticiones HTTP y las respuestas, sin incluir lógica de negocio compleja.
* `src/service`: Alberga la lógica de negocio y la interacción directa con la base de datos, manteniendo los controladores ligeros.
* `src/models`: Define las interfaces de TypeScript que modelan los datos de la aplicación (ej. `Equipo`, `Usuario`).
* `src/routes`: Define los endpoints de la API y aplica los middlewares correspondientes.
* `src/middleware`: Contiene funciones reutilizables para interceptar peticiones, como la verificación de tokens JWT y la autorización por roles.
* `src/database`: Maneja la configuración y conexión a la base de datos PostgreSQL.

### Propiedades Relevantes por Entidad

* **Equipo:** Además de propiedades básicas como `nombre`, `marca` y `modelo`, se incluyó `numero_serie` para identificación inequívoca, y `responsable_id` para la asignación de usuarios. Se añadieron campos de auditoría como `fecha_registro`.
* **Usuario:** Incluye `email` para el inicio de sesión, `password` y `rol_id` para determinar los permisos de acceso.

---

## Endpoints Principales

### Autenticación
* `POST /api/auth/login`: Permite a los usuarios autenticarse y obtener un token JWT.
* `POST /api/auth/register`: Permite registrar nuevos usuarios (acceso restringido a administradores).

### Equipos (Requiere Autenticación)
* `GET /api/equipos`: Obtiene el listado de todos los equipos.
* `GET /api/equipos/:id`: Obtiene los detalles de un equipo específico.
* `POST /api/equipos`: Crea un nuevo equipo (Solo Admin).
* `PUT /api/equipos/:id`: Actualiza la información de un equipo (Solo Admin).
* `DELETE /api/equipos/:id`: Elimina un equipo del inventario (Solo Admin).