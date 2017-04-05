;(function($, _){  
    'use strict';
    
    _ = {
        init : function(){
            this.event().addSplitAddress().addAddress();
        },
        
        event : function(){
            $('.segmented-ctrl').find('.label').each(function(i){
                if(i == 1) // ensure the addresses contents is hidden onload
                    $('.sg-content').eq(i).hide();
                 
                $(this).on('click', function(){
                    var id = $(this).attr('data-id');
                    
                    $('.sg-content').eq(id).show().siblings().hide();
                 });
             });
            
            return this;
         },
        
        addSplitAddress : function(){
            $('#add-split-address').on('click', function(){
                var last = $('.split-address').length + 1;
                $('#wp-split-address').append('<div class="split-address"><span class="sa-index">'+last+'</span><div class="dropdown-caret"></div><select style="margin-left: 3px;" class="sa-select"><option label="Split"></option></select><input style="margin-left: 23px;" class="sa-percentage" type="text" placeholder="Percentage"><span class="sa-psign" style="margin-left: 38px;">%</span><div id="sa-pie-2" class="sa-pie"></div></div>');
                
             });
            
            return this;
         },
        
        addAddress : function(){
            $('#add-address').on('click', function(){
                var last = $('.address-block').length + 1;
                
                $('#wp-address-block').append('<div id="address-'+last+'" class="address-block"> <span class="ab-index">'+last+'</span> <input class="ab-name" type="text" placeholder="Name"> <input class="ab-address" type="text" placeholder="Address"> <span class="ab-delete-icon"></span>');
            });
            
            
            
            return this;
        }
    }
    
    window.addEventListener('load', _.init(), false);
})(jQuery, window.wmb.splits_addresses);