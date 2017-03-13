;(function($,v){
    
    v = {
        
        init : function(){
            this.wallAnimation.init();
            this.manualSend.init();
            // this.userFeedback.init();
            // this.graph.init();
            // this.starRating.init();
        },
        
        //--> wallAnimation
        wallAnimation : {
            init : function(){
                this.resize();
            },
            
            resize : function(){
                var self = this;
                
                // play timelines
                self.animate();
                
                var rsc = 0;
                $(window).on('resize', function(){
                    if(rsc < 1){
                        self.animate('pause'); 
                     }
                    
                    rsc+=1;
                    
                 });
            },
            
            animate : function(pb){
                
                pb = pb || 'auto';
                
                var tmp_delay = 1
                ,   r = new TimelineMax({repeat: -1, delay: tmp_delay})
                ,   lift_off_offset = -1 * $('#main-video-cont').outerHeight()
                ,   lift_off_time = 0.5;
                
                window.wmb.playback = new TimelineMax({
                    onStart : startAnimation,
                    onStartParams : [window.onStart_wallAnimation],
                    onComplete : endAnimation,
                    onCompleteParams : [window.onEnd_wallAnimation],
                    delay: tmp_delay
                });

                var t = window.wmb.playback;
                
                r.to('.btc', 0.3, {
                        rotation : 420,
                        ease : Linear.easeNone
                    }, 'rotate').pause();

                t.to('.btc-y', 0.7, {
                        delay: 1.50,
                        x : 790,
                        ease : Quad.easeIn
                    }, 'translate')

                 .to('.wp-mask-clip', 0.6, {
                        delay: 1.53,
                        clip : "rect(0, 638px, 56px, 638px)",
                        ease : Quad.easeIn
                    }, 'translate')

                // .call(function(){
                // 	if( $('[data-device=mobile]').length )
                // 		document.getElementById('main-video').play();
                // }, [], null, 'video-start')
                // .add("video-start", "0.0")

                 .to('#main-video', lift_off_time, {
                 	// delay : ( $('[data-device=mobile]').length ) ? document.getElementById('main-video').duration - 1 : 0,
                    y : lift_off_offset,
                    autoAlpha : 0,
                    ease : Expo.easeOut
                 }, 'lift-off')

                 .to('#main-video-overlay', lift_off_time, {
                 	// delay : ( $('[data-device=mobile]').length ) ? document.getElementById('main-video').duration - 1 : 0,
                    y : lift_off_offset,
                     autoAlpha : 0,
                    ease : Expo.easeOut
                 }, 'lift-off').pause();

                
                function startAnimation(cb){
                    // text content and color
                    $('#trn-msg').addClass('trn-msg-fin');
                    $('#trn-msg').children().eq(0).html('Transaction Complete');
                    // check gif icon
                    var check_gif = $('#trn-msg').children().eq(1);
                    check_gif.css({'opacity' : '1'});
                    setTimeout(function(){
                        check_gif.attr('src','assets/wmb/images/check.gif');
                    }, 0);
                    // change arrow
                    $('#wp-arrow').addClass('wp-arrow arrow-fin');

                    // console.log('Coin animation started...');
                    
                    if(typeof cb === 'function'){
                        cb();
                     }
                }
                
                function endAnimation(cb){
                    // initiate stars animation and other prop
                    // setTimeout(function(){
                    //     v.starRating.init();
                    //  }, 10000);
                    
                    if(typeof cb === 'function'){
                        cb();
                     }
                 }
                
                if(pb.match(/pause/)){
                    r.pause();
                    t.pause();
                 }else if(pb.match(/resume/)){
                    r.resume();  
                    t.resume();  
                  }else{
                  	if( false ){ //$('[data-device=desktop]').length ){
	                    r.play();
	                    t.play();
	                }
                   }
            }
            
            
        },
        
        starRating : {
            
            init : function(){
                var self = this;
                this.createStars(5, this.animate());
            },
            
            animate : function(cb){
                var self = this;
                
                $('.stars-marquee').attr('src', 'images/stars_marquee.gif').show();
                $('.stars-marquee').attr('src', '');
                $('.stars-marquee').attr('src', 'images/stars_marquee.gif?'+new Date().getTime());
                
                var tm = new TimelineMax();
                tm.to('.stars-metal', 1.9, {
                    y : -58,
                    onComplete:function(){
                        $('.stars-mask-metal').css({ 'z-index':'1'});
                        $('.stars-bg').css({ 'z-index':'2'});
                        
                        self.hover();
                    }
                });
                
                
                return this;
            },
            
            createStars : function(n, cb){
                var o = ''
                ,   i = 0;
                
                while(i<n){
                    o+='<div class="star"></div>';
                    i++;
                 }
                
                $('.stars-bg').html(o);
                
                if(typeof cb === 'function')
                    cb();
            },
            
            hover : function(){
                var star = $('.stars-bg').find('.star');
                
                star.each(function(i){
                    $(this).on('mouseenter', function(){
                        
                        $(this).addClass('star-shown');
                        $(this).siblings().removeClass('star-shown');
                        $(this).prevAll().addClass('star-shown');
                        
                    }).on('mouseout', function(){
                        
                        $(this).removeClass('star-shown');
                        $(this).siblings().removeClass('star-shown');
                        
                     }).on('click', function(){
                        
                        $(this).addClass('star-selected');
                        $(this).siblings().removeClass('star-selected');
                        $(this).prevAll().addClass('star-selected');
                        
                        if($('.star-rating-popup').length)
                            $('.star-rating-popup').remove();
                                                 
                        $('.star-rating').append('<div class="star-rating-popup">Thanks for rating!</div>');

                        var t = new TimelineMax();

                        t.from('.star-rating-popup', 0.4, {
                            y : '100%',
                            autoAlpha : 0,
                            ease : Expo.easeOut
                        }).to('.star-rating-popup', 0.5, {
                            autoAlpha : 0,
                            delay : 5
                         });

                     });
                    
                });
                
                
                return this;
            }
        },
        
        manualSend : {
            
            init : function(){
                this.handleClick().selectVal().textUnselectable();
            },
            
            selectVal : function(){
                
                $('#hash-copy, #bit-copy').find('input').on('click', function(){
                    $(this).select();
                    return false;
                 });
                
                return this;
            },
            
            textUnselectable : function(){
                $('.copy-prop-txt').each(function(){
                    $(this).on('mousedown', function(){
                        return false;
                    });
                });
                return this;
            },
            
            handleClick : function(){
                var tl_swap = new TimelineMax({delay : 0.9});
                
                $('.cta-btn').eq(0).on('click', function(){
                    
                    var wp_cta_btn = $(this).parent();
                    tl_swap
                    .to(wp_cta_btn, 0.3, {
                        y : '100%',
                        ease : Expo.easeOut,
                    }, 'swap')
                    .to($('.wp-copy'), 0.3, {
                        y : 0,
                        ease : Expo.easeOut
                    }, 'swap');
                    
                    return false;
                });
                
                return this;
            }
        },
        
        /*-----------------------------------------------*
         | 
         | Please be advised that a server support 
         | for user auth on this part is required.
         |------------------------------------------------
         |
         | This client-side application checks the 
         | data- attribute of .wp-vid-comment, when
         | its value is `0` it signifies that it will
         | show a login link instead of allowing a post
         | comment; otherwise when it is `1` this allows 
         | the user to enter texts on the editable 
         | textarea.
         | 
         | The cons here is the intruder can directly edit
         | the data- attribute then start sending feedbacks.
         | So your support on the server to keep track whether
         | that flagship is valid or not.
         |
         *--------------------------------------------------*/
        
        userFeedback : {
            init : function(){
                if($('.wp-vid-comment').attr('data-prop-load').match(/manual/)){
                    this.track(false); 
                 }else{
                     $('.wp-vid-comment').removeAttr('data-prop-load');
                  }
            },
            
            // @param ,bool iteration 
            // if true conducts 60fps iterative checking
            // otherwise once, onload
            
            track : function(p){
                p = p || false;
                var self = this;
                
                if(p){
                    window.wmb.rAF();
                    function x(){
                        self.prepare();
                        requestAnimationFrame(x);
                     }
                    x();
                    
                }else
                    self.prepare();
                
                return this;
             },
            
            prepare : function(){
                
                if( $('#main-video-details').find('[data-auth=1]').length ){
                    $('[data-auth]').find('a').remove();
                     $('[data-auth]').html('<textarea placeholder="Leave a comment" rows="5"></textarea>');
                    
                }else{
                    $('[data-auth]').find('textarea').remove();
                     $('[data-auth]').html('<a href="#">Sign in to Post Comments</a>');
                 }
                
                return this;
            },
            
        },
        
        graph : {
            init : function(){
                this.build(5).calibrate();
            },
                
            build : function(n){
                var o = '';
                
                for(var i=0; i<n; i++){
                    o+='<div class="graph-bar"></div>';
                 }
                
                $('.graph').each(function(){
                    $(this).append(o);
                 });
                
                return this;
            },
            
            calibrate : function(){
                var self = this;
                
                $('.graph').each(function(i){
                    var s = $(this).attr('data-stat')
                    ,   ar = JSON.parse("["+s+"]")
                    ,   gfc = '#276327'
                    ,   idx = ar.indexOf(Math.max.apply(Math, ar));
                    
                    for(var key in ar){
                        var c = self.constraint(ar[key]);
                        $(this).find('.graph-bar').eq(key).css({
                            'width':c+'px',
                         });
                     }
                    
                    switch(idx){
                        case 0:
                            gfc = '#00cc33';
                            break;
                        case 1:
                            gfc = '#669933';
                            break;
                        case 2:
                            gfc = '#ffcc00';
                            break;
                        case 3:
                            gfc = '#993300';
                            break;
                        case 4:
                            gfc = '#990000';
                            break;
                     }
                    
                    $(this).find('.graph-bar').css({
                        'background-color': gfc
                     });
                });
                
                return this;
            },
            
            constraint : function(v){
                var w = Math.round(55 * v);
                return w;
            },
            
        }
        
    };
    
    window.addEventListener('load', function(){ v.init(); }, false);

})(jQuery, window.wmb.videoScript);