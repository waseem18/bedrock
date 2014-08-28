/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

$(function () {
    'use strict';

    var $promos = $('.promo-grid');

    function toggleFaces (show) {
        if (show) {
            $promos.find('.promo-square').show().addClass('item');
        } else {
            $promos.find('.promo-square').hide().removeClass('item');
        }
    }

    // hide/disable pagers in mobile view
    var queryIsMobile = matchMedia('(max-width: 460px)');

    if (!queryIsMobile.matches) {
        toggleFaces(true);
    } else {
        toggleFaces(false);
    }

    queryIsMobile.addListener(function(mq) {
        if (mq.matches) {
            toggleFaces(false);
        } else {
            toggleFaces(true);
        }
    });

    function initFirefoxDownloadPromo () {
        var $downloadPromo = $('.firefox-download').addClass('stamp');
        var $downloadButtonLinks = $('.firefox-download .download-other-desktop').detach();

        $downloadPromo.on('mouseenter focusin', function () {
            $downloadPromo.addClass('show');
        });

        $downloadPromo.on('mouseleave focusout', function () {
            $downloadPromo.removeClass('show');
        });

        $downloadButtonLinks.css('display', 'block').appendTo('.firefox-download .secondary');
    }

    initFirefoxDownloadPromo();

    $('.faces-grid').masonry({
        columnWidth: 140,
        gutter: 20,
        itemSelector: 'li'
    });

    $promos.masonry({
        columnWidth: 140,
        gutter: 20,
        itemSelector: '.item',
        stamp: '.stamp'
    });
});
