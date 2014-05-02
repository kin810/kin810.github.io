
var prevHands = 0;
var prevFingers = 0;
var timeoutZeroFingers;
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
      }
    }else if(hands==1 && fingers==0){
      if(prevFingers!=0 || prevHands!=1){
        //console.log("[hands==1 && fingers==0 && prevFingers!=0] matched");
        prevHands = 1;
        prevFingers = 0;
        timeoutZeroFingers = setTimeout(showAction, 1000);
        clearTimeout(timeoutFiveFingers);
      }
    }else if(hands!=prevHands){
      prevHands = hands;
      prevFingers = fingers;
      clearTimeout(timeoutZeroFingers);
      clearTimeout(timeoutFiveFingers);
    }else if(fingers!=prevFingers){
      prevHands = hands;
      prevFingers = fingers;
      clearTimeout(timeoutZeroFingers);
      clearTimeout(timeoutFiveFingers);
    }else{
    
    }
    
    
    if(fingers==0 && hands==0){
      $(".cursor").hide();
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
      
      $("div.pointable").each(function(){
        if(checkContain($(this), $(".cursor"))){
          if($(this).data("pointing")!="true"){
            $(this).data("pointing", "true").addClass("leapHover");
            timeoutPointedDiv = setTimeout(action.pointed, 1000);
			//$('body').css('cursor', 'progress'); 
			
			//leapUI.selectItem();
          }
        }else{
          if($(this).data("pointing")=="true"){
            $(this).removeClass("leapHover").data("pointing", "");
            clearTimeout(timeoutPointedDiv);
			//$('body').css('cursor', 'initial'); 
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
        "position":"absolute",
        "bottom": "10px",
        "right": "10px",
        "border": "1px solid #ddd",
        "background-color": "#fafafa",
        "padding": "10px"
      })
      .appendTo("body");
    
    $(".debug_panel").append("<input value='Swipe Left' class='debug_swipe_left' type='button' />");
    $(".debug_panel").append("<input value='Swipe Right' class='debug_swipe_right' type='button' />");
    $(".debug_panel").append("<input value='Click' class='debug_click' type='button' />");
    $(".debug_panel").append("<input value='5 Fingers' class='debug_five_finger' type='button' />");
    $(".debug_panel").append("<input value='0 Fingers' class='debug_zero_finger' type='button' />");

	$(".debug_panel").append("<input value='Select item(1)' class='debug_selectItem_1' type='button' />");
	$(".debug_panel").append("<input value='<<' class='debug_selectPrevItem' type='button' />");
	$(".debug_panel").append("<input value='>>' class='debug_selectNextItem' type='button' />");
	
	$(".debug_panel").append("<input value='Select record(First)' class='debug_selectRecord_1' type='button' />");
	$(".debug_panel").append("<input value='<<' class='debug_selectPrevRecord' type='button' />");
	$(".debug_panel").append("<input value='>>' class='debug_selectNextRecord' type='button' />");
	
	
	
    $(".debug_swipe_left").click(function(){
      action.swipeLeft();
    });
    $(".debug_swipe_right").click(function(){
      action.swipeRight();
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
	
	
    
	},
  
	close: function(){
    $(".debug_panel").remove();
  }
 
};




$(document).ready(function() {
  
  // for debug purpose only
  _debug_panel.init();
  
  
  
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
