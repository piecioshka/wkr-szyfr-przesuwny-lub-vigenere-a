(function () {
  "use strict";

  function $(selector) {
    return document.querySelector(selector);
  }

  var form = $("form");
  var plain_text = $("#plain-text");
  var cifer_text= $("#cifer-text");
  var key = $("#key");

  form.addEventListener("submit", function (evt) {
    var p = plain_text.value;
    var k = +key.value;
    cifer_text.value = hash(p, k);
    evt.preventDefault();
  });

}(this));

