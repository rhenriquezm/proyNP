<?php

require_once '/../datos/ConexionBD.php';

class np_difunto
{
    // Datos de la tabla "np_difunto"

    const NOMBRE_TABLA      = "np_difunto";
    const ID                = "id";
    const EMAIL             = "email";
    const NOMBRES           = "nombres";
    const APPATERNO         = "ap_paterno";
    const APMATERNO         = "ap_materno";
    const FECNACIMIENTO     = "fec_nacimiento";
    const FECFALLECIMIENTO  = "fec_fallecimiento";
    const EPITAFIO          = "epitafio";
    const BIOGRAFIA         = "biografia";
    const FECACTU           = "fec_actu";
    const IDADMIN           = "idAdministrador";
    const IDPLAN            = "idPlan";
    const CODEQR            = "code_QR";
    const ESTADO            = "estado";
    const SEXO              = "sexo";
    const IDTEMA            = "idTema";
    const IDCOMUNA          = "idComuna";
    const FECREGISTRO       = "fec_registro";
    const IDLUGARENTIERRO   = "idLugarEntierro";
    const IDREGION          = "idRegion";
    const OTROLUGARENTIERRO = "otro_lugar_entierro";
    const IDPAIS            = "idPais";
    const URLAVATAR         = "url_avatar";
    const URLBANNER         = "url_banner";

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

    // Para hacer  algun dato o bien realizar el login

    public static function put($peticion)
    {
        // HTTP - Metodos Rest (post, get, put, delete)
        if ($peticion[0] == 'registro') { // La peticion extraida desde la url
            return self::registrar(); // Se devuelve el resultado de la
        } else {
            throw new ExcepcionApi(self::ESTADO_URL_INCORRECTA, "Url mal formada", 400);
        }
    }

    public static function post($peticion)
    {
        if ($peticion[0] == "obtenerdifuntos") {
            return self::obtenerDifuntos();
        } else {
            throw new ExcepcionApi(self::ESTADO_URL_INCORRECTA, "Url mal formada", 400);
        }
    }

    public function registrar()
    {
        $cuerpo  = file_get_contents('php://input');
        $difunto = json_decode($cuerpo); //json

        $resultado = self::crear($difunto);

        switch ($resultado) {
            case self::ESTADO_CREACION_EXITOSA:
                http_response_code(200);
                return
                    [
                    "estado"  => self::ESTADO_CREACION_EXITOSA,
                    "mensaje" => utf8_encode("¡Registro con éxito!"),
                ];
                break;
            case self::ESTADO_CREACION_FALLIDA:
                throw new ExcepcionApi(self::ESTADO_CREACION_FALLIDA, "Ha ocurrido un error");
                break;
            default:
                throw new ExcepcionApi(self::ESTADO_FALLA_DESCONOCIDA, "Falla desconocida", 400);
        }
    }

/**
 * Crea un nuevo Difunto en la tabla "Difunto"
 * @param mixed $nuevoDifunto columnas del registro
 * @return int codigo para determinar si la inserción fue exitosa
 */
    public function crear($nuevoDifunto)
    {
        try {

            $pdo = ConexionBD::obtenerInstancia()->obtenerBD();

            // Sentencia INSERT
            $comando = "UPDATE " . self::NOMBRE_TABLA .
            " SET " .
            self::NOMBRES . "=:nombres" . "," .
            self::APPATERNO . "=:ap_paterno" . "," .
            self::APMATERNO . "=:ap_materno" . "," .
            self::SEXO . "=:sexo" . "," .
            self::FECNACIMIENTO . "=:fec_nacimiento" . "," .
            self::FECFALLECIMIENTO . "=:fec_fallecimiento" . "," .
            self::EPITAFIO . "=:epitafio" . "," .
            self::BIOGRAFIA . "=:biografia" . "," .
            self::IDADMIN . "=:idAdministrador" . "," .
            self::IDPLAN . "=:idPlan" . "," .
            self::IDTEMA . "=:idTema" . "," .
            self::IDLUGARENTIERRO . "=:idLugarEntierro" . "," .
            self::IDREGION . "=:idRegion" . "," .
            self::OTROLUGARENTIERRO . "=:otro_lugar_entierro" . "," .
            self::IDPAIS . "=:idPais" .
            " WHERE " . self::ID . "=:id";

            $sentencia = $pdo->prepare($comando);

            $sentencia->bindParam("id", $id);
            $sentencia->bindParam("nombres", $nombres);
            $sentencia->bindParam("ap_paterno", $ap_paterno);
            $sentencia->bindParam("ap_materno", $ap_materno);
            $sentencia->bindParam("fec_nacimiento", $fec_nacimiento);
            $sentencia->bindParam("fec_fallecimiento", $fec_fallecimiento);
            $sentencia->bindParam("epitafio", $epitafio);
            $sentencia->bindParam("biografia", $biografia);
            $sentencia->bindParam("idAdministrador", $idAdministrador);
            $sentencia->bindParam("idPlan", $idPlan);
            $sentencia->bindParam("sexo", $sexo);
            $sentencia->bindParam("idTema", $idTema);
            $sentencia->bindParam("idLugarEntierro", $idLugarEntierro);
            $sentencia->bindParam("idRegion", $idRegion);
            $sentencia->bindParam("otro_lugar_entierro", $otro_lugar_entierro);
            $sentencia->bindParam("idPais", $idPais);

            $nombres             = $nuevoDifunto->nombres;
            $ap_paterno          = $nuevoDifunto->ap_paterno;
            $ap_materno          = $nuevoDifunto->ap_materno;
            $fec_nacimiento      = $nuevoDifunto->fec_nacimiento;
            $fec_fallecimiento   = $nuevoDifunto->fec_fallecimiento;
            $epitafio            = $nuevoDifunto->epitafio;
            $biografia           = $nuevoDifunto->biografia;
            $idAdministrador     = $nuevoDifunto->idAdministrador;
            $idPlan              = $nuevoDifunto->idPlan;
            $sexo                = $nuevoDifunto->sexo;
            $idTema              = $nuevoDifunto->idTema;
            $idLugarEntierro     = $nuevoDifunto->idLugarEntierro;
            $idRegion            = $nuevoDifunto->idRegion;
            $otro_lugar_entierro = $nuevoDifunto->otro_lugar_entierro;
            $idPais              = $nuevoDifunto->idPais;
            $id                  = $nuevoDifunto->id;

            $resultado = $sentencia->execute();

            if ($resultado) {
                return self::ESTADO_CREACION_EXITOSA;
            } else {
                return self::ESTADO_CREACION_FALLIDA;
            }
        } catch (PDOException $e) {
            throw new ExcepcionApi(self::ESTADO_ERROR_BD, $e->getMessage());
        }
    }

    public function obtenerDifuntos()
    {
        $cuerpo  = file_get_contents('php://input');
        $difunto = json_decode($cuerpo); //json

        $id = $difunto->id;

        $difuntosBD = self::obtenerDifuntoPorId($id);

        if ($difuntosBD != null) {
            http_response_code(200);

            $respuesta = $difuntosBD;

            return ["estado" => 1, "difuntos" => $respuesta];
        } else {
            throw new ExcepcionApi(self::ESTADO_FALLA_DESCONOCIDA,
                "Ha ocurrido un error");
        }
    }

    public function obtenerDifuntoPorId($id)
    {

        $comando = "SELECT " .
        self::ID . "," .
        self::NOMBRES . "," .
        self::APPATERNO . "," .
        self::ESTADO . "," .
        self::IDPLAN . "," .
        self::URLAVATAR .
        " FROM " . self::NOMBRE_TABLA .
        " WHERE " . self::IDADMIN . " =:id";

        try {
            $sentencia = ConexionBD::obtenerInstancia()->obtenerBD()->prepare($comando);

            $sentencia->bindParam("id", $id);

            if ($sentencia->execute()) {
                return $sentencia->fetchAll(PDO::FETCH_ASSOC);
            } else {
                return null;
            }

        } catch (Exception $e) {

        }
    }
}
