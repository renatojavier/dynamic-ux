/*-------------------------------*
 | WatchMyBit object namespaces  |
 *-------------------------------*
 | Please do not write same name |
 | instance for these :          |
 *-------------------------------*/

/*  Object & function definitions (global) are instantiated before
 *  window event binding occurs, these definitions must be
 *  accessible independently and globally unbounded by any event 
 *  handlers on the first window cache.
 
 *  Global definitions and namespacing are more helpful when the project 
 *  scope has expanded.
 
 *  First we ensure the functions and modules used and written are
 *  not prone to other library override. Next, we make presets and 
 *  reusable definitions avoiding cluttered usages & non-effecient 
 *  memory reservations.
 */

if(!window.wmb){ // check : namespace conflict with other library
    
    // Main namespace definition, [global]
    window.wmb = window.wmb || {

        indexScript : {}, // index.js
        videoScript : {}, // video.js
        splits_addresses : {}, // splits-addresses switcher
        thumbnail_select : {}, // thumbnail selector
        banner : {},

        liveSearch  : {}, // Livesearch, [global]
        modal       : {}, // Modals, [global]

        // default search data, this value might be reset from server response
        searchData   : [ 
                        'how to tie a tie',
                        'how to ask a girl out',
                        'how to sell a bitcoin online',
                        'how to start a business',
                        'how to cook a hamburger',
                        'how to design great UX'
                      ],

        sbx_left    : 0, // setter, search box dropdown runtime left offset in reference to its parent element, [global]
        sbx_width   : 0, // setter, search box dropdown runtime width in reference to its parent element, [global]

        btc_rate    : 240, // default BTC rate

        ss          : { // setter, slideshow parameters
                         c  :   0,
                         t  :   0,
                         i  :   '',
                         o  :   ''
                      },

        // Polyfill requestAnimationFrame by Paul Irish, [global],
        // 60fps iterator, useful for animations & run-time applications
        rAF         : function(){ 
                        var lastTime = 0
                        ,   vendors = ['ms', 'moz', 'webkit', 'o'];

                        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x){
                            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
                            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                                       || window[vendors[x]+'CancelRequestAnimationFrame'];
                        }

                        if(!window.requestAnimationFrame)
                            window.requestAnimationFrame = function(callback, element){
                                var currTime = new Date().getTime();
                                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                                var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
                                  timeToCall);
                                lastTime = currTime + timeToCall;
                                return id;
                            };

                        if(!window.cancelAnimationFrame)
                            window.cancelAnimationFrame = function(id){
                                clearTimeout(id);
                            };
                       }
    }; // EO definition
} else {
    alert('Internal error!');
    document.body.removeChild('*');
 }

/*  Executing the following core modules upon window `load` event.
 *  We could use DOMContenLoad handler like `ready`, but its more 
 *  efficient if the other files beside from DOM contents (e.g. images, videos, etc.)
 *  are loaded on the window.
 */

window.addEventListener(
    'load', //--> execute its callback function unless window is fully loaded
    function(){
    
    // global search app
    ;(function($,s){
        'use strict';

        s = {

            init : function(){
                if($('#searchbox').length){
                    this.api();
                    this.sbxWidth();
                 }
            },

            api : function(){
                $('#searchbox').autocomplete({
                    source : window.wmb.searchData,
                 });
                return this;
            },


            sbxWidth : function(){
                var self = this; 

                $(window).on('resize', function(e){

                    $('#searchbox').css('webkit-transform', $('#searchbox').css('webkit-transform'));

                    var w = $(this).outerWidth() - ($('#logo').outerWidth() + $('.header-btn-group').outerWidth() + 40);

                    $('.wp-sbx').css({ 'width' : w+'px', 'display' : 'block' });

                    if($(window).outerWidth() < 1001)
                        $('.wp-sbx').css({ 'width' : '372px' });

                    if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1)
                        window.wmb.sbx_width = $('.wp-sbx').innerWidth() - 50;
                     else
                        window.wmb.sbx_width = $('.wp-sbx').innerWidth() - 47;
                    window.wmb.sbx_left = $('.wp-sbx').offset().left + 6;

                }).trigger('resize');

                window.wmb.rAF();

                function iterator(){
                    if($('.ui-autocomplete').is(':visible')){

                        $('.ui-autocomplete').css({
                            'width': window.wmb.sbx_width+'px',
                            'left': window.wmb.sbx_left+'px'
                        });
                     }
                    requestAnimationFrame(iterator);
                 }

                iterator();
            }

        };
        
        // instantiate the livesearch processes
        s.init();

    })(jQuery, window.wmb.liveSearch)

    +(function($){ // [!] You'll notice the plus sign `+` before `(function(){`, it merges (casts) this function with other functions
                   // while maintaining its own namespace rule. In this case its only `jQuery` with an alias of `$`.
        'use strict';

        function FooterUnderlineMOZ(){
            this.fix();
         }

        FooterUnderlineMOZ.prototype.fix = function(){
            var wp_footer = $('#wp-footer');

            wp_footer.find('.col-links').find('.link-holder').each(function(i){
                var w = $(this).find('.underline').children().outerWidth();

                $(this).find('.underline').css({ 'width':w+'px' });
             });
         };
        
        // instantiate the footer underline hack for MOZ and other non-webkit
        var f = new FooterUnderlineMOZ;
        f.fix();

    })(jQuery)

    +(function($,m){
        'use strict';

        m.init = function(){
            m.login.init();
        };

        m.login = {
            init : function(){
                if($('.wp-modal').length)
                    this.toggle();
             },

            toggle : function(cb){

                var self = this
                ,   tm = new TimelineMax()
                ,   tms = new TimelineMax()
                ,   wp_modal = $('.wp-modal');

                window.wmb.modal._isActive = false;

                tm
                .to(wp_modal, 0.3, {
                    autoAlpha : 1,
                    ease : Linear.easeNone
                }, 'slide-in')
                .from(wp_modal, 0.2, {
                    marginTop : '100%',
                    ease : Linear.easeNone
                }, 'slide-in').pause();

                $('.index-button-login').on('click', function(){

                    if(window.wmb.modal._isActive) // closing
                        self.toggle.off();
                    else                           // opening
                        self.toggle.on();

                    return false;
                 });

                $(document).on('keydown', function(e){
                    if(e.keyCode === 27 || e.which === 27){
                       self.toggle.off();
                     }
                    
                 });

                $('div').not('.wp-modal, .modal').on('click', function(e){
                   self.toggle.off(); 
                });

                self.toggle.off = function(){
                    tm.reverse();
                    window.wmb.modal._isActive = false;
                };

                self.toggle.on = function(){
                    tm.play();
                    tms.progress(0).pause();
                    window.wmb.modal._isActive = true;
                };

                // call login - create switcher
                self.switcher(tms);

                return this;
            },

            switcher : function(tm){
                tm
                .to('.modal-login' , 0.5, {
                    x : '-100%',
                    rotationY : 45,
                    autoAlpha : 0,
                    z : -500,
                    ease : Expo.easeInOut
                })

                .from('.modal-create', 0.5, {
                    x : '100%',
                    rotationY : -45,
                    autoAlpha : 0,
                    z : -500,
                    ease : Expo.easeInOut
                }, 0.0).pause();

                $('.modal').each(function(e){
                    $(this).find('.modal-switcher').on('click', function(){
                        if(e === 1)
                            tm.play();
                        else
                            tm.reverse();

                        return false;
                    });
                });

                return this;
            },

        };

        // instantiate modal processes
        m.init();
    })(jQuery,window.wmb.modal)
    +(function(){
        'use strict';
        
        window.wmb.banner = {
            
            // build dom str type, bool dismissable
            build : function(id, bool, cb){
                var markup = '';
                
                (!$('#wp-banner').length) ? markup = '<div id="wp-banner">' : null;
                markup += '<div id="'+id+'-banner" class="banner">';
                markup += '<div class="inner">';
                markup += '<section class="banner-content"></section>';
                (bool) ? markup += '<span class="banner-dismiss"></span>' : null;
                markup += '</div><!--/.inner-->';
                markup += '</div><!--/.banner-->';
                (!$('#wp-banner').length) ? markup += '</div><!--/#wp-banner-->' : null;
                    
                if(!$('#wp-banner').length){
                    $('#header-cont').after(markup);
                 }else{
                    $('#wp-banner').prepend(markup);
                  }
                
                // ensure markup was totally executed
                setTimeout(function(){
                    if(typeof cb === 'function') cb();
                 }, 1);
             },
            
            animate : function(el,delay){
                if(el.length){
                    delay = delay || 0;
                    var bannerAnimation = new TimelineMax()
                    .to(el, 0.7, {
                        delay : delay,
                        y : '0%',
                        ease : Bounce.easeOut
                     });

                    // banner dismissal
                    el.find('.banner-dismiss').on('click', function(){
                           bannerAnimation.to(el, 0.3, {
                                y : '-100%',
                                ease : Expo.easeIn
                            });
                     });
                 }
             },
            
            defaults : function(param){
                var def = {
                        content : 'Lorem ip-zoom',
                        animation : {
                            delay : 0
                         },
                        dismissable : false
                    }
                ,   conf = $.extend({},def,param);
                return conf;
            },
            
            error : function(param){
                var conf = this.defaults(param);
                // build banner
                this.build('error', conf.dismissable, function(){
                    $('#error-banner').find('.banner-content').html(conf.content);
                 });
             },
            
            success : function(param){
                var conf = this.defaults(param);
                // build banner
                this.build('success', conf.dismissable, function(){
                    $('#success-banner').find('.banner-content').html(conf.content);
                 });
             },
            
            save : function(param){
                var conf = this.defaults(param);
                this.build('save', conf.dismissable, function(){
                    // contents
                    $('#save-banner').find('.banner-content').html(conf.content);
                 });
             },
            
            editArtistPage : function(param){
                var conf = this.defaults(param);
                this.build('edit-artist-page', conf.dismissable, function(){
                    // contents
                    $('#edit-artist-page-banner').find('.banner-content').html(conf.content);
                 });
             }
        };
        
        // create error banner
        // provide contents @ content properties
        window.wmb.banner.error({
            content: 'Donec luctus metus enim, a portitor tortor tincidunt in. Aliquam id risus orci. Duis mattis erat neque, non suscipit magna sollicitudin vel.',
            dismissable : true
         });
        
        // create success banner
        // provide contents @ content properties
        window.wmb.banner.success({
            content: 'Donec luctus metus enim, a portitor tortor tincidunt in. Aliquam id risus orci. Duis mattis erat neque, non suscipit magna sollicitudin vel.',
            dismissable : true
         });
        
        window.wmb.banner.save({
            content: '<a href="#href" id="btn-save-banner">Save</a>'
         });
        
        /*-----------------------------------------------------------------------------------*
         | Banner markup is created by JS, you might call them and provide contents inside it.
         | For animated banners they are intially hidden so in order to show them animated,
         | use the line below.
         *-----------------------------------------------------------------------------------*/
        window.wmb.banner.animate($('#error-banner')); // error banner
        // window.wmb.banner.animate($('#success-banner')); // success banner
        
    })();
    
}, false); //[-->EOF]