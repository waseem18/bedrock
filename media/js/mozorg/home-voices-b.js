/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

$(function () {
    'use strict';

    var $promos = $('.promo-grid');
    var $promoContainer = $('.promo-grid-inner');

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

    function initPromoHoverOver () {
        var $promoLargeLandscape = $('.promo-large-landscape, .promo-large-portrait');
        var showTimeout;

        $promoLargeLandscape.on('mousemove', function (e) {
            var $this = $(this);
            if (!$promos.hasClass('scroll') && !$this.hasClass('show')) {
                $this.addClass('show');
            }
        });

        $promoLargeLandscape.on('focusin', function () {
            $(this).addClass('show');
        });

        $promoLargeLandscape.on('mouseleave focusout', function () {
            $(this).removeClass('show');
        });

        $(window).on('scroll', function () {
            clearTimeout(showTimeout);
            if (!$promos.hasClass('scroll')) {
                $promos.addClass('scroll');
            }

            showTimeout = setTimeout(function () {
                $promos.removeClass('scroll');
            }, 200);
        });
    }

    initPromoHoverOver();

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
