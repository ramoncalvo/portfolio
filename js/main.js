!(function (e) {
  'use strict';
  var n,
    t,
    a,
    o,
    i,
    s = 'fadeInUp',
    r = 800,
    l = 4e3,
    c = e(window);
  c.on('load', function () {
    e('html, body').animate({ scrollTop: 0 }, 'normal'),
      e('#loader').fadeOut('slow', function () {
        e('#preloader').delay(300).fadeOut('slow');
      });
  }),
    e('.fluid-video-wrapper').fitVids(),
    (n = e('.bricks-wrapper')).imagesLoaded(function () {
      n.masonry({ itemSelector: '.brick', resize: !0 });
    }),
    e('#folio-wrap').lightGallery({
      showThumbByDefault: !1,
      hash: !1,
      selector: '.item-wrap',
    }),
    (t = e('#header-menu-trigger')),
    c.on('scroll', function () {
      c.scrollTop() > 150 ? t.addClass('opaque') : t.removeClass('opaque');
    }),
    (function () {
      var n = e('#header-menu-trigger'),
        t = e('#menu-nav-wrap').find('.close-button'),
        a = e('body');
      e('section, footer'),
        n.on('click', function (e) {
          e.preventDefault(),
            n.toggleClass('is-clicked'),
            a.toggleClass('menu-is-open');
        }),
        t.on('click', function (e) {
          e.preventDefault(), n.trigger('click');
        }),
        a.on('click', function (t) {
          e(t.target).is(
            '#menu-nav-wrap, #header-menu-trigger, #header-menu-trigger span'
          ) || (n.removeClass('is-clicked'), a.removeClass('menu-is-open'));
        });
    })(),
    e('.smoothscroll').on('click', function (n) {
      var t = this.hash,
        a = e(t);
      n.preventDefault(),
        n.stopPropagation(),
        e('html, body')
          .stop()
          .animate({ scrollTop: a.offset().top }, r, 'swing')
          .promise()
          .done(function () {
            e('body').hasClass('menu-is-open') &&
              e('#header-menu-trigger').trigger('click'),
              (window.location.hash = t);
          });
    }),
    e('input, textarea, select').placeholder(),
    (a = e('#stats')),
    (o = e('.stat-count')),
    a.waypoint({
      handler: function (n) {
        'down' === n &&
          o.each(function () {
            var n = e(this);
            e({ Counter: 0 }).animate(
              { Counter: n.text() },
              {
                duration: l,
                easing: 'swing',
                step: function (e) {
                  n.text(Math.ceil(e));
                },
              }
            );
          }),
          this.destroy();
      },
      offset: '90%',
    }),
    e('.alert-box').on('click', '.close', function () {
      e(this).parent().fadeOut(500);
    }),
    e('html').hasClass('no-cssanimations') ||
      e('.animate-this').waypoint({
        handler: function (n) {
          var t = s;
          'down' !== n ||
            e(this.element).hasClass('animated') ||
            (e(this.element).addClass('item-animate'),
            setTimeout(function () {
              e('body .animate-this.item-animate').each(function (n) {
                var a = e(this),
                  o = a.data('animate') || null;
                o || (o = t),
                  setTimeout(function () {
                    a.addClass(o + ' animated'), a.removeClass('item-animate');
                  }, 50 * n);
              });
            }, 100)),
            this.destroy();
        },
        offset: '95%',
      }),
    c.on('load', function () {
      e('html').hasClass('no-cssanimations') ||
        setTimeout(function () {
          e('.animate-intro').each(function (n) {
            var t = e(this),
              a = t.data('animate') || null;
            a || (a = s),
              setTimeout(function () {
                t.addClass(a + ' animated');
              }, 300 * n);
          });
        }, 100);
    }),
    e('#contactForm').validate({
      submitHandler: function (n) {
        var t = e('#submit-loader');
        e.ajax({
          type: 'POST',
          url: 'inc/sendEmail.php',
          data: e(n).serialize(),
          beforeSend: function () {
            t.fadeIn();
          },
          success: function (n) {
            'OK' == n
              ? (t.fadeOut(),
                e('#message-warning').hide(),
                e('#contactForm').fadeOut(),
                e('#message-success').fadeIn())
              : (t.fadeOut(),
                e('#message-warning').html(n),
                e('#message-warning').fadeIn());
          },
          error: function () {
            t.fadeOut(),
              e('#message-warning').html(
                'Something went wrong. Please try again.'
              ),
              e('#message-warning').fadeIn();
          },
        });
      },
    }),
    (i = e('#go-top')),
    e(window).on('scroll', function () {
      e(window).scrollTop() >= 500 ? i.fadeIn(400) : i.fadeOut(400);
    });
})(jQuery);
