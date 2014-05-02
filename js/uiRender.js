
var uiRender ={

	itemAddMouseover: function(){
		var items = $(".items");

		for(var i = 0; i < items.children().length; i++){
		
			var itemPage = items.children().eq(i);
		
			for(var j =0 ; j <  itemPage.children().length; j++){
			
				var item = itemPage.children().eq(j);
			
				//item.on("mouseover",function(){
					//leapUI.selectItem();
					//leapUI.selectProductItem($(this).attr('id'));
				//	window.location.href = "itemDetail.html?itemType=" + itemType + "&itemId="+$(this).attr('id');
				//});
				
			
			}
			
			
			
		
		}
		
	},
	
	
	itemAddMouseClick: function(){
		var targetCategory = "";
		if(xmlInfoFile == "info_clothing.xml"){
			targetCategory = "clothes";
		}else if(xmlInfoFile == "info_trousers.xml"){
			targetCategory = "trousers";
	
		}else if(xmlInfoFile == "info_legwear.xml"){
			targetCategory = "socks";
		
		}else if(xmlInfoFile == "info_shoes.xml"){
			targetCategory = "shoes";
		}
		
		$(".item").each(function(i,v){
			$(v).on("click",function(){
				window.location.href = "itemDetail.html?category=" + targetCategory + "&id=" + (i+1);
			});							
		});
		
	},
	
	anchorDivAddMouseClick: function(){
	
		$("div").each(function (i,v){
			
			var targetHref = $(v).data("hrefTarget");
			
			if(typeof(targetHref) != undefined){
				
				$(v).on("click", function(){
					
					window.location.href = targetHref;
			
				});
			}else{
				console.log("123123123123");
			}
		});
	
	},
	
	addBackButtonEvent: function(){
		$(".backButton").addClass("pointable").on("click",function(){
			history.go(-1);
		});
	},
	
	updateItemImageSize: function(){
		$(".itemImg").each(function(i,v){
			$(v).css("height", window.innerHeight*0.8*0.65*0.5+"px");
		});
	
	},
	updateItemSize: function(){
		$(".item").each(function(i,v){
			$(v).css("width", window.innerWidth*0.75*0.5-2*2-5*2-2*2-15);
			$(v).css("height",window.innerHeight*0.85*0.5-4-20-4);
		});

	},
	addArrowNav: function(){
		$(".itemPageArrowImg").each(function(i,v){
			$(v).on("click",function(){
			
				if(i==0){
					leapUI.navNextProductItemPage(-1);
				}else if (i==1){
					leapUI.navNextProductItemPage(1);
				}
				
			
			});
		});
	
	},
	productListItemAddMouseover: function(){
		$(".productListContainer").children().each(function(i,v){
		
			$(v).on("mouseover",function(e){
				leapUI.selectItem();
				leapUI.selectProductListItem(v);
			
			});
		});
	
	}

}
