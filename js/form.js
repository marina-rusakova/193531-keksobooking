'use strict';

var formInitialization = function () {

  var offerDetailsDialog = document.querySelector('.dialog');
  var availableOffers = document.querySelectorAll('.tokyo__pin-map .pin');
  var offerDetailsDialogCloseBtn = document.querySelector('.dialog__close');

  function clearOfferSelections() {
    availableOffers.forEach(function (offer) {
      offer.classList.remove('pin--active');
    });
  }

  availableOffers.forEach(function (offer) {
    offer.addEventListener('click', function () {
      clearOfferSelections();
      offer.classList.add('pin--active');
      offerDetailsDialog.style.display = 'block';
    });
  });

  offerDetailsDialogCloseBtn.addEventListener('click', function () {
    offerDetailsDialog.style.display = 'none';
    clearOfferSelections();
  });

  var advertisementTitle = document.querySelector('.form__panel #title');

  advertisementTitle.required = true;
  advertisementTitle.minLength = 30;
  advertisementTitle.maxLength = 100;

  var nightPrice = document.querySelector('.form__panel #price');

  nightPrice.required = true;
  nightPrice.value = 1000;
  nightPrice.min = 1000;
  nightPrice.max = 1000000;


  var address = document.querySelector('.form__panel #address');

  address.required = true;

  var checkinTime = document.querySelector('.form__panel #time');
  var checkoutTime = document.querySelector('.form__panel #timeout');

  checkinTime.addEventListener('change', function () {
    checkoutTime.selectedIndex = checkinTime.selectedIndex;
  });

  checkoutTime.addEventListener('change', function () {
    checkinTime.selectedIndex = checkoutTime.selectedIndex;
  });

  var apartmensType = document.querySelector('.form__panel #type');

  var findApartmensMinPrice = function (apartmenType) {
    var APARTMENT = 0;
    var SHACK = 1;
    var PALACE = 2;

    if (apartmenType === APARTMENT) {
      return 1000;
    } else {
      if (apartmenType === SHACK) {
        return 0;
      } else {
        if (apartmenType === PALACE) {
          return 10000;
        }
      }
    }

    return 0;
  };

  apartmensType.addEventListener('change', function () {
    var minPrice = findApartmensMinPrice(apartmensType.selectedIndex);
    nightPrice.value = minPrice;
    nightPrice.min = minPrice;
  });

  var roomCount = document.querySelector('.form__panel #room_number');
  var guestsCapacity = document.querySelector('.form__panel #capacity');

  var ONE_BEDROOM = 0;
  var TWO_BEDROOM = 1;
  var THREE_GUESTS = 0;
  var NO_GUESTS = 1;

  guestsCapacity.selectedIndex = 1;

  roomCount.addEventListener('change', function () {
    if (roomCount.selectedIndex === ONE_BEDROOM) {
      guestsCapacity.selectedIndex = NO_GUESTS;
    } else {
      guestsCapacity.selectedIndex = THREE_GUESTS;
    }
  });

  guestsCapacity.addEventListener('change', function () {
    if (guestsCapacity.selectedIndex === THREE_GUESTS) {
      roomCount.selectedIndex = TWO_BEDROOM;
    } else {
      roomCount.selectedIndex = ONE_BEDROOM;
    }
  });
};


window.addEventListener('load', function (event) {
  formInitialization();
});
