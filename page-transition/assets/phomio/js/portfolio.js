var slideshows = [],
    lastScrollTop = 0;

function SlideShow(varName, slides, delay, adelay)
{
//this.$Container = container;
this.$Slides = slides;
//this.pos = 0;
this.$Current = this.$Slides.first(); //this.$Slides.eq(this.pos);

this.$Slides.hide();
//this.$Slides.each(function(index){ $(this).css("z-index", index+1); });
this.$Current.show();
this.animateDelay = adelay;

this.next = function()
  {
  var $eold = this.$Current;
  var $enew = $eold.next(); //$eold.parent().index( $eold ) >= this.$Slides.length ? this.$Slides.first() : $eold.next();
    if ( $enew == null || $enew.length == 0 ) $enew = this.$Slides.first();
  
  $enew.css("z-index", 2);
  $eold.css("z-index", 1);
  
  $enew.fadeIn(this.animateDelay/2, function(){
    $eold.fadeOut(this.animateDelay/2, function(){
    $(this).css("z-index", 0);
    });
  });

  this.$Current = $enew;
  
  //this.pos = this.pos + 1 >= this.$Slides.length ? 0 : this.pos + 1;
  //this.$Current = this.$Slides.eq(this.pos);
  };

this.__timer = setInterval(varName + ".next()", delay);
}

/******************************************************************************/

(function($){

var $fadeInList = $("a.nonexistant");

$(document).ready(function()
{
$("#content, div.contentArea, #footerSpacer").each(function()
  {
    if ( !$(this).hasClass("hidden") )
    {
    $(this).css("opacity", "0.00");
    //$(this).hide();
    $fadeInList = $fadeInList.add(this);
    }
  });

/*
$(".entity").hover(function()
  {
  var dur = 200;
  var $p = $(this).children("p");
    if ( $p.is(":animated") ) return;
  $p.animate({ color: "#ff0000" }, dur);
  $(this).children("img").animate({top: -10}, dur);
  }, function()
  {
  var dur = 200;
  var $p = $(this).children("p");
    if ( $p.is(":animated") ) return;
  $p.animate({ color: $p.data("datacolor") });
  $(this).children("img").animate({top: 0}, dur);
  });
});
*/

$("body:not(.isMobile) .entity p").each(function(){ $(this).attr("data-orig-color", $(this).css("color")); });

$("body:not(.isMobile) .entity").hover(function()
  {
  var dur = 200;
  var $p = $(this).children("p");
  //$p.attr("data-orig-color", $p.css("color"));
  $p.animate({ color: "#cc3333" }, dur);
  $(this).animate({top: -10}, dur);
  }, function()
  {
  var dur = 200;
  var $p = $(this).children("p");
  $p.animate({ color: $p.attr("data-orig-color") }, dur);
  $(this).animate({top: 0}, dur);
  
  $(this).attr("data-orig-color", null);
  });

});

function windowScrolled()
{
var winY = $(this).scrollTop();
$(".contentArea .screenshot-cont .screenshot video").each(function()
  {
  var $ssArea = $(this).parents(".screenshot");
  
  var ssStart = $ssArea.offset().top;
  var ssEnd = ssStart + $ssArea.height();

    if ( winY > ssEnd )
    {
    $(this).get(0).pause();
    //console.log("pause");
    }
    else if ( winY > lastScrollTop && (winY + 600) > ssStart )
    {
    $(this).get(0).play();
    //console.log("play");
    }
  
  });
lastScrollTop = winY;
}

$(window).scroll(function(){
  windowScrolled();
});

$(window).on('load', function()
{
//$("#content:hidden, div.contentArea:hidden, #footerSpacer:hidden").each(function()
$fadeInList.each(function()
  {
    if ( !$(this).hasClass("hidden") )
    {
    $(this).fadeTo(500,1.00);
    //$(this).fadeIn(500);
    }
  });
//$fadeInList.fadeIn(500);

$("#loadingGear").hide();

  $("#Items").createLureBox(
    {
    directions: "You can search by name or lure number, or select the colors of the lure below.",
    //trigger: $("<a id=\"selectLure\"></a>"),
    //trigger: $("<div id=\"selectLure\"></div>"),
    triggerdesc: $("<div id=\"selectLureDesc\"></div>"),
    //triggerText: "Choose Lure",
    imagePath: "http://cdn3.volusion.com/xaypu.lbtcc/v/vspfiles/photos/{0}-1.jpg",
    onSelect: function( $item ){
      //$("#Comments").focus();
      //$(window).scrollTop(1000);
      //$.scrollTo($("#file-button"), 1000, { axis: 'y' });
      //$(window).scrollTop( $("#label-Items").offset().top );
      }
    });
});

/*

$(document).ready(function()
{
//$("div.contentArea").hide();
});

$(window).load(function()
{
  if ( document.location.hash != null && document.location.hash != "" )
  {
  $("#content").hide();
  $("div.contentArea[data-panel=\'" + document.location.hash.replace("#", "") + "\']").show();
  }

  $(".entity").click(function()
  {
  var clicker = this;
  $("#content").fadeOut(500, function()
    {
    $(window).scrollTop(0);
    //document.location = "#";
    var name = $(clicker).attr("data-target-panel");
    $("div.contentArea[data-panel=\'" + name + "\']").fadeIn(1000);
    document.location.hash = name;
    });
  
  return false;
  });

  $("div.contentArea .link_back").click(function()
  {
  $(this).parents("div.contentArea").fadeOut(500, function()
    {
    $(window).scrollTop(0);
    //document.location = "#";
    $("#content").fadeIn(1000);
    document.location.hash = null;
    });
  });

});
*/

$( ".screenshot-slideshow" ).each(function()
  {
  var i = slideshows.length;
  slideshows[i] = new SlideShow("slideshows["+i+"]", $(this).children("img"), 4000, 0);
  });

})(jQuery);
