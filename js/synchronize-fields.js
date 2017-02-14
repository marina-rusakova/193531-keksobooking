'use strict';

window.synchronizeFields = (function () {
  return function (sourceDomElement, destinationDomElement, sourceValues, destinationValues, dstProperty) {
    sourceDomElement.addEventListener('change', function () {
      var srcIndex = sourceValues.indexOf(sourceDomElement.value);
      if (srcIndex >= 0) {
        destinationDomElement[dstProperty] = destinationValues[srcIndex];
      }
    });

    destinationDomElement.addEventListener('change', function () {
      var dstIndex = destinationValues.indexOf(destinationDomElement.value);
      if (dstIndex >= 0) {
        sourceDomElement.value = sourceValues[dstIndex];
      }
    });
  };
})();
