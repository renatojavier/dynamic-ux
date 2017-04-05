;(function($,a){
    'use strict';
    
    a = {
        
        init : function(){
            this.carousel.init();
            this.graph.init();
            this.price.init();
            this.util.separator();
            this.editPage.init();
        },
        
        util : {
            separator : function(){
                
                $(window).on('resize', function(){
                    
                    $('.separator-line').each(function(){
                        var w = $('body').outerWidth()
                        ,   o = $(this).parent().offset().left;
                        
                        $(this).css({
                            'width': w+'px',
                            'left' : -o+'px'
                        });
                    });
                    
                }).trigger('resize');
            }
        },
        
        carousel : {
            
            init : function(){
                this/*.row_width().carousel_control()*/.toggle()._underline();
                this.moveBlockLeft();
            },
            
            moveBlockLeft : function(){
                
                window.wmb.rAF();
                
                function _set(){
                    
                    $('#wp-row').find('.vid-row').each(function(){
                        
                        $(this).find('.slick-slide').eq(0).css({
                                    'padding-left' : $('.ftr-heading').offset().left + 'px'
                                });
                    });
                        
                    requestAnimationFrame(_set);
                }
                
                _set();
                
            },
            
            row_width : function(){
                
                $('#wp-row').find('.vid-row').each(function(i){
                    
                    var wdt = ($(this).find('.vid-block').outerWidth() + 44) * $(this).children('.vid-block').length;
                    $(this).css({ 'width' : wdt + 'px' });
                    
                });
                
                return this;
            },
            
            carousel_control : function(){
                
                var r = $('#wp-row').children('.vid-row').length
                ,   o = '<div class="wp-c-ctrl">';
                
                //--> build controls
                for(var i=0; i<r; i++){
                    o += '<div class="c-ctrl"><div data-dir="left"></div><div data-dir="right"></div></div>';
                 }
                
                o += '</div>';
                $('#wp-row').prepend(o);
                
                //--> position controls
                var ofs = $('#wp-row').find('.vid-row').eq(0).position().top - 20;
                $('#wp-row').find('.c-ctrl').eq(0).css({
                    'margin-top':ofs+'px'
                });
                
                return this;
            },
            
            toggle : function(){
                
                
               $(window).on('resize', function(){
                    
                    var vp = ($(this).outerWidth());

                    $('#wp-row').find('.vid-row').each(function(i){
                        
                        i = i + 1;
                        $(this).show();
                        
                        var obj = {
                                infinite : false,
                                slidesToShow :  3,
                                slidesToScroll :  3,
                                variableWidth: true,
                            };
                        
                        $(this).slick(obj);

                        // Controls
                        $(this).find('.slick-prev, .slick-next').html('');
                        $(this).find('.slick-prev, .slick-next').wrapAll('<div class="wp-c-ctrl"></div>');

                    });
                
                }).trigger('resize');
                

                return this;
            },
            
            _underline : function(){
                
                $('#wp-row').find('.vid-block').each(function(){
                    var block = $(this);
                    
                    $(this).find('.newline').each(function(){
                        var str_wdt = $(this).outerWidth();
                        
                        $(this).css({
                            'width' : (str_wdt + 2)+'px',
                            'display' : 'inline-block'
                         });
                    });
                });
                
                return this;
            }
        
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
                var w = Math.round(18 * v);
                return w;
            },
            
        },
        
        price : {
            init : function(){
                this.handle_click();
            },
            
            handle_click : function(){
                var _s = this;
                $('.price').each(function(){
                    var self = $(this)
                    ,   i = '$';
                    
                    self.on('mousedown', function(e){
                        
                        if(e.originalEvent){
                            
                            if(i === '$'){ // change to btc
                                var v = $(this).children('section').eq(0).html()
                                ,   val = v.split('$')[1]
                                
                                self.children('section').eq(0).hide();
                                self.children('section').eq(1).html('Ƀ'+(val / window.btc_rate).toFixed(8));
                                
                                
                                self.css({
                                    'background-color':'#ecb000',
                                    'border':'1px solid #ecb000'
                                });
                                
                                
                                i = 'btc';
                            }else{ // toggle to dollar pricing
                                
                                self.children('section').eq(0).show();
                                self.children('section').eq(1).html('');
                                
                                self.css({
                                    'background-color':'transparent',
                                    'border':'1px solid #363636'
                                });
                                
                                i = '$';
                             }
                            
                         }
                        
                    });
                });
                
                return this;
            }
        },
        
        editPage : {
            init : function(){
                this.editActive();
                this.subscriptionBtn();
             },
            
            subscriptionBtn : function(){
                var sbd = false;
                $('.subscribe').on('mousedown', function(){
                    
                    if(!sbd){
                        $(this).html('Subscribed').addClass('subscribed');
                        
                        sbd = true;
                     }else{
                        $(this).html('Subscribe').removeClass('subscribed');
                         
                        sbd = false;
                      }
                    return false;
                 }).on('click', function(){ return false; });
             },
            
            editActive : function(){
                var btn_edit = $('#btn-edit-artist-page')
                ,   isEdit = false
                
                ,   cap_str = $('#caption-str')
                ,   cap_lc = $('#caption-large-char')
                ,   lc = cap_str.html().charAt(0)
                ,   str = cap_str.html().substring(1)
                ;
                
                cap_str.html(str);
                cap_lc.html(lc);
                
                $('#btn-edit-artist-page').on('click', function(){
                    
                    if(!isEdit){
                        $(this).addClass('edit-active').removeClass('edit-not-active').html('Cancel Edit');
                        // show banner image edit ui
                        $('#banner-edit-ui').show();
                        // show featured image edit ui
                        $('#image-edit-ui').show();
                        // enable editable prop
                        $('.editable-field').each(function(){
                            $(this).attr('contenteditable','true').addClass('editable-enabled').removeClass('editable-disabled');
                         });
                        // show save banner
                        $('#save-banner').show();
                        
                        // joined caption divided strings
                        $('#caption-str').html( $('#caption-large-char').html() + $('#caption-str').html() );
                        $('#caption-large-char').addClass('sr-hidden');
                        
                        $('#caption-str').bind('keydown keyup', function(){
                            $('#caption-large-char').html($('#caption-str').html().charAt(0));
                         });
                        
                        isEdit = true;
                     }else{
                        $(this).addClass('edit-not-active').removeClass('edit-active').html('Edit Artist Page');
                        // hide banner image edit ui
                        $('#banner-edit-ui').hide();
                        // hide featured image edit ui
                        $('#image-edit-ui').hide(); 
                        // disable editable prop
                        $('.editable-field').each(function(){
                            $(this).attr('contenteditable','false').addClass('editable-disabled').removeClass('editable-enabled');
                         });
                        // hide save banner
                        $('#save-banner').hide();
                        
                        $('#caption-large-char').removeClass('sr-hidden');
                        $('#caption-str').html($('#caption-str').html().substring(1));
                        
                        isEdit = false;
                      }
                    
                    
                    return false;
                 });
             }
         }
        
    };
    
    window.addEventListener('load', function(){
        a.init();
        
        window.banner = {
            animate : function(id,delay){
                delay = delay || 0;
                var bannerAnimation = new TimelineMax()
                .to($('#'+id+'-banner'), 0.7, {
                    delay : delay,
                    y : '0%',
                    ease : Bounce.easeOut
                 });

                // banner dismissal
                $('#'+id+'-banner').find('.banner-dismiss').on('click', function(){
                       bannerAnimation.to($('#'+id+'-banner'), 0.3, {
                            y : '-100%',
                            ease : Expo.easeIn
                        });
                 });
             }
        }
    }, false);
    
})(jQuery,window.wmb.artistScript);