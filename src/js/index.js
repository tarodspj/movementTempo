var pingSound = new Audio("/android_asset/www/audio/ping.wav"),
    lastSecondsSound = new Audio("/android_asset/www/audio/lastSeconds.wav"),
    endExerciseSound = new Audio("/android_asset/www/audio/end.wav");

var entrenamiento, descanso;
var tiempoUnidad = 1000; //1000ms = 1s

function Timer() {
  //propiedades
  //variables privada
  var tiempo = 0; //tiempo en milisegundos
  var intervalo;
  var offset;

  //funciones privadas
  function actualiza() {
    var tiempoRecibido = delta();
    tiempo = tiempoRecibido + tiempo;
    console.log(parseInt(tiempo / tiempoUnidad));
  }

  function delta() {
    var ahora = Date.now();
    var tiempoTanscurrido = offset - tiempo;
    offset = ahora;

    return tiempoTanscurrido;
  }

  function formateadorTiempo() {}

//funciones y variables publicas
  //esta activo o no
  this.isOn = false;

  //creamos funciones
  this.Start = function(){
    if(!this.isOn) {
      intervalo = setInterval(actualiza, tiempoUnidad);
      offset = Date.now();
      this.isOn = true;
    }
  };
  this.Stop = function(){
    if(this.isOn) {
      clearInterval(intervalo);
      interval = null;

      this.isOn = false;
    }
  };
  this.Reset = function(){
  };


  // updateReloj :function() {
  //
  // },
  // giveTime: function(){
  //
  // },
  // setTime: function(){
  //
  // },
  // restartTime: function(){
  //
  // },
  // pauseTime: function(){
  //
  // }
}

function startTrainning(){
  entrenamiento.Start();

}

function initializeApp() {
  entrenamiento = new Timer();
  descanso = new Timer();

  $('#toggleButton').on('click',function(){
    startTrainning();
  });
}
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        initializeApp();
        console.log('Received Event: ' + id);
    }
};

app.initialize();
