document.addEventListener("DOMContentLoaded", function() {

	var lastScrollPosition = 0
	,	direction
	,	phomio_page = Barba.BaseView.extend({
			namespace: 'phomio',
			onEnterCompleted: function() {
				$.when(
					$.getScript('assets/phomio/js/jquery.color-2.1.2.min.js'),
					$.getScript('assets/phomio/js/jquery.ba-throttle-debounce-1.1.min.js'),
					$.getScript('assets/phomio/js/lureSelect.js'),
					$.getScript('assets/phomio/js/portfolio.js')
				)
				.done(function(response){
					console.info('PHOMIO_PAGE: scripts loaded');
				})
				.fail(function(){
					console.error('PHOMIO_PAGE: all or some scripts are not loaded');
				});
				
			}
		})
	,	wmb_page = Barba.BaseView.extend({
			namespace: 'wmb',
			onEnterCompleted: function() {
				$.when(
					$.getScript('assets/js/wmb.meta.js'),
					$.getScript('assets/wmb/dist/js/video.js')
				)
				.done(function(response){
					console.info('WMB_PAGE: scripts loaded');
				})
				.fail(function(){
					console.error('WMB_PAGE: all or some scripts are not loaded');
				});
				
			}
		})
	;

	phomio_page.init();
	wmb_page.init();

	Barba.Pjax.init();
    Barba.Prefetch.init();

    var customTransition = Barba.BaseTransition.extend({

    	start : function( self ){
    		self = this;
    		Promise
    		.all([ this.newContainerLoading, this.top() ])
    		.then( this.animate.bind(this) );
    	},

    	top : function( self ){
    		self = this;

    		var deferred = Barba.Utils.deferred();
    		// window.scrollTo(0, $(window).scrollTop() );
    		deferred.resolve();
    		return deferred.promise;
    	},

    	scrollTop: function() {
			var deferred = Barba.Utils.deferred();
			var obj = { y: window.pageYOffset };

			TweenLite.to(obj, 0.5, {
				y: 0,
				onUpdate: function() {
					if (obj.y === 0) {
						deferred.resolve();
					}

					window.scroll(0, obj.y);
				},
				onComplete: function() {
					deferred.resolve();
				}
			});

			return deferred.promise;
		},

    	animate : function( self, timeline, t ){
    		self = this;

    		timeline = new TimelineMax({
    			onStart : function(){
    				document.querySelector('html').setAttribute( 'data-portfolio', $(self.newContainer).find('[data-view]').data('view') );
    			},
    			onComplete : function(){
    				self.done();
    			}
    		});

    		t = 0.9 * 1;

    		timeline
    		.set( $(self.newContainer), {
    			xPercent : ( direction == 'move_to_left' ) ? -100 : 100,
    			autoAlpha: 1,
    			position: 'fixed',
                left: 0,
                top: 0,
                right: 0
    		})
    		.set( $(self.oldContainer), {
    			position: 'fixed',
                left: 0,
                top: -1 * window.scrollY,
                right: 0
    		})
    		.set( $(self.newContainer).find('#top-bar').find('.animate-cross-fade'), {
    			autoAlpha: 0
    		})
    		.set( $(self.oldContainer).find('#top-bar'), {
    			position: 'fixed',
    			top: ( $(window).width() >= 1000 || $('[data-device=mobile]').length ) ? $(self.oldContainer).offset().top * -1 : window.scrollY
    		})
    		.set( $(self.oldContainer).find('.switcher-mobile'), {
    			position: 'fixed',
    			top: ( $('[data-device=mobile]').length ) ? ( $(self.oldContainer).offset().top * -1 ) + $(self.oldContainer).find('#top-bar').height() : 'auto'
    		})
    		
    		/*-- page-content containers translate --*/
    		.to( $(self.oldContainer), t, {
    			xPercent : ( direction == 'move_to_left' ) ? 100 : -100,
    			ease: Expo.easeInOut
    		}, 0)
    		.to( $(self.newContainer), t, {
    			xPercent : 0,
    			ease: Expo.easeInOut,
    			onCompleteParams : ['{self}'],
    			onComplete : function( $this ){
    				window.scrollTo(0,0);
    				TweenLite.set($this['_targets'][0], {
    					clearProps: 'all'
    				});
    			}
    		}, 0)

    		/*-- outgoing topbar changes BG --*/
    		.to( $(self.oldContainer).find('#top-bar'), t - 0.2 , {
    			backgroundColor: $(self.newContainer).find('#top-bar').css('background-color')
    		}, 0)

    		/*-- cross fade top-bar elements --*/
    		.to( $(self.newContainer).find('#top-bar').find('.animate-cross-fade'), t, {
    			delay: 0.6,
    			autoAlpha: 1
    		}, 0)
			.to( $(self.oldContainer).find('#top-bar').find('.animate-cross-fade'), t, {
    			autoAlpha: 0
    		}, 0)

    		/*-- logo translation --*/
    		.to('.fe-arrow', t, {
    			delay: 0.3,
    			autoAlpha: ( direction == 'move_to_left') ? 0 : 1
    		}, 0)

    		;

    	},

    	loadApp : function( self ){ 
    		self = this;
    	}

    });

    Barba.Dispatcher
    .on('newPageReady', function(currentStatus, oldStatus, container) {
    	window.app.initialize();
		$(window).trigger('resize');
	});

    Barba.Dispatcher.on('transitionCompleted', function(currentStatus, oldStatus, container) {
    	window.app.initialize();
    });

    Barba.Dispatcher.on('initStateChange', function(currentStatus){
		
    });

    Barba.Dispatcher.on('linkClicked', function( html ) {
    	direction = ( ($(html).attr('href') ).match(/index/) ) ? 'move_to_left' : 'move_to_right';
    });

    Barba.Pjax.getTransition = function() {
        return customTransition;
    };

});