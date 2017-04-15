;(function($, _){  
    'use strict';
    
    _ = {
        init : function(){
            this.event();
        },
        
        event : function(){
            $('#wp-thumb').find('span').each(function(i){
                
                $(this).on('click', function(){
                    
                    if(!$(this).hasClass('active-thumb')){
                        $(this).addClass('active-thumb').siblings().removeClass('active-thumb');
                     }
                        
                });
                
             });
            
            return this;
         }
    }
    
    window.addEventListener('load', _.init(), false);
})(jQuery, window.wmb.thumbnail_select);