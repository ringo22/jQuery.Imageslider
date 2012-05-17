jQuery.fn.scrollgallery = function() {
  // Define of the selector
  $container            = $(this);
  // Define of the divs contents
  var $scroll           = $(this).children(".scroll");
  var $scrollContainer  = $scroll.children(".scrollContainer");
  var $panels           = $scroll.children(".scrollContainer").children();
  // Variables for default
  var totalPanels       = $scrollContainer.children().size();
  if(totalPanels > 1){
    var regWidth          = $scrollContainer.children(".panel").css("width");
    var regImgHeight      = $scrollContainer.children(".panel").css("height");
    var regImgWidth       = $scrollContainer.children(".panel").children(".inside").children("img").css("width");
    var regImgOpacity     = $scrollContainer.children(".panel").children(".inside").children("img").css("opacity");
    var regInsidePadding  = $scrollContainer.children(".panel").children(".inside").css("padding-top");
    // Variables for the image selected
    var movingDistance    = 200;
    var curWidth          = 260;
    var curImgHeight      = 240;
    var curImgWidth       = 240;
    var curImgOpacity     = 1;
    var curInsidePadding  = 0;
    // Arrays of position for elements in the scroll
    var positionArray = new Array();
    // position 1 of the array
    var dafault = 50;
    // CReate the array of the positions
    for(var i = 1; i<=totalPanels; i++){
      positionArray[i] = dafault;
      dafault = dafault - movingDistance;
    }
    $container.append('<img class="scrollButtons btnscrollleft left" src="images/leftarrow.png">')
              .prepend('<img class="scrollButtons btnscrollright right" src="images/rightarrow.png">');
    $panels.css({ 'float' : 'left','position' : 'relative' });
    $container.data("currentlyMoving", false);
    $scrollContainer.css({ width: (($panels[0].offsetWidth * $panels.length) + 100), left: positionArray[2] + "px" });

    $scroll.css('overflow', 'hidden');

    // Return to the state for default
    function returnToNormal(element) {
      $(element).animate({ width: regWidth })
                .find(".inside")
                .css("padding-top", regInsidePadding)
                .end()
                .find("img")
                .animate({ width: regImgWidth, opacity: regImgOpacity });
    };
    // Change the style the image selected
    function growBigger(element) {
      $(element).animate({ width: curWidth })
                .find(".inside")
                .css("padding-top", curInsidePadding)
                .end()
                .find("img")
                .animate({ width: curImgWidth, opacity: curImgOpacity });
    }
    // Direction true = right, false = left
    function change(direction) {
      // Valid that is not the last position
      if((direction && !(curPanel < totalPanels)) || (!direction && (curPanel <= 1))) {
        return false;
      }else{
        // If not currently moving
        if(( $("#slider").data("currentlyMoving") == false )) {
          var next      = direction ? curPanel + 1 : curPanel - 1;
          // var leftValue = $scrollContainer.css("left");
          // var movement  = direction ? parseFloat(leftValue, 10) - movingDistance : parseFloat(leftValue, 10) + movingDistance;
          
          $container.data("currentlyMoving", true);

          $scrollContainer.stop().animate({ "left": positionArray[next] }, function() {
            $container.data("currentlyMoving", false);
          });
          
          returnToNormal("#panel_"+curPanel);
          growBigger("#panel_"+next);
          
          curPanel = next;
          //remove all previous bound functions
          $("#panel_"+(curPanel+1)).unbind();
          //go forward
          $("#panel_"+(curPanel+1)).click(function(){
            change(true);
          });
          //remove all previous bound functions
          $("#panel_"+(curPanel-1)).unbind();
          //go back
          $("#panel_"+(curPanel-1)).click(function(){ change(false); });
          //remove all previous bound functions
          $("#panel_"+curPanel).unbind();
        }
      }
    }
    // Set up "Current" panel and next and prev
    growBigger("#panel_2");
    var curPanel = 2;  
    
    $("#panel_"+(curPanel+1)).click(function(){ change(true); });
    $("#panel_"+(curPanel-1)).click(function(){ change(false); });
    
    //when the left/right arrows are clicked
    $(".btnscrollright").click(function(){ change(true); }); 
    $(".btnscrollleft").click(function(){ change(false); });
    
    $(window).keydown(function(event){
      switch (event.keyCode) {
        case 13: //enter
          $(".btnscrollright").click();
          break;
        case 32: //space
          $(".btnscrollright").click();
          break;
        case 37: //left arrow
          $(".btnscrollleft").click();
          break;
        case 39: //right arrow
          $(".btnscrollright").click();
          break;
      }
    });
  }else{
    $scrollContainer.animate({ left: '60px' }).children({ width: curWidth })
                .find(".inside")
                .css("padding-top", 0)
                .end()
                .find("img")
                .animate({ width: 240, opacity: 1 });
  }
  
};