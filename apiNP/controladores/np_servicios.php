<?php

require_once "datos/ConexionBDServicio.php";

class np_servicios
{
    const CODIGO_EXITO            = 1;
    const ESTADO_EXITO            = 1;
    const ESTADO_ERROR            = 2;
    const ESTADO_ERROR_BD         = 3;
    const ESTADO_ERROR_PARAMETROS = 4;
    const ESTADO_NO_ENCONTRADO    = 5;

    const ESTADO_CREACION_EXITOSA       = 1;
    const ESTADO_CREACION_FALLIDA       = 2;
    const ESTADO_AUSENCIA_CLAVE_API     = 4;
    const ESTADO_CLAVE_NO_AUTORIZADA    = 5;
    const ESTADO_URL_INCORRECTA         = 6;
    const ESTADO_FALLA_DESCONOCIDA      = 7;
    const ESTADO_PARAMETROS_INCORRECTOS = 8;

    public static function post($peticion)
    {
        if ($peticion[0] == 'busqueda') { // La peticion extraida desde la url
            return self::buscar(); // Se devuelve el resultado de la
        }
    }

    public static function get($peticion)
    {
        if ($peticion[0] == 'ciudades') {
            return self::obtenerCiudades();
        }
    }

    private function buscar()
    {
        $cuerpo    = file_get_contents('php://input');
        $servicios = json_decode($cuerpo);
        $servicio  = $servicios->id;
        $ciudad    = $servicios->ciudad;

        $resServicios = self::busquedaServicios($servicio, $ciudad);

        if ($resServicios != null) {
            http_response_code(200);
            $respuesta = $resServicios;

            return ["estado" => 1, "servicios" => $respuesta];
        } else {
            throw new ExcepcionApi(self::ESTADO_FALLA_DESCONOCIDA, "Ha ocurrido un error");
        }
    }

    private function busquedaServicios($servicio, $ciudad)
    {
        $comando = "SELECT * FROM " .
            $servicio .
            " AS fu INNER JOIN comunas AS co " .
            " ON fu.cod_ciu_funeraria = co.id_comuna" .
            " WHERE fu.cod_ciu_funeraria " . "=:ciudad";

        //echo $comando;

        $sentencia = ConexionBDServicio::obtenerInstancia()->obtenerBD()->prepare($comando);
        $sentencia->bindParam("ciudad", $ciudad);

        if ($sentencia->execute()) {

            $resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);

            return $resultado;

        } else {
            return null;
        }

    }

    private function obtenerCiudades()
    {

        $resCiudades = self::ciudadesBD();

        if ($resCiudades != null) {
            http_response_code(200);
            $respuesta = $resCiudades;

            return ["estado" => 1, "ciudades" => $respuesta];
        } else {
            throw new ExcepcionApi(self::ESTADO_FALLA_DESCONOCIDA, "Ha ocurrido un error");
        }
    }

    private function ciudadesBD()
    {
        $comando = "select * from comunas order by nom_com";

        $sentencia = ConexionBDServicio::obtenerInstancia()->obtenerBD()->prepare($comando);

        if ($sentencia->execute()) {
            $respuesta = $sentencia->fetchAll(PDO::FETCH_ASSOC);
            return $respuesta;
        } else {
            return null;
        }
    }
}
