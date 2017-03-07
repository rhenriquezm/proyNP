<?php

require_once '/../datos/ConexionBD.php';

class np_region
{
    // Datos de la tabla "np_region"

    const NOMBRE_TABLA = "np_region";
    const ID           = "id";
    const NOMBRE       = "nombre";
    const FECHAACTU    = "fecha_actu";
    const PAIS         = "idPais";

    const ESTADO_CREACION_EXITOSA       = 1;
    const ESTADO_CREACION_FALLIDA       = 2;
    const ESTADO_ERROR_BD               = 3;
    const ESTADO_AUSENCIA_CLAVE_API     = 4;
    const ESTADO_CLAVE_NO_AUTORIZADA    = 5;
    const ESTADO_URL_INCORRECTA         = 6;
    const ESTADO_FALLA_DESCONOCIDA      = 7;
    const ESTADO_PARAMETROS_INCORRECTOS = 8;

    public static function post($peticion) {
        if ($peticion[0] == 'region') {
            return self::obtenerRegion();

        }

    }

    private function obtenerRegion()
    {
        $respuesta = array();

        $body = file_get_contents('php://input');

        $region = json_decode($body);

        $id = $region->id;

        $regionBD = self::obtenerRegionID($id);

        if ($regionBD != null) {
            http_response_code(200);

            $respuesta["nombre"] = $regionBD["nombre"];
            

            return ["estado" => 1, "region" => $respuesta];
        } else {
            throw new ExcepcionApi(self::ESTADO_FALLA_DESCONOCIDA, "Ha ocurrido un error");
        }

    }

    private function obtenerRegionID($id)
    {

        $comando = "SELECT " .
        self::NOMBRE .
        " FROM " .
        self::NOMBRE_TABLA .
        " WHERE " .
        self::ID . " =:id";

        echo $comando;

        try {
            $sentencia = ConexionBD::obtenerInstancia()->obtenerBD()->prepare($comando);

            $sentencia->bindParam("id", $id);

            if ($sentencia->execute()) {
                return $sentencia->fetch(PDO::FETCH_ASSOC);
            } else {
                return null;
            }

        } catch (Exception $e) {

        }
    }

}
