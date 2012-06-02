(function (win, doc, arg) {
  var $ = win[arg.root] = {
    'arg': arg, 'doc': doc, 'win': win,
    'func': (function () {
      return {
        close: function () {
          $.struc.body.parentNode.removeChild($.struc.body);
        },
        listen: function (el, ev, fn) {
          if (typeof $.win.addEventListener !== 'undefined') {
            el.addEventListener(ev, fn, false);
          } else if (typeof $.win.attachEvent !== 'undefined') {
            el.attachEvent('on' + ev, fn);
          }
        }, 
        behavior: function () {
          $.func.listen($.struc.x, 'click', $.func.close);
        },
        presentation: function () {
          $.doc.head = $.doc.getElementsByTagName('HEAD')[0];
          var rules = $.arg.rules.join('\n'),
            css = $.doc.createElement('STYLE');
          css.type = 'text/css';
          rules = rules.replace(/#_/g, '#' + $.arg.root + '_');
          rules = rules.replace(/;/g, '!important;');
          if (css.styleSheet) {
            css.styleSheet.cssText = rules;
          } else {
            css.appendChild($.doc.createTextNode(rules));
          }
          $.doc.head.appendChild(css);
          $.func.behavior();
        },
        structure: function (script) {
          $.arg.config = script.getAttribute('data-config');
          $.struc = {};
          $.struc.body = $.doc.createElement('DIV');
          $.struc.body.id = $.arg.root + '_bd';
          var span = $.doc.createElement('SPAN');
          span.innerHTML = $.arg.config;
          $.struc.body.appendChild(span);
          $.struc.x = $.doc.createElement('A');
          $.struc.x.id = $.arg.root + '_x';
          $.struc.x.innerHTML = 'x';
          $.struc.body.appendChild($.struc.x);
          script.parentNode.insertBefore($.struc.body, script);
          script.parentNode.removeChild(script);
          $.func.presentation();
        },
        init: function () {
          var script = $.doc.getElementsByTagName('SCRIPT'),
            n = script.length, i;
          for (i = 0; i < n; i = i + 1) {
            if (script[i].src.match($.arg.src)) {
              $.func.structure(script[i]);
              break;
            }
          }
        }
      };
    }())
  }; 
  $.func.init();     
}(window, document, {
  'root': '_' + new Date().getTime(),
  'src': /widget.js$/,
  'rules': [ 
    '#_bd { padding: 20px 40px; position: absolute; top: 0; right: 0; background: #f00; color: #fff; }',
    '#_x { position: absolute; top: 2px; right: 10px; color: #ff0; cursor: pointer; }'
  ]
} ));