(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Dom = root.Dom || factory();
  }
}(this, function () {
  
  if(!Array.isArray) {
    Array.isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
  }
  var dom = (function(){
    var self = this;
  
    var tags = [ "A", "ARTICLE", "BASE",  "BASEFONT",  "BIG",  "BLOCKQUOTE",  "BODY",  "BR",  "B", "BUTTON",  "CAPTION",  "CENTER",  "CITE",  "CODE",  "DD",  "DFN",  "DIR",  "DIV",  "DL",  "DT",  "EM",  "FONT",  "FORM",  "HEADER", "H1",  "H2",  "H3",  "H4",  "H5",  "H6",  "HEAD",  "HR",  "HTML",  "IMG",  "INPUT",  "ISINDEX",  "I",  "KBD",  "LINK",  "LI",  "MAP",  "MENU",  "META",  "OL",  "OPTION",  "PARAM",  "PRE",  "P",  "SAMP",  "SCRIPT", "SECTION",  "SELECT",  "SMALL",  "STRIKE",  "STRONG",  "STYLE",  "SUB",  "SUP",  "TABLE",  "TBODY",  "TD",  "TEXTAREA",  "TH", "THEAD",  "TITLE",  "TR",  "TT",  "UL",  "U",  "VAR"]; 
    function cssString(styles){
      var str = '';
      for(var style in styles){
        if(has(style.toUpperCase(), tags)) continue;
        str += style.replace(/([A-Z])/, "-$1") + ':' + styles[style] + ';';
      }
      return str;
    }

    function has(prop, arr){
      for(var i=0, j=arr.length; i<j; i++){
        if(prop === arr[i]){
          return true;
        }
      }
      return false;
    }

    function extend(obj /* , ...source */) {
      for (var i = 1; i < arguments.length; i++) {
        for (var key in arguments[i]) {
          console.log(arguments[i]);
          if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
             obj[key] = arguments[i][key];
             obj[key] = (typeof arguments[i][key] === 'object' && arguments[i][key] ? extend(obj[key], arguments[i][key]) : arguments[i][key]);
          }
        }
      }
      return obj;
    }

    var create = function(type, props){
      var el = document.createElement(type), value, child, i, j;
      if(props){
        if(props.styles){
          el.style.cssText = cssString(props.styles);
        } 
        for(var prop in props){
          if(prop == "styles") continue;
          value = props[prop];
          prop = (prop === "text" ? "innerText" : prop);
          prop = (prop === "html" ? "innerHTML" : prop);

          //Atts
          el[prop] = value;
          if(has(prop.toUpperCase(), tags)){
            
            if(value.nodes){
              for(i=0, j=value.nodes.length; i<j; i++){
                child = this.create(prop, extend((value.styles ? {styles: value.styles} : {}), value.nodes[i]));
                el.appendChild(child);
              }
            }else{
              child = this.create(prop, value);
              el.appendChild(child);
            }
          }
        }
      }
      return el;
    };
    return {
      create: create
    };
  })();
  return dom;
}));
