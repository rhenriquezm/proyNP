
<?php
/*****************************/
/***DESARROLLO HIDROCALIDO****/
/*****************************/
require_once '/../datos/ConexionBD.php';
// TOMAMOS NUESTRO JSON RECIBIDO DESDE LA PETICION DE ANGULAR JS Y LO LEEMOS
class REG_POR_PAIS
{

    public static function post($peticion)
    {
        $JSON    = file_get_contents("php://input");
        $request = json_decode($JSON);
        if ($peticion[0] == 'obtenerRegiones') {

            return self::obtenerRegiones($request->id);
        }
    }

    public static function get($peticion)
    {
        $JSON    = file_get_contents("php://input");
        $request = json_decode($JSON);
        if ($peticion[0] == 'obtenerPaises') {
            return self::obtenerPaises();
        }
    }

    public function obtenerRegiones($id)
    {
        $sql = "SELECT * FROM np_pais AS PA INNER JOIN np_region AS RE ON PA.id = RE.idPais WHERE RE.idPais" . "=:id";

        try {
            $stmt = ConexionBD::obtenerInstancia()->obtenerBD()->prepare($sql);
            $stmt->bindParam("id", $id);
            $stmt->execute();
            $detalle = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return ["estado" => 1, "regiones" => $detalle];
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        }
    }

    public function obtenerPaises()
    {
        $sql = "SELECT * FROM np_pais";
        try {
            $stmt = ConexionBD::obtenerInstancia()->obtenerBD()->prepare($sql);
            $stmt->execute();
            $detalle = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return ["estado" => 1, "paises" => $detalle];
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        }
    }

}