# Pagina Web _Dackel Cerveza_ **Proyecto Node 2024**

El progreso cuidadoso y en pequeños pasos puede parecer lento, pero en realidad es con diferencia la forma más rápida de progresar. El famoso desarrollador de software Robert "Uncle Bob" Martin ha declarado

> "La única manera de ir rápido, es hacerlo bien"
>
> es decir, según Martin, avanzar con cuidado y con pequeños pasos es incluso la única manera de ser rápido.

## Recordatorio
Se debe modificar el .env.back a .env para configurar los datos de la Base de Datos y puerto del servidor.
Se debe configurar las tablas de Base de Datos ya que se debe tener en cuenta los CREATE TABLE.

## @mediasqueries de css Código

```css
/** el codigo que ya escribieron es el descktop o modo escritorio **/

/************** RESPONSIVE ***************/
/****** CELULAR *******/
@media screen and (max-width: 425px) {
}
/****** CELULAR HORIZONTAL Y TABLET PEQUEÑAS *********/

@media screen and (min-width: 426px) and (max-width: 768px) {
}
/****** TABLET ******/
@media screen and (min-width: 768px) and (max-width: 1023px) {
}
```

## BASE DE DATOS

código para conocer el peso de la BD

```slq
SELECT table_schema AS "Database", ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS "Size (MB)" FROM information_schema.tables WHERE table_schema = 'bwjmdpdj9q7rrxqh1rfb' GROUP BY table_schema;
```

```mermaid
erDiagram
    Producto {
        int id PK
        string name
        int precio
        string descripcion
        string tipo
    }

    Cerveza {
        int id FK
        string calibre
        string estilo
        string sabor
        float alcohol
        int IBU
        int cantidad
    }

    Producto_IMAGENES {
        int cerveza_id FK
        string imagen
    }

    Cerveza_PREMIOS {
        int cerveza_id FK
        string premio
    }

    Remera {
        int id FK
        string material
    }

    Remera_VARIANTES {
        int remera_id FK
        string talla
        string color
        int cantidad
    }



    Calcomania {
        int id FK
        string tamano
        int cantidad
    }



   Cliente {
        int id PK
        string nombre
        string apellido
        string genero
        int edad
        string direccion_envio
        string direccion_facturacion
        string telefono
        date fecha_registro
        string historial_pedidos
        string preferencias_producto
        string estado_cuenta

        int usuario FK
    }
    Usuario {
        int id PK
        string email
        string password
        string tipo
    }

    Pedido {
        int id PK
        string fecha
        float total
        int cliente_id FK
    }

    Pedido_Detalle {
        int pedido_id FK
        int producto_id FK
        int cantidad
        float precio
    }

    Consulta{
        int id PK
        string nombre
        string email
        string telefono
        string motivo
        string mensage
        string medio
    }

    Producto ||--o{ Cerveza : "is a"
    Cerveza ||--o{ Cerveza_IMAGENES : "has"
    Cerveza ||--o{ Cerveza_PREMIOS : "has"
    Producto ||--o{ Remera : "is a"
    Remera ||--o{ Remera_VARIANTES : "has"
    Remera ||--o{ Remera_IMAGENES : "has"
    Producto ||--o{ Calcomania : "is a"
    Calcomania ||--o{ Calcomania_IMAGENES : "has"
    Cliente ||--o{ Pedido : "makes"
    Pedido ||--o{ Pedido_Detalle : "contains"
    Pedido_Detalle ||--|| Producto : "references"
    Cliente ||--|| Usuario : "has"
```
