# Café de Barrio - Frontend (Angular)

Esta es la interfaz de usuario del e-commerce "Café de Barrio", desarrollada con **Angular 19**. Permite a los clientes navegar por el catálogo, gestionar su carrito y realizar pedidos, además de ofrecer un panel administrativo para la gestión de productos y ventas.

---

## Requisitos del Entorno

Para asegurar que la aplicación corra correctamente, asegúrese de tener:
* **Node.js**: v18.0.0 o superior (Recomendado: LTS).
* **Angular CLI**: v19.0.0 o superior.
* **Navegador**: Google Chrome, Microsoft Edge o Firefox (versiones recientes).

---

## Instrucciones de Ejecución

Siga estos pasos para levantar la aplicación en su entorno local:

### 1. Instalación de Dependencias
Como el proyecto utiliza librerías externas (SweetAlert2, Bootstrap, etc.), es obligatorio descargar los módulos de Node antes del primer inicio.
Desde la carpeta `/frontend`, ejecute:
```bash
npm install
```

### 2. Configuración de la API
La aplicación está configurada para comunicarse con el backend en la siguiente dirección:

* **URL Base:** `http://localhost:8080/api`
* *Nota: Asegúrese de que su Backend esté en ejecución para que el catálogo cargue los productos correctamente.*

### 3. Iniciar el Servidor de Desarrollo
Una vez instaladas las dependencias, levante el proyecto con:

```bash
ng serve
```
### 4. Acceso a la Aplicación
Abra su navegador y acceda a: 
**[http://localhost:4200](http://localhost:4200)**

---

## Acceso Administrativo
Para probar las funciones de **Mantenimiento de Productos** y **Listado de Pedidos**, debe iniciar sesión:

1. **Navegar a la ruta:** `/login`.
2. **Ingresar las credenciales** de administrador mostradas en la página del login.
3. El sistema utiliza **Guards de Angular** para proteger estas rutas de accesos no autorizados.

---

## Librerías Principales Utilizadas
* **SweetAlert2**: Para diálogos de confirmación y notificaciones estéticas.
* **Bootstrap 5**: Para el diseño responsivo y componentes de UI.
* **Angular Router**: Para la navegación entre Catálogo, Carrito y Panel Admin.
---
## Capturas de Pantalla
Puede visualizar el funcionamiento detallado de la aplicación en el siguiente documento:
[Ver Evidencias de Funcionamiento](./CapturasDePantalla.pdf)

