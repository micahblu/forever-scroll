(function(root, factory){
  if(typeof define === 'function' && define.amd) {
    define(['dom-js'], factory);
  } else if(typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.fScroll = root.fScroll || factory();
  }
})(this, function() {

  var init = function(options){
    
    var stage = document.body;

    if(typeof stage === 'string'){
      var selector = stage[0];
      if(selector === "#"){
        stage = document.getElementById(stage.substring(1));
      }else {
        throw "ContentEl must be an id selector starting with '#'";
        return;
      }
    }

    var doc = document.documentElement,
        top = stage.scrollTop,
        viewport = window.innerHeight,
        scrollHeight = stage.scrollHeight,
        url = options.url || null,
        isScrollingDown = true,
        isLoading = false,
        preloader = Dom.create("div", {id: "fscroll-preloader", text: "Loading..."});

    if(!url){
      throw "URL must be set";
      return;
    }

    var callCount = 0;

    window.addEventListener("scroll", function(){

      isScrollingDown = top > stage.scrollTop ? false : true;
      top = stage.scrollTop;
      viewport = window.innerHeight;
      scrollHeight = stage.scrollHeight;


      if( scrollHeight - (top + viewport) <= 300 && isScrollingDown){

        if(!isLoading) {
          stage.appendChild(preloader);
          isLoading = true;
        }else{
          return;
        }

        var callback = function(response){
          if(status.response && status.response == "empty") return false;
          var content = Dom.create("section", response);
          var preloader = document.getElementById("fscroll-preloader");
          preloader.parentNode.removeChild(preloader);
          isLoading = false;

          stage.appendChild(content);
        };

        get(url, callback);
      } 
    });
  };


  var get = function(url, callback){
    var request = new XMLHttpRequest();
    
    request.open('GET', url, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400){
        data = JSON.parse(request.responseText);
        callback(data);
      }
    };

    request.onerror = function() {
      callback('', 'Error from server: ' + request.status);
    };

    request.send(); 
  };

  var mock = function(options) {
     setTimeout(function(){
        options.callback(options.response);
     }, options.latency || 1000);
  };

  return {
    init: init
  }
});