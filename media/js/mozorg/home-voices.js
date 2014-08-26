/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

;(function($) {
    'use strict';

    var $downloadPromo = $('.firefox-download');

    $downloadPromo.on('mouseenter focusin', function () {
        $downloadPromo.addClass('show');
    });

    $downloadPromo.on('mouseleave focusout', function () {
        $downloadPromo.removeClass('show');
    });

    var $promoLarge = $('.promo-large');

    $promoLarge.on('mouseenter focusin', function () {
        $(this).addClass('show');

    });

    $promoLarge.on('mouseleave focusout', function () {
        $(this).removeClass('show');
    });

    var $downloadButtonLinks = $('.firefox-download .download-other-desktop').detach();
    $downloadButtonLinks.css('display', 'block').appendTo('.firefox-download .secondary-content');

})(window.jQuery);
