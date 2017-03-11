window.app = {
	device : null,
	wmbMobilePlaybackOnce : true,

	initialize : function(){
		window.app.wmbMobilePlaybackOnce = true;
		window.preload_flag = true;
		this.device_detection();
		
		this.loadMozCSS();
		this.counterFOUC();

		this.switcher.initialize();
		
		// TweenLite.to(window, 0, { scrollTo: 0 });

	},

	wmbPlayBack : function( s, once ){
		if( $('[data-portfolio=wmb]').length && this.device.phone() === null ) return;

		var begin = ( $('#main-video').offset().top + $('.switcher-mobile').height() + 200 ) - ( ( $('[data-os=ios]').length ) ? $(window).outerHeight() : window.outerHeight );
		document.getElementById('main-video').pause();

		if( s >= begin && window.app.wmbMobilePlaybackOnce ){
			console.log( 'Begin aninmation' );
			window.wmb.playback.play();
			window.app.wmbMobilePlaybackOnce = false;
		}

	},

	counterFOUC : function(){
		var raf;

		function watch(){
			raf = window.requestAnimationFrame(watch);

			if( $('html').data('device') === 'desktop' || $('html').data('device') === 'mobile' ){
				document.body.style.display = 'block';
				window.cancelAnimationFrame(raf);
			}
		}
		watch();
	},

	loadMozCSS : function(){
		if( this.device.phone() === null )
			$('body').append('<link rel="stylesheet" type="text/css" href="assets/css/moz.css">');
	},

	device_detection : function( self ){
		this.device = new MobileDetect(window.navigator.userAgent);

		$('html').attr({
			'data-device' : ( this.device.phone() === null ) ? 'desktop' : 'mobile'
		});

		$('meta[name=viewport]').attr({
			content : ( this.device.phone() === null ) ? 'width=device-width, initial-scale=1' : 'width=320, minimum-scale=1.0, maximum-scale=10.0, user-scalable=no'
		});

		if(this.device.os() === "iOS"){
			$('html').attr({
				'data-os' : 'ios'
			});
		}

		//if( this.device.phone() !== null )
			//$('body').append('<link rel="stylesheet" id="stylesheet-mobile" type="text/css" href="assets/css/'+( $('html').data('portfolio') )+'-mobile.css">');
		return;
	},

	switcher : {

		initialize : function( self, pages ){
			self = this;
			pages = ['cc','wmb','phomio'];
			this.application();
			this.scrollspy();
		},

		application : function(){
			var controller = new ScrollMagic.Controller()
			,	scene = new ScrollMagic.Scene({ 
								triggerElement: "div#page-content", 
								duration: 200,
								tiggerHook: "onEnter",
								reverse: true
						}).addTo(controller);

			controller.scrollTo(function (newpos) {
				TweenLite.to(window, 0.5, {scrollTo: { y: newpos - 100 }});
			});

			$(document).on("click", "a[data-switch]", function (e) {
				var id = $(this).attr("href");
				if ($(id).length > 0) {
					e.preventDefault();
					controller.scrollTo(id);
					if (window.history && window.history.pushState) {
						history.pushState("", document.title, id);
					}
				}
			});		

		},

		scrollspy : function(){
			$(window).scrollTop(0);

			if( ! $('[data-switch]').length ) return;

			var theme = $('html').data('theme')
			,	hgt_topbar = $('#top-bar').height() + 1
			,	hgt_m_switcher = ( window.app.device.phone() === null ) ? 0 : $('.switcher-mobile').height() + 10
			,	breakpoints = {
				'challenge' : $('#section-challenge').offset().top - ( hgt_topbar + hgt_m_switcher ),
				'complex' : $('#section-complex').offset().top - ( hgt_topbar + hgt_m_switcher ),
				'simple' : $('#section-simple').offset().top - ( hgt_topbar + hgt_m_switcher )
			}
			,	last_known_scroll_position = 0
			,	ticking = false;

			// console.info('Challenge: ' +breakpoints['challenge']);
			// console.info('Complex: ' +breakpoints['complex']);
			// console.info('Simple: ' +breakpoints['simple']);

			// console.info(hgt_topbar);
			// console.info(hgt_m_switcher);

			function optimizedScroll( y ){
				//console.log(y);
				if( y >= 0 && y <= breakpoints['complex'] ){
					highlight(false);
				}else if( y >= breakpoints['complex'] && y <= breakpoints['simple'] ){
					highlight('#switch-complex');
				}else if(y > breakpoints['simple']){
					highlight('#switch-simple');
				}

				window.app.wmbPlayBack(y);
			}

			function highlight( elem ){
				if( !elem ){
					$('#switcher-container, .switcher-mobile').each(function(){
						$(this).find('[data-switch]').removeClass('active-switch');
					});
					return;
				}

				$('#switcher-container, .switcher-mobile').each(function(){
					$(this).find(elem).addClass('active-switch').siblings().removeClass('active-switch');
				});
			}

			window.addEventListener('scroll', function(e){
				last_known_scroll_position = window.scrollY;

				if( !ticking ){
					window.requestAnimationFrame(function() {
						optimizedScroll(last_known_scroll_position);
						ticking = false;
					});
				}

				ticking = true;
			});

		}

	}
};

window.addEventListener('load', function(){
	this.app.initialize();
}, false);