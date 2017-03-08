window.app = {
	device : null,

	initialize : function(){
		window.preload_flag = true;
		this.device_detection();
		this.switcher.initialize();
		this.loadMozCSS();
		this.counterFOUC();

		TweenLite.to(window, 2, {scrollTo:400});
	},

	counterFOUC : function(){
		var raf;

		function watch(){
			console.log('Monitoring...');

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

		if( this.device.phone() !== null )
			$('body').append('<link rel="stylesheet" id="stylesheet-mobile" type="text/css" href="assets/css/'+( $('html').data('portfolio') )+'-mobile.css">');
		return;
	},

	switcher : {

		initialize : function( self, pages ){
			self = this;
			pages = ['cc','wmb','phomio'];
			this.application();
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

			/*--
			 - scrollspy
			 --*/
			var controller_scrollspy = new ScrollMagic.Controller();

			new ScrollMagic.Scene({triggerElement: "#section-challenge", duration: $('#section-challenge').height(), offset: 170, reverse: true})
			.on("enter leave", switch_to_challenge)
			.addTo(controller_scrollspy);
		 	
		 	new ScrollMagic.Scene({triggerElement: "#section-complex", duration: $('#section-complex').height(), offset: 170, reverse: true})
			.on("enter leave", switch_to_complex)
			.addTo(controller_scrollspy);

			new ScrollMagic.Scene({triggerElement: "#section-simple", duration: $('#section-simple').height(), offset: 170, reverse: true})
			.on("enter leave", switch_to_simple)
			.addTo(controller_scrollspy);

			function switch_to_simple(){
				$('#switch-simple').addClass('active-switch').siblings().removeClass('active-switch');
				$('.switcher-mobile').find('#switch-simple').addClass('active-switch').siblings().removeClass('active-switch');
			}

			function switch_to_complex(){
				$('#switch-complex').addClass('active-switch').siblings().removeClass('active-switch');
				$('.switcher-mobile').find('#switch-complex').addClass('active-switch').siblings().removeClass('active-switch');

			}

			function switch_to_challenge(){
				$('[data-switch]').removeClass('active-switch');
				$('.switcher-mobile').find('[data-switch]').removeClass('active-switch');
			}			

		}
	}
};

window.addEventListener('load', function(){
	this.app.initialize();
}, false);