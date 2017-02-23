'use strict';

window.load = (function () {

  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url);

    xhr.addEventListener('load', function(evt) {
      try {
        if (evt.target.status >= 400) {
          console.log('Failed to load data. Server returned status: ' + evt.target.status);
        } else if (evt.target.status >= 200) {
          var result = JSON.parse(evt.target.response);
          onLoad(result);
        }
      } catch(err) {}
    });

    xhr.addEventListener('error', function(e) {
      console.log('Something\'s went wrong!');
    });

    xhr.addEventListener('timeout', function() {
      console.log('Time\'s up!');
    });

    xhr.send();
  }
})();
