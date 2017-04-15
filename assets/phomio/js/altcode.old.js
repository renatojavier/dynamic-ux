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

$(".entity p").each(function(){ $(this).data("datacolor", $(this).css("color") ); });

$(".entity").mouseenter(function()
  {
  var $current = $(this);
  $(".entity").filter(function(){ return !$(this).is($current); }).stop().each(function(){ leavefunc($(this)); });
  var dur = 200;
  var $p = $(this).children("p");
    if ( $p.is(":animated") ) return;
  $p.animate({ color: "#ff0000" }, dur);
  $(this).children("img").animate({top: -10}, dur);
  });
var leavefunc = function($thisele)
  {
  var dur = 200;
  var $p = $thisele.children("p");
  //  if ( $p.is(":animated") ) return;
  $p.animate({ color: $p.data("datacolor") });
  $thisele.children("img").animate({top: 0}, dur);
  };

$(".entity").mouseleave(function()
  {
  leavefunc($(this));
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
/*
$(".entity p").data("datalocked", false);
$(".entity p").each(function(){ $(this).data("datacolor", $(this).css("color") ); });

var entityoverfunc = function($thisele)
  {
  var dur = 200;
  var $p = $thisele.children("p");
    if ( $p.data("datalocked") === false )
    {
    $p.data("datalocked", true);
    //$p.data("datacolor", $p.css("color"));
    //$p.data("colordata", { color: $p.css("color"), locked: true });
    //$p.attr("data-orig-color", $p.css("color"));
    $p.animate({ color: "#ff0000" }, dur);
    $thisele.children("img").animate({top: -10}, dur);
    }
  };
var entityoutfunc = function($thisele)
  {
  var dur = 200;
  var $p = $thisele.children("p");
  
    //var colordata = $p.data("colordata");
    if ( $p.data("datalocked") === true )
    {
    $p.animate({ color: $p.data("datacolor") }, dur, "linear", function(){ $p.data("datalocked", false) });
    //$p.animate({ color: colordata.color }, dur, "linear", function(){ $p.data("colordata", { color: colordata.color, locked: false }); });
    //$p.animate({ color: $p.attr("data-orig-color") }, dur);
    $thisele.children("img").animate({top: 0}, dur);
    
    //  setTimeout(function(){ $p.data("datalocked", false); }, dur+50);
  
    //$(this).attr("data-orig-color", null);
    }
  };

$(".entity").hover(function()
  {
  entityoverfunc($(this));
  }, function()
  {
  entityoutfunc($(this));
  });
*/

});

$(window).load(function()
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

})(jQuery);
