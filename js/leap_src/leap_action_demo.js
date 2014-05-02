var action = {
  zeroFinger : function(){
  
    $(".popup_inactive").find(".action_type").html("0 fingers");
    
    $(".popup_inactive").clone().addClass("popup_active").removeClass("popup_inactive")
      .appendTo("body")
      .fadeTo("fast", 1).show(0)
      .hide("puff", {}, 1000 );
    
  },
  
  fiveFinger : function(){
  
    $(".popup_inactive").find(".action_type").html("5 fingers");
    
    $(".popup_inactive").clone().addClass("popup_active").removeClass("popup_inactive")
      .appendTo("body")
      .fadeTo("fast", 1).show(0)
      .hide("puff", {}, 1000 );
      
  },
  
  swipeLeft: function(){
    $(".popup_inactive").find(".action_type").html("swipeToLeft");
    
    $(".popup_inactive").clone().addClass("popup_active").removeClass("popup_inactive")
      .appendTo("body")
      .fadeTo("fast", 1).show(0)
      .hide("puff", {}, 1000 );
      
  },
  
  swipeRight: function(){
    $(".popup_inactive").find(".action_type").html("swipeToRight");
    
    $(".popup_inactive").clone().addClass("popup_active").removeClass("popup_inactive")
      .appendTo("body")
      .fadeTo("fast", 1).show(0)
      .hide("puff", {}, 1000 );
      
  },
  
  pointed: function(){
    $(".leapPointed")
      .addClass("leapPointed-active")
      .removeClass("leapPointed-active", 700, "easeOutCirc" );
  }

};