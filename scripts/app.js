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
            this.set_crypt(0, this.hash);
            this.set_decrypt(1, this.unhash);
        },

        hash: function (p, k) {
            var s = p.split("");
            s = _.map(s, function(l) {
                var c = l.charCodeAt(0) + k;
                return String.fromCharCode(c);
            });
            return s.join("");
        },

        unhash: function (p, k) {
            var s = p.split("");
            s = _.map(s, function(l) {
                var c = l.charCodeAt(0) - k;
                return String.fromCharCode(c);
            });
            return s.join("");
        },

        set_crypt: function (nr, callback) {
            var form = $(".form")[nr];
            var plaintext = $(".plain-text")[nr];
            var ciphertext = $(".cifer-text")[nr];
            var key = $(".key")[nr];

            form.addEventListener("submit", function (evt) {
                var p = plaintext.value;
                var k = +key.value;
                ciphertext.value = callback(p, k);
                evt.preventDefault();
            });
        },

        set_decrypt: function (nr, callback) {
            var form = $(".form")[nr];
            var plaintext = $(".plain-text")[nr];
            var ciphertext = $(".cifer-text")[nr];
            var key = $(".key")[nr];

            form.addEventListener("submit", function (evt) {
                var p = ciphertext.value;
                var k = +key.value;
                plaintext.value = callback(p, k);
                evt.preventDefault();
            });
        }
    };

    return App;
}));

