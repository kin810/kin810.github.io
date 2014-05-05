/*
	items
		itemPage
			item
				<item detail>.


*/
var itemToDisplay = 4;

$(document).ready(function(){
  load();
});

function load(){
	
  $("<div class='cursor'></div>")
    .append("<div class='inner'></div>")
    .append("<div class='pointing'></div>")
    .appendTo("body");
    
    
	if($("#itemsContainer").length!=0){
		loadItem();
		uiRender.updateItemSize();
		uiRender.updateItemImageSize();
		
		//uiRender.itemAddMouseover();
		
		window.onresize = function(){
			uiRender.updateItemSize();
			uiRender.updateItemImageSize();
		}
		
		uiRender.addArrowNav();
		uiRender.itemAddMouseClick();
	}else if($("#orderHistoryAccordion").length!=0){
		var icons = {
		  header: "ui-icon-circle-arrow-e",
		  activeHeader: "ui-icon-circle-arrow-s"
		};
		$( "#orderHistoryAccordion" ).accordion({
		  icons: icons
		});
		
		$(".ui-accordion-header").each(function(i,v){
			$(v).addClass("pointable");
		});
	}
	
	uiRender.addBackButtonEvent();
	uiRender.anchorDivAddMouseClick();
};

function loadItem(){

  var request = new XMLHttpRequest();

  request.onload = function() {
    var xml = new DOMParser().parseFromString(request.responseText,'text/xml');
    var items = xml.getElementsByTagName("item");
    
    var itemsDiv = document.createElement('div');
    itemsDiv.className = "items";
    document.getElementById("itemsContainer").appendChild(itemsDiv);
    
    for(var a = 0 ; a < Math.ceil(items.length/itemToDisplay);a++){
      
      var pageDiv = document.createElement('div');
      pageDiv.id="itemPage_"+(a+1);
      if(a!=0){
        pageDiv.className="hiddenItem";
      }
      
      for(var i = a*itemToDisplay; i < a*itemToDisplay + itemToDisplay; i++) {
      
        var item = items[i];
        
        if(item != null){
          var name = item.getElementsByTagName("name")[0].childNodes[0].nodeValue;
          var desc = item.getElementsByTagName("desc")[0].childNodes[0].nodeValue;
          var imageName = item.getElementsByTagName("imageName")[0].childNodes[0].nodeValue;
          var price = item.getElementsByTagName("price")[0].childNodes[0].nodeValue;
          var rate =  item.getElementsByTagName("rate")[0].childNodes[0].nodeValue;
          
          
          
          var itemDiv = document.createElement('div');
          itemDiv.id = "item_" + (i+1);
          itemDiv.setAttribute("data-type", "product");
          
          //$(itemDiv).data("type", "product");
          itemDiv.className = "item includeShadow pointable ";
          
          
          var itemLeftDiv = document.createElement('div');
          itemLeftDiv.className = "itemLeftDiv";
          var itemRightDiv = document.createElement('div');
          itemRightDiv.className = "itemRightDiv";
          itemDiv.appendChild(itemLeftDiv);
          itemDiv.appendChild(itemRightDiv);
          
          
          var imgDiv = document.createElement('div');
          imgDiv.className= "itemImgContainer";
          
          var img = document.createElement('img');
          img.src = "shopItemImage/" + imageName;
          img.className = "itemImg";
          
          
          imgDiv.appendChild(img);
          
          itemLeftDiv.appendChild(imgDiv);
          
          var nameDiv = document.createElement('div');
          nameDiv.innerHTML = name;
          nameDiv.className = "name";
          itemLeftDiv.appendChild(nameDiv);

          var rateAndPriceDiv = document.createElement('div');
          rateAndPriceDiv.className = "rateAndPriceDiv";
          
          var priceDiv = document.createElement('div');
          priceDiv.innerHTML = "$" + price;
          priceDiv.className = "price";
          rateAndPriceDiv.appendChild(priceDiv);
          
          var rateDiv = document.createElement('div');
          rateDiv.innerHTML = "Rating: " + rate + "/ 5.0";
          rateDiv.className = "rate";
          rateAndPriceDiv.appendChild(rateDiv);	

          itemRightDiv.appendChild(rateAndPriceDiv);


          var descDiv = document.createElement('div');
          descDiv.innerHTML = desc;
          descDiv.className = "desc";
          itemRightDiv.appendChild(descDiv);
          
          pageDiv.appendChild(itemDiv);
          
          
        }
        
      }
      
      itemsDiv.appendChild(pageDiv);
      
    }
  }
  
  request.open("GET","./xml/" + xmlInfoFile, false);
  request.send();


}