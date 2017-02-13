'use strict';

window.initializePins = (function () {
  var ENTER_KEY_CODE = 13;

  var offerDetailsDialog = document.querySelector('.dialog');
  var availableOffers = document.querySelectorAll('.tokyo__pin-map .pin');
  var offerDetailsDialogCloseBtn = document.querySelector('.dialog__close');
  var offerMap = document.querySelector('.tokyo__pin-map');

  var isEnterPressed = function (evt) {
    return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
  };

  var highlightOffer = function (selectedOffer) {
    selectedOffer.classList.add('pin--active');
  };

  var clearOfferSelections = function () {
    availableOffers.forEach(function (offer) {
      offer.classList.remove('pin--active');
    });
  };

  var clickHandler = function (evt) {
    showOfferDetailsDialog();
    highlightOffer(evt.target.parentElement);
  };

  var showOfferDetailsDialog = function () {
    clearOfferSelections();
    offerDetailsDialog.style.display = 'block';
  };

  var hideOfferDetailsDialog = function () {
    clearOfferSelections();
    offerDetailsDialog.style.display = 'none';
  };

  return function () {
    offerMap.addEventListener('click', clickHandler, true);

    availableOffers.forEach(function (offer) {
      offer.addEventListener('keyup', function (evt) {
        if (isEnterPressed(evt)) {
          showOfferDetailsDialog();
          highlightOffer(evt.target);
        }
      });
    });

    offerDetailsDialogCloseBtn.addEventListener('click', function () {
      hideOfferDetailsDialog();
    });

    offerDetailsDialogCloseBtn.addEventListener('keyup', function (evt) {
      if (isEnterPressed(evt)) {
        hideOfferDetailsDialog();
      }
    });
  };
})();
