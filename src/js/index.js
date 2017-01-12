var ping = new Audio("/android_asset/www/audio/Hi-Bongo.wav"),
    endExercise = new Audio("/android_asset/www/audio/end.mp3");

function countDown() {

  var second = 10,
      minute = 00;

  setInterval(function(){
    document.getElementById("timer").innerHTML = minute + ":" + second;
    ping.play();
    second--;

    if(second == 00){
      minute--;
      second = 60;
    }
    if(minute == 0 && second == 1){
      document.getElementById("timer").innerHTML = "Timer Stopped";
      endExercise.play();
    }
    if(minute <= -1) {
      document.getElementById("timer").innerHTML = " ";
    }
  }, 1000);
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

        console.log('Received Event: ' + id);
        countDown();
    }
};

app.initialize();
