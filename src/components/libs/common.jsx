export function loader($) {
  setTimeout(() => {
    if ($('#loader').length > 0) {
      $('#loader').removeClass('show');
    }
  }, 1);
}

// принимает id элемента, обязательно со знаком #. Пример: "#main"
export function elementAnimate(id, $) {
  $(`${id} .element-animate`).waypoint(function (direction) {

    if (direction === 'down' && !$(this.element).hasClass('element-animated')) {

      $(this.element).addClass('item-animate');
      setTimeout(function () {

        $(`${id} .element-animate.item-animate`).each(function (k) {
          const el = $(this);
          setTimeout(function () {
            const effect = el.data('animate-effect');
            if (effect === 'fadeIn') {
              el.addClass('fadeIn element-animated');
            } else if (effect === 'fadeInLeft') {
              el.addClass('fadeInLeft element-animated');
            } else if (effect === 'fadeInRight') {
              el.addClass('fadeInRight element-animated');
            } else {
              el.addClass('fadeInUp element-animated');
            }
            el.removeClass('item-animate');
          }, k * 100);
        });
      }, 100);
    }
  }, { offset: '95%' });
}