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
  var renderedOffers = [];

  var housingTypeFilter = document.querySelector('#housing_type');
  var housingPriceFilter = document.querySelector('#housing_price');
  var housingRoomNumberFilter = document.querySelector('#housing_room-number');
  var housingGuestsNumberFilter = document.querySelector('#housing_guests-number');
  var housingFeaturesFilter = document.querySelector('#housing_features');

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
    var offerDataIndex = Math.max(
        evt.target.parentElement.getAttribute('offer-id'), +evt.target.getAttribute('offer-id')
    );

    window.card.showCard(renderedOffers[offerDataIndex], evt.target.parentElement, offerDetailsDialog, function () {
      clearOfferSelections();
      highlightOffer(evt.target.tagName === 'DIV' ? evt.target : evt.target.parentElement);
    }, function () {
      clearOfferSelections();
    });
  };

  var offerKeypressHandler = function (evt) {
    if (isEnterPressed(evt)) {
      var offerDataIndex = evt.target.getAttribute('offer-id');

      window.card.showCard(renderedOffers[offerDataIndex], evt.target, offerDetailsDialog, function () {
        clearOfferSelections();
        highlightOffer(evt.target);
      }, function () {
        clearOfferSelections();
        evt.target.focus();
      });
    }
  };

  var housingType = 'any';
  var housingPrice = 'low';
  var housingRoomNumber = 'any';
  var housingGuestsNumber = 'any';
  var housingFeatures = [];

  var filterChangedHandler = function (evt) {

    var typeAndValue = evt.target.value.split(':');
    var filterType = typeAndValue[0];
    var filterValue = typeAndValue[1];

    if (filterType === 'type') {
      housingType = filterValue;
    } if (filterType === 'price') {
      housingPrice = filterValue;
    } if (filterType === 'rooms') {
      housingRoomNumber = filterValue;
    } if (filterType === 'guests') {
      housingGuestsNumber = filterValue;
    } if (filterType === 'features') {
      if (evt.target.checked) {
        housingFeatures.push(filterValue);
      } else {
        housingFeatures = housingFeatures.filter(function (item) {
          return item !== filterValue;
        });
      }
    }

    renderNewAvailableOffers();
  };

  var applyFilters = function (apartments) {
    var filteredApartments = apartments.slice(0);

    if (housingType !== 'any') {
      filteredApartments = filteredApartments.filter(function (apartment) {
        return apartment.offer.type === housingType;
      });
    }

    filteredApartments = filteredApartments.filter(function (apartment) {
      if (housingPrice === 'low') {
        return apartment.offer.price < 10000;
      } else if (housingPrice === 'middle') {
        return apartment.offer.price >= 10000 && apartment.offer.price < 50000;
      } else {
        return apartment.offer.price >= 50000;
      }
    });

    if (housingRoomNumber !== 'any') {
      filteredApartments = filteredApartments.filter(function (apartment) {
        return apartment.offer.rooms === parseInt(housingRoomNumber);
      });
    }

    if (housingGuestsNumber !== 'any') {
      filteredApartments = filteredApartments.filter(function (apartment) {
        return apartment.offer.guests === parseInt(housingGuestsNumber);
      });
    }

    if (housingFeatures.length > 0) {
      filteredApartments = filteredApartments.filter(function (apartment) {
        return housingFeatures.filter(function (desiredFeature) {
          return apartment.offer.features.indexOf(desiredFeature) !== -1;
        }).length === housingFeatures.length;
      });
    }

    return filteredApartments;
  };

  var clearOffers = function () {
    availableOffers.forEach(function (offer) {
      offerMap.removeChild(offer);
    });

    availableOffers = [];
  };

  var renderNewAvailableOffers = function () {
    clearOffers();

    renderedOffers = applyFilters(similarApartments).slice(0, RENDERED_OFFERS_COUNT);

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

    housingTypeFilter.addEventListener('change', filterChangedHandler);

    housingPriceFilter.addEventListener('change', filterChangedHandler);

    housingRoomNumberFilter.addEventListener('change', filterChangedHandler);

    housingGuestsNumberFilter.addEventListener('change', filterChangedHandler);

    housingFeaturesFilter.addEventListener('change', filterChangedHandler);
  };
})();
