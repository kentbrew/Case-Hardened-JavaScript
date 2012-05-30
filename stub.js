(function (w, d, a) {
  var $ = w[a.k] = {
    'a': a, 'd': d, 'w': w,
    'f': (function () {
      return {
        close: function () {
          $.s.bd.parentNode.removeChild($.s.bd);
        },
        listen: function (el, ev, fn) {
          if (typeof $.w.addEventListener !== 'undefined') {
            el.addEventListener(ev, fn, false);
          } else if (typeof $.w.attachEvent !== 'undefined') {
            el.attachEvent('on' + ev, fn);
          }
        }, 
        behavior: function () {
          $.f.listen($.s.x, 'click', $.f.close);
        },
        presentation: function () {
          $.d.h = $.d.getElementsByTagName('HEAD')[0];
          var rules = $.a.rules.join('\n'),
            css = $.d.createElement('STYLE');
          css.type = 'text/css';
          rules = rules.replace(/#_/g, '#' + $.a.k + '_');
          if (css.styleSheet) {
            css.styleSheet.cssText = rules;
          } else {
            css.appendChild($.d.createTextNode(rules));
          }
          $.d.h.appendChild(css);
          $.f.behavior();
        },
        structure: function (script) {
          $.a.config = script.getAttribute('data-config');
          $.s = {};
          $.s.bd = $.d.createElement('DIV');
          $.s.bd.id = $.a.k + '_bd';
          var span = $.d.createElement('SPAN');
          span.innerHTML = $.a.config;
          $.s.bd.appendChild(span);
          $.s.x = $.d.createElement('A');
          $.s.x.id = $.a.k + '_x';
          $.s.x.innerHTML = 'x';
          $.s.bd.appendChild($.s.x);
          script.parentNode.insertBefore($.s.bd, script);
          script.parentNode.removeChild(script);
          $.f.presentation();
        },
        init: function () {
          var s = $.d.getElementsByTagName('SCRIPT'),
            n = s.length, i;
          for (i = 0; i < n; i = i + 1) {
            if (s[i].src.match($.a.src)) {
              $.f.structure(s[i]);
              break;
            }
          }
        }
      };
    }())
  }; 
  $.f.init();     
}(window, document, {
  'k': '_' + new Date().getTime(),
  'src': /widget.js$/,
  'rules': [ 
    '#_bd { padding: 20px 40px; position: absolute; top: 0; right: 0; background: #f00; color: #fff; }',
    '#_x { position: absolute; top: 2px; right: 10px; color: #ff0; cursor: pointer; }'
  ]
} ));