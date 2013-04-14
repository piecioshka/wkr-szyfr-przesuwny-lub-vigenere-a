(function (global) {
  "use strict";

  // epxorts 
  global.unhash = function(p, k) {
    var s = p.split("");
    s = s.map(function(l) {
      var c = l.charCodeAt(0) - k;
      return String.fromCharCode(c);
    });
    return s.join("");
  };
}(this));

