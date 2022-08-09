window.onload=function(){

    document.getElementById("frm").addEventListener('submit', validar);
    document.getElementById("frm").addEventListener('reset', resetear)

    //variables
    var nombre = document.getElementById('nombre');
    var error_nombre = document.getElementById('error-nombre');
    var apellido = document.getElementById('apellido');
    var error_apellido = document.getElementById('error-apellido');
    var email = document.getElementById('email');
    var error_email = document.getElementById('error-email');
    var comentarios=document.getElementById('comentario');
    var mi_email="Fabrizio.Cimarelli@alumnos.uai.edu.ar";
    var titulo_email="Contacto - Final Wordle LPPA";
    var exito=false;

    //resetear
    function resetear(){
        limpiaReset();
   }

   //limpia los errores al resetear
    function limpiaReset(){
        var arrayVarError=[error_nombre,error_apellido,error_edad,error_email,error_sexo,error_tema]
        i=0;
        for(i;i<(arrayVarError.length);i++){
            
            arrayVarError[i].classList.add('ocultar-error');
        }

    }

    //validaciones
    function validar(evento){
        evento.preventDefault();
        exito=true;
        largo(nombre,error_nombre,apellido,error_apellido);
        validar_email();
        abrir_correo();
        
    }

    //valida  nombre y apellido
    function largo(x,y,z,w){
        if(x.value.length < 3){
            y.classList.remove('ocultar-error');
            exito=false;
        }
        if(z.value.length<3){
            w.classList.remove('ocultar-error');
            exito=false;
        }
    }

    //valida email
    function validar_email(){
        emailEstructura = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        if (!emailEstructura.test(email.value)) {
            error_email.classList.remove('ocultar-error');
            exito=false;
        }
    }

    //limpia los errores
    function limpiar_error(){
        var error_activo = "error-" + document.activeElement.name;
        var error = document.getElementById(error_activo);
        error.classList.add('ocultar-error');
    }
    
    // eventos limpieza errores
    nombre.addEventListener('focus',limpiar_error);
    apellido.addEventListener('focus', limpiar_error);
    email.addEventListener('focus',limpiar_error);

    //abrir correo
    function abrir_correo(){
        if(exito){
            window.open('mailto:'+mi_email+'?subject='+titulo_email+'&body='+comentarios.value+"%0A"+"%0A"+nombre.value+"%20"+apellido.value);
        }
    }
}