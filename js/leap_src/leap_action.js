/*
 * List of actions defined for production
 * 
 * Please refer to ./leap_src/leap_action_demo.js 
 *    and ./action.html for the usage example
 *
 */

var __config = {
  enable_finger: false,
};

var action = {
  
  // Leave blank for undefined actions
  zeroFinger : function(){
    if(__config.enable_finger && _showingPopup && $(".quantityInput:visible").is(":focus")){
      // close the popup box
      $(".closeBox").trigger("click");
      
    }
  
  },
  
  oneFinger : function(){
    if(__config.enable_finger && _showingPopup && $(".quantityInput:visible").is(":focus")){
      // put the value
      $(".quantityInput").val("1").blur();
      
    }
  
  },
  
  twoFinger : function(){
    if(__config.enable_finger && _showingPopup && $(".quantityInput:visible").is(":focus")){
      // put the value
      $(".quantityInput").val("2").blur();
      
    }
  
  },
  
  threeFinger : function(){
    if(__config.enable_finger && _showingPopup && $(".quantityInput:visible").is(":focus")){
      // put the value
      $(".quantityInput").val("3").blur();
      
    }
  
  },
  
  fourFinger : function(){
    if(__config.enable_finger && _showingPopup && $(".quantityInput:visible").is(":focus")){
      // put the value
      $(".quantityInput").val("4").blur();
      
    }
  },
  
  fiveFinger : function(){
    if(__config.enable_finger && _showingPopup && $(".quantityInput:visible").is(":focus")){
      // put the value
      $(".quantityInput").val("5").blur();
      
    }
  },
  
  swipeLeft: function(){
	/*
	var divType = $(".leapPointed").data("type");
	
	var selector;
	
	if(divType =="product"){
		selector = ".item";
	}else if(divType == "productList"){
		selector = ".productListItem";
	}else if(divType == "mainMenu"){
		selector = ".mainMenuContainer";
	}else{
		//
	}
	
	var selectedItem = $(".leapPointed");

	var selectedIndex = $(selector).index(selectedItem);

	var toBeSelectedIndex = selectedIndex - 1 > 0 ? selectedIndex - 1 :	 0;

	var toBeSelectedItem = $(selector).get(toBeSelectedIndex);
	
	selectedItem.removeClass("leapPointed").data("pointing", "");
	
	$(toBeSelectedItem).addClass("leapPointed").data("pointing", "true");

	leapUI.selectItem();
	
	*/
	
	leapUI.navNextProductItemPage(1);
  },
  
  swipeRight: function(){
	/*
	var divType = $(".leapPointed").data("type");
		
	var selector;
	
	if(divType =="product"){
		selector = ".item";
	}else if(divType == "productList"){
		selector = ".productListItem";
	}else if(divType == "mainMenu"){
		selector = ".mainMenuContainer";
	}else{
		//
	}
	
	var selectedItem = $(".leapPointed");

	var selectedIndex = $(selector).index(selectedItem);

	var toBeSelectedIndex = selectedIndex + 1 == $(selector).length ? $(selector).length-1 : selectedIndex + 1;

	var toBeSelectedItem = $(selector).get(toBeSelectedIndex);
	
	selectedItem.removeClass("leapPointed").data("pointing", "");
	
	$(toBeSelectedItem).addClass("leapPointed").data("pointing", "true");

	leapUI.selectItem();	
	*/
	leapUI.navNextProductItemPage(-1);
	
  },
  
  pointed: function(){
    /* 
     * Applied to all the $("div.pointable") objects
     *
     * The following statement wont trigger click for <a href=""> element.
     * Instead, this only applies to all elements with "onclick" attribute
     */
    $(".leapHover").trigger("click");
	
  }

};