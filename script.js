;(function() {

  var setup = 0;
  var header__loading = document.getElementById("app");
  var header__loading_observer = new MutationObserver(function(details) {
      details.forEach(function(detail) {
        if (setup) {
          return;
        }

        var nodelist = document.getElementsByClassName("playbackTitle sc-truncate");
        var item     = nodelist.item(0);
        var posted   = 0;

        var m = new MutationObserver(function(details) {

          details.forEach(function(detail) {
            var target = detail.target;
            if (Object.prototype.toString.apply(target) === "[object HTMLAnchorElement]" && (!posted || !(posted === target.text))) {

              $.ajax({
                dataType : 'json',
                type: "POST",
                url: "http://localhost:5518/",
                data: {title: target.text, link: target.href},
                success: function(msg){
                  console.log(msg);
                },
                crossDomain: true
              });

              posted = target.text;
            }
          });
        });

        m.observe(item, {
          attributes           : true,
          childList            : true,
          characterData        : true,
          subtree              : true,
          attributeOldValue    : true,
          characterDataOldValue: true
        });

        setup = 1;
      });
  });

  var item = header__loading;
  header__loading_observer.observe(item, {
    attributes           : false,
    childList            : true,
    characterData        : false,
    subtree              : false,
    attributeOldValue    : false,
    characterDataOldValue: false
  });
})();
