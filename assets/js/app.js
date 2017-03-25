window.app = {
	wmbPlaybackOnce : true,
	ua : window.navigator.userAgent,

	initialize : function(){
		window.app.wmbPlaybackOnce = true;
		window.preload_flag = true;

		this.loadMozCSS();
		this.counterFOUC();

		this.wmbStartMainVideo();

		this.responsivePolyfill.init();
		this.switcher.initialize();

		this.disablePinchZooming();
	},

	disablePinchZooming : function( hammertime ){
		hammertime = new Hammer(document.body, { preventDefault : true }).get('pinch').set({ enable: false });
	},

	responsivePolyfill : {

		breakpoint : {
			mobile : 425,
			tablet : 768
		},
		viewport : 320,
		vw : $( window ).width(),
		scale : 1,
		watch :null,

		init : function(self){
			self = this;

			this.resizeHandler();
			this.resizeHandlerTablet();

			window.addEventListener( 'resize', function(){
				self.resizeHandler();
				self.resizeHandlerTablet();
			}, false );
		},

		resizeHandlerTablet : function( self, viewport ){
			self = this;
			viewport = 1000;

			if( $('[data-device=mobile]').length || $(window).width() >= viewport){
				TweenLite.set('html', {
					css : { zoom : 1 }
				});
				return;
			}

			self.scale = $(window).width() / viewport;

			TweenLite.set('html', {
				css : { zoom : self.scale }
			});
		},

		resizeHandler : function( self ){

			if( window.__device.phone() !== null ) return;
			self = this;

			self.vw = $( window ).width();
			self.viewport = ( self.vw <= self.breakpoint['mobile'] ) ? 320 : 1024;
			self.scale = (self.vw >= self.viewport) ? self.vw / self.viewport : 1;

			var offset_a = 0;

			if( self.vw <= self.breakpoint['mobile'] ){

				document.querySelector('html').setAttribute('data-device', 'mobile');
				document.querySelector('html').setAttribute('data-responsive', '1');

				offset_a = ( $( window ).width() * 50 ) / 320;
				offset_b = ( $( window ).width() * 112 ) / 320;

				TweenLite.set('#top-bar', {
					scale: self.scale,
					z : 0
				});

				TweenLite.set('.switcher-mobile', {
					scale: self.scale,
					top: offset_a,
					z : 0
				});

				TweenLite.set('#viewport', {
					scale: self.scale,
					marginTop : ( $('[data-portfolio=index]').length ) ? offset_a : 'auto',
					z : 0
				});

				TweenLite.set('#page-content', {
					marginTop : ( ! $('[data-portfolio=index]').length ) ? offset_b : 'auto',
				});				
					
			}else{
				document.querySelector('html').setAttribute('data-device', 'desktop');
				document.querySelector('html').setAttribute('data-responsive', '0');
				
				TweenLite.set('#top-bar', {
					scale : 1
				});

				TweenLite.set('.switcher-mobile', {
					scale : 1,
					top: 0
				});

				TweenLite.set('#viewport', {
					scale : 1
				});

				TweenLite.set('#page-content', {
					marginTop : ( ! $('[data-portfolio=index]').length ) ? 112 : 'auto',
				});

			}
			
		}

	},

	wmbPlayBackIcon : function(){
		if( !$('[data-portfolio=wmb]').length || !$('[data-device=mobile]').length ) return;

		$('#main-video-preview').on('click', function(){
			document.getElementById('main-video-preview').play();
		});

		return;

		document.getElementById('main-video-preview')
		.addEventListener('playing', function(){
			document.getElementById('alt-video-play').style.display = 'none';
			document.getElementById('alt-video-pause').style.cssText = 'display: block; opacity: 1';

			setTimeout(function(){
				document.getElementById('alt-video-pause').style.opacity = '0.2';
			}, 700);
		}, false );

		document.getElementById('main-video-preview')
		.addEventListener('pause', function(){
			document.getElementById('alt-video-play').style.cssText = 'display: block;';
			document.getElementById('alt-video-pause').style.cssText = 'display: none; opacity: 1';

		}, false );

		document.getElementById('alt-video-play').addEventListener('click', function(){
			document.getElementById('main-video-preview').play();
		}, false );

		document.getElementById('alt-video-pause').addEventListener('click', function(){
			document.getElementById('main-video-preview').pause();
		}, false );

	},

	wmbStartMainVideo : function(){
		if( !$('[data-portfolio=wmb]').length ) return;
		document.getElementById('main-video-preview').pause();
		document.getElementById('main-video').pause();

		

		window.onEnd_wallAnimation = function(){
			if( $('[data-os=ios]').length ){
				// document.getElementById('alt-video-play').style.display = 'block';
			}

			if( $('[data-device=mobile]').length ) return;

			console.log('Play next preview.mp4 on desktop...');
			document.getElementById('main-video-preview').play();
		};
	},

	wmbPlayBack : function( scrollPosition, begin ){
		if( !$('[data-portfolio=wmb]').length ) return;

		begin = ( $('#main-video').offset().top + $('.switcher-mobile').height() + 200 ) - ( ( $('[data-os=ios]').length ) ? $(window).outerHeight() : window.outerHeight );
		

		if( scrollPosition >= begin && window.app.wmbPlaybackOnce ){
			console.log( 'Begin aninmation...' );

			window.wmb.playback.play();
			window.wmb.bitCoinSprite.play();
			document.getElementById('main-video').play();

			window.app.wmbPlaybackOnce = false;
		}

	},

	counterFOUC : function(){
		var raf;

		function watch(){
			raf = window.requestAnimationFrame(watch);

			if( $('html').data('device') === 'desktop' || $('html').data('device') === 'mobile' ){
				//window.setTimeout(function(){
				document.body.style.display = 'block';
				// window.app.switcher.onClick();
				// window.app.switcher.scrollspy();
				//}, 150 );

				window.cancelAnimationFrame(raf);
			}
		}
		watch();	
		
	},

	loadMozCSS : function(){
		if( window.__device.phone() === null )
			$('head').append('<link rel="stylesheet" type="text/css" href="assets/css/moz.css">');
	},

	/*--
	 - global properties
	 --*/
	cal : 1,
	hgt_topbar : 0,
	hgt_m_switcher : 0,
	breakpoints : new Array,
	manualScroll : true,

	switcher : {

		initialize : function(){
			this.scrollspy();
			this.onClick();
		},

		/*--
		 - issue instant down state on click:
		 - onClick vs scroll watch
		 --*/
		onClick : function( self ){
			self = this;

			$('.switcher').each(function(){

				$(this).find( '[data-switch]' )
				.on('click', function(){
					
					var top = window.app.breakpoints[ $(this).data('switch') ]; //$( '#section-' + $(this).data('switch') ).offset().top - ( ( window.app.hgt_topbar * window.app.cal ) + ( window.app.hgt_m_switcher * window.app.cal ) );

					window.app.manualScroll = false;
					$(this).addClass('active-switch').siblings().removeClass('active-switch');

					window.scroll({ top: top, left: 0, behavior: 'smooth' });

					return false;
				});
				
			});
			
		},

		/*--
		 - module dropped
		 --*/
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

		scrollspy : function(self){
			self = this;

			if( ! $('[data-switch]').length ) return;

			var ticking = false
			,	last_known_scroll_position = 0;

			$(window).on('resize', function(){

				window.app.cal = ( $('[data-responsive=1]').length ) ? 1 / ( window.app.responsivePolyfill.scale - ( window.app.responsivePolyfill.scale * 0.5 ) ) : 1;
				window.app.hgt_topbar = $('#top-bar').height() + 1;
				window.app.hgt_m_switcher = ( window.__device.phone() === null ) ? 0 : $('.switcher-mobile').height() + 10;

				window.app.breakpoints['challenge'] = ( $('#section-challenge').offset().top - ( ( window.app.hgt_topbar * window.app.cal ) + ( window.app.hgt_m_switcher * window.app.cal ) ) );
				window.app.breakpoints['complex'] = ( $('#section-complex').offset().top - ( ( window.app.hgt_topbar * window.app.cal ) + ( window.app.hgt_m_switcher * window.app.cal ) ) );
				window.app.breakpoints['simple'] = ( $('#section-simple').offset().top - ( ( window.app.hgt_topbar * window.app.cal ) + ( window.app.hgt_m_switcher * window.app.cal ) ) );

				return false;
			}).trigger('resize');

			function optimizedScroll( y ){
				if( ! window.app.manualScroll ) return;

				if( y >= 0 && y <= window.app.breakpoints['complex'] ){
					highlight(false);
				}else if( y >= window.app.breakpoints['complex'] && y <= window.app.breakpoints['simple'] ){
					highlight('#switch-complex');
				}else if(y > window.app.breakpoints['simple']){
					highlight('#switch-simple');
				}

				// self.logger();
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

			$(window).scroll(function(e, w){
				last_known_scroll_position = window.scrollY + ( 10 * window.app.cal );

				if( !ticking ){
					window.requestAnimationFrame(function() {
						optimizedScroll(last_known_scroll_position);
						ticking = false;
					});
				}

				window.clearTimeout( $.data( this, "scrollCheck" ) );

    			$.data( this, "scrollCheck", window.setTimeout(function(){
    				if( ! window.app.manualScroll ){
    					window.app.manualScroll = true;
    				}

    			}, 250) );

    			ticking = true;
			});

		},

		logger : function(){
			console.info('Challenge: ' + window.app.breakpoints['challenge']);
			console.info('Complex: ' + window.app.breakpoints['complex']);
			console.info('Simple: ' + window.app.breakpoints['simple']);

			console.info(window.app.hgt_topbar);
			console.info(window.app.hgt_m_switcher);
			console.info(window.app.cal);
		}

	}
};

window.addEventListener('load', function(){
	this.app.initialize();
}, false );