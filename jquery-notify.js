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
    // Events for notify
    var events = {
        // Event fired when notify shows.
        show: function () {
            var $this = $(this);
            var data = $this.data('notify');
            if (data) {
                // get corresponding queue
                var queue = $.notify.queue[data.container.attr('data-notify-id')];
                // add element to notify queue
                if (!queue.add(data.notifier)) {
                    // notifier isnt visible yet, show it and position it.
                    data.notifier.animate({ 'opacity': 1 }, data.settings.animationDuration)
                                 .css({ 'top': queue.getYPosition(data.notifier) });

                    if (data.settings.displayTime && !data.settings.sticky) {
                        // there is a display time set, trigger hide when time expires.
                        setTimeout(function () { $this.trigger('hide'); }, data.settings.displayTime);
                    }
                }
                else {
                    // update of notifier position. start animation to move to new position.
                    data.notifier.animate({ 'top': queue.getYPosition(data.notifier) });
                }

                if (data.settings.adjustContent) {
                    // update top margin of container.
                    data.container.animate({ 'padding-top': queue.getHeight() }, data.settings.animationDuration);
                }
            }
        },
        // Event fired when notify hides.
        hide: function () {
            var $this = $(this);
            var data = $this.data('notify');
            if (data && data.notifier.css('opacity')) {
                // hide notifier
                data.notifier.animate({ 'opacity': 0 }, data.settings.animationDuration, function () {
                    // remove item from queue
                    $.notify.queue[data.container.attr('data-notify-id')].remove(data.notifier);

                    if (data.settings.adjustContent) {
                        // update top margin of container.
                        data.container.animate({ 'padding-top': $.notify.queue[data.container.attr('data-notify-id')].getHeight() }, data.settings.animationDuration);
                    }
                });
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
                'autoShow': true,
                'closeText': 'x',
                'sticky': false,
                'type': 'default',
                'adjustContent': false
            }, args);

            return $(this).each(function () {
                var $this = $(this);
                var data = $this.data('notify');

                // If the plugin hasn't been initialized yet
                if (!data) {
                    // create notifier
                    var notifier = $('<div />', {
                        'class': 'notify ' + settings.type,
                        'data-notifier-id': new Date().getTime(),
                        'css': {
                            'opacity': 0,
                            'position': 'absolute'
                        }
                    }).bind('update', function () { $this.trigger('show'); })
                      .append($('<span />', {
                          'class': 'close',
                          'text': settings.closeText,
                          'click': function () { $this.trigger('hide'); }
                      }));
                    // bind events
                    $this.bind('show', events.show)
                         .bind('hide', events.hide);
                    // append element to notifier
                    notifier.append($this);
                    var container = $(settings.appendTo);
                    if (!container.attr('data-notify-id')) {
                        // initialize notify container
                        var containerId = new Date().getTime();
                        $.notify.queue[containerId] = new Queue();
                        container.attr('data-notify-id', containerId)
                                 .css('position', 'relative');
                    }
                    container.append(notifier);
                    $this.data('notify', {
                        settings: settings,
                        notifier: notifier,
                        container: container
                    });
                    if (settings.autoShow) {
                        // show notification
                        $this.trigger('show');
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

    function Queue() {
        this._items = new Array();
    }

    $.extend(Queue.prototype, {
        add: function (element) {
            var inQueue = $.inArray(element, this._items) > -1;
            if (!inQueue) {
                // add item to end of queue
                this._items.push(element);
            }
            return inQueue;
        },
        remove: function (element) {
            // remove item from queue.
            var index = $.inArray(element, this._items);
            this._items.splice(index, 1);
            this.update(index);
        },
        update: function (startIndex) {
            var index = startIndex || 0;
            for (var i = index; i < this._items.length; i++) {
                // trigger redraw..
                var el = this._items[i];
                if (el && el.length) {
                    el.trigger('update');
                }
            }
        },
        getYPosition: function (element) {
            // get Y position of element in queue.
            var yPos = 0;
            for (var i = 0; i < this._items.length; i++) {
                var el = this._items[i];
                if (el == element) { break; }
                yPos += el.outerHeight(true);
            }
            return yPos;
        },
        getHeight: function () {
            var height = 0;
            for (var i = 0; i < this._items.length; i++) {
                height += this._items[i].outerHeight(true);
            }
            return height;
        }
    });

    // create singleton queue object.
    $.notify = {
        queue: {}
    };

})(jQuery);