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
  var guestsCapacityValues = ['не для гостей', 'для 3 гостей', 'для 3 гостей'];

  return function () {
    window.initializePins();

    window.synchronizeFields(checkinTime, checkoutTime,
        function () {
          var srcIndex = checkinTimeValues.indexOf(checkinTime.value);
          checkoutTime['value'] = checkoutTimeValues[srcIndex];
        },
        function () {
          var dstIndex = checkoutTimeValues.indexOf(checkoutTime.value);
          checkinTime.value = checkinTimeValues[dstIndex];
        }
    );

    window.synchronizeFields(apartmensType, nightPrice, function () {
      var srcIndex = apartmensTypeValues.indexOf(apartmensType.value);
      nightPrice['min'] = nightPriceMinValues[srcIndex];
    });

    window.synchronizeFields(roomCount, guestsCapacity, function () {
      var srcIndex = roomCountValues.indexOf(roomCount.value);
      guestsCapacity['value'] = guestsCapacityValues[srcIndex];
    }, function () {
      var dstIndex = guestsCapacityValues.indexOf(guestsCapacity.value);
      roomCount.value = roomCountValues[dstIndex];
    });
  };
})();


window.addEventListener('load', function (event) {
  window.formInitialization();
});
