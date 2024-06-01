# Pagina Web _Dackel Cerveza_ **Proyecto Node 2024**

El progreso cuidadoso y en pequeños pasos puede parecer lento, pero en realidad es con diferencia la forma más rápida de progresar. El famoso desarrollador de software Robert "Uncle Bob" Martin ha declarado

> "La única manera de ir rápido, es hacerlo bien"
>
> es decir, según Martin, avanzar con cuidado y con pequeños pasos es incluso la única manera de ser rápido.

@mediasqueries de css

### Código

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

---

- [x] Definir arquitectura o estructura con Bootstrap
- [x] Organizar carpetas con archivos de imágenes e iconos
- [x] Explorar, Definir y Organizar paleta de colores y fuente, tamaño y estilo de textos
- [x] Organizar barra navegación (nav) y registro de usuario
- [x] Diseñar el formulario de contacto.
- [x] Organizar la línea de vínculos entre las secciones y páginas ‘si se requiere’
- [x] Diseñar sitio que muestre ubicación en un mapa y video ’si se requiere’.
- [x] Diseñar el responsive para los diferentes formatos de ¿dispositivos?.

---

## BASE DE DATOS

```mermaid
classDiagram
    Cliente <|.. Usuario
    class Cliente{
     +String id
     +String nombre
     +String apellido
     +String genero
     +int edad
     +String direccion
     +Usuario datos
    }
    class Usuario{
    +String email
    +String password
    }

    class Producto{
     +String id
     +String titulo
     +int precio
     +int stock
    }

    class Compra{
    }
    class Consultas{
    }
```
