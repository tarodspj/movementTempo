var ping = new Audio("/android_asset/www/audio/Hi-Bongo.wav"),
    endExercise = new Audio("/android_asset/www/audio/end.mp3");

var $wrapper, timer, continua = true;
var seriesInicial, minutosInicial, segundosInicial;
var series, minutos, segundos;

// function goToFullScreen() {
//   var docelem = document.documentElement;
//
//       if (docelem.requestFullscreen) {
//           docelem.requestFullscreen();
//       }
//       else if (docelem.mozRequestFullScreen) {
//           docelem.mozRequestFullScreen();
//       }
//       else if (docelem.webkitRequestFullScreen) {
//           docelem.webkitRequestFullScreen();
//       }
//       else if (docelem.msRequestFullscreen) {
//           docelem.msRequestFullscreen();
//       }
// }
function checkSeconds(elemento) {
  var segundosSucios = parseInt(elemento.val(), 10),
      segundosLimpios = false;
  if (segundosSucios < 9) {
    segundosLimpios = '0' + segundosSucios;
  }
  if (segundosSucios > 59) {
    segundosLimpios = 59;
  }
  if(segundosLimpios) {
    elemento.val(segundosLimpios);
  }
}

function checkBeforeStart() {
  var $input = $('input');
  $input.blur(); //quitamos el foco de los inputs para que se vea bonito
}

function startTrainning() {
  $wrapper = $('#wrapper');
  seriesInicial = parseInt($wrapper.find('.numero_series').val(), 10);
  minutosInicial = parseInt($wrapper.find('.minutos').val(), 10);
  segundosInicial = parseInt($wrapper.find('.segundos').val(), 10);
  minutos = minutosInicial;
  segundos = segundosInicial;
  series = seriesInicial;
}

function restartTime() {
  $wrapper.find('.minutos').val(minutosInicial);
  $wrapper.find('.segundos').val(segundosInicial);
}

function restartTrainning() {
  $wrapper.find('.numero_series').val(seriesInicial);
  restartTime();
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
    ping.play();
    timer = setTimeout(updateTime, 1000);
  } else {
    clearTimeout(timer);
    endExercise.play();
  }

} //updateTime
function stopCountDown() {
  clearTimeout(timer);
  startTrainning();
  $('input').removeAttr('readonly');
}

function initializeApp() {
  $('#botonEstado').on('click', function(){
    var $this = $(this);
    if($this.hasClass('play')){
      $this.removeClass('play');
      $this.addClass('stop');

      $('input').attr('readonly', 'readonly');
      startTrainning();
      updateTime();
    }
    else {
      stopCountDown();
      $this.addClass('play');
      $this.removeClass('stop');
    }
  });
  $('.segundos').on('blur', function(){
    var $this = $(this);
    checkSeconds($this);
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
