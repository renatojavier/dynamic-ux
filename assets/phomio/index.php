<?php require_once("Mobile_Detect.php");

$logfile = "log.csv";

$logheaders = array("ip","port","datetime","referer","useragent","ismobile");

$mobileDetected = array_key_exists("forceMobile", $_GET);
  if ( !$mobileDetected )
  {
  $md = new Mobile_Detect();
  $mobileDetected = $md->isMobile() || $md->isTablet();
  }

$log = implode(",", $logheaders) . PHP_EOL;
  if ( file_exists($logfile) )
  {
  $log = @file_get_contents($logfile);
  }
@file_put_contents($logfile, $log . implode(",", array(
  $_SERVER["REMOTE_ADDR"],
  $_SERVER["REMOTE_PORT"],
  date("Y-m-d H:i:s"),
  $_SERVER["HTTP_REFERER"],
  $_SERVER["HTTP_USER_AGENT"],
  $mobileDetected
  )) . PHP_EOL);

class Image { public $W; public $H; public $URL; public function __construct($url,$w,$h){ $this->URL=$url;$this->W=$w;$this->H=$h; } }
require_once("content.inc");

$item = null;
$item_name = null;
  if ( array_key_exists("item", $_GET) )
  {
  $item_name = $_GET["item"];
    if ( array_key_exists($item_name, $entities) )
    {
    $item = $entities[$item_name];
    }
  }

function makeEntity($name, $ent)
{
$title = htmlentities($ent["Title"]);//, ENT_HTML5, "UTF-8");
$img = $ent["Image-Thumb"]->URL;
$w = $ent["Image-Thumb"]->W;
$h = $ent["Image-Thumb"]->H;

//    echo "<a href=\"?item=" . $name . "\" class=\"entity\">" . PHP_EOL;
echo "<a href=\"./" . $name . "\" class=\"entity\" data-target-panel=\"" . $name . "\">" . PHP_EOL;
//  echo "  <div class=\"box\">" . PHP_EOL;
echo "  <img src=\"".$img."\" style=\"width: ".$w."px; height: ".$h."px;\" alt=\"" . str_replace("\n", " ", $title) . "\" />" . PHP_EOL;
//  echo "  </div>" . PHP_EOL;
echo "  <p>" . str_replace("\n", "<br />", $title) . "</p>" . PHP_EOL;
echo "</a>";
//echo $ent["Image-Large"] . PHP_EOL;
}

function makeContentArea($name, $ent, $hidden)
{
global $alternatingRowsEnabled;
global $mobileDetected;

$title = str_replace("\n", " ", htmlentities($ent["Title"]));//, ENT_HTML5, "UTF-8");
$url = array_key_exists("URL", $ent) ? $ent["URL"] : null;
$bannerText = htmlentities($ent["Banner-Text"]);

$url_html = $url == null || $url == "" ? "" : "<a class=\"link_action\" target=\"_blank\" href=\"$url\"><!-- See it in action --></a>";

$url_banner_video_mp4  = "videos/banners/banner-" . $name . ".mp4";
$url_banner_video_webm = "videos/banners/banner-" . $name . ".webm";
$url_banner_video_ogg  = "videos/banners/banner-" . $name . ".ogv";
$url_banner_fallback   = "videos/banners/banner-" . $name . ".jpg";

// src=\"" . $url_banner_video . "\"

echo "<div class=\"contentArea" . ($hidden ? " hidden" : "") . "\" id=\"contentArea-$name\" data-panel=\"$name\">" . PHP_EOL;
echo "  <div class=\"contentArea-header\">" . PHP_EOL;
if (!$mobileDetected) echo "    <video class=\"contentArea-banner\" muted=\"true\" loop=\"true\" autoplay=\"true\" alt=\"&nbsp;\" style=\"background-image: url('" . $url_banner_fallback . "')\" poster=\"" . $url_banner_fallback . "\"><source type=\"video/mp4\" src=\"$url_banner_video_mp4\" /><source type=\"video/webm\" src=\"$url_banner_video_webm\" /><source type=\"video/ogg\" src=\"$url_banner_video_ogg\" /></video>" . PHP_EOL;
else echo "   <img class=\"contentArea-banner\" src=\"$url_banner_fallback\" />";
echo "    <div class=\"contentArea-banner-text\">" . $bannerText . "</div>" . PHP_EOL;
echo "    <div><a class=\"link_back\" href=\"./\"><!--&#10094; Back--></a>$url_html</div>" . PHP_EOL;
echo "    <h1>$title</h1>" . PHP_EOL;
echo "  </div>" . PHP_EOL;

$i = 0;
  foreach ( $ent["Screenshots"] as $img => $desc )
  {
  $shadowclass = array_key_exists("Dropshadow-Exclusions", $ent) && in_array($img, $ent["Dropshadow-Exclusions"]) ? " class=\"noshadow\"" : "";
  
  $desc_lines = explode("\n", htmlentities($desc));
    for ( $i = 0; $i < count($desc_lines) ; $i++ )
    {
    $desc_lines[$i] = preg_replace('/\w*-(.*)\w*/', '<span class="bullet"></span> $1', $desc_lines[$i]);
    }
  
  $desc = implode("\n", $desc_lines);
  $desc = str_replace("\n", "<br />", $desc);
  
  echo "  <div class=\"screenshot-cont\">" . PHP_EOL;
    if ( !$alternatingRowsEnabled || ( $i % 2 ) == 0 )
    {
    $classOverride = null;
    echo "    <div class=\"screenshot\">" . PHP_EOL;
      switch ( $img )
      {
        case "#lureSelect":
        {
        $classOverride = "lureSelectDesc";
        include("lureSelect.inc");
        break;
        }
        case "#photoSelect":
        {
        $classOverride = "photoSelectDesc";
        echo "<iframe class=\"photoSelectFrame\" src=\"upload/\" border=\"1\"></iframe>" . PHP_EOL;
        break;
        }
        default:
        {
        $filename = pathinfo($img, PATHINFO_FILENAME);
        $ext = pathinfo($img, PATHINFO_EXTENSION);
          switch ( $ext )
          {
            case "mp4":
            {
            //video file
            $video_dir = "videos/";
            $file_mp4 = $video_dir . $filename . ".mp4";
            $file_webm = $video_dir . $filename . ".webm";
            $file_ogg = $video_dir . $filename . ".ogv";
            $poster = $video_dir . $filename . ".jpg";
            $looping = array_key_exists("Looping", $ent) && in_array($img, $ent["Looping"]);

            // adding class for video description
            $classOverride = "iphoneDesc";
            
            echo "    ";            
              if ( stripos($filename, "iphone") === 0 ) echo "    <span class=\"iphone\">";
            if (!$mobileDetected) echo "<video class=\"screenshot-video\" " . ($looping ? " loop=\"true\"" : "" ) . " muted=\"true\" alt=\"&nbsp;\" poster=\"$poster\"><source type=\"video/mp4\" src=\"$file_mp4\" /><source type=\"video/webm\" src=\"$file_webm\" /><source type=\"video/ogg\" src=\"$file_ogg\" /></video>";
            else echo "<img class=\"screenshot-video\" alt=\"&nbsp;\" src=\"$poster\" />";
              if ( stripos($filename, "iphone") === 0 ) echo "</span>";
            echo PHP_EOL;
            /*
              if ( stripos($filename, "iphone") === 0 )
              {
              //starts with iphone; create iphone frame and assume size
              
              // autoplay=\"true\"
              echo "    <span class=\"iphone\"><video" . ($looping ? " loop=\"true\"" : "" ) . " muted=\"true\" alt=\"&nbsp;\" poster=\"$poster\"><source type=\"video/mp4\" src=\"$file_mp4\" /><source type=\"video/webm\" src=\"$file_webm\" /><source type=\"video/ogg\" src=\"$file_ogg\" /></video></span>" . PHP_EOL;
              //echo "    <span class=\"iphone\"><video" . ($looping ? " loop=\"true\"" : "" ) . " muted=\"true\" src=\"$img\" alt=\"&nbsp;\" poster=\"$poster\"></video></span>" . PHP_EOL;
              }
              else
              {
              //generic video
              echo "    <video " . ($looping ? " loop=\"true\"" : "" ) . " muted=\"true\" alt=\"&nbsp;\" poster=\"$poster\"><source type=\"video/mp4\" src=\"$file_mp4\" /><source type=\"video/webm\" src=\"$file_webm\" /><source type=\"video/ogg\" src=\"$file_ogg\" /></video>" . PHP_EOL;
              //echo "    <video " . ($looping ? " loop=\"true\"" : "" ) . " muted=\"true\" src=\"$img\" alt=\"&nbsp;\" poster=\"$poster\"></video>" . PHP_EOL;
              }
            */
            break;
            }
            default:
            {
            //other file (image/dir)
            $ssdir = pathinfo($img, PATHINFO_DIRNAME);
            
              if ( stripos($ssdir, "slideshows") !== FALSE ) //if ( is_dir($ssdir) && (stristr($ssdir, "slideshows") !== FALSE) )
              {
              //slideshow (e.g. images/slideshows/cheryls/ss1/)
              $ssdir = $img;
              $ssexts = array("jpg", "png", "gif", "jpeg", "bmp");
              
              $files = scandir($ssdir);
              
                if ( $mobileDetected )
                {
                $w = $ent["Slideshow-Sizes"][$img][0];
                $h = $ent["Slideshow-Sizes"][$img][1];
                $a = $h / $w;
                
                $ent["Slideshow-Sizes"][$img][0] = 300;
                $ent["Slideshow-Sizes"][$img][1] = $ent["Slideshow-Sizes"][$img][0] * $a;
                }
              
              $styles = "";
              $styles .= "width: " . $ent["Slideshow-Sizes"][$img][0] . "px; ";
              $styles .= "height: " . $ent["Slideshow-Sizes"][$img][1] . "px;";
              
              //echo "    <div class=\"screenshot-slideshow\" style=\"background-image: url('" . $img . "');\">" . PHP_EOL;
              echo "    <div class=\"screenshot-slideshow-cont\" style=\"$styles\">" . PHP_EOL;
              echo "      <div class=\"screenshot-slideshow\" style=\"$styles\">" . PHP_EOL;
                foreach ( $files as $file )
                {
                $parts = explode(".", $file);
                $ext = $parts[count($parts)-1];
                  if ( in_array($ext, $ssexts) )
                  {
                  echo "        <img src=\"" . $ssdir . $file . "\" />" . PHP_EOL;
                  }
                }
              echo "      </div>" . PHP_EOL;
              echo "    </div>" . PHP_EOL;
              }
              else
              {
              //normal
              echo "    <img src=\"$img\" alt=\"&nbsp;\"$shadowclass />" . PHP_EOL;
              }
            break;
            }
          }
        break;
        }
      }
    echo "    <p" . ($classOverride != null ? " class=\"$classOverride\"" : "") . ">$desc</p>" . PHP_EOL;
    //echo "    <span class=\"screenshot-clear\"></span>" . PHP_EOL;
    echo "    </div>" . PHP_EOL;
    }
    else
    {
    echo "    <div class=\"screenshot screenshot-reversed\">" . PHP_EOL;
    echo "    <p>$desc</p>" . PHP_EOL;
    echo "    <img src=\"$img\" alt=\"&nbsp;\"$shadowclass />" . PHP_EOL;
    echo "    </div>" . PHP_EOL;
    }
  echo "  </div>" . PHP_EOL;
  
  $i++;
  }
echo "</div>";
}

?>
<!DOCTYPE html>

<html>
<head>
  <title>Dynam UX Portfolio</title>
  <link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet" type="text/css" />
  <link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:600" rel="stylesheet" type="text/css" />
  <link rel="stylesheet" type="text/css" href="css/portfolio.css" />
  <link rel="stylesheet" type="text/css" href="css/lureSelect.css" />
  <?php if ($mobileDetected): ?>
  <link rel="stylesheet" type="text/css" href="css/mobile.css" />
  <link rel="stylesheet" type="text/css" href="css/lureSelectMobile.css" />
  <meta content="width=320, minimum-scale=1.0, maximum-scale=1.6, user-scalable=no" name="viewport" />
  <?php endif; ?>
  <meta charset="UTF-8" />
  <script type="text/javascript" src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
  <script type="text/javascript" src="js/jquery.color-2.1.2.min.js"></script>
  <script type="text/javascript" src="js/jquery.ba-throttle-debounce-1.1.min.js"></script>
  <script type="text/javascript">document.createElement("header");</script>
</head>
<body class="<?php echo ( $mobileDetected ? "isMobile" : "isDesktop"); ?>">

<header>
  <div id="innerHeader">
  <?php if (!$mobileDetected): ?>
    <a id="mainHeaderEle" href="./"><img id="pic" src="images/photo.png" alt=" " /><img id="title" src="images/title.png" alt="Dan's Portfolio" /><img id="emoji" src="images/emoji.gif" alt=":)" /></a>
    <span id="contact"><?php //<a href="mailto:dan@dyn.am">dan@dyn.am</a><br />555-555-5555 ?></span>
  <?php else: ?>
    <a id="mainHeaderEle" href="./"><img id="pic" src="images/photo.png" alt=" " /><img id="title" src="images/title_mobile.png" alt="Dan's Portfolio" /></a>
    <a id="contact" href="mailto:dan@dyn.am" target="_blank"><?php //<a href="mailto:dan@dyn.am">dan@dyn.am</a><br />555-555-5555 ?></a>
  <?php endif; ?>
  </div>
</header>

<?php if ($mobileDetected): ?>
<div id="mobileHeader">
Agile designer with an emphasis on powerful functionality through simplicity, accessibility, privacy &amp; enjoyability.
</div>
<?php endif; ?>

<?php
  if ( $item == null )
  {
  echo "<a id=\"loadingGear\"></a>\n";
  }

echo "<div id=\"content\"" . ( $item != null ? " class=\"hidden\"" : "" ) . ">" . PHP_EOL;
  foreach ( $entities as $name => $ent )
  {
    if ( $mobileDetected )
    {
    $w = $ent["Image-Thumb"]->W;
    $h = $ent["Image-Thumb"]->H;
    $a = $h / $w;
    $ent["Image-Thumb"]->W = 150;
    $ent["Image-Thumb"]->H = $ent["Image-Thumb"]->W * $a;
    }
  makeEntity($name, $ent);
  }
echo "</div>" . PHP_EOL;

  if ( $item != null )
  {
  makeContentArea($item_name, $item, false);
  }
  /*
  else
  {
    foreach ( $entities as $name => $ent )
    {
    makeContentArea($name, $ent, true);
    }
  }
  */
?>
<div id="footerSpacer"></div>
<div id="footer"><img id="footerLogo" alt=" " src="images/dynam.png" /></div>

<script type="text/javascript" src="js/lureSelect.js"></script>
<script type="text/javascript" src="js/portfolio.js"></script>

</body>
</html>
