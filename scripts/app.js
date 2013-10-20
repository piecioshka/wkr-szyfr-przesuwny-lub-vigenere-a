(function () {
  "use strict";

  function $$(selector) {
    return document.querySelectorAll(selector);
  }

  function set_crypt(nr, callback) {
    var form = $$(".form")[nr];
    var plaintext = $$(".plain-text")[nr];
    var ciphertext = $$(".cifer-text")[nr];
    var key = $$(".key")[nr];

    form.addEventListener("submit", function (evt) {
      var p = plaintext.value;
      var k = +key.value;
      ciphertext.value = callback(p, k);
      evt.preventDefault();
    });
  }

  function set_decrypt(nr, callback) {
    var form = $$(".form")[nr];
    var plaintext = $$(".plain-text")[nr];
    var ciphertext = $$(".cifer-text")[nr];
    var key = $$(".key")[nr];

    form.addEventListener("submit", function (evt) {
      var p = ciphertext.value;
      var k = +key.value;
      plaintext.value = callback(p, k);
      evt.preventDefault();
    });
  }

  set_crypt(0, hash);
  set_decrypt(1, unhash);

}(this));

