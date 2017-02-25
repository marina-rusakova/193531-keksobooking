'use strict';

window.load = (function () {

  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url);

    xhr.addEventListener('load', function (evt) {
      var result = JSON.parse(evt.target.response);
      onLoad(result);
    });

    xhr.send();
  };
})();
