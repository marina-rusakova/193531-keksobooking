'use strict';

window.load = (function () {

  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url);

    xhr.addEventListener('load', function (evt) {
      if (evt.target.status >= 400) {
        throw {
          message: 'Failed to load data. Server returned status: ' + evt.target.status
        }
      } else if (evt.target.status >= 200) {
        var result = JSON.parse(evt.target.response);
        onLoad(result);
      }
    });

    xhr.addEventListener('error', function (e) {
      throw {
        message: 'Something\'s went wrong!'
      }
    });

    xhr.addEventListener('timeout', function () {
      throw {
        message: 'Time\'s up!'
      }
    });

    xhr.send();
  };
})();
