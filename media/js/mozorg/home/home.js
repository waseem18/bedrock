/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

$(function () {
    'use strict';

    var $window = $(window);
    var $promos = $('.promo-grid');
    var $promoItems = $('.promo-grid .item');
    var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints || navigator.maxTouchPoints;
    var queryIsMobile;

    if (window.matchMedia) {
        queryIsMobile = matchMedia('(max-width: 659px)');
    }

    // for devices that don't support matchMedia we go off the
    // width of the #masthead .container as opposed to $window,
    // as this has a fixed size.
    var isSmallViewport = $('#masthead .container') < 460;

    function initFirefoxDownloadPromo() {
        var $downloadPromo = $('.firefox-download');

        $downloadPromo.on('mouseenter focusin', function () {
            $downloadPromo.addClass('show');
        });

        $downloadPromo.on('mouseleave focusout', function () {
            $downloadPromo.removeClass('show');
        });

        // show download button small links
        $('.firefox-download .download-other-desktop').show();
    }

    initFirefoxDownloadPromo();

    function initPromoHoverOver() {
        var $promoLarge = $('.promo-large-landscape, .promo-large-portrait');
        var scrollTimeout;
        var gaTimeout;

        $promoLarge.on('mousemove', function() {
            var $this = $(this);
            // for slightly less jank css transitions are only triggered
            // when the user is not scrolling
            if (!$promos.hasClass('scroll') && !$this.hasClass('show')) {
                $this.addClass('show');

                // only track a GA hover event once the mouse cursor
                // rests over a promo for over half a second
                clearTimeout(gaTimeout);
                gaTimeout = setTimeout(function () {
                    // TODO console.log('GA Track');
                }, 600);
            }
        });

        $promoLarge.on('mouseleave', function() {
            var $this = $(this);
            if ($this.hasClass('show')) {
                $this.removeClass('show');
            }
        });

        $promoLarge.on('click focus', function(e) {
            var $this = $(this);
            if (!$this.hasClass('show')) {
                e.preventDefault();
                $this.addClass('show');
            }
        });

        // when the inner link loses focus, hide the secondary content again
        // assumes a single link in the panel
        $('.promo-large-landscape > a, .promo-large-portrait > a').on('blur', function() {
            var $this = $(this);
            if ($this.parent().hasClass('show')) {
                $this.parent().removeClass('show');
            }
        });

        $(window).on('scroll', function() {
            clearTimeout(scrollTimeout);
            if (!$promos.hasClass('scroll')) {
                $promos.addClass('scroll');
            }

            scrollTimeout = setTimeout(function () {
                $promos.removeClass('scroll');
            }, 200);
        });
    }

    function initFacesGrid() {
        // add stagger class to increment transition delay
        $promos.addClass('stagger');
        // show each promo
        $promoItems.addClass('reveal');
        // remove stagger class once set to reset transition delay
        setTimeout(function () {
            $promos.removeClass('stagger');
        }, 50);
    }

    function initEllipsis() {
        var $tweet = $('#twt-body');
        var title;

        if ($tweet.length > 0) {
            title = $.trim($tweet.text());

            $tweet.dotdotdot({
                callback: function () {
                    var text = $.trim($tweet.text());

                    if (text.match('[.]{3}$')) {
                        $tweet.attr('title', title);
                    }
                }
            });
        }
    }

    initEllipsis();
    initFacesGrid();
    initPromoHoverOver();

});
