/**
 * @author javi98
 * @version 1.0
 * @name iniciar_aplicacion
 * @description Función para iniciar la aplicacion con los permisos correspondientes del usuario.
 * @param email valor del email del menu login.
 * @param password valor de la contraseña del menu login.
 */
function iniciar_aplicacion(email, password) {

    var $email = email;
    var $password = password;

    ajax_iniciar_aplicacion("PHP/inicar_aplicacion.php", "")
        .done(function (info) {
            var $login = JSON.parse(info);
            var $user = 0;

            for (var i in $login.data) {

                if ($login.data[i].email == $email && $login.data[i].password == $password && $login.data[i].admin > 0) {
                    /*Para mostrar todos los botones*/
                    $(".submit-login").show();
                    $(".boton-modificar-login").show();
                    $(".boton-eliminar-login").show();
                    $(".submit-compra").show();
                    $(".boton-crear-productos").show();
                    $(".boton-modificar-productos").show();
                    $(".boton-eliminar-productos").show();
                    $(".boton-listar-productos").show();
                    $(".submit-entrega").show();
                    $(".boton-modificar-entrega").show();
                    $(".boton-eliminar-entrega").show();
                    $(".submit-stock").show();
                    $(".boton-crear-stock").show();
                    $(".boton-modificar-stock").show();
                    $(".boton-eliminar-stock").show();
                    $(".boton-listar-stock").show();
                    $(".boton-cerrar-aplicacion").show();
                    $("#menu-compra-form").show();
                    $("#pagination-login").show();
                    $("#pagination_entrega").show();
                    $("#menu-entrega-form").show();
                    $("#menu-stock-form").show();
                    $(".boton-cerrar-aplicacion").text("Cerrar sesión de la cuenta: " + $email);
                    $(".boton-iniciar-aplicacion").removeAttr("style").hide();

                    /*Reiniciar los valores de los campos del menu login.*/
                    $('.login-email').val("");
                    $('.login-password').val("");

                    $user = 1;

                    /*Llamar a las funciones listar_login_bd() listar_entrega_bd() para mostrar los usuarios y las entregas de la base de datos.*/
                    listar_login_bd()
                    listar_entrega_bd()
                    menu_compra()
                    break;
                }

                if ($login.data[i].email == $email && $login.data[i].password == $password && $login.data[i].admin <= 0) {
                    /*Para mostrar solo los botones de listar*/
                    $(".boton-listar-productos").show();
                    $(".boton-listar-stock").show();
                    $(".boton-cerrar-aplicacion").show();
                    $(".boton-cerrar-aplicacion").text("Cerrar sesión de la cuenta: " + $email);
                    $(".boton-iniciar-aplicacion").removeAttr("style").hide();
                    $("#menu-login-form").removeAttr("style").hide();
                    $("#menu-entrega-form").removeAttr("style").hide();
                    $("#menu-compra-form").show();
                    $("#menu-stock-form").show();
                    $("#pagination-login").show();
                    $("#pagination_entrega").show();
                    $(".boton-iniciar-aplicacion").removeAttr("style").hide();
                    $("#boton-cerrar-aplicacion").show();
                    $("#boton-cerrar-aplicacion").text("Cerrar sesión de la cuenta: " + $email);

                    /*Reiniciar los valores de los campos del menu login.*/
                    $('.login-email').val("");
                    $('.login-password').val("");

                    $user = 1;

                    /*Llamar a las funciones listar_login_bd() listar_entrega_bd() para mostrar los usuarios y las entregas de la base de datos.*/
                    listar_login_bd()
                    listar_entrega_bd()
                    menu_compra()
                    break;
                }

            } //Final del bucle for (var i in $login.data)

            if ($user != 1) {
                alert("El usuario o la contraseña que has introducido es incorrecto");
            }

        });

} // Final función iniciar_aplicacion(email, password)

/**
 * @author javi98
 * @version 1.0
 * @name ajax_iniciar_aplicacion
 * @description Función para obtener los valores de los usuarios de la base de datos de la tabla login al iniciar la pagina.
 * @param 
 */
function ajax_iniciar_aplicacion(url, data) {
    var ajax_iniciar_aplicacion = $.ajax({
        "method": "POST",
        "url": url,
        "data": data
    })
    return ajax_iniciar_aplicacion;
} // Final función ajax_iniciar_aplicacion(url, data)

/**
 * @author javi98
 * @version 1.0
 * @name listar_login_bd
 * @description Función para listar los usuarios de la base de datos al iniciar la pagina.
 * @param 
 */
function listar_login_bd() {
    ajax_login("PHP/usuarios/listar.php", "")
        .done(function (info) {

            /*Condicion de que si la respuesta no hay datos en la tabla de base de datos no muestre ningun error*/
            if (info.includes("null") != true) {

                var $login = JSON.parse(info);

                for (var i in $login.data) {
                    var $email = $login.data[i].email;
                    var $password = $login.data[i].password;

                    /*Llamar a la funcion submit_login_bd(i, $email, $password) para mostrar los usuarios automaticamente*/
                    submit_login_bd(i, $email, $password)
                }

            }

        });
} // Final función listar_login_bd()

/**
 * @author javi98
 * @version 1.0
 * @name ajax_login
 * @description Función para obtener los valores de los usuarios de la base de datos al iniciar la pagina.
 * @param 
 */
function ajax_login(url, data) {
    var ajax_login = $.ajax({
        "method": "POST",
        "url": url,
        "data": data
    })
    return ajax_login;
} // Final función ajax_login(url, data)

/**
 * @author javi98
 * @version 1.0
 * @name listar_productos_bd
 * @description Función para listar los productos de la base de datos al iniciar la pagina.
 * @param 
 */
function listar_productos_bd() {
    ajax_producto("PHP/productos/listar.php", "")
        .done(function (info) {
            
            /*Condicion de que si la respuesta no hay datos en la tabla de base de datos no muestre ningun error*/
            if (info.includes("null") != true) {

                var $productos = JSON.parse(info);

                for (var i in $productos.data) {
                    var $producto = $productos.data[i].producto;
                    var $precio = $productos.data[i].precio;

                    $("#select-producto").append(new Option($producto, $precio));

                }

            }

            /*Llamar a la función listar_productos() para mostrar los productos por pantalla*/
            listar_productos()

        });
} // Final función listar_productos_bd()

/**
 * @author javi98
 * @version 1.0
 * @name ajax_producto
 * @description Función para obtener los valores de los productos de la base de datos al iniciar la pagina.
 * @param 
 */
function ajax_producto(url, data) {
    var ajax_producto = $.ajax({
        "method": "POST",
        "url": url,
        "data": data
    })
    return ajax_producto;
} // Final función ajax_producto(url, data)

/**
 * @author javi98
 * @version 1.0
 * @name listar_entrega_bd
 * @description Función para listar las entregas de la base de datos al iniciar la pagina.
 * @param 
 */
function listar_entrega_bd() {
    ajax_producto("PHP/entrega/listar.php", "")
        .done(function (info) {

            /*Condicion de que si la respuesta no hay datos en la tabla de base de datos no muestre ningun error*/
            if (info.includes("null") != true) {

                var $entrega = JSON.parse(info);

                for (var i in $entrega.data) {
                    var $telefono = $entrega.data[i].telefono;
                    var $fecha_inicio = $entrega.data[i].fecha_inicio;
                    var $fecha_final = $entrega.data[i].fecha_final;

                    /*Llamar a la funcion submit_entrega_bd(i, $telefono, $fecha_inicio, $fecha_final) para mostrar las entregas automaticamente*/
                    submit_entrega_bd(i, $telefono, $fecha_inicio, $fecha_final)
                }

            }

        });
} // Final función listar_entrega_bd()

/**
 * @author javi98
 * @version 1.0
 * @name ajax_entrega
 * @description Función para obtener los valores de las entregas de la base de datos al iniciar la pagina.
 * @param 
 */
function ajax_entrega(url, data) {
    var ajax_entrega = $.ajax({
        "method": "POST",
        "url": url,
        "data": data
    })
    return ajax_entrega;
} // Final función ajax_entrega(url, data)

/**
 * @author javi98
 * @version 1.0
 * @name listar_stock_bd
 * @description Función para listar los stocks de la base de datos al iniciar la pagina.
 * @param 
 */
function listar_stock_bd() {
    ajax_stock("PHP/stock/listar.php", "")
        .done(function (info) {

            /*Condicion de que si la respuesta no hay datos en la tabla de base de datos no muestre ningun error*/
            if (info.includes("null") != true) {

                var $stock = JSON.parse(info);

                for (var i in $stock.data) {
                    var $producto = $stock.data[i].producto;
                    var $unidades = $stock.data[i].unidades;

                    $("#select-stock-producto").append(new Option($producto, $unidades));

                }

            }

            /*Llamar a la función listar_stock() para mostrar los productos por pantalla*/
            listar_stock()

        });
} // Final función listar_stock_bd()

/**
 * @author javi98
 * @version 1.0
 * @name ajax_stock
 * @description Función para obtener los valores de los stocks de la base de datos al iniciar la pagina.
 * @param 
 */
function ajax_stock(url, data) {
    var ajax_stock = $.ajax({
        "method": "POST",
        "url": url,
        "data": data
    })
    return ajax_stock;
} // Final función ajax_stock(url, data)

/**
 * @author javi98
 * @version 1.0
 * @name insertar_login
 * @description Función para insertar los usuarios de la base de datos.
 * @param id valor de la id del menu login.
 * @param email valor del email del menu login.
 * @param password valor de la contraseña del menu login.
 */
function insertar_login(id, email, password) {
    $id = id;
    $email = email;
    $password = password;

    $.ajax({
        type: 'POST',
        url: 'PHP/usuarios/insertar.php',
        data: ('email=' + $email + '&id=' + $id + '&password=' + $password),
        success: function (respuesta) {
            if (respuesta == 1) {
                alert("El usuario con el correo " + $email + " se ha insertado correctamente en la base de datos");
            } else {
                alert("El usuario no se ha podido insertar en la base de datos");
            }
        }
    });
} // Final función insertar_login(id, email, password)

/**
 * @author javi98
 * @version 1.0
 * @name modificar_login_bd
 * @description Función para modificar los valores de los usuarios de la base de datos.
 * @param email valor del telefono del menu login.
 * @param password valor de la contraseña del menu login.
 */
function modificar_login_bd(id, email, password) {
    $id = id;
    $email = email;
    $password = password;

    $.ajax({
        type: 'POST',
        url: 'PHP/usuarios/modificar.php',
        data: ('email=' + $email + '&id=' + $id + '&password=' + $password),
        success: function (respuesta) {
            if (respuesta == 1) {
                alert("El usuario se ha actualizado correctamente en la base de datos");
            } else {
                alert("La usuario no se ha podido actualizar en la base de datos");
            }
        }
    });
} // Final función modificar_login_bd(id, email, password)

/**
 * @author javi98
 * @version 1.0
 * @name eliminar_login_bd
 * @description Función para eliminar los valores de los usuarios de la base de datos.
 * @param id valor del id del menu login
 */
function eliminar_login_bd(id) {
    $id = id;

    $.ajax({
        type: 'POST',
        url: 'PHP/usuarios/eliminar.php',
        data: ('id=' + $id),
        success: function (respuesta) {
            if (respuesta == 1) {
                alert("El usuario se ha eliminado correctamente en la base de datos");
            } else {
                alert("El usuario no se ha podido eliminar en la base de datos");
            }
        }
    });
} // Final función eliminar_login_bd(id)

/**
 * @author javi98
 * @version 1.0
 * @name insertar_producto
 * @description Función para insertar los productos de la base de datos.
 * @param producto valor del producto del menu productos
 * @param precio valor del precio del menu productos
 */
function insertar_producto(producto, precio) {
    $producto = producto;
    $precio = precio;

    $.ajax({
        type: 'POST',
        url: 'PHP/productos/insertar.php',
        data: ('producto=' + $producto + '&precio=' + $precio),
        success: function (respuesta) {
            if (respuesta == 1) {
                alert("El producto " + $producto + " se ha insertado correctamente en la base de datos");
            } else {
                alert("El producto no se ha podido insertar en la base de datos");
            }
        }
    });
} // Final función insertar_producto(producto, precio)

/**
 * @author javi98
 * @version 1.0
 * @name modificar_producto_bd
 * @description Función para modificar los valores de los productos de la base de datos.
 * @param producto valor del producto del menu productos
 * @param precio valor del precio del menu productos
 */
function modificar_producto_bd(producto, precio) {
    $producto = producto;
    $precio = precio;

    $.ajax({
        type: 'POST',
        url: 'PHP/productos/modificar.php',
        data: ('producto=' + $producto + '&precio=' + $precio),
        success: function (respuesta) {
            if (respuesta == 1) {
                alert("El producto " + $producto + " se ha actualizado correctamente en la base de datos");
            } else {
                alert("El producto no se ha podido actualizar en la base de datos");
            }
        }
    });
} // Final función modificar_producto_bd(producto, precio)

/**
 * @author javi98
 * @version 1.0
 * @name eliminar_producto_bd
 * @description Función para eliminar los valores de los productos de la base de datos.
 * @param producto valor del producto del menu productos
 */
function eliminar_producto_bd(producto) {
    $producto = producto;

    $.ajax({
        type: 'POST',
        url: 'PHP/productos/eliminar.php',
        data: ('producto=' + $producto),
        success: function (respuesta) {
            if (respuesta == 1) {
                alert("El producto " + $producto + " se ha eliminado correctamente en la base de datos");
            } else {
                alert("El producto no se ha podido eliminar en la base de datos");
            }
        }
    });
} // Final función eliminar_producto_bd(producto)

/**
 * @author javi98
 * @version 1.0
 * @name insertar_entrega
 * @description Función para insertar las entregas de la base de datos.
 * @param id valor de la id del menu entrega.
 * @param telefono valor del telefono del menu entrega.
 * @param fecha_inicio valor de la fecha_inicio del menu entrega.
 * @param fecha_final valor de la fecha_final del menu entrega.
 */
function insertar_entrega(id, telefono, fecha_inicio, fecha_final) {
    $id = id;
    $telefono = telefono;
    $fecha_inicio = fecha_inicio;
    $fecha_final = fecha_final;

    $.ajax({
        type: 'POST',
        url: 'PHP/entrega/insertar.php',
        data: ('telefono=' + $telefono + '&id=' + $id + '&fecha_inicio=' + $fecha_inicio + '&fecha_final=' + $fecha_final),
        success: function (respuesta) {
            if (respuesta == 1) {
                alert("La entrega con el telefono " + $telefono + " se ha insertado correctamente en la base de datos");
            } else {
                alert("La entrega no se ha podido insertar en la base de datos");
            }
        }
    });
} // Final función insertar_entrega(id, telefono, fecha_inicio, fecha_final)

/**
 * @author javi98
 * @version 1.0
 * @name modificar_entrega_bd
 * @description Función para modificar los valores de las entregas de la base de datos.
 * @param telefono valor del telefono del menu entrega.
 * @param fecha_inicio valor de la fecha_inicio del menu entrega.
 * @param fecha_final valor de la fecha_final del menu entrega.
 */
function modificar_entrega_bd(id, telefono, fecha_inicio, fecha_final) {
    $id = id;
    $telefono = telefono;
    $fecha_inicio = fecha_inicio;
    $fecha_final = fecha_final;

    $.ajax({
        type: 'POST',
        url: 'PHP/entrega/modificar.php',
        data: ('telefono=' + $telefono + '&id=' + $id + '&fecha_inicio=' + $fecha_inicio + '&fecha_final=' + $fecha_final),
        success: function (respuesta) {
            if (respuesta == 1) {
                alert("La entrega se ha actualizado correctamente en la base de datos");
            } else {
                alert("La entrega no se ha podido actualizar en la base de datos");
            }
        }
    });
} // Final función modificar_entrega_bd(id, telefono, fecha_inicio, fecha_final)

/**
 * @author javi98
 * @version 1.0
 * @name eliminar_entrega_bd
 * @description Función para eliminar los valores de las entregas de la base de datos.
 * @param id valor del id del menu entrega
 */
function eliminar_entrega_bd(id) {
    $id = id;

    $.ajax({
        type: 'POST',
        url: 'PHP/entrega/eliminar.php',
        data: ('id=' + $id),
        success: function (respuesta) {
            if (respuesta == 1) {
                alert("La entrega se ha eliminado correctamente en la base de datos");
            } else {
                alert("La entrega no se ha podido eliminar en la base de datos");
            }
        }
    });
} // Final función eliminar_entrega_bd(id)

/**
 * @author javi98
 * @version 1.0
 * @name insertar_stock
 * @description Función para insertar los stocks de la base de datos.
 * @param producto valor del producto del menu stock
 * @param unidades valor de la unidades del menu stock
 */
function insertar_stock(producto, unidades) {
    $producto = producto;
    $unidades = unidades;

    $.ajax({
        type: 'POST',
        url: 'PHP/stock/insertar.php',
        data: ('producto=' + $producto + '&unidades=' + $unidades),
        success: function (respuesta) {
            if (respuesta == 1) {
                alert("El producto " + $producto + " se ha insertado correctamente en la base de datos");
            } else {
                alert("El producto no se ha podido insertar en la base de datos");
            }
        }
    });
} // Final función insertar_stock(producto, stock)

/**
 * @author javi98
 * @version 1.0
 * @name modificar_stock_bd
 * @description Función para modificar los valores de los stocks de la base de datos.
 * @param producto valor del producto del menu stock
 * @param unidades valor de las unidades del menu stock
 */
function modificar_stock_bd(producto, unidades) {
    $producto = producto;
    $unidades = unidades;

    $.ajax({
        type: 'POST',
        url: 'PHP/stock/modificar.php',
        data: ('producto=' + $producto + '&unidades=' + $unidades),
        success: function (respuesta) {
            if (respuesta == 1) {
                alert("El producto " + $producto + " se ha actualizado correctamente en la base de datos");
            } else {
                alert("El producto no se ha podido actualizar en la base de datos");
            }
        }
    });
} // Final función modificar_stock_bd(producto, unidades)

/**
 * @author javi98
 * @version 1.0
 * @name eliminar_stock_bd
 * @description Función para eliminar los valores de los stocks de la base de datos.
 * @param producto valor del producto del menu stock
 */
function eliminar_stock_bd(producto) {
    $producto = producto;

    $.ajax({
        type: 'POST',
        url: 'PHP/stock/eliminar.php',
        data: ('producto=' + $producto),
        success: function (respuesta) {
            if (respuesta == 1) {
                alert("El producto " + $producto + " se ha eliminado correctamente en la base de datos");
            } else {
                alert("El producto no se ha podido eliminar en la base de datos");
            }
        }
    });
} // Final función eliminar_stock_bd(producto)