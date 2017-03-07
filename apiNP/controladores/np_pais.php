<?php

require '/../datos/ConexionBD.php';

class np_pais
{
    // Datos de la tabla "np_pais"
    
    
    const NOMBRE_TABLA  = "np_pais";
    const ID            = "id";
    const NOMBRE         = "nombre";
    const FECHAACTU         = "fecha_actu";
    

    const ESTADO_CREACION_EXITOSA       = 1;
    const ESTADO_CREACION_FALLIDA       = 2;
    const ESTADO_ERROR_BD               = 3;
    const ESTADO_AUSENCIA_CLAVE_API     = 4;
    const ESTADO_CLAVE_NO_AUTORIZADA    = 5;
    const ESTADO_URL_INCORRECTA         = 6;
    const ESTADO_FALLA_DESCONOCIDA      = 7;
    const ESTADO_PARAMETROS_INCORRECTOS = 8;

   
    public static function($peticion){
        if($peticion[0] == 'pais'){
            return self::obtenerPais();
            
            
        }
            
    }


    private function obtenerPais(){
        $respuesta = array();
        
        $body = file_get_contents('php://input');
        
        $pais = json_decode($body);
        
        $id = $pais->id;
        
        $paisBD = self::obtenerPaisID($id);
        
        if($paisBD !=null){
            http_response_code(200);
            
            $respuesta["nombre"] = $paisBD["nombre"];
                
            return ["estado" => 1, "pais" => $respuesta];
        }else{
            throw new ExcepcionApi(self::ESTADO_FALLA_DESCONOCIDA,"Ha ocurrido un error");
        }
        
        
    }
    
    private function obtenerPaisID($id){
        
        $comando = "SELECT " . 
        self::NOMBRE . 
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

}
