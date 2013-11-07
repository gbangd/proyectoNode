/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function(){
  
	$.post("http://localhost/server/site/gestionArticulos.php",function(resultado){
                                            
                var dato = "<h1>Artículos</h1><br/>";
                
                if($.isEmptyObject(resultado))
                {
                    dato +="<h4 style='color:black'> No hemos encontrado ningún elemento :(</h4>";
                }
                else
                {
                    dato += "<table class='table table-striped'>";
                    dato += "<tr><th>Id</th><th>Codigo</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Descripcion</th><th>Imagen</th></tr>";
                    $.each(resultado,function(){
                            dato+="<tr><td>"+this['id']+"</td>";
                            dato+="<td>"+this['codigo']+"</td>";
                            dato+="<td>"+this['nombre']+"</td>";
                            dato+="<td>"+this['precioUnidad']+"</td>";
                            dato+="<td>"+this['stock']+"</td>";
                            dato+="<td>"+this['descripcion']+"</td>";
                            dato+="<td><img src='http://localhost/server/site/imagenes/"+this['imagen']+"' widht='40px' height='60px'/></td>";
                            dato+="</tr>";
                    });
                    dato+="</table>";
                }
                $("#tablaDeDatos").html(dato);
	}, "json");
});

//Busqueda por Nombre
$("#formularioBuscarPorNombre").submit(function(event){
	event.preventDefault();
	var dato1 = $("#nombre").val();
	$.post("http://localhost/server/site/gestionArticulos.php",{nombre:dato1},function(resultado){
                var dato = "<h1>Artículos</h1><br/>";
                if($.isEmptyObject(resultado))
                {
                    dato +="<h4 style='color:black'> No hemos encontrado un elemento que coincida con su busqueda :(</h4>";
                }
                else
                {
                    //Formulario Ordenar Tabla
                    dato += "<table class='table table-striped'>";
                    dato += "<tr><th>Id</th><th>Codigo</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Descripcion</th><th>Imagen</th></tr>";
                    $.each(resultado,function(){
                            dato+="<tr><td>"+this['id']+"</td>";
                            dato+="<td>"+this['codigo']+"</td>";
                            dato+="<td>"+this['nombre']+"</td>";
                            dato+="<td>"+this['precioUnidad']+"</td>";
                            dato+="<td>"+this['stock']+"</td>";
                            dato+="<td>"+this['descripcion']+"</td>";
                            dato+="<td><img src='http://localhost/server/site/imagenes/"+this['imagen']+"'      widht='40px' height='60px'/></td>";
                            dato+="</tr>";
                    });
                    dato+="</table>";
                }
                $("#tablaDeDatos").html(dato);
	}, "json");
});


//Busqueda Por precio
$("#formularioBuscarPorPrecio").submit(function(event){
	event.preventDefault();
	var dato1 = $("#precio").val();
	$.post("http://localhost/server/site/gestionArticulos.php",{precio:dato1},function(resultado){
                var dato = "<h1>Artículos</h1><br/>";
                if($.isEmptyObject(resultado))
                {
                    dato +="<h4 style='color:black'> No hemos encontrado un elemento que coincida con su busqueda :(</h4>";
                }
                else
                {
                    dato += "<table class='table table-striped'>";
                    dato += "<tr><th>Id</th><th>Codigo</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Descripcion</th><th>Imagen</th></tr>";
                    $.each(resultado,function(){
                            dato+="<tr><td>"+this['id']+"</td>";
                            dato+="<td>"+this['codigo']+"</td>";
                            dato+="<td>"+this['nombre']+"</td>";
                            dato+="<td>"+this['precioUnidad']+"</td>";
                            dato+="<td>"+this['stock']+"</td>";
                            dato+="<td>"+this['descripcion']+"</td>";
                            dato+="<td><img src='http://localhost/server/site/imagenes/"+this['imagen']+"' widht='40px' height='60px'/></td>";
                            dato+="</tr>";
                    });
                    dato+="</table>";
                }
                $("#tablaDeDatos").html(dato);
	}, "json");
});

//Listar todos los datos
$("#botonListarDatos").click(function(){
	$.post("http://localhost/server/site/gestionArticulos.php",function(resultado){
                var dato = "<h1>Artículos</h1><br/>";
                
                if($.isEmptyObject(resultado))
                {
                    dato +="<h4 style='color:black'> No hemos encontrado ningún elemento :(</h4>";
                }
                else
                {
                   dato += "<table class='table table-striped'>";
                    dato += "<tr><th>Id</th><th>Codigo</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Descripcion</th><th>Imagen</th></tr>";
                    $.each(resultado,function(){
                            dato+="<tr><td>"+this['id']+"</td>";
                            dato+="<td>"+this['codigo']+"</td>";
                            dato+="<td>"+this['nombre']+"</td>";
                            dato+="<td>"+this['precioUnidad']+"</td>";
                            dato+="<td>"+this['stock']+"</td>";
                            dato+="<td>"+this['descripcion']+"</td>";
                            dato+="<td><img src='http://localhost/server/site/imagenes/"+this['imagen']+"' widht='40px' height='60px'/></td>";
                            dato+="</tr>";
                    });
                    dato+="</table>";
                }
                $("#tablaDeDatos").html(dato);
	}, "json");
});

//Ordenar Ascendente
$("#asc").click(function(){
        var dato1 = "";
	$.post("http://localhost/server/site/gestionArticulos.php",{asc:dato1},function(resultado){
                var dato = "<h1>Artículos</h1><br/>";
                
                if($.isEmptyObject(resultado))
                {
                    dato +="<h4 style='color:black'> No hemos encontrado ningún elemento :(</h4>";
                }
                else
                {
                    dato += "<table class='table table-striped'>";
                    dato += "<tr><th>Id</th><th>Codigo</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Descripcion</th><th>Imagen</th></tr>";
                    $.each(resultado,function(){
                            dato+="<tr><td>"+this['id']+"</td>";
                            dato+="<td>"+this['codigo']+"</td>";
                            dato+="<td>"+this['nombre']+"</td>";
                            dato+="<td>"+this['precioUnidad']+"</td>";
                            dato+="<td>"+this['stock']+"</td>";
                            dato+="<td>"+this['descripcion']+"</td>";
                            dato+="<td><img src='http://localhost/server/site/imagenes/"+this['imagen']+"' widht='40px' height='60px'/></td>";
                            dato+="</tr>";
                    });
                    dato+="</table>";
                }
                $("#tablaDeDatos").html(dato);
	}, "json");
});

//Ordenar Descendente
$("#dsc").click(function(){
        var dato1 = "";
	$.post("http://localhost/server/site/gestionArticulos.php",{desc:dato1},function(resultado){
                var dato = "<h1>Artículos</h1><br/>";
                
                if($.isEmptyObject(resultado))
                {
                    dato +="<h4 style='color:black'> No hemos encontrado ningún elemento :(</h4>";
                }
                else
                {
                    dato += "<table class='table table-striped'>";
                    dato += "<tr><th>Id</th><th>Codigo</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Descripcion</th><th>Imagen</th></tr>";
                    $.each(resultado,function(){
                            dato+="<tr><td>"+this['id']+"</td>";
                            dato+="<td>"+this['codigo']+"</td>";
                            dato+="<td>"+this['nombre']+"</td>";
                            dato+="<td>"+this['precioUnidad']+"</td>";
                            dato+="<td>"+this['stock']+"</td>";
                            dato+="<td>"+this['descripcion']+"</td>";
                            dato+="<td><img src='http://localhost/server/site/imagenes/"+this['imagen']+"' widht='40px' height='60px'/></td>";
                            dato+="</tr>";
                    });
                    dato+="</table>";
                }
                $("#tablaDeDatos").html(dato);
	}, "json");
});

//Generar Factura
$("#formularioFactura").submit(function(event){
	event.preventDefault();
	var dato1 = $("#id").val();
        var dato2 = $("#cantidad").val();

        $.post("http://localhost/server/site/gestionArticulos.php",{id:dato1, cantidad:dato2},function(resultado){
                var dato = "<h1>Factura</h1><br/>";
                var total =0;
                if($.isEmptyObject(resultado))
                {
                    dato +="<h4 style='color:black'> No hemos encontrado un elemento que coincida con su busqueda :(</h4>";
                }
                else
                {
                    dato += "<table class='table table-striped'>";
                    dato += "<tr><th>Id</th><th>Nombre</th><th>Precio Unitario</th><th>Cantidad</th><th>Subtotal</th></tr>";
                    $.each(resultado,function(){
                            dato+="<tr><td>"+this['idArticulo']+"</td>";
                            dato+="<td>"+this['nombre']+"</td>";
                            dato+="<td>"+this['precioUnidad']+"</td>";
                            dato+="<td>"+this['cantidad']+"</td>";
                            dato+="<td><b style='color:green'>"+this['Subtotal']+"</b></td>";
                            dato+="</tr>";
                            total += parseInt(this['Subtotal']);
                    });
                    dato+= "<tr><td colspan='3'></td><td><b>Total:</b></td><td>"+total+"</td><tr>";
                    dato+="</table>";
                    $("#comprar").show();
                }
                $("#factura").html(dato);
	}, "json");
});


//Comprar
$("#comprar").click(function(){
        var dato2 = $("#id").val();
	$.post("http://localhost/server/site/gestionArticulos.php",{comprar:dato2},function(resultado){
                var dato = "<h1>Compra correcta :)</h1><br/>";
                resultado = "hola";
                $("#factura").html(dato);
                $("#comprar").hide();
	}, "json");
});