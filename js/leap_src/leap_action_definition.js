
var prevHands = 0;
var prevFingers = 0;
var timeoutZeroFingers;
var timeoutOneFingers;
var timeoutTwoFingers;
var timeoutThreeFingers;
var timeoutFourFingers;
var timeoutFiveFingers;

var timeoutPointedDiv;
var width;
var height;
//



var showAction = function(toDirection){
  if(toDirection!=null){
    if(toDirection == "toLeft"){
      action.swipeLeft();
      
    }else if (toDirection == "toRight"){
      action.swipeRight();
    
    }else{
      console.log("Error: Unknown input");
    }
    
      
  }else{
  
    if(prevFingers == 0){
      action.zeroFinger();
      
    }else if (prevFingers == 1){
      action.oneFinger();
    
    }else if (prevFingers == 2){
      action.twoFinger();
    
    }else if (prevFingers == 3){
      action.threeFinger();
    
    }else if (prevFingers == 4){
      action.fourFinger();
    
    }else if (prevFingers == 5){
      action.fiveFinger();
    
    }else{
      console.log("Error: Unknown input");
    }
    
  }
};




var checkContain = function($div1, $cursor) {
  var x1 = $div1.offset().left;
  var y1 = $div1.offset().top;
  var h1 = $div1.outerHeight(true);
  var w1 = $div1.outerWidth(true);
  var b1 = y1 + h1;
  var r1 = x1 + w1;
  var x2 = $cursor.offset().left;
  var y2 = $cursor.offset().top;
  var h2 = $cursor.outerHeight(true);
  var w2 = $cursor.outerWidth(true);
  var b2 = y2 + h2;
  var r2 = x2 + w2;
    
  if (b1 < b2 || y1 > y2 || r1 < r2 || x1 > x2) return false;
  return true;
}



var leap_loop = function(){

  Leap.loop({enableGestures: true}, function(obj) {
  
    /*
     * For counting the fingers and hands
     */
    
    var hands = obj.hands.length;
    var fingers = obj.pointables.length;

    $(".hands").html(hands);
    $(".fingers").html(fingers);
    
    if(hands==1 && fingers==5){
      if(prevFingers!=5 || prevHands!=1){
        //console.log("[hands==1 && fingers==5 && prevFingers!=5] matched");
        prevHands = 1;
        prevFingers = 5;
        timeoutFiveFingers = setTimeout(showAction, 1000);
        clearTimeout(timeoutZeroFingers);
        clearTimeout(timeoutOneFingers);
        clearTimeout(timeoutTwoFingers);
        clearTimeout(timeoutThreeFingers);
        clearTimeout(timeoutFourFingers);
        //clearTimeout(timeoutFiveFingers);
      }
    }else if(hands==1 && fingers==4){
      if(prevFingers!=4 || prevHands!=1){
        //console.log("[hands==1 && fingers==0 && prevFingers!=0] matched");
        prevHands = 1;
        prevFingers = 4;
        timeoutFourFingers = setTimeout(showAction, 1000);
        clearTimeout(timeoutZeroFingers);
        clearTimeout(timeoutOneFingers);
        clearTimeout(timeoutTwoFingers);
        clearTimeout(timeoutThreeFingers);
        //clearTimeout(timeoutFourFingers);
        clearTimeout(timeoutFiveFingers);
      }
    }else if(hands==1 && fingers==3){
      if(prevFingers!=3 || prevHands!=1){
        //console.log("[hands==1 && fingers==0 && prevFingers!=0] matched");
        prevHands = 1;
        prevFingers = 3;
        timeoutThreeFingers = setTimeout(showAction, 1000);
        clearTimeout(timeoutZeroFingers);
        clearTimeout(timeoutOneFingers);
        clearTimeout(timeoutTwoFingers);
        //clearTimeout(timeoutThreeFingers);
        clearTimeout(timeoutFourFingers);
        clearTimeout(timeoutFiveFingers);
      }
    }else if(hands==1 && fingers==2){
      if(prevFingers!=2 || prevHands!=1){
        //console.log("[hands==1 && fingers==0 && prevFingers!=0] matched");
        prevHands = 1;
        prevFingers = 2;
        timeoutTwoFingers = setTimeout(showAction, 1000);
        clearTimeout(timeoutZeroFingers);
        clearTimeout(timeoutOneFingers);
        //clearTimeout(timeoutTwoFingers);
        clearTimeout(timeoutThreeFingers);
        clearTimeout(timeoutFourFingers);
        clearTimeout(timeoutFiveFingers);
      }
    }else if(hands==1 && fingers==1){
      if(prevFingers!=1 || prevHands!=1){
        //console.log("[hands==1 && fingers==0 && prevFingers!=0] matched");
        prevHands = 1;
        prevFingers = 1;
        timeoutOneFingers = setTimeout(showAction, 1000);
        clearTimeout(timeoutZeroFingers);
        //clearTimeout(timeoutOneFingers);
        clearTimeout(timeoutTwoFingers);
        clearTimeout(timeoutThreeFingers);
        clearTimeout(timeoutFourFingers);
        clearTimeout(timeoutFiveFingers);
      }
    }else if(hands==1 && fingers==0){
      if(prevFingers!=0 || prevHands!=1){
        //console.log("[hands==1 && fingers==0 && prevFingers!=0] matched");
        prevHands = 1;
        prevFingers = 0;
        timeoutZeroFingers = setTimeout(showAction, 1000);
        //clearTimeout(timeoutZeroFingers);
        clearTimeout(timeoutOneFingers);
        clearTimeout(timeoutTwoFingers);
        clearTimeout(timeoutThreeFingers);
        clearTimeout(timeoutFourFingers);
        clearTimeout(timeoutFiveFingers);
      }
    }else if(hands!=prevHands){
      prevHands = hands;
      prevFingers = fingers;
      clearTimeout(timeoutZeroFingers);
      clearTimeout(timeoutOneFingers);
      clearTimeout(timeoutTwoFingers);
      clearTimeout(timeoutThreeFingers);
      clearTimeout(timeoutFourFingers);
      clearTimeout(timeoutFiveFingers);
      
    }else if(fingers!=prevFingers){
      prevHands = hands;
      prevFingers = fingers;
      clearTimeout(timeoutZeroFingers);
      clearTimeout(timeoutOneFingers);
      clearTimeout(timeoutTwoFingers);
      clearTimeout(timeoutThreeFingers);
      clearTimeout(timeoutFourFingers);
      clearTimeout(timeoutFiveFingers);
      
    }else{
    
    }
    
    
    if(fingers==0 && hands==0){
      $(".cursor").hide();
      $('.temp_id_loading').remove();
      $(".leapHover").removeClass("leapHover").data("pointing", "");
      clearTimeout(timeoutPointedDiv);
    }
    
    if(fingers!=1){
      $(".cursor").hide();
      return;
    }
    
    /*
     * For putting the cursor on screen
     */
    
    obj.pointables.forEach(function(pointable,i) {
      // only do 1 finger
      if (i > 0) return;

      // interaction box
      var pos = [
        width/2 + 6*pointable.tipPosition[0],
        height - 4*pointable.tipPosition[1] + 150,
        pointable.tipPosition[2]
      ];
      
      var sizeDifference = 100-Math.abs(pos[2]);
      if (sizeDifference < 0) sizeDifference = 0;
      
      var pos_top = pos[1]>height-22?height-22:(pos[1]<17?17:pos[1]);
      var pos_left = pos[0]>width-22?width-22:(pos[0]<17?17:pos[0]);
      
      $(".cursor").show().css({
        "top": pos_top + "px",
        "left": pos_left + "px"
      }).find(".inner").css("width", sizeDifference + "%");
      
      $(".pointable").each(function(){
        if(checkContain($(this), $(".cursor"))){
        
          if($(this).data("pointing")!="true"){
            $(this).data("pointing", "true").addClass("leapHover");
            clearTimeout(timeoutPointedDiv);
            timeoutPointedDiv = setTimeout(action.pointed, 3600);
            
            $('body').append("<img src='image/loading_5sec.gif?"+ Math.random() +"' class='temp_id_loading'/>")
            $('.temp_id_loading').css('position', 'absolute');
            
            $('.temp_id_loading').css('top', $(this).offset().top);
            $('.temp_id_loading').css('left', $(this).offset().left  + $(this).width() - 60);
            
          }
          
        }else{
          if($(this).data("pointing")=="true"){
            $(this).removeClass("leapHover").data("pointing", "");
            $('.temp_id_loading:not(:last)').remove();
            $('.temp_id_loading:last').fadeTo("fast",0.95).delay(3600).fadeOut();
            //clearTimeout(timeoutPointedDiv);
          }
        }
      });
    });
  });
};




var _debug_panel = {
	
  init: function(){
    $("<div></div>")
      .addClass("debug_panel")
      .css({
        "position":"fixed",
        "bottom": "10px",
        "right": "10px",
        "border": "1px solid #ddd",
        "background-color": "#fafafa",
        "padding": "10px",
        "z-index": "1000"
      })
      .appendTo("body");
    
    $(".debug_panel").append("<input value='<---' class='debug_swipe_left' type='button' />");
    
    $(".debug_panel").append("<input value='Click' class='debug_click' type='button' />");
    $(".debug_panel").append("<input value='5 Fingers' class='debug_five_finger' type='button' />");
    $(".debug_panel").append("<input value='0 Fingers' class='debug_zero_finger' type='button' />");

    $(".debug_panel").append("<input value='Select Item' class='debug_selectItem_1' type='button' />");
    $(".debug_panel").append("<input value='<<' class='debug_selectPrevItem' type='button' />");
    $(".debug_panel").append("<input value='>>' class='debug_selectNextItem' type='button' />");

    $(".debug_panel").append("<input value='Select Order/Cart record' class='debug_selectRecord_1' type='button' />");
    $(".debug_panel").append("<input value='<<' class='debug_selectPrevRecord' type='button' />");
    $(".debug_panel").append("<input value='>>' class='debug_selectNextRecord' type='button' />");

    $(".debug_panel").append("<input value='Select Menu' class='debug_selectMainMenu_1' type='button' />");
    $(".debug_panel").append("<input value='<<' class='debug_selectPrevMainMenu' type='button' />");
    $(".debug_panel").append("<input value='>>' class='debug_selectNextMainMenu' type='button' />");	

    $(".debug_panel").append("<input value='Select Product Category' class='debug_selectProductListItem_1' type='button' />");
    $(".debug_panel").append("<input value='<<' class='debug_selectPrevProductListItem' type='button' />");
    $(".debug_panel").append("<input value='>>' class='debug_selectNextProductListItem' type='button' />");	

    $(".debug_panel").append("<input value='--->' class='debug_swipe_right' type='button' />");
	
    $(".debug_swipe_left").click(function(){
      $(".leapHover").removeClass("leapHover");
      leapUI.test2($(".itemPageArrowImg").get(0));
    });
    $(".debug_swipe_right").click(function(){
      $(".leapHover").removeClass("leapHover");
      leapUI.test2($(".itemPageArrowImg").get(1));
    });
    $(".debug_click").click(function(){
      action.pointed();
    });
    $(".debug_five_finger").click(function(){
      action.fiveFinger();
    });
    $(".debug_zero_finger").click(function(){
      action.zeroFinger();
    });


    $(".debug_selectItem_1").click(function(){
      
      $(".leapHover").removeClass("leapHover");
      $("body").addClass("waiting1Sec");
      leapUI.test("item_1");
    });
    $(".debug_selectNextItem").click(function(){
      var selectedItem = $(".item").index($(".leapHover")) + 1;		
      $(".leapHover").removeClass("leapHover");
      leapUI.test("item_"+(selectedItem+1));
    });

    $(".debug_selectPrevItem").click(function(){
      var selectedItem = $(".item").index($(".leapHover")) + 1;
      $(".leapHover").removeClass("leapHover");
      leapUI.test("item_"+(selectedItem-1));
    });
    
    $(".debug_selectRecord_1").click(function(){
      $(".leapHover").removeClass("leapHover");
      leapUI.test2($(".ui-accordion-header:first"));
    });
    $(".debug_selectNextRecord").click(function(){
      var selectedItem = $(".ui-accordion-header").index($(".leapHover"));		
      $(".leapHover").removeClass("leapHover");
      leapUI.test2($(".ui-accordion-header").get(selectedItem+1));
    });

    $(".debug_selectPrevRecord").click(function(){
      var selectedItem = $(".ui-accordion-header").index($(".leapHover"));		
      $(".leapHover").removeClass("leapHover");
      leapUI.test2($(".ui-accordion-header").get(selectedItem-1));
    });
    
    
    $(".debug_selectMainMenu_1").click(function(){
      $(".leapHover").removeClass("leapHover");
      leapUI.test2($(".mainMenuContainer:first"));
    });
    $(".debug_selectNextMainMenu").click(function(){
      var selectedItem = $(".mainMenuContainer").index($(".leapHover"));		
      $(".leapHover").removeClass("leapHover");
      leapUI.test2($(".mainMenuContainer").get(selectedItem+1));
    });
    
    $(".debug_selectPrevMainMenu").click(function(){
      var selectedItem = $(".mainMenuContainer").index($(".leapHover"));		
      $(".leapHover").removeClass("leapHover");
      leapUI.test2($(".mainMenuContainer").get(selectedItem-1));
    });	
    
    
    
    $(".debug_selectProductListItem_1").click(function(){
      $(".leapHover").removeClass("leapHover");
      leapUI.test2($(".productListItem:first"));
    });
    $(".debug_selectNextProductListItem").click(function(){
      var selectedItem = $(".productListItem").index($(".leapHover"));		
      $(".leapHover").removeClass("leapHover");
      leapUI.test2($(".productListItem").get(selectedItem+1));
    });
    
    $(".debug_selectPrevProductListItem").click(function(){
      var selectedItem = $(".productListItem").index($(".leapHover"));		
      $(".leapHover").removeClass("leapHover");
      leapUI.test2($(".productListItem").get(selectedItem-1));
    });		
	
	},
  
	close: function(){
    $(".debug_panel").remove();
  }
 
};




$(document).ready(function() {
  
  // for debug purpose only
  //_debug_panel.init();
  
  
  width = document.body.clientWidth;
  height = document.body.clientHeight;
  
  var ctl = new Leap.Controller({enableGestures: true});
  var swiper = ctl.gesture('swipe');

  var tolerance = 50;
  var cooloff = 300;
  
  var slider = _.debounce(function(xDir, yDir) {
    
    // when fingers == 1, do not trigger this action
    if(prevFingers==1){
      return;
    }
    
    if(xDir>0){
      showAction("toRight");
      
    }else if(xDir<0){
      showAction("toLeft");
      
    }else if(xDir==0){
      //console.log("do not move x-direction");
    }
    
  }, cooloff);

  swiper.update(function(g) {
    if (Math.abs(g.translation()[0]) > tolerance || Math.abs(g.translation()[1]) > tolerance) {
      var xDir = Math.abs(g.translation()[0]) > tolerance ? (g.translation()[0] > 0 ? -1 : 1) : 0;
      var yDir = Math.abs(g.translation()[1]) > tolerance ? (g.translation()[1] < 0 ? -1 : 1) : 0;
      
      slider(xDir, yDir);
    }
  });
  
  ctl.connect();
  leap_loop();
});
