(function() {
  // map some classlist functions to the jQuery counterpart
  var props = ['addClass', 'removeClass', 'toggleClass'],
    maps = ['add', 'remove', 'toggle'];

  props.forEach(function(prop, index) {
    $.prototype[prop] = function(a) {
      return this.each(function(b) {
        b.classList[maps[index]](a);
      });
    };
  });

  $.prototype.css = function(a, b) {
    return b === []._ ? this[0].style[a] : this.each(function(c) {
      c.style[a] = b;
    });
  };

  $.prototype.attr = function(a, b) {
    return b === []._ ? this[0].getAttribute[a] : this.each(function(c) {
      c.setAttribute[a] = b;
    });
  };

  $.prototype.removeAttr = function(a) {
    return this.each(function(b) {
      b.removeAttribute(a);
    });
  };

  $.prototype.hasClass = function(a) {
    return this[0].classList.contains(a);
  };

  $.prototype.append = function(a) {
    return this.each(function(b) {
      b.innerHTML += a;
    });
  };

  $.prototype.text = function(a) {
    return a === []._ ? this[0].textContent : this.each(function(b) {
      b.textContent = a;
    });
  };

  $.prototype.html = function(a) {
    return a === []._ ? this[0].innerHTML : this.each(function(b) {
      b.innerHTML = a;
    });
  };

  $.prototype.trigger = function(a) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(a, true, false);
    this.each(function(b) {
      b.dispatchEvent(event);
    });
  };

  // cross browser stop, $.stop(event)
  $.stop = function(e) {
    if (!e.preventDefault) {
      e.returnValue = false;
    } else {
      e.preventDefault();
    }
  };
})();
