/**
 * @author Piotr Kowalski <piecioshka@gmail.com>
 * @see https://piecioshka.github.io/wkr-szyfr-przesuwny-lub-vigenere-a/
 * @licence The MIT License {@link http://piecioshka.mit-license.org/}
 */
(function (root, factory) {
    'use strict';

    root.App = factory(root._, root.$);
}(this, function (_, $) {
    'use strict';

    var rkey = (/^\w*$/);

    function App() {
        this.initialize();
    }

    App.prototype = {
        initialize: function () {
            this._set_crypt(this.hash);
            this._set_decrypt(this.unhash);
        },

        _checkParams: function (v) {
            var errors = [];
            var status;

            if (!rkey.test(v)) {
                errors.push('Niepoprawna wartość parametru');
            }

            if (_.size(errors)) {
                alert(_.first(errors));
            }

            // update status by error list
            status = !_.size(errors);

            return status;
        },

        _key: function (k, i) {
            var result = null;
            if (!isNaN(parseInt(k, 10))) {
                result = parseInt(k, 10);
            } else if (_.isString(k)) {
                k = _.toArray(k);
                result = _.indexOf(App.ALPHABET, k[i % k.length]);
            } else {
                alert('Nie poprawny klucz');
            }
            return result;
        },

        hash: function (p, k) {
            var self = this;
            var s = _.toArray(p);
            var n = App.ALPHABET.length;
            s = _.map(s, function(x, i) {
                var y = (_.indexOf(App.ALPHABET, x) + self._key(k, i)) % n;
                // Cipher text
                var c = App.ALPHABET[y];
                return c;
            });
            return s.join('');
        },

        unhash: function (c, k) {
            var self = this;
            var s = _.toArray(c);
            var n = App.ALPHABET.length;
            s = _.map(s, function(y, i) {
                var x = (_.indexOf(App.ALPHABET, y) - self._key(k, i)) % n;
                if (x < 0) x += n;
                // Plain text
                var p = App.ALPHABET[x];
                return p;
            });
            return s.join('');
        },

        _lowerCase: function (/* list of input fields */) {
            var args = _.toArray(arguments);
            _.each(args, function ($field) {
                $field.val($field.val().toLowerCase());
            });
        },

        _set_crypt: function (callback) {
            var form = $('.hash-block .form');
            var $plaintext = $('.hash-block .plain-text');
            var $ciphertext = $('.hash-block .cifer-text');
            var $key = $('.hash-block .key');

            $(form).on('submit', _.bind(function (evt) {
                evt.preventDefault();
                evt.stopPropagation();

                this._lowerCase($plaintext, $ciphertext);

                var p = $plaintext.val();
                var k = $key.val();
                if (this._checkParams(k)) {
                    $ciphertext.val(callback.call(this, p, k));
                }
            }, this));
        },

        _set_decrypt: function (callback) {
            var form = $('.unhash-block .form');
            var $plaintext = $('.unhash-block .plain-text');
            var $ciphertext = $('.unhash-block .cifer-text');
            var $key = $('.unhash-block .key');

            $(form).on('submit', _.bind(function (evt) {
                evt.preventDefault();
                evt.stopPropagation();

                this._lowerCase($plaintext, $ciphertext);

                var p = $ciphertext.val();
                var k = $key.val();
                if (this._checkParams(k)) {
                    $plaintext.val(callback.call(this, p, k));
                }
            }, this));
        }
    };

    App.ALPHABET = _.toArray('abcdefghijklmnopqrstuvwxyz');

    return App;
}));

