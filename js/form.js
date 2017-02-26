'use strict';

window.formInitialization = (function () {
  var checkinTime = document.querySelector('.form__panel #time');
  var checkoutTime = document.querySelector('.form__panel #timeout');
  var checkinTimeValues = ['После 12', 'После 13', 'После 14'];
  var checkoutTimeValues = ['Выезд до 12', 'Выезд до 13', 'Выезд до 14'];

  var apartmensType = document.querySelector('.form__panel #type');
  var nightPrice = document.querySelector('.form__panel #price');
  var apartmensTypeValues = ['Квартира', 'Лачуга', 'Дворец'];
  var nightPriceMinValues = [1000, 0, 10000];

  var roomCount = document.querySelector('.form__panel #room_number');
  var guestsCapacity = document.querySelector('.form__panel #capacity');
  var roomCountValues = ['1 комната', '2 комнаты', '100 комнат'];
  var guestsCapacityCorrespondedValues = ['не для гостей', 'для 3 гостей', 'для 3 гостей'];
  var guestsCapacityAvailableValues = ['для 3 гостей', 'не для гостей'];

  var checkinTimeChange = function () {
    var srcIndex = checkinTimeValues.indexOf(checkinTime.value);
    checkoutTime.selectedIndex = srcIndex;
  };

  var checkoutTimeChange = function () {
    var dstIndex = checkoutTimeValues.indexOf(checkoutTime.value);
    checkinTime.selectedIndex = dstIndex;
  };

  var apartmensTypeChange = function () {
    var srcIndex = apartmensTypeValues.indexOf(apartmensType.value);
    nightPrice.min = nightPriceMinValues[srcIndex];
  };

  var roomCountChange = function () {
    var srcIndex = roomCountValues.indexOf(roomCount.value);
    guestsCapacity.selectedIndex = guestsCapacityAvailableValues.indexOf(guestsCapacityCorrespondedValues[srcIndex]);
  };

  var guestsCapacityChange = function () {
    var dstIndex = guestsCapacityCorrespondedValues.indexOf(guestsCapacity.value);
    roomCount.selectedIndex = dstIndex;
  };

  return function () {
    window.initializePins();

    window.synchronizeFields(checkinTime, checkoutTime, checkinTimeChange, checkoutTimeChange);

    window.synchronizeFields(apartmensType, nightPrice, apartmensTypeChange);

    window.synchronizeFields(roomCount, guestsCapacity, roomCountChange, guestsCapacityChange);
  };
})();


window.addEventListener('load', function (event) {
  window.formInitialization();
});
