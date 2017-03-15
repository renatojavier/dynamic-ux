window.app = {
	wmbPlaybackOnce : true,

	initialize : function(){
		window.app.wmbPlaybackOnce = true;
		window.preload_flag = true;

		this.loadMozCSS();
		this.counterFOUC();

		this.switcher.initialize();
		this.wmbStartMainVideo();
		// this.wmbPlayBackIcon();

		// if( window.__device.phone() !== null ) TweenLite.to(window, 0.01, { scrollTo: 0 });
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
				//}, 150 );

				window.cancelAnimationFrame(raf);
			}
		}
		watch();	
		
	},

	loadMozCSS : function(){
		if( window.__device.phone() === null )
			$('body').append('<link rel="stylesheet" type="text/css" href="assets/css/moz.css">');
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
			,	hgt_m_switcher = ( window.__device.phone() === null ) ? 0 : $('.switcher-mobile').height() + 10
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
}, false );