"use strict";
/*global window, document: false */
/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, strict: true, newcap: true, immed: true, indent: 3 */
/* to validate, paste me into the form at http://jslint.com */

(function (w, d) {
   var k, $;   

   // create a random string
   k = 'kb_' + new Date().getTime();   

   // window.yourRandomString is now the name of this program
   $ = w[k] = {};

   // $.c = a place for constants
   // $.c.k is our global back door for CSS ids and external JavaScript callbacks
   $.c = { "k": k };

   // handy local pointers to window and document
   $.w = w;
   $.d = d;

   // our main function 
   $.f = (function () { 
      return {   
         init : function (hinc) {
            var i, s;

            // get all the script nodes on the page
            s = $.d.getElementsByTagName('SCRIPT');
 
            // loop through all script nodes on the page
            for (i = 0; i < s.length; i = i + 1) { 

               // hinc is our target pattern, passed in from init call
               if (s[i].src.match(hinc)) { 
                  
                  // create our home node
                  $.s = $.f.fiat('DIV');

                  // insert it immediately before the script                  
                  s[i].parentNode.insertBefore($.s, s[i]);
                  
                  // kick things off, passing along any settings from the script
                  $.f.domo(s[i].getAttribute('settings')); 
                  // yes, yes, I know: settings is a nonstandard attribute
                  
                  // remove script tag
                  s[i].parentNode.removeChild(s[i]);
                  
                  // you're done
                  break; 
               } 
            }
         },
         // housekeeping
         domo : function (settings) {
            var i, auto;   

            // more handy local pointers to head and body            
            $.d.h = $.d.getElementsByTagName('HEAD')[0];
            $.d.b = $.d.getElementsByTagName('BODY')[0];

            // parse any user-submitted arguments
            $.a = $.f.dili(settings);

            // if you have any defaults, enter them here
            auto = { 
               "w": 100
            };  
            
            // load defaults if not set by user input in settings
            for (i in auto) { 
               if (auto[i].hasOwnProperty && $.a[i] === undefined) { 
                  $.a[i] = auto[i]; 
               } 
            }   
            
            // see if we need to run immediately or can wait for page load
            if ($.a.exe) {
               // run immediately -- useful for GM or toolbar apps that may be created after page load
               $.f.inco();
            } else {
               // wait for page load -- useful if app is created only once, on page load
               if (typeof $.w.addEventListener !== 'undefined') { 
                  try {
                     $.w.addEventListener('load', $.f.inco, false);
                  } catch (e1) {} 
               } else if (typeof $.w.attachEvent !== 'undefined') { 
                  try {
                     $.w.attachEvent('onload', $.f.inco);
                  } catch (e2) {} 
               }
            }
         },
         // if we've made it this far, it's safe to try building something inside that container DIV
         inco : function () {
            $.f.vidi();
            $.f.aedi();
            $.f.acti();
         },
         // presentation
         vidi : function () {      
            var rules, css;
            
            // our structure has that same random ID we created for our script name
            rules = [
               '#' + $.c.k + ' { width:' + $.a.w + 'px; margin:0; padding:0; }',
               '#' + $.c.k + ' button { color:red; }'
            ];
            
            // create an empty stylesheet
            css = $.d.createElement('STYLE');
            css.type = 'text/css';
            
            // IE vs the rest of the damn universe
            if (css.styleSheet) { 
               css.styleSheet.cssText = rules.join("\n");
            } else { 
               css.appendChild($.d.createTextNode(rules.join("\n")));
            }
            
            // add it to head
            $.d.h.appendChild(css);  
         },
         // structure
         aedi : function () {
         
            // set our home node's ID to our random script name
            $.s.id = $.c.k;
            
            // pass tag name and attributes to $.f.fiat for creation
            $.s.b = $.f.fiat({"BUTTON": {"innerHTML": $.c.k + " Click Me!"}});
            
            // append to home node
            $.s.appendChild($.s.b);
         },
         // behavior
         acti : function () {
            // $.v is a global object for variables
            $.v = {
               "counter": 0
            };
            
            // tiny stub function so we can see it's working
            $.s.b.onmouseup = function () {
               $.v.counter = $.v.counter + 1;
               this.innerHTML = "Click count: " + $.v.counter;
            };
         },
         // create an element. 
         // sets attributes only; will not style or add functions  
         // please style with CSS and add functions unobtrusively 
         fiat: function (o) {
            var el, i, j;
            el = null;
            if (typeof o === 'object') {
               // we've been has passed an object with at least one member
               // example: {"P": {"innerHTML": "foo"}}
               for (i in o) {
                  if (o[i].hasOwnProperty) {
                     try {
                        el = $.d.createElement(i);
                        for (j in o[i]) { 
                           if (o[i][j].hasOwnProperty && typeof o[i][j] === 'string') { 
                              try { 
                                 el[j] = o[i][j]; 
                              } catch (e2) { } 
                           }
                        }
                     } catch (e1) { }
                     break;
                  }
               }
            } else { 
               // perhaps we are just creating an empty element
               if (typeof o === 'string') { 
                  el = $.d.createElement(o); 
               } 
            }
            // have we created a valid tag?
            if (typeof el === 'object' && el.tagName) { 
               return el; 
            } else { 
               return false; 
            }
         },
         // destroy an element
         abol: function (o) {
            if (o && o.parentNode) { 
               if (o.parentNode.removeChild(o)) { 
                  return true;
               }
            } 
            return false;
         },
         // sieve input from a single string into key/value pairs and return an object
         dili : function (input) {
            var args, pairs, i, query, key, value, temp;
            args = {};
            // require input to be string, not object
            if (typeof input === 'string') {               
               input = $.w.unescape(input);
               pairs = input.split('&');
               for (i = 0; i < pairs.length; i = i + 1) {
                  query = pairs[i].split('=');
                  key = query[0];
                  value = query[1];
                  // if we see a SECOND value for k, turn it into an array
                  if (typeof args[key] === 'string') {
                     temp = args[key];
                     args[key] = [];
                     args[key][0] = temp;
                  }
                  if (typeof args[key] === 'object' && args[key].length) {
                     // is args[key] an array? add value
                     args[key][args[key].length] = value;
                  } else {
                     // args[key] takes value as a string
                     args[key] = value;
                  }
               }
            }
            return args;
         }
      };
   }());
   
   // careful, now:  what we pass here should be a complete pattern match for our 
   // script name, otherwise we will be well and truly hosed.  use something like this:
   //  /^https?:\/\/[^\/]*yourdomain.com\/yourscript\.js$/;
   // while testing from desktop, feel free to just match for the script name
   
   $.f.init(/stub\.js$/);
}(window, document));