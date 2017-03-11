;(function($,ix){
    'use strict';
    
    // alias `a` for global variable holder under indexScript namespace
    var a = ix.var = {
        wp_slider : $('#wp-slider'), // slider: main wrapper
        fx_hgt : 400,
        hgt : 0, // slider: slide height with contraint
        bgY : 0, // slider: background image
        ns  : 3, // slider: slide count
        
        wp_content : $('#wp-content'), // carousel: main wrapper
        wp_graph : $('.graph'), // graph: wrapper
        wp_price : $('.price'), // price : main
    };
    
    ix = {
        init : function(){
            this.slider.init();
            this.carousel.init();
            this.graph.init();
            this.price.init();
        },
        
        slider : { // slider class
            
            init : function(){
                this.constraint().controls().toggle()/**/.auto();
             },
            
            constraint : function(){
                
                $(window).on('resize', function(){
                    
                    a.hgt = Math.round((a.fx_hgt * $(this).outerWidth()) / 1000);
                    a.bgY = Math.round(-1* ((a.hgt - a.fx_hgt) / 2));

                    if(a.hgt <= a.fx_hgt)
                        a.bgY = 0;

                    // slide centered background on smaller viewport than normal
                    a.wp_slider.find('.slide').each(function(){
                        $(this).css({
                            'background':'url('+$(this).attr('data-background')+') no-repeat center '+a.bgY+'px'
                        });
                    });
                    // wrapper height
                    (a.hgt < a.fx_hgt) ? a.wp_slider.css({'height':a.hgt+'px'}) : a.wp_slider.css({'height':a.fx_hgt+'px'});
                    
                    // per slide height
                    a.wp_slider.find('.slide').css({
                        'width':$(this).outerWidth()+'px',
                        'height':a.hgt+'px'
                    });
                    
                    // scroller width based from slide count
                    a.ns = a.wp_slider.find('.slide').length * 100;
                    a.wp_slider.children('.scroller').css({'width': a.ns+'%'});
                    
                }).trigger('resize');
                
                return this;
            },
            
            controls : function(){
                
                a.wp_slider.children('.scroller').after('<div class="wp-slider-ctrl"><div data-dir="left" class="slider-ctrl"></div> <div data-dir="right" class="slider-ctrl"></div></div>');
                
                return this;
            },
            
            toggle : function(){
                
                var wp_slide_ctrl = a.wp_slider.find('.wp-slider-ctrl')
                ,   slides = a.wp_slider.find('.slide')
                ,   self = this;
                
                
                wp_slide_ctrl.find('div').on('click', function(e){
                    
                    var i = $('.slider-ctrl').index(this);
                    clearInterval(window.wmb.ss.i);
                    clearTimeout(window.wmb.ss.o);
                    
                    if(i === 0){ // leftward
                        if(window.wmb.ss.c > 0){
                            window.wmb.ss.c-=1;
                        }else{
                            window.wmb.ss.c = slides.length - 1;
                         }
                     }
                    
                    if(i === 1){ // rightward
                        if(window.wmb.ss.c < (slides.length - 1)){
                            window.wmb.ss.c+=1;
                         }else{
                             window.wmb.ss.c = 0;
                          }
                     }
                    
                    slides.removeClass('opaque');
                    slides.eq(window.wmb.ss.c).addClass('opaque');
                    
                    window.wmb.ss.o = setTimeout(function(){
                        self.auto();
                    }, 500);
                    
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    e.preventDefault();
                    
                 });
                
                return this;
            },
            
            auto : function(){
                var slides = $('.slide');
                clearTimeout(window.wmb.ss.o);
                clearInterval(window.wmb.ss.i);
                
                window.wmb.ss.i = setInterval(function(){
                    
                    if(window.wmb.ss.c < slides.length - 1){
                        window.wmb.ss.c+=1;
                    }else{
                        window.wmb.ss.c = 0;   
                     }
                    
                    slides.removeClass('opaque');
                    slides.eq(window.wmb.ss.c).addClass('opaque');
                    
                }, 5000);
                
                return this;
                
            }
        },
        
        // featured videos presented on hovering carousel
        carousel : {
            
            init : function(){
                this/*.row_width().carousel_control()*/.toggle()._underline();
                //this.moveBlockLeft();
            },
            
            moveBlockLeft : function(){
                
                window.wmb.rAF();
                
                function _set(){
                    
                    $('#wp-content').find('.vid-row').each(function(){
                        var row = $(this);
                        
                        row.find('.slick-prev').click(function(){
                            row.find('.slick-slide').css({
                                'padding-left' : '0'
                            });
                        });
                        
                        row.find('.slick-active').eq(0).css({
                            'padding-left' : '20px'
                        });
                        
                        
                        
                    });
                    
                    requestAnimationFrame(_set);
                }
                
                _set();
                
            },
            
            row_width : function(){
                
                a.wp_content.find('.vid-row').each(function(i){
                    
                    var wdt = ($(this).find('.vid-block').outerWidth() + 44) * $(this).children('.vid-block').length;
                    $(this).css({ 'width' : wdt + 'px' });
                    
                });
                
                return this;
            },
            
            carousel_control : function(){
                
                var r = a.wp_content.children('.vid-row').length
                ,   o = '<div class="wp-c-ctrl">';
                
                //--> build controls
                for(var i=0; i<r; i++){
                    o += '<div class="c-ctrl"><div data-dir="left"></div><div data-dir="right"></div></div>';
                 }
                
                o += '</div>';
                a.wp_content.prepend(o);
                
                //--> position controls
                var ofs = a.wp_content.find('.vid-row').eq(0).position().top - 20;
                a.wp_content.find('.c-ctrl').eq(0).css({
                    'margin-top':ofs+'px'
                });
                
                return this;
            },
            
            toggle : function(){
                
                
               $(window).on('resize', function(){
                    
                    var vp = ($(this).outerWidth());

                    a.wp_content.find('.vid-row').each(function(i){
                        
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
                
                a.wp_content.find('.vid-block').each(function(){
                    var block = $(this);
                    
                    $(this).find('.newline').each(function(){
                        var str_wdt = $(this).outerWidth();
                        
                        $(this).css({
                            'width':( str_wdt + 2)+'px',
                            'display':'inline-block'
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
                
                a.wp_graph.each(function(){
                    $(this).append(o);
                 });
                
                return this;
            },
            
            calibrate : function(){
                var self = this;
                
                a.wp_graph.each(function(i){
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
                a.wp_price.each(function(){
                    var self = $(this)
                    ,   i = '$';
                    
                    self.on('mousedown', function(e){
                        
                        if(e.originalEvent){
                            
                            if(i === '$'){ // change to btc
                                var v = $(this).children('section').eq(0).html()
                                ,   val = v.split('$')[1]
                                
                                self.children('section').eq(0).hide();
                                self.children('section').eq(1).html('Ƀ'+(val / window.wmb.btc_rate).toFixed(8));
                                
                                
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
         }
        
    };
    
    window.addEventListener('load', function(){ ix.init(); }, false);
    
})( jQuery, window.wmb.indexScript );