/*
 * File:        jquery-notify.js
 * Version:     0.1
 * Author:      Vincent Keizer (www.vicreative.nl)
 * Info:        www.vicreative.nl/projects/notify
 *
 * Copyright 2013 Vincent Keizer, all rights reserved.
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
(function ($) {
    // Events for selectify
    var events = {
        // Event fired when notify shows.
        show: function () {
            var $this = $(this);
            var data = $this.data('notify');
            if (data && !data.notifier.css('opacity') == 0) {
                // notifier isnt visible yet, show it.
                data.notifier.css({
                    'top': '20px',
                    'left': '50%',
                    'margin-left' : data.notifier.width() / 2 * -1 // position in center
                }).animate({ 'opacity': 1 }, data.settings.animationDuration);

                if (data.settings.displayTime)
                {
                    // there is a display time set, trigger hide when time expires.
                    setTimeout(function () { $this.trigger('hide') }, data.settings.displayTime);
                }
            }
        },
        // Event fired when notify hides.
        hide: function () {
            var $this = $(this);
            var data = $this.data('notify');
            if (data && data.notifier.css('opacity'))
            {
                // hide notifier
                data.notifier.animate({ 'opacity': 0 }, data.settings.animationDuration)
            }
        },
    };

    var methods = {
        init: function (args) {
            // extend default settings
            var settings = $.extend({
                'animationDuration': 500,
                'displayTime': 3000,
                'appendTo': 'body',
                'autoShow': true
            }, args);

            return $(this).each(function () {
                var $this = $(this);
                var data = $this.data('notify');

                // If the plugin hasn't been initialized yet
                if (!data) {
                    // create notifier
                    var notifier = $('<div />', {
                        'class': 'notify',
                        'css': {
                            'opacity': 0,
                            'position': 'absolute'
                        }
                    });
                    // bind events
                    $this.bind("show", events.show)
                         .bind("hide", events.hide);
                    // append element to notifier
                    notifier.append($this);
                    $(settings.appendTo).append(notifier);
                    $this.data('notify', {
                        settings: settings,
                        notifier: notifier
                    });
                    if (settings.autoShow) {
                        // show notification
                        $this.trigger("show");
                    }
                }
            });
        },
        destroy: function () {
            return this.each(function () {
                var $this = $(this),
                    data = $this.data('notify');
                if (data) {
                    data.notifier.remove();
                }
            });
        },
        show: function () {
            return this.each(function () {
                var data = $(this).data('notify');
                if (data) {
                    $(this).trigger('show');
                }
            });
        },
        hide: function () {
            return this.each(function () {
                var data = $(this).data('notify');
                if (data) {
                    $(this).trigger('hide');
                }
            });
        }
    };

    $.fn.notify = function (options) {
        var method = options;
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery notify');
        }
    };
})(jQuery);