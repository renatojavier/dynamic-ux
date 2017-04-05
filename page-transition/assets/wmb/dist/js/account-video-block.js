;(function($){
    'use strict';
    
    function USD_BTC(){
        this.init();
     }
    
    USD_BTC.prototype = {
        
        init : function(){
            this.onclick();
            this.underlineHack();
         },
        
        underlineHack : function(){
            $('.vid-block').each(function(){
                var block = $(this);

                $(this).find('.newline').each(function(){
                    var str_wdt = $(this).outerWidth();

                    $(this).css({
                        'width':( str_wdt + 2)+'px',
                        'display':'inline-block'
                     });
                });
            });
         },
        
        onclick : function(){
            
            $('.details-price').each(function(){
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
                                'border':'1px solid #ecb000',
                                color: '#fff'
                            });


                            i = 'btc';
                        }else{ // toggle to dollar pricing

                            self.children('section').eq(0).show();
                            self.children('section').eq(1).html('');

                            self.css({
                                'background-color':'transparent',
                                'border':'1px solid #363636',
                                color: '#bbb'
                            });

                            i = '$';
                         }

                     }

                });
            });
            return this;
         }
     };
    
    window.USD_BTC = USD_BTC;
})(jQuery);