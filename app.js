window.onload=function(){

    var juego_comienza=0;
    var nombre_jugador = document.getElementById('nombre');
    var jugador;
    var play_end=false;
    var play_load=false;
    var today_word
    var path='palabras.json'
    var fila=1;
    var letra=1;
    var palabra=document.querySelectorAll('.palabra_ingresada');//OK
    var palabra_encontrada=false;
    var span = document.getElementsByClassName("close")[0];
    var span_nombre = document.getElementsByClassName("close_nombre")[0];
    var modal = document.getElementById("modal");
    var modal_nombre=document.getElementById("modal_nombre");
    var parrafo_gana = document.getElementById("gana");
    var parrafo_pierde = document.getElementById("pierde");
    var modal_abierto=false;
    var captura_temporizador;
    var tablero_celdas=[];

     

    //realiza un fetch a un json local que contiene las palabras sin tildes -----------------OK
    function get_word() {
        
        fetch(path).then(response => {
            response.json().then(data => {
                today_word = data[Math.floor(Math.random()*data.length)].toUpperCase()
                today_word_div=[...today_word]//Array.from(today_word);
                console.log('La palabra de hoy es: '+today_word);
                
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

    //para ver que boton se presiona cada vez-----------------------------OK
    boton.forEach((elemento) => {
        elemento.addEventListener('click', function(){
            var tecla_presionada=elemento.attributes["data-key"].value;
            key_press(tecla_presionada)

        })
    })

    //seleccionar accion a realizar en funcion de la tecla q se haya presionado en teclado en pantalla
    function key_press(tecla){
        if(!play_end){
            if(tecla=="jugar"){
                if(play_load && juego_comienza===0){
                    juego_comienza=1;
                    iniciar_temp();
                    console.log("La palabra recuperada es: "+today_word)
                } else if(nombre_jugador.value.length==0 && juego_comienza===0){
                    console.log('entre al error de no poner nombre')
                    modal_nombre.classList.remove('modal_off');
                    modal_nombre.classList.add('modal_on');
                    
                } else if(juego_comienza===1){
                    alert("Ya hay un juego en curso");
                } else{
                    juego_comienza=1;
                    iniciar_temp();
                    console.log("El nombre del jugador es "+nombre_jugador.value);
                }               

            } else if(tecla=="contacto"){
                window.location.href="contacto.html"
            } else if(tecla==="enviar" && juego_comienza==1){
                enviar_palabra();
            } else if (tecla==="borrar" && juego_comienza==1){
                eliminar_letra();
            } else if(tecla==="guardar" && juego_comienza==1){
                guardar_partida();
            } else if (tecla==="cargar"){
                cargar_partida();
            } else if(juego_comienza==1){
                colocar_letra(tecla);//---------------------OK
            } else{
                alert("Presiona Jugar para iniciar!");
            }
        } else if(tecla==="jugar_nuevamente"){
            reiniciar_pagina();
        } else{
            abrir_modal();
        }

    }

    //recargar la partida-----------------------------------------------OK
    function reiniciar_pagina(){
        window.location.reload();
    }

    //rellena letra en la celda correspondiente--------------------------------OK
    function colocar_letra(tecla){
        if(letra<6){
            palabra[fila-1].querySelectorAll('.letra')[letra-1].innerText=tecla;
            letra=letra+1;
        }
    }

    //borrar ultima letra que se ingreso--------------------------------------OK
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
            alert("Completa las 5 letras para enviar la palabra!");
        } else{
            comparar_palabra();
            fila=fila+1;
            letra=1;
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
            obtener_tiempo();
            palabra_encontrada=true;
            play_end=true;
            abrir_modal();
            console.log("el tiempo fue de "+captura_temporizador[0]+captura_temporizador[1]+captura_temporizador[2]);

        } else if(fila===5){
            detener_temp();
            obtener_tiempo();
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

    //obtiene datos temporizador
    function obtener_tiempo(){
        var min=document.getElementById("minutos");
        var seg=document.getElementById("segundos");
        var miles=document.getElementById("milesimas")

        captura_temporizador=[min.innerText,seg.innerText,miles.innerText];
        console.log("captura del tiempo: "+captura_temporizador[0]+captura_temporizador[1]+captura_temporizador[2]);

    }

    //carga los datos obtenidos del temporizador
    function cargar_tiempo(){
        document.getElementById("minutos").innerHTML=captura_temporizador[0];
        document.getElementById("segundos").innerHTML=captura_temporizador[1];
        document.getElementById("milesimas").innerHTML=captura_temporizador[2];
    }

    //obtiene celdas del tablero
    function obtener_celdas(){
        for (let fil = 0; fil < 5; fil++) {
            for (let col = 0; col < 5; col++){
                var celda=document.getElementById("f"+fil+"c"+col);
                tablero_celdas.push(celda.innerText);
            } 
            
        }
    }

    //cargar celdas de tablero_celdas en el tablero
    function cargar_celdas(arreglo){
        var p=0;
        for (let f = 0; f < 6; f++) {
            for (let col = 0; col < 5; col++) {
                if(arreglo[p]==""){
                    fila=f+1;
                    letra=col+1;
                    col=5;
                    f=6
                }else {
                    document.getElementById("f"+f+"c"+col).innerHTML=arreglo[p];
                    p=p+1;
                    if(col==4){
                        letra=6;
                        enviar_palabra();
                    }
                }
            }
            
        }
    }

    //guardar parida
    function guardar_partida(){
        detener_temp();
        obtener_tiempo();
        obtener_celdas();
        var partidas_guardadas_f=window.localStorage.getItem("partidas_guardadas");
        if(partidas_guardadas_f==null){
            var partidas_guardadas=1;
            window.localStorage.setItem("partidas_guardadas",partidas_guardadas);

        }else{
            partidas_guardadas=Number.parseInt(partidas_guardadas_f);
            partidas_guardadas=partidas_guardadas+1;
            window.localStorage.setItem("partidas_guardadas",partidas_guardadas);
        }
        var partida_objeto=new Object();
        partida_objeto.nombreJugador=nombre_jugador.innerText;
        partida_objeto.todayWord=today_word;
        partida_objeto.numeroPartida=partidas_guardadas;
        partida_objeto.tiempoActual=captura_temporizador;
        partida_objeto.tableroCeldas=tablero_celdas;
        window.localStorage.setItem("partida_actual",JSON.stringify(partida_objeto));
        partidas_guardadas=partidas_guardadas+1;
        alert("La partida se guardo con exito");
        window.location.reload();
    }


    //cargar partida

    function cargar_partida(){
        var partida_recuperada=JSON.parse(localStorage.getItem("partida_actual"));
        jugador=partida_recuperada.nombreJugador;
        today_word=partida_recuperada.todayWord;
        captura_temporizador=partida_recuperada.tiempoActual;
        cargar_tiempo();
        tablero_celdas=partida_recuperada.tableroCeldas;
        cargar_celdas(tablero_celdas);
        play_load=true;
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


}

