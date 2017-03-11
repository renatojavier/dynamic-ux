<!DOCTYPE html>
<html data-device data-portfolio="phomio" data-theme="#d72d2e"lang="en" dir="ltr">
	<head>
		<title>Phomio &ndash; Dynamic UX Portfolio</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content>
		<style type="text/css">body{ display: none; }</style>
		<link rel="stylesheet" type="text/css" href="assets/css/global.css"/>
		<link rel="stylesheet" type="text/css" href="assets/css/phomio-desktop.css"/>
		<link rel="stylesheet" type="text/css" href="assets/css/phomio-mobile.css"/>
		<link rel="stylesheet" type="text/css" href="assets/css/phomio/entry.css"/>
		<link rel="stylesheet" type="text/css" href="assets/phomio/css/lureSelect.css"/>
		<link rel="stylesheet" type="text/css" href="assets/phomio/css/lureSelectMobile.css"/>
		<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	</head>
	<body>
		<div id="viewport">
			<header id="top-bar" class="container">
				<section class="inner">
					<figure id="site-logo-group">
						<a href="./index.html">
							<i class="fa fa-fw fa-angle-left"></i>
							<img src="assets/img/dynamic_logo.png" alt="" id="site-logo">
						</a>
					</figure>

					<h1 id="portfolio-name">Phomio</h1>

					<div id="switcher-container" class="switcher-desktop">
						<div id="switcher-inner">
							<a data-switch href="#section-complex" id="switch-complex">complex</a>
							<a data-switch href="#section-simple"  id="switch-simple">simple</a>
						</div>
					</div>

				</section>
			</header>

			<div id="switcher-container" class="switcher-mobile">
				<div id="switcher-inner">
					<a data-switch href="#section-complex"  id="switch-complex">complex</a>
					<a data-switch href="#section-simple" id="switch-simple">simple</a>
				</div>
			</div>

			<div id="page-content">

				<section class="section alpha" id="section-challenge">
					<div class="inner">
						<h2 class="section-title">Challenge</h2>
						<div class="section-content">
							<ul class="textual-content">
								<li>- Create an interactive photo sharing contest platform that facilitates viral marketing for products and services</li>
								<li>- Automate the system so clients can be as hands off as possible</li>
								<li>- Show statistics to clients to prove ROI</li>
							</ul>
							<figure class="section-diagram">
								<img src="assets/img/fishing_lure.png" alt id="img_a_fishing_lure">
								<img src="assets/img/arrow_blue_right.png" alt id="img_a_arrow_blue_right">
								<img src="assets/img/tazbox.png" alt id="img_a_tazbox">
							</figure>

							<figure class="section-diagram">
								<img src="assets/img/arrow_blue_up_left.png" alt id="img_a_arrow_blue_up_left">
								<img src="assets/img/camera.png" alt id="img_a_camera">
								<img src="assets/img/arrow_blue_down_left.png" alt id="img_a_arrow_blue_down_left">
							</figure>
						</div>
					</div>
				</section><!--/.alpha-->

				<section class="section beta" id="section-complex">
					<div class="inner">
						<h2 class="section-title">How we created the platform:</h2>
						<h3 class="section-title-centered">complexity</h3>

						<h2 class="section-title">Considerations</h2>
						<div class="section-content">
							<p class="textual-content">We anonymize and strip EXIF data from uploaded customer images before posting to any social networks. Some users are unaware that photos taken on smartphones can contain PII location information which is no one else’s business, and we don’t want to share it to social networks without their knowledge.</p>
							<figure class="section-diagram diagram-editor">
								<section class="editor-column editor-column-line">
									<span>1</span>
									<span>2</span>
									<span>3</span>
									<span>4</span>
									<span>5</span>
									<span>6</span>
									<span>7</span>
								</section>
								<section class="editor-column editor-column-code">
									<pre>
									<span class="editor-syntax-violet">// SyntaxHighlighter makes your code snippets beautiful servers.
									// //alexgorbatchev.com</span>
									<span class="editor-syntax-yellow">var</span> setArray = <span class="editor-syntax-yellow">function</span>(elems) {
										<span class="editor-tab"><span class="editor-syntax-yellow">this</span>.length = 0;</span>
										<span class="editor-tab">push.apply(<span class="editor-syntax-yellow">this</span>, elems);</span>
										<span class="editor-tab"><span class="editor-syntax-yellow">return this</span>;</span>
									}
									</pre>
								</section>
							</figure>
						</div>

						<h2 class="section-title">Details</h2>
						<div class="section-content">
							<p class="textual-content">Phomio has many applications across different business sectors so in order to give the most to clients, we designed special persistent data on a per user basis.
For example, a pet groomer used Phomio to for a Pet photo contest. Each pet was randomly assigned a “signature” paw print image. And if two separate submissions had matching pet names and entry email addresses, the paws would be the same for consistency. This all happens behind the scenes so users have it simple, but we do the extra leg work to put in the details.</p>
							<figure class="section-diagram diagram-details">
								<section class="diagram-details-column">
									<img src="assets/img/dog1.jpg" id="img_b_dog1">
									<img src="assets/img/dog2.jpg" id="img_b_dog2">
									<img src="assets/img/dog3.jpg" id="img_b_dog3">
								</section>
								<section class="diagram-details-column">
									<img src="assets/img/arrow_black_right.png" class="img_b_arrow_black_right">
									<img src="assets/img/arrow_black_right.png" class="img_b_arrow_black_right">
									<img src="assets/img/arrow_black_right.png" class="img_b_arrow_black_right">
								</section>
								<section class="diagram-details-column">
									<span class="customer-group-details">
										<p>customer_email: email1@domain1.com</p>
										<p>pet_name: Misty</p>
									</span>
									<span class="customer-group-details">
										<p>customer_email: email1@domain1.com</p>
										<p>pet_name: Misty</p>
									</span>
									<span class="customer-group-details">
										<p>customer_email: email2@domain2.com</p>
										<p>pet_name: Jake</p>
									</span>
								</section>
								<section class="diagram-details-column">
									<img src="assets/img/arrow_black_down_right.png" id="img_b_arrow_black_down_right">
									<img src="assets/img/arrow_black_up_right.png" id="img_b_arrow_black_up_right">
									<img src="assets/img/arrow_black_right.png" id="img_b_arrow_black_right">
								</section>
								<section class="diagram-details-column">
									<span class="paw-print">
										<img src="assets/img/paw_print_009.png" id="img_b_paw_print_009">
										<p>paw_print_009.png</p>
									</span>
									<span class="paw-print">
										<img src="assets/img/paw_print_031.png" id="img_b_paw_print_031">
										<p>paw_print_031.png</p>
									</span>
								</section>
							</figure>
						</div>

						<img src="assets/img/dog_example.jpg" id="img_b_dog_example">

					</div>
				</section><!--/.beta-->

				<section class="section charlie" id="section-simple">
					<div class="inner">
						<h2 class="section-title">What the end user experiences:</h2>
						<h3 class="section-title-centered">Simplicity</h3>
						<div class="section-content">
							<figure class="section-diagram">

								<?php 
									$f = __DIR__ . '/assets/phomio/lureSelect.inc';
									if( file_exists($f) ) require_once $f;
								?>
								
								<div id="phomio-photo-container">
									<div class="entry bg-pink">
									    <div class="top-cont">
									        <div class="date">Posted Sun, Nov 29th
									            <a class="twitter" target="_blank" href="www.twitter.com/TomsTazLures/status/671452302457225217"></a>
									            <a class="facebook" target="_blank" href="www.facebook.com/photo.php?fbid=750240431746739"></a>
									        </div>
									        <img class="image" src="assets/phomio/images/lureSelect/77.1448858603.sm.png">
									    </div>
									    <p>Nice brownie</p>
									    <p class="sig"> - Matthew
									        <br><a target="_blank" href="#">055 Pink Panther Taz Lure</a>
									    </p>
									    <a target="_blank" href="">
									    </a>
									    <a class="lure" target="_blank" href="#"><img src="assets/phomio/images/lureSelect/055.png">
									    </a>
									    <a class="buylure" target="_blank" href="#"></a>
									</div>
								</div><!--/#phomio-photo-container-->

								<img src="assets/img/phomio_logo.png" alt id="img_c_phomio_logo">

							</figure>
						</div>
					</div>
				</section><!--/.charlie-->

				<section class="section extra-section">
					<div class="inner"></div>
				</section>

			</div>

			<footer class="container"></footer>

		</div><!--/#viewport-->

		<!-- anchor swithc app -->
		<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/1.19.1/TweenLite.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/1.19.1/plugins/ScrollToPlugin.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.js"></script>

		<!-- Non-render blocker js 
		<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>-->

		<script type="text/javascript" src="//code.jquery.com/jquery-1.11.1.min.js"></script>

		<script src="assets/phomio/js/jquery.color-2.1.2.min.js"></script>
		<script src="assets/phomio/js/jquery.ba-throttle-debounce-1.1.min.js"></script>

		<script src="assets/js/lib/mobile-detect.min.js"></script>
		<script src="assets/js/app.js"></script>
		
		<script src="assets/phomio/js/lureSelect.js"></script>
		<script src="assets/phomio/js/portfolio.js"></script>

	</body>
</html>