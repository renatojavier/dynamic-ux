
(function($){

  $.fn.createLureBox = function( options )
  {
  var settings = $.extend(
    {
    imagePath: "images/{0}.jpg",
    trigger: null,
    triggerdesc: null,
    triggerText: "Choose",
    onSelect: null,
    directions: "Choose"/*,
    arrowPos: 0*/
    }, options );
  
  var colors = ["Red", "Orange", "YellowGold", "Green", "Blue", "Purple", "Pink", "Black", "White", "Brown", "GreySilver"];
  
    if (1)
    { //precaching
    var images = ["lureSelect-bg.jpg","lureSelect-close.png","lureSelect-arrow.png","search.png","lureSelect-palette.png"];
      for ( i = 0; i < images.length; i++ )
      {
      var $temp = $("<img />");
      $temp.attr("src", "images/lureSelect/" + images[i]);
      }
    }
  
  return this.each(
    function(ind)
    {
      if ($(this).is("select") == false) return;
    
    var $selectbox = $(this);
    
    $selectbox.css("display", "none");
        
    var $searchbox = $("<input class=\"lureselect-searchbox\" type=\"text\" />");
    
    var search_default_text = "Search";
    
    $searchbox.addClass("lureselect-searchbox-default");
    $searchbox.val(search_default_text);
    
    $searchbox.focus(function(){
        if ($(this).hasClass("lureselect-searchbox-default") && $(this).val() == search_default_text) $(this).val("");
      $(this).removeClass("lureselect-searchbox-default");
      });
    $searchbox.blur(function(){
        if ($(this).val() == "")
        {
        $(this).addClass("lureselect-searchbox-default");
        $(this).val(search_default_text);
        }
      });
    
    var $close_button = $("<a class=\"lureselect-close\"></a>");
    
    var $box = $("<div id=\"lureSelect\" data-colors=\"\"></div>");
    //$box.append("<div class=\"lureselect-arrow\" style=\"top: " + settings.arrowPos + "px;\"></div>");
    $box.append($close_button);
    $box.append("<div class=\"lureselect-arrow\"></div>");
    $box.append("<div class=\"lureselect-directions\">" + settings.directions + "</div>");
    $box.append("<hr />");
    $box.append($searchbox);
    $box.append("<hr />");
    
    $box.css("display", "none");
    
      if ( true )
      {
      var $colors = $("<div class=\"lureselect-colors\"></div>");
        for ( i = 0 ; i < colors.length ; i++ )
        {
        var $color = $("<span class=\"lureselect-color lureselect-color-" + colors[i].toLowerCase() + "\" data-color=\"c:" + colors[i].toLowerCase() + "\"></span>");
        
        $color.click(function()
          {
          $(this).toggleClass("lureselect-color-on");
          var datacolors = "";
          $(this).parent().children("span.lureselect-color").each(function()
            {
              if ( $(this).hasClass("lureselect-color-on") )
              {
              datacolors += " " + $(this).attr("data-color");
              }
            });
          
          $box.attr("data-colors", datacolors);
          $searchbox.keyup();
          });
        
        $colors.append($color);
        }
      $box.append($colors);
      $box.append("<hr />");
      }
    
    var $itemlist = $("<div class=\"lureselect-itemlist\"></div>");
    
    
    $(this).children("option").each(
      function(){
      var $item = $("<div class=\"lureselect-item\"></div>");
      var id = $(this).attr("value");
      $item.append("<img class=\"lureselect-item-image\" data-src-loading=\"true\" data-src=\"" + settings.imagePath.replace("{0}", id) + "\" />");
      $item.append("<p class=\"lureselect-item-name\">" + $(this).html() + "</p>");
      
      //var d = findData(id);
//093 White freshwater lures white freshwater lures 7 gram lures freshwater lures 13.5 gram lures freshwater lures 20 gram lures freshwater lures 26 gram lures
//093 White freshwater lures white freshwater lures 7 gram lures freshwater lures 13.5 gram lures freshwater lures 20 gram lures f
//094 Sunset Frog freshwater lures red black freshwater lures 7 gram lures freshwater lures 13.5 gram lures freshwater lures 20 gr
      
      $item.attr("data-id", id);
      $item.attr("data-name", $(this).html());
      
      var kw = $(this).attr("data-desc").split(" ");
      var desc = "";
      var dcol = "";
      
        for ( i = 0; i < kw.length ; i++ )
        {
          if ( kw[i].toLowerCase().indexOf("c:") >= 0 )
            dcol += " " + kw[i];
          else if ( kw[i].toLowerCase().indexOf("bg:") >= 0 )
            var noop = null; //no-op
          else
            desc += " " + kw[i];
        }
      
      desc = desc.trim();
      dcol = dcol.trim();
      
      $item.attr("data-desc", desc);
      $(this).attr("data-desc", "");
      
      $item.attr("data-colors", dcol);
      
      $item.css("display", "none");
      
      $itemlist.append($item);
      });
    
    $box.append($itemlist);
    
    $box.append("<div style=\"position: relative; top: 512px; left: 0px; width: 512px; height: 1px;\"></div>");
        
    $itemlist.children("div.lureselect-item").click(function()
      {
      $itemlist.children("div.lureselect-item.lureselect-item-selected").removeClass("lureselect-item-selected");
      $(this).addClass("lureselect-item-selected");
      $selectbox.val($(this).attr("data-id"));
      //$box.css("display", "none");
      var id = $(this).attr("data-id");
      var imageURL = settings.imagePath.replace("{0}", id);
      var img = new Image();
      img.src = imageURL;
      
        if (settings.onSelect != null) settings.onSelect($(this));
      });
    
    $searchbox.keyup(function()
      {
      	console.log('typed');
      /*
      var search = "";
      search += $box.attr("data-colors");
        if (!$searchbox.hasClass("lureselect-searchbox-default")) search += " " + $searchbox.val();
      var terms = search.toLowerCase().split(" ");
      */
      
      var terms = [];
        if (!$searchbox.hasClass("lureselect-searchbox-default"))
        {
        terms = $searchbox.val().toLowerCase().split(" ");
        }
      
      var cterms = $box.attr("data-colors").trim().toLowerCase().split(" ");
      
        if ( ( terms.length <= 0 || terms[0] == "" ) && ( cterms.length <= 0 || cterms[0] == "" ) /*search.trim() == ""*/ )
        {
        $itemlist.children("div.lureselect-item").css("display", "none");
        }
        else
        {
        $itemlist.children("div.lureselect-item").each(function()
          {
          var keywords = $(this).attr("data-desc").toLowerCase();//.split(" ");
          var kcolors = $(this).attr("data-colors").toLowerCase();
          
          var hasColors = true;
          var hasTerms = true;
          //colors.indexOf(cterms[t])
          
            for ( t = 0 ; t < terms.length ; t++ )
            {
              if (terms[t] == "") continue;
            
              if ( keywords.indexOf(terms[t]) < 0 )
              {
              hasTerms = false;
              break;
              }
            
            /*
              if ( keywords.indexOf(terms[t]) < 0 )
              {
              $(this).css("display", "none");
              return;
              }
            */
            }
          
            for ( c = 0 ; c < cterms.length ; c++ )
            {
              if (cterms[c] == "") continue;
            
              if ( kcolors.indexOf(cterms[c]) < 0 )
              {
              hasColors = false;
              break;
              }
            }
            
            if ( hasColors && hasTerms )
            {
            $(this).css("display", "inline-block");
            }
            else
            {
            $(this).css("display", "none");
            }
          });
        }
      });
    
      if (1) //display
      {
      $box.css("display", "inline-block");
      $itemlist.children("div.lureselect-item").children("img.lureselect-item-image").each(function()
        {
          if ($(this).attr("data-src-loading") == "true")
          {
          $(this).attr("src", $(this).attr("data-src"));
          $(this).attr("data-src", "");
          $(this).attr("data-src-loading", "");
          }
        });
      }
    
    $(this).after($box);
    });
  };

})(jQuery);
