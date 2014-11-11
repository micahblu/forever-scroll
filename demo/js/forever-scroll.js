var fScroll = (function(){

  //var stage = options.contentEl || document.body;
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
        url = options.url || null;

    if(!url){
      throw "URL must be set";
      return;
    }

    window.addEventListener("scroll", function(){

      top = stage.scrollTop;
      viewport = window.innerHeight;
      scrollHeight = stage.scrollHeight;

      if( scrollHeight - (top + viewport) <= 300){
        get(url, function(data){
          var content = Dom.create("section", data);

          stage.appendChild(content);
        });
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

  return {
    init: init
  }
})();