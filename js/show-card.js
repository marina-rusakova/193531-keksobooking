'use strict';

window.card = (function () {

  var onCardCloseHandler = null;
  var offerDialogPanel = document.querySelector('.dialog__panel');

  var dialogPanelTemplate = document.querySelector('#dialog-panel-template');

  var dialogFeatureTemplate = document.querySelector('#features-panel-template');

  var dialogPhotosTemplate = document.querySelector('#photos-panel-template');

  return {
    showCard: function (data, selectedOffer, offerDetailsDialog, onCardOpen, onCardClose) {

      document.querySelector('.dialog__title img').src = data.author.avatar;

      var newDialog = dialogPanelTemplate.content.cloneNode(true);

      newDialog.querySelector('.lodge__title').textContent = data.offer.title;
      newDialog.querySelector('.lodge__address').textContent = data.offer.address;
      newDialog.querySelector('.lodge__price').textContent = data.offer.price + ' ₽/ночь';
      newDialog.querySelector('.lodge__type').textContent = data.offer.type;
      newDialog.querySelector('.lodge__rooms-and-guests').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
      newDialog.querySelector('.lodge__checkin-time').textContent = 'Заед после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
      newDialog.querySelector('.lodge__description').textContent = data.offer.description;

      var featureList = newDialog.querySelector('.lodge__features');

      featureList.innerHTML = '';

      data.offer.features.forEach(function (feature) {
        var newFeature = dialogFeatureTemplate.content.querySelector('.feature__image').cloneNode(true);
        newFeature.classList.add('feature__image--' + feature);
        featureList.appendChild(newFeature);
      });

      var photosList = newDialog.querySelector('.lodge__photos');

      photosList.innerHTML = '';

      data.offer.photos.forEach(function (photo) {
        var newPhoto = dialogPhotosTemplate.content.querySelector('img').cloneNode(true);
        newPhoto.src = photo;
        photosList.appendChild(newPhoto);
      });

      offerDialogPanel.innerHTML = '';
      offerDialogPanel.appendChild(newDialog);

      offerDetailsDialog.style.display = 'block';

      onCardOpen(selectedOffer);

      if (typeof onCardClose === 'function') {
        onCardCloseHandler = onCardClose;
      }
    },

    hideCard: function (offerDetailsDialog) {
      offerDetailsDialog.style.display = 'none';

      if (typeof onCardCloseHandler === 'function') {
        onCardCloseHandler();
      }
    }
  };
})();
