/*
 * List of actions defined for production
 * 
 * Please refer to ./leap_src/leap_action_demo.js 
 *    and ./action.html for the usage example
 *
 */


var leapUI = {
	
	test:function(tempId){
		 $("#"+tempId).addClass("leapHover");
		 leapUI.selectItem();
	
	},
	test2:function(divNode){
		 $(divNode).addClass("leapHover");
		 leapUI.selectItem();
	
	},

	selectItem : function(){
		var divType = $(".leapHover").data("type");
		
		if(divType =="product"){
			
			var divId = $(".leapHover").attr('id');
			
			this.selectProductItem(divId);
		
		}else if(divType == "productList"){
		
			this.selectProductListItem($(".leapHover"));
		
		}else if (divType =="mainMenu"){
		
			this.selectProductListItem($(".leapHover"));
			
		}
		
		
	},
	selectProductItem: function(toBeSelectedId){
		
		this.updateDisplayProductItemPage(toBeSelectedId);
		
		this.highLightSelectedItem($("#"+toBeSelectedId));
		
		
	},
	
	selectProductListItem : function(divNode){
		
		this.highLightSelectedItem(divNode);
		
	},
	
	highLightSelectedItem: function(divNode){
	
		var toBeSelectedItem = $(divNode);
	
		toBeSelectedItem.css("opacity", 0.6);
		
		toBeSelectedItem.fadeTo(500,1);
	
	
	},
	
	updateDisplayProductItemPage : function(toBeSelectedId){
		
		var toBeSelectedItem = $("#"+toBeSelectedId);
		
		var toBeSelectedItemIndex = $(".item").index(toBeSelectedItem);
		
		var toBeDisplayedItemPage = Math.floor(toBeSelectedItemIndex/itemToDisplay);
		
		var currentDisplayedItemPage = $(".items").children().index($(".items>:not(.hiddenItem)"));
		
		this.moveProductItemPan(currentDisplayedItemPage, toBeDisplayedItemPage);
		
	},
	
	navNextProductItemPage: function(offset){
	
		var currentDisplayedItemPage = $(".items").children().index($(".items>:not(.hiddenItem)"));

		var toBeDisplayedItemPage = currentDisplayedItemPage + offset;
		
		if(toBeDisplayedItemPage < 0){
		
			//action.swipeLeft();
			this.highLightSelectedItem($(".items:first"));
		
		}else if(toBeDisplayedItemPage+1 > $(".items").children().length){
		
			this.highLightSelectedItem($(".items:last"));
			
		}else{
		
			this.moveProductItemPan(currentDisplayedItemPage, toBeDisplayedItemPage);
			
		}
	},
	moveProductItemPan: function(currentDisplayedItemPage, toBeDisplayedItemPage){
		
		if(currentDisplayedItemPage != toBeDisplayedItemPage){
		
			var hideDirection;
			var showDirection;
			
			if(currentDisplayedItemPage < toBeDisplayedItemPage){
				hideDirection = "left";
				showDirection = "right";
			}else{
				hideDirection = "right";
				showDirection = "left"
			}
			
			var toBeHideDivId = $($(".items").children().get(currentDisplayedItemPage)).attr('id');
			
			$("#"+toBeHideDivId).hide("slide", {direction:hideDirection},750, function(){
				$("#"+toBeHideDivId).addClass("hiddenItem");
			});	
			
			
			var toBeDisplayDivId = $($(".items").children().get(toBeDisplayedItemPage)).attr('id');
			
			$("#"+toBeDisplayDivId).show("slide", {direction:showDirection},750, function(){
				$("#"+toBeDisplayDivId).removeClass("hiddenItem");
			});
		
		}
	}
 
	
 
};