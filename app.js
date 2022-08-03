window.onload=function(){

    var juego_comienza=0;//OK
    var nombre_jugador = document.getElementById('nombre');
    var jugador//OK
    var play_end=false;//OK
    var today_word//OK
    var path='palabras.json'//OK
    var fila=1;//OK
    var letra=1;//OK
    var palabra=document.querySelectorAll('.palabra_ingresada');//OK
    var palabra_encontrada=false;
    var span = document.getElementsByClassName("close")[0];
    var span_nombre = document.getElementsByClassName("close_nombre")[0];
    var modal = document.getElementById("modal");
    var modal_nombre=document.getElementById("modal_nombre");
    var parrafo_gana = document.getElementById("gana");
    var parrafo_pierde = document.getElementById("pierde");
    var modal_abierto=false;

     

    //realiza un fetch a un json local que contiene las palabras sin tildes -----------------OK
    function get_word() {
        
        fetch(path).then(response => {
            response.json().then(data => {
                today_word = data[Math.floor(Math.random()*data.length)].toUpperCase()
                today_word_div=[...today_word]//Array.from(today_word);
                console.log('La palabra de hoy es: '+today_word);
                console.log('la palabra dividida: '+today_word_div);
                
            })
        })
        .catch(error => mostrarError(error))
        var mostrarError = (error)  => {
           console.log(error);
        }
    }
    //obtengo la palabra del json de forma aleatoria
    get_word();
   
    //variable para ver que boton presionamos
    var boton=document.querySelectorAll('button');

    //loop para ver que boton se presiono-----------------------------OK
    boton.forEach((elemento) => {
        elemento.addEventListener('click', function(){
            var tecla_presionada=elemento.attributes["data-key"].value;
            key_press(tecla_presionada)
            console.log('presione la tecla: '+tecla_presionada+'. El juego esta terminado:'+play_end+'. El juego comenzo: '+juego_comienza);

        })
    })

    //seleccionar accion a realizar en funcion de la tecla q se haya presionado en teclado en pantalla
    function key_press(tecla){
        if(!play_end){
            if(tecla=="jugar"){
                if(nombre_jugador.value.length==0){
                    console.log('entre')
                    modal_nombre.classList.remove('modal_off');
                    modal_nombre.classList.add('modal_on');
                    
                } else{
                    juego_comienza=1;
                    iniciar_temp();
                }               

            } else if(tecla=="contacto"){
                window.location.href="contacto.html"
            } else if(tecla==="enviar" && juego_comienza==1){
                enviar_palabra();
            } else if (tecla==="borrar" && juego_comienza==1){
                eliminar_letra();
            } else if(juego_comienza==1){
                colocar_letra(tecla);//---------------------OK
            } else{
                alert("presiona jugar para iniciar!");
            }
        } else if(tecla==="jugar_nuevamente"){
            reiniciar_pagina();
        } else{
            //abrir modal correspondiente
            console.log('entre el else if')
            abrir_modal();
        }

    }

    //recargar la partida-----------------------------------------------OK
    function reiniciar_pagina(){
        window.location.reload();
    }

    //rellena letra en el casillero correspondiente--------------------------------OK
    function colocar_letra(tecla){
        if(letra<6){
            palabra[fila-1].querySelectorAll('.letra')[letra-1].innerText=tecla;
            letra=letra+1;
        }
    }

    //funcion borrar ultima letra ingresada--------------------------------------OK
    function eliminar_letra(){
        var letras=palabra[fila-1].querySelectorAll('.letra');
        for (let index = letras.length-1; index >= 0; index--) {
            var z = letras[index];
            if(z.innerText !== ''){
                z.innerText = '';
                letra=letra-1;
                break;
            }
            
        }
    }
    //envia la palabra para compararla con today_word--------------------------OK
    function enviar_palabra(){
        if(letra<6){
            alert("complete las 5 letras antes de enviar!");
        } else{
            comparar_palabra();
            fila=fila+1;
            letra=1;
            console.log('nro fila:'+fila)
        }
    }

    //comparo la palabra ingresada con la correcta---------------------------OK
    function comparar_palabra(){
        var letras=palabra[fila-1].querySelectorAll('.letra');
        var letras_ok=0;
        
        for (let index = 0; index < letras.length; index++) {
            letras[index].classList.add('gris')
            
        }
        for (let index = 0; index < letras.length; index++) {
            if(letras[index].innerText===today_word[index]){
                letras_ok=letras_ok+1;
                letras[index].classList.remove('gris');
                letras[index].classList.add('verde');
            } else{
                for (let k = 0; k < today_word.length; k++) {
                    if(letras[index].innerText==today_word[k]){
                        letras[index].classList.remove('gris');
                        letras[index].classList.add('amarillo');                    
                    }
                    
                }
            }
            
        }

        if(letras_ok===5){
            detener_temp();
            palabra_encontrada=true;
            play_end=true;
            abrir_modal();

        } else if(fila===5){
            detener_temp();
            play_end=true;
            abrir_modal();
        }

    }

    function abrir_modal(){
        if(palabra_encontrada){
            parrafo_gana.classList.remove('apagado');
        } else{
            parrafo_gana.classList.add('apagado');
            parrafo_pierde.classList.remove('apagado');
        }
        modal.classList.remove('modal_off');
        modal.classList.add('modal_on');
        modal_abierto=true;
    }

    //MODAL---------------------------------------------------OK

    //para cerrar el modal cuando click X
    span.onclick = function() {
        modal.classList.remove('modal_on');
        modal.classList.add('modal_off');
        modal_abierto=false;
    }

    //para cerrar modela click en pantalla
    window.onclick = function(evento) {
        if (evento.target == modal) {
            modal.classList.remove('modal_on');
            modal.classList.add('modal_off');
            modal_abierto=false;
        }
    }
    
    //cerrar modal nombre click x
    span_nombre.onclick = function() {
        modal_nombre.classList.remove('modal_on');
        modal_nombre.classList.add('modal_off');
    }
    
    
    //Temporizador--------------------------------------------------

    var Minutos=0;
    var Segundos=0;
    var Milesimas=0;
    var minutos=document.getElementById("minutos");
    var segundos=document.getElementById("segundos");
    var milesimas=document.getElementById("milesimas");

    function iniciar_temp(){
        tiempo=setInterval(temporizador,10);
    }

    function detener_temp(){
        clearInterval(tiempo);
    }

    function temporizador(){
        if(Milesimas<99){
            Milesimas++;
            if(Milesimas<10){
                Milesimas="0"+Milesimas;
            }
            milesimas.innerHTML=Milesimas;
        }
        if(Milesimas==99){
            Milesimas= -1;
        }
        if(Milesimas==0){
            Segundos++;
            if(Segundos<10){
                Segundos="0"+Segundos;
            }
            segundos.innerHTML=Segundos+".";
        }
        if(Segundos==59){
            Segundos= -1;
        }
        if((Milesimas==0)&&(Segundos==0)){
            Minutos++;
            if(Minutos<10){
                Minutos="0"+Minutos;
            }
            minutos.innerHTML=Minutos+":";
        }
    }



    /*
    //para cerrar modal nombre click en pantalla
    window.onclick = function(event) {
        if (event.target == modal_nombre) {
            modal_nombre.classList.remove('modal_on');
            modal_nombre.classList.add('modal_off');
        }
    }
    */

}

