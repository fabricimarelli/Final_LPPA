=====================================================================================
FINAL LPPA 2022 - UNIVERSIDAD ABIERTA INTERAMERICANA
=====================================================================================
WORDLE
------

Desarrollo el juego wordle, bajo los siguientes requisitos:

● Debe existir un botón “Jugar” el cual el usuario debe apretar para poder comenzar el juego. Al
presionar el botón mencionado, el jugador debe ingresar su nombre y luego un contador deberá
aparecer en pantalla, el mismo debe detenerse cuando el participante haya ganado o perdido el
juego.
● Cada vez que el juego se carga, se debe elegir aleatoriamente una palabra de la lista de palabras
disponibles (utilizar https://wordle.danielfrg.com/words/5.json), es decir, si se carga el juego y la
palabra ganadora es “poeta”, al volver a cargar la página la palabra ganadora ya no es más “poeta” y
pasa a ser otra palabra elegida aleatoriamente de la lista mencionada.
● Agregar funcionalidad de guardar y cargar partida en el juego usando LocalStorage. El jugador
puede guardar el progreso de una a más partidas, haciendo click en un botón que diga “guardar
partida”, guardando la palabra ganadora elegida y el progreso realizado por el usuario hasta el
momento de guardar la partida en LocalStorage. Las partidas guardadas se deben mostrar en una
lista y se deben poder cargar para continuar jugando.
● Detectar el momento en que un jugador ha ganado la partida y mostrar un cartel informativo.
● Detectar el momento en que un jugador ha perdido la partida y mostrar un cartel informativo.
● Crear una página de Contacto, con un formulario que permita ingresar nombre, mail y mensaje, y al
enviar se abra la herramienta de envío de emails predeterminada del sistema operativo.
● Validaciones del formulario de contacto (nombre requerido alfanumérico, mail requerido válido y
mensaje con más de 5 caracteres).

------------------------------------------------------------------------------------------------------------

El juego fue desarrollado con un teclado integrado y con contenedores, para simplificar su resolucion ya que al
utilizar inputs tradicionales para el ingreso de letras se generaban distintos problemas.

El juego obtiene las palabras del dia mediante un fetch a un json local de palabras en español sin acentos.

