<?php

//require 'controladores/usuarios.php';
//require 'controladores/contactos.php';
require 'controladores/np_usuario.php';
require 'controladores/np_pais.php';
require 'controladores/np_region.php';
require 'vistas/VistaXML.php';
require 'vistas/VistaJson.php';
require 'utilidades/ExcepcionApi.php';

// Constantes de estado
const ESTADO_URL_INCORRECTA      = 2;
const ESTADO_EXISTENCIA_RECURSO  = 3;
const ESTADO_METODO_NO_PERMITIDO = 4;

// Preparar manejo de excepciones
$formato = isset($_GET['formato']) ? $_GET['formato'] : 'json';

switch ($formato) {
    case 'xml':
        $vista = new VistaXML();
        break;
    case 'json':
    default:
        $vista = new VistaJson();
}

set_exception_handler(function ($exception) use ($vista) {
    $cuerpo = array(
        "estado"  => $exception->estado,
        "mensaje" => $exception->getMessage(),
    );
    if ($exception->getCode()) {
        $vista->estado = $exception->getCode();
    } else {
        $vista->estado = 500;
    }

    $vista->imprimir($cuerpo);
}
);

// Extraer segmento de la url
if (isset($_GET['PATH_INFO'])) {
    $peticion = explode('/', $_GET['PATH_INFO']);
} else {
    throw new ExcepcionApi(ESTADO_URL_INCORRECTA, utf8_encode("No se reconoce la petici�n"));
}

// Obtener recurso
$recurso             = array_shift($peticion);
$recursos_existentes = array('contactos', 'usuarios', 'np_usuario', 'np_pais', 'np_region');

// Comprobar si existe el recurso
if (!in_array($recurso, $recursos_existentes)) {
    throw new ExcepcionApi(ESTADO_EXISTENCIA_RECURSO,
        "No se reconoce el recurso al que intentas acceder");
}

$metodo = strtolower($_SERVER['REQUEST_METHOD']);

// Filtrar m�todo

if ($recurso == 'np_usuario') {
    switch ($metodo) {
        case 'get':
        case 'post':
            $vista->imprimir(np_usuario::post($peticion));
        case 'put':
        case 'delete':
        default:
            // M�todo no aceptado
            $vista->estado = 405;
            $cuerpo        = [
                "estado"  => ESTADO_METODO_NO_PERMITIDO,
                "mensaje" => utf8_encode("M�todo no permitido"),
            ];
            $vista->imprimir($cuerpo);
    }
} else if ($recurso == 'np_pais') {
    switch ($metodo) {
        case 'get':
            $vista->imprimir(np_pais::get($peticion));
        case 'post':
            $vista->imprimir(np_pais::post($peticion));
        case 'put':
        case 'delete':
        default:
            // M�todo no aceptado
            $vista->estado = 405;
            $cuerpo        = [
                "estado"  => ESTADO_METODO_NO_PERMITIDO,
                "mensaje" => utf8_encode("M�todo no permitido"),
            ];
            $vista->imprimir($cuerpo);
    }
}else if ($recurso == 'np_region') {
    switch ($metodo) {
        case 'get':
            $vista->imprimir(np_region::get($peticion));
        case 'post':
            $vista->imprimir(np_region::post($peticion));
        case 'put':
        case 'delete':
        default:
            // M�todo no aceptado
            $vista->estado = 405;
            $cuerpo        = [
                "estado"  => ESTADO_METODO_NO_PERMITIDO,
                "mensaje" => utf8_encode("M�todo no permitido"),
            ];
            $vista->imprimir($cuerpo);
    }
}
