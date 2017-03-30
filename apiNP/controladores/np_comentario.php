<?php

require_once '/../datos/ConexionBD.php';

class np_comentario
{
    // Datos de la tabla "np_difunto"

    const NOMBRE_TABLA = "np_comentario";
    const ID           = "id";
    const IDDIFUNTO    = "idDifunto";
    const FECACTU      = "fec_actu";
    const IDUSUARIO    = "idUsuario";
    const ESTADO       = "estado";
    // Codigos de Estados

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
        if ($peticion[0] == "ultimocomentario") {
            return self::obtenerUltComentario();
        } else {
            throw new ExcepcionApi(self::ESTADO_URL_INCORRECTA, "Url mal formada", 400);
        }
    }

    public function obtenerUltComentario()
    {
        $cuerpo = file_get_contents('php://input');
        $data   = json_decode($cuerpo); //json

        $id = $data->id;

        $resultado = self::obtenerUltComentarioBD($id);

        if ($resultado != null) {
            http_response_code(200);
            return
                [
                "estado"        => self::ESTADO_CREACION_EXITOSA,
                "ultComentario" => $resultado,
            ];

        } else {
            return [
                "estado"  => self::ESTADO_FALLA_DESCONOCIDA,
                "mensaje" => "Falla desconocida",
            ];
        }
    }

    public function obtenerUltComentarioBD($id)
    {

        $comando = "SELECT di.nombres, di.ap_paterno, co.id, co.texto, di.url_avatar FROM np_comentario AS co INNER JOIN np_difunto AS di ON co.idDifunto = di.id WHERE co.idUsuario" . "=:id" . " ORDER BY di.fec_actu DESC LIMIT 1";

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
