/**
 * @author Piotr Kowalski <piecioshka@gmail.com>
 * @see http://jsninja.pl/wkr-szyfr-cezara/
 * @licence The MIT License {@link http://piecioshka.mit-license.org/}
 */
(function (root, factory) {
    root.App = factory(root._);
}(this, function (_) {
    'use strict';

    function App() {
        this.initialize();
    }

    App.prototype = {
        initialize: function () {
            this._set_crypt(0, this.hash);
            this._set_decrypt(1, this.unhash);
        },

        _checkParams: function (v) {
            var errors = [];
            var status;

            if (!(/^\d+$/).test(v)) {
                errors.push('Incorrect value param');
            }

            if (_.size(errors)) {
                alert(_.first(errors));
            }

            // update status by error list
            status = !_.size(errors);

            return status;
        },


        hash: function (p, k) {
            var s = p.split('');
            s = _.map(s, function(l) {
                var c = l.charCodeAt(0) + k;
                return String.fromCharCode(c);
            });
            return s.join('');
        },

        unhash: function (p, k) {
            var s = p.split('');
            s = _.map(s, function(l) {
                var c = l.charCodeAt(0) - k;
                return String.fromCharCode(c);
            });
            return s.join('');
        },

        _set_crypt: function (nr, callback) {
            var self = this;
            var form = $('.form')[nr];
            var plaintext = $('.plain-text')[nr];
            var ciphertext = $('.cifer-text')[nr];
            var key = $('.key')[nr];

            $(form).on('submit', function (evt) {
                var p = plaintext.value;
                var k = +key.value;
                if (self._checkParams(k)) {
                    ciphertext.value = callback(p, k);
                }
                evt.preventDefault();
            });
        },

        _set_decrypt: function (nr, callback) {
            var self = this;
            var form = $('.form')[nr];
            var plaintext = $('.plain-text')[nr];
            var ciphertext = $('.cifer-text')[nr];
            var key = $('.key')[nr];

            $(form).on('submit', function (evt) {
                var p = ciphertext.value;
                var k = +key.value;
                if (self._checkParams(k)) {
                    plaintext.value = callback(p, k);
                }
                evt.preventDefault();
            });
        }
    };

    return App;
}));

