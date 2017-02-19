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
    window.card.showCard(evt.target.parentElement, offerDetailsDialog, function () {
      clearOfferSelections();
      highlightOffer(evt.target.parentElement);
    }, function () {
      clearOfferSelections();
    });
  };

  var offerKeyupHandler = function (evt) {
    if (isEnterPressed(evt)) {
      window.card.showCard(evt.target, offerDetailsDialog, function () {
        clearOfferSelections();
        highlightOffer(evt.target);
      }, function () {
        clearOfferSelections();
        /* Евгений, если вызвать evt.target.focus() без setTimeout, то НЕ работает. Помогите, пожалуйста, починить.*/
        setTimeout(function () {
          evt.target.focus();
        }, 200);
      });
    }
  };

  return function () {

    offerMap.addEventListener('click', clickHandler, true);

    availableOffers.forEach(function (offer) {
      offer.addEventListener('keyup', offerKeyupHandler);
    });

    offerDetailsDialogCloseBtn.addEventListener('click', function () {
      window.card.hideCard(offerDetailsDialog);
    });

    offerDetailsDialogCloseBtn.addEventListener('keyup', function (evt) {
      if (isEnterPressed(evt)) {
        window.card.hideCard(offerDetailsDialog);
      }
    });
  };
})();
