# **Ecommerce FrontEnd with Spring Boot** 

## Requisitos

* Node (14+ se recomienda v14.19.3)
* npm (se recomienda 6.14.17)
* angular/cli (se recomienda 14.2.7)

## Despliegue Local

Para despliegue local se puede utilizar el comando ```ng serve --watch```.

## Nebular Template
Se utilizo la plantilla de nebular para facilitar y realizar el diseño de toda la página.  
Instalando las librerías necesarias de los componentes a utilizar.

# Documentación de sus Componentes y Servicios
Se genero un componente por las entidades importantes además de uno para las estadísticas.
Se organizaron los servicios de igual manera.

## site
El componente usado para la autentificación de los usuarios es ```site``` se obtiene un JWT con el que se realizan todas las consultas a los EndPoints de Backend.

## pages
Es uno de los componentes principales, se encarga de manejar las rutas dependiendo el tipo de usuairo.
Este archivo configura las rutas para diferentes componentes.
El arreglo `routes` define la estructura de navegación para la aplicación:

  - **`dashboard`**: Muestra el `DashboardComponent`.
  - **`user`**: Muestra el `UserComponent`.
  - **`category`**: Muestra el `CategoryComponent`.
  - **`product`**: Muestra el `ProductComponent`.
  - **`discount`**: Muestra el `DiscountComponent`.
  - **`audit`**: Muestra el `AuditComponent`.
  - **`buy`**: Muestra el `BuyComponent`:
    - **`finish`**: Muestra el `FinishComponent`.
  - **`record`**: Muestra el `RecordComponent`.

## Services

## 1. **`site`**
   Este servicio gestiona la autentificación del sitio web.

## 2. **`audit`**
   El servicio de auditoría se encarga de registrar y gestionar los eventos y acciones del usuario al realizar una compra.

## 3. **`buy`**
   Este servicio maneja el CRUD de las compras en la aplicación.

## 4. **`category`**
   El servicio de categorías maneja el CRUD de categorías de productos.

## 5. **`dashboard`**
   Este servicio proporciona los datos para la interfaz del panel de control (`dashboard`).

## 6. **`discount`**
   El servicio de descuentos se encarga de la gestión de promociones y descuentos aplicables a los productos. 
   
## 7. **`product`**
   Este servicio maneja todas las operaciones relacionadas con los productos, como la creación, actualización, eliminación y consulta de productos.
   
## 8. **`user`**
   El servicio de usuarios gestiona la creación, autenticación, actualización y eliminación de usuarios.
