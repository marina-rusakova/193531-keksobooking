'use strict';

window.initializePins = (function () {
  var ENTER_KEY_CODE = 13;

  var RENDERED_OFFERS_COUNT = 3;

  var offerDetailsDialog = document.querySelector('.dialog');
  var availableOffers = [];
  var offerDetailsDialogCloseBtn = document.querySelector('.dialog__close');
  var offerMap = document.querySelector('.tokyo__pin-map');

  var similarOffersUrl = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
  var similarApartments = [];

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
    var offerDataIndex = evt.target.parentElement.getAttribute('offer-id');

    window.card.showCard(similarApartments[offerDataIndex], evt.target.parentElement, offerDetailsDialog, function () {
      clearOfferSelections();
      highlightOffer(evt.target.parentElement);
    }, function () {
      clearOfferSelections();
    });
  };

  var offerKeypressHandler = function (evt) {
    if (isEnterPressed(evt)) {
      var offerDataIndex = evt.target.getAttribute('offer-id');

      window.card.showCard(similarApartments[offerDataIndex], evt.target, offerDetailsDialog, function () {
        clearOfferSelections();
        highlightOffer(evt.target);
      }, function () {
        clearOfferSelections();
        evt.target.focus();
      });
    }
  };

  var renderNewAvailableOffers = function () {
    var renderedOffers = similarApartments.slice(0, RENDERED_OFFERS_COUNT);

    var template = document.querySelector('#pin-template');
    var offerTemplateToClone = template.content.querySelector('.pin');

    for (var i = 0; i < renderedOffers.length; i++) {
      var newOffer = offerTemplateToClone.cloneNode(true);

      newOffer.style.left = renderedOffers[i].location.x + 'px';
      newOffer.style.top = renderedOffers[i].location.y + 'px';

      newOffer.getElementsByTagName('img')[0].src = renderedOffers[i].author.avatar;
      newOffer.getElementsByTagName('img')[0].alt = renderedOffers[i].offer.address;

      newOffer.setAttribute('offer-id', i);

      newOffer.addEventListener('keypress', offerKeypressHandler);

      availableOffers.push(newOffer);

      offerMap.appendChild(newOffer);
    }

  };

  return function () {

    window.load(similarOffersUrl, function (similarOffers) {
      similarApartments = similarOffers;
      renderNewAvailableOffers();
    });

    offerMap.addEventListener('click', clickHandler, true);

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
