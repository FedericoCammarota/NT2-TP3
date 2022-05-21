new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true;
            this.saludJugador = 100;
            this.saludMonstruo = 100;
            this.turnos = [];
        },
        atacar: function () {
            var atacar = this.calcularHeridas(this.rangoAtaque);
            this.saludMonstruo -= atacar;
            this.turnos.unshift({
                esJugador: true,
                text:"El jugador hizo un ataque normal por "+atacar,
            })
            if(this.verificarGanador()){
                return;
            }
           this.ataqueDelMonstruo();
        },

        ataqueEspecial: function () {
            var atacar = this.calcularHeridas(this.rangoAtaqueEspecial);
            this.saludMonstruo -= atacar;
            this.turnos.unshift({
                esJugador: true,
                text:"El jugador hizo un ataque especial por "+atacar,
            })
            if(this.verificarGanador()){
                return;
            }
           this.ataqueDelMonstruo();
        },

        curar: function () {
            if(this.saludJugador<90){
                this.saludJugador+=10;
            }else{
                this.saludJugador = 100;
            }
            this.turnos.unshift({
                esJugador: true,
                text:"El jugador se curo por "+10,
            })
            this.ataqueDelMonstruo();
        },

        registrarEvento(evento) {

        },
        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false;
            this.saludJugador = 100;
            this.saludMonstruo = 100;
            this.turnos = [];
        },

        ataqueDelMonstruo: function () {
            let atacar = this.calcularHeridas(this.rangoAtaqueDelMonstruo);
            this.saludJugador -= atacar;
            this.turnos.unshift({
                esJugador: false,
                text:"El monstruo ataco al jugador por "+atacar,
            })
            this.verificarGanador();
        },

        calcularHeridas: function (rango) {
            var miArray = rango;
            var random = Math.floor(Math.random()*miArray.length);
            var valor = miArray[random];
            return valor;
        },
        verificarGanador: function () {
            if (this.saludMonstruo <= 0) {
               if(confirm("Ganaste! queres jugar de nuevo?")){
                   this.empezarPartida()
               }else{
                this.hayUnaPartidaEnJuego = false
               }
                return true;
            } else if (this.saludJugador <= 0) {
                if(confirm("Perdiste! queres jugar de nuevo?")){
                    this.empezarPartida()
                }else{
                 this.hayUnaPartidaEnJuego = false
                }
                return true
            }
            return false;
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});