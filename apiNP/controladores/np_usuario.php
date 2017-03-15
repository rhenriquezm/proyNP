<?php

require_once '/../datos/ConexionBD.php';

class np_usuario
{
    // Datos de la tabla "np_usuario"

    const NOMBRE_TABLA  = "np_usuario";
    const ID            = "id";
    const EMAIL         = "email";
    const NOMBRES       = "nombres";
    const APPATERNO     = "ap_paterno";
    const APMATERNO     = "ap_materno";
    const NRODOCUMENTO  = "nro_documento_identif";
    const CLAVE         = "clave";
    const FECACTU       = "fec_actu";
    const SEXO          = "sexo";
    const ESTADO        = "estado";
    const IDFACEBOOK    = "id_facebook";
    const FECNACIMIENTO = "fec_nacimiento";
    const FECREGISTRO   = "fec_registro";
    const IDCOMUNA      = "idComuna";
    const IDREGION      = "idRegion";
    const IDPAIS        = "idPais";
    const CODIGO        = "codigo";
    const URLAVATAR     = "url_avatar";
    const IDCONVENIO    = "idConvenio";
    const DIRECCION     = "direccion";
    const FONO          = "fono";

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

    public static function post($peticion)
    {
        // HTTP - Metodos Rest (post, get, put, delete)
        if ($peticion[0] == 'registro') { // La peticion extraida desde la url
            return self::registrar(); // Se devuelve el resultado de la
        } else if ($peticion[0] == 'login') { //
            return self::loguear(); //
        } else if ($peticion[0] == 'usuario') { //
            return self::obtenerPerfil(); //
        } else {
            throw new ExcepcionApi(self::ESTADO_URL_INCORRECTA, "Url mal formada", 400);
        }
    }

    public static function put($peticion)
    {
        if ($peticion[0] == 'actualizarUsuario') {
            $body         = file_get_contents('php://input');
            $datosUsuario = json_decode($body);
            if (self::actualizar($datosUsuario)) {
                http_response_code(200);
                return ["estado" => self::CODIGO_EXITO, "mensaje" => "Registro actualizado correctamente"];
            } else {
                throw new ExcepcionApi(self::ESTADO_NO_ENCONTRADO, "El contacto al que intentas acceder no existe", 404);
            }

        } else {
            throw new ExcepcionApi(self::ESTADO_ERROR_PARAMETROS, "Falta id", 422);
        }
    }

    private function actualizar($datosUsuario)
    {
        try {
            // Creando consulta UPDATE
            $consulta = "UPDATE " . self::NOMBRE_TABLA .
            " SET " .
            self::NOMBRES . "=:nombres" . "," .
            self::APPATERNO . "=:ap_paterno" . "," .
            self::APMATERNO . "=:ap_materno" . "," .
            self::SEXO . "=:sexo" . "," .
            self::NRODOCUMENTO . "=:nro_documento_identif" . "," .
            self::IDPAIS . "=:idPais" . "," .
            self::IDREGION . "=:idRegion" .
            " WHERE " . self::ID . "=:id";

            // Preparar la sentencia
            $sentencia = ConexionBD::obtenerInstancia()->obtenerBD()->prepare($consulta);

            $sentencia->bindParam("id", $id);
            $sentencia->bindParam("nombres", $nombres);
            $sentencia->bindParam("ap_paterno", $ap_paterno);
            $sentencia->bindParam("ap_materno", $ap_materno);
            $sentencia->bindParam("sexo", $sexo);
            $sentencia->bindParam("nro_documento_identif", $nro_documento_identif);
            $sentencia->bindParam("idPais", $idPais);
            $sentencia->bindParam("idRegion", $idRegion);

            $id                    = $datosUsuario->id;
            $nombres               = $datosUsuario->nombres;
            $ap_paterno            = $datosUsuario->ap_paterno;
            $ap_materno            = $datosUsuario->ap_materno;
            $sexo                  = $datosUsuario->sexo;
            $nro_documento_identif = $datosUsuario->nro_documento_identif;
            $idPais                = $datosUsuario->idPais;
            $idRegion              = $datosUsuario->idRegion;

            // Ejecutar la sentencia
            $sentencia->execute();

            return $sentencia->rowCount();

        } catch (PDOException $e) {
            throw new ExcepcionApi(self::ESTADO_ERROR_BD, $e->getMessage());
        }
    }

    //Crea un nuevo usuario en la base de datos

    private function registrar()
    {
        $cuerpo  = file_get_contents('php://input');
        $usuario = json_decode($cuerpo);

        $resultado = self::crear($usuario);

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
     * Crea un nuevo usuario en la tabla "usuario"
     * @param mixed $datosUsuario columnas del registro
     * @return int codigo para determinar si la inserción fue exitosa
     */
    private function crear($datosUsuario)
    {
        $nombre = $datosUsuario->nombre;

        $contrasena           = $datosUsuario->contrasena;
        $contrasenaEncriptada = self::encriptarContrasena($contrasena);

        $correo = $datosUsuario->correo;

        $claveApi = self::generarClaveApi();

        try {

            $pdo = ConexionBD::obtenerInstancia()->obtenerBD();

            // Sentencia INSERT
            $comando = "INSERT INTO " . self::NOMBRE_TABLA . " ( " .
            self::NOMBRE . "," .
            self::CONTRASENA . "," .
            self::CLAVE_API . "," .
            self::CORREO . ")" .
                " VALUES(?,?,?,?)";

            $sentencia = $pdo->prepare($comando);

            $sentencia->bindParam(1, $nombre);
            $sentencia->bindParam(2, $contrasenaEncriptada);
            $sentencia->bindParam(3, $claveApi);
            $sentencia->bindParam(4, $correo);

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

    /**
     * Protege la contraseña con un algoritmo de encriptado
     * @param $contrasenaPlana
     * @return bool|null|string
     */
    private function encriptarContrasena($contrasenaPlana)
    {
        if ($contrasenaPlana) {
            return md5($contrasenaPlana);
        } else {
            return null;
        }
    }

    private function generarClaveApi()
    {
        return md5(microtime() . rand());
    }

    private function loguear()
    {
        $respuesta = array();

        $body = file_get_contents('php://input');

        $usuario = json_decode($body);

        $email = $usuario->email;
        $clave = $usuario->clave;

        if (self::autenticar($email, $clave)) {
            $usuarioBD = self::obtenerUsuarioPorCorreo($email);

            if ($usuarioBD != null) {
                http_response_code(200);

                $respuesta["id"]         = $usuarioBD["id"];
                $respuesta["nombres"]    = $usuarioBD["nombres"];
                $respuesta["ap_paterno"] = $usuarioBD["ap_paterno"];
                return ["estado" => 1, "usuario" => $respuesta];
            } else {
                throw new ExcepcionApi(self::ESTADO_FALLA_DESCONOCIDA,
                    "Ha ocurrido un error");
            }
        } else {
            throw new ExcepcionApi(self::ESTADO_PARAMETROS_INCORRECTOS,
                utf8_encode("Correo o contraseña inválidos"));
        }
    }

    private function obtenerPerfil()
    {
        $respuesta = array();

        $body = file_get_contents('php://input');

        $usuario = json_decode($body);

        $id = $usuario->id;

        $usuarioBD = self::obtenerUsuarioPorId($id);

        if ($usuarioBD != null) {
            http_response_code(200);

            $respuesta["email"]                 = $usuarioBD["email"];
            $respuesta["nombres"]               = $usuarioBD["nombres"];
            $respuesta["ap_paterno"]            = $usuarioBD["ap_paterno"];
            $respuesta["ap_materno"]            = $usuarioBD["ap_materno"];
            $respuesta["nro_documento_identif"] = $usuarioBD["nro_documento_identif"];
            $respuesta["sexo"]                  = $usuarioBD["sexo"];
            $respuesta["fec_nacimiento"]        = $usuarioBD["fec_nacimiento"];
            $respuesta["idRegion"]              = $usuarioBD["idRegion"];
            $respuesta["nombreRegion"]          = np_region::obtenerNombreRegionID($usuarioBD["idRegion"]);
            $respuesta["idPais"]                = $usuarioBD["idPais"];
            $respuesta["nombrePais"]            = np_pais::obtenerNombrePaisID($usuarioBD["idPais"]);
            $respuesta["url_avatar"]            = $usuarioBD["url_avatar"];

            return ["estado" => 1, "usuario" => $respuesta];
        } else {
            throw new ExcepcionApi(self::ESTADO_FALLA_DESCONOCIDA,
                "Ha ocurrido un error");
        }
    }

    private function obtenerUsuarioPorId($id)
    {
        $comando = "SELECT " .

        self::EMAIL . "," .
        self::NOMBRES . "," .
        self::APPATERNO . "," .
        self::APMATERNO . "," .
        self::FECREGISTRO . "," .
        self::SEXO . "," .
        self::FECNACIMIENTO . "," .
        self::NRODOCUMENTO . "," .
        self::IDPAIS . "," .
        self::IDREGION . "," .
        self::URLAVATAR .
        " FROM " . self::NOMBRE_TABLA .
        " WHERE " . self::ID . " =:id";

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

    private function autenticar($email, $clave)
    {
        $comando = "SELECT " . self::CLAVE .
        " FROM " . self::NOMBRE_TABLA .
        " WHERE " . self::EMAIL . " =:email";

        try {

            $sentencia = ConexionBD::obtenerInstancia()->obtenerBD()->prepare($comando);

            $sentencia->bindParam('email', $email);

            $sentencia->execute();

            if ($sentencia) {

                $resultado = $sentencia->fetch();

                if (self::validarContrasena($clave, $resultado['clave'])) {
                    return true;
                } else {
                    return false;
                }

            } else {
                return false;
            }
        } catch (PDOException $e) {
            throw new ExcepcionApi(self::ESTADO_ERROR_BD, $e->getMessage());
        }

    }

    private function validarContrasena($contrasenaPlana, $contrasenaHash)
    {
        return md5($contrasenaPlana) == $contrasenaHash;
    }

    private function obtenerUsuarioPorCorreo($email)
    {
        $comando = "SELECT " .
        self::ID . "," .
        self::NOMBRES . "," .
        self::APPATERNO .
        " FROM " . self::NOMBRE_TABLA .
        " WHERE " . self::EMAIL . " =:email";

        $sentencia = ConexionBD::obtenerInstancia()->obtenerBD()->prepare($comando);

        $sentencia->bindParam("email", $email);

        if ($sentencia->execute()) {
            return $sentencia->fetch(PDO::FETCH_ASSOC);
        } else {
            return null;
        }
    }

    /**
     * Otorga los permisos a un usuario para que acceda a los recursos
     * @return null o el id del usuario autorizado
     * @throws Exception
     */
    public static function autorizar()
    {
        $cabeceras = apache_request_headers();

        if (isset($cabeceras["authorization"])) {

            $claveApi = $cabeceras["authorization"];

            if (usuarios::validarClaveApi($claveApi)) {
                return usuarios::obtenerIdUsuario($claveApi);
            } else {
                throw new ExcepcionApi(
                    self::ESTADO_CLAVE_NO_AUTORIZADA, "Clave de API no autorizada", 401);
            }

        } else {
            throw new ExcepcionApi(
                self::ESTADO_AUSENCIA_CLAVE_API,
                utf8_encode("Se requiere Clave del API para autenticación"));
        }
    }

    /**
     * Comprueba la existencia de la clave para la api
     * @param $claveApi
     * @return bool true si existe o false en caso contrario
     */
    private function validarClaveApi($claveApi)
    {
        $comando = "SELECT COUNT(" . self::ID_USUARIO . ")" .
        " FROM " . self::NOMBRE_TABLA .
        " WHERE " . self::CLAVE_API . "=?";

        $sentencia = ConexionBD::obtenerInstancia()->obtenerBD()->prepare($comando);

        $sentencia->bindParam(1, $claveApi);

        $sentencia->execute();

        return $sentencia->fetchColumn(0) > 0;
    }

    /**
     * Obtiene el valor de la columna "idUsuario" basado en la clave de api
     * @param $claveApi
     * @return null si este no fue encontrado
     */
    private function obtenerIdUsuario($claveApi)
    {
        $comando = "SELECT " . self::ID_USUARIO .
        " FROM " . self::NOMBRE_TABLA .
        " WHERE " . self::CLAVE_API . "=?";

        $sentencia = ConexionBD::obtenerInstancia()->obtenerBD()->prepare($comando);

        $sentencia->bindParam(1, $claveApi);

        if ($sentencia->execute()) {
            $resultado = $sentencia->fetch();
            return $resultado['idUsuario'];
        } else {
            return null;
        }
    }
}
