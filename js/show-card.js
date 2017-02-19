'use strict';

window.card = (function () {

  var onCardCloseHandler = null;

  return {
    showCard: function (selectedOffer, offerDetailsDialog, onCardOpen, onCardClose) {
      offerDetailsDialog.style.display = 'block';

      onCardOpen(selectedOffer);

      if (onCardClose != undefined) {
        onCardCloseHandler = onCardClose;
      }
    },

    hideCard: function (offerDetailsDialog) {
      offerDetailsDialog.style.display = 'none';

      if (typeof onCardCloseHandler === 'function') {
        onCardCloseHandler();
      }
    }
  }
})();
