'use strict';

window.synchronizeFields = (function () {
  return function (sourceDomElement, destinationDomElement, directChange, reverseChange) {
    sourceDomElement.addEventListener('change', function () {
      directChange();
    });

    destinationDomElement.addEventListener('change', function () {
      if (typeof reverseChange === 'function') {
        reverseChange();
      }
    });
  };
})();
