var pingSound = new Audio("/android_asset/www/audio/ping.wav"),
    lastSecondsSound = new Audio("/android_asset/www/audio/lastSeconds.wav"),
    endExerciseSound = new Audio("/android_asset/www/audio/end.wav");

var $wrapper, timer, continua = true;
var seriesInicial, minutosInicial, segundosInicial;
var series, minutos, segundos;
var lastSeconds = 4;


function checkTimeFormat(elemento) {
  var timepoSucios = parseInt(elemento.val(), 10),
      tiempoLimpios = false;
  if (timepoSucios < 9) {
    tiempoLimpios = '0' + timepoSucios;
  }
  if (timepoSucios > 59) {
    tiempoLimpios = 59;
  }
  if(tiempoLimpios) {
    elemento.val(tiempoLimpios);
  }
}

function checkBeforeStart() {
  var $input = $('input');
  $input.blur(); //quitamos el foco de los inputs para que se vea bonito
}

function toggleButtonState(elemento) {
  if(elemento.hasClass('play')){
    elemento.removeClass('play');
    elemento.addClass('stop');

    $('input').attr('readonly', 'readonly');
    startTrainning();
    updateTime();
  }
  else {
    stopCountDown();
    elemento.addClass('play');
    elemento.removeClass('stop');
  }
}

function startTrainning() {
  $wrapper = $('#wrapper');
  //seriesInicial = parseInt($wrapper.find('.numero_series').val(), 10);
  minutosInicial = parseInt($wrapper.find('.minutos').val(), 10);
  segundosInicial = parseInt($wrapper.find('.segundos').val(), 10);
  minutos = minutosInicial;
  segundos = segundosInicial;
  //series = seriesInicial;
}

function restartTrainning() {
  continua = true;
  //$wrapper.find('.numero_series').val(seriesInicial);
  restartTime();
}

function trainningEnded() {
  toggleButtonState($('#botonEstado'));
  restartTrainning();
}

function restartTime() {
  console.log(segundosInicial);
  $wrapper.find('.minutos').val(minutosInicial);
  $wrapper.find('.segundos').val(segundosInicial);
  checkBeforeStart();
}

function updateSeconds() {
  if(segundos <= 9) {
    segundos = '0' + segundos;
  }
  $wrapper.find('.segundos').val(segundos);
}

function updateMinutes() {
  if(minutos <= 9) {
    minutos = '0' + minutos;
  }
  $wrapper.find('.minutos').val(minutos);
}

function updateTime() {
  segundos = parseInt(segundos) - 1;

  if (segundos < 0) {
      segundos = 59;
      if (minutos >= 1){
        minutos = parseInt(minutos) - 1;
        updateMinutes();
      }
      else {
        continua = false;
      }
  }

  if(continua) {
    updateSeconds();

    if(minutos == '00' && segundos <= lastSeconds) {
      console.log('last: ' + segundos);
      lastSecondsSound.play();
    } else {
      console.log(minutos + ' _ ' + segundos);
      pingSound.play();
    }

    timer = setTimeout(updateTime, 1000);
  } else {
    clearTimeout(timer);
    endExerciseSound.play();
  }

} //updateTime

function stopCountDown() {
  clearTimeout(timer);
  //startTrainning();
  restartTime();
  $('input').removeAttr('readonly');
}

function initializeApp() {
  $('#botonEstado').on('click', function(){
    var $this = $(this);
    toggleButtonState($this);
  });

  $('.numero_tiempo').on('blur', function(){
    var $this = $(this);
    checkTimeFormat($this);
  });
  endExerciseSound.addEventListener('ended', function(){
    console.log('fin');
    trainningEnded();
  });
} //initializeApp

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
