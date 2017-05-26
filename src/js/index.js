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
function removeOnlyOne(doIt) {
  var $botonEstado  = $('.botonEstado');

  if(doIt){
    $botonEstado.removeClass('onlyOne');
  }
  else {
    $botonEstado.addClass('onlyOne');
  }

}

function toggleButtonState(elemento) {
  var button1 = $('#button1'),
      button2 = $('#button2');

  if(elemento.hasClass('play')){
      button2.removeClass('play');
      button2.addClass('pause');
      button1.removeClass('play');
      button1.addClass('stop');
      removeOnlyOne(true);
      startTrainning();
      updateTime();
      $('input').attr('readonly', 'readonly');
  }
  else if(elemento.hasClass('stop')){
    stopCountDown();
    button1.addClass('play');
    button1.removeClass('stop');
    button2.removeClass('play');
    button2.addClass('pause');
    removeOnlyOne(false);
  }
  else if(elemento.hasClass('pause')){
    pauseCountDown();
    button2.removeClass('pause');
    button2.addClass('play');
    removeOnlyOne(true);
  }

}

function startTrainning() {
  $wrapper = $('#wrapper');
  // if($('#button1').hasClass('onlyOne')){
  //   console.log('startting biatch');
    minutosInicial = parseInt($wrapper.find('.minutos').val(), 10);
    segundosInicial = parseInt($wrapper.find('.segundos').val(), 10);
    minutos = minutosInicial;
    segundos = segundosInicial;
  //}
}

function restartTrainning() {
  continua = true;
  restartTime();
}

function trainningEnded() {
  toggleButtonState($('#button1'));
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
      //console.log('last: ' + segundos);
      lastSecondsSound.play();
    } else {
      //console.log(minutos + ' _ ' + segundos);
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
  restartTime();
  $('input').removeAttr('readonly');
}
function pauseCountDown() {
  clearTimeout(timer);
}

function initializeApp() {
  $('.botonEstado').on('click', function(){
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
