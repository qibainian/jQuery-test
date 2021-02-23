$(function(){
    //全选 全不选功能模块
    $('.checkall').change(function(){
        $('.j-checkbox,.checkall').prop('checked',$(this).prop('checked'));
        if($(this).prop('checked')){
            $('.cart-item').addClass('check-cart-item');
        }else{
            $('.cart-item').removeClass('check-cart-item');
        }
    })
    //3个小复选框都选中时，全选框也需为选中状态，反之不为选中状态
    $('.j-checkbox').change(function(){
        //console.log($('.j-checkbox:checked').length)  打印小复选框的选中个数
        if($('.j-checkbox:checked').length === $('.j-checkbox').length){
            $('.checkall').prop('checked',true);
        }else{
            $('.checkall').prop('checked',false);
        }
        if($(this).prop('checked')){
            $(this).parents('.cart-item').addClass('check-cart-item');
        }else{
            $(this).parents('.cart-item').removeClass('check-cart-item');
        }
    })
    //增减商品数量模块
    $('.increment').click(function(){ 
        var n = $(this).siblings('.itxt').val();
        n++;
        $(this).siblings('.itxt').val(n);
        //修改商品小记模块
        var p = $(this).parents('.p-num').siblings('.p-price').html();
        p = p.substr(1);
        var price = (p * n).toFixed(2);
        $(this).parents('.p-num').siblings('.p-sum').html('￥'+price); 
        getSum();
    })
    $('.decrement').click(function(){ 
        var n = $(this).siblings('.itxt').val();
        if(n == 1){
            return false;
        }
        n--;
        $(this).siblings('.itxt').val(n);
        //修改商品小记模块
        var p = $(this).parents('.p-num').siblings('.p-price').html();
        p = p.substr(1);
        var price = (p * n).toFixed(2);
        $(this).parents('.p-num').siblings('.p-sum').html('￥'+price); 
        getSum();
    })
    //用户修改文本框的值时 计算商品小记模块
    $('.itxt').change(function(){
        var n = $(this).val();
        var p = $(this).parents('.p-num').siblings('.p-price').html();
        p = p.substr(1);
        var price = (p * n).toFixed(2);
        $(this).parents('.p-num').siblings('.p-sum').html('￥'+price);
        getSum();
    })
    //计算总计和总额模块
    getSum();
    function getSum(){
        var count = 0;
        var money = 0;
        $('.itxt').each(function(i,ele){
            count += parseInt($(ele).val());
        })
        $('.amount-sum em').text(count);
        $('.p-sum').each(function(i,ele){
            money += parseFloat($(ele).text().substr(1));
        })
        $('.price-sum em').text('￥'+money.toFixed(2));
    }
    //删除商品模块
    //1.删除单个商品
    $('.p-action a').click(function(){
        $(this).parents('.cart-item').remove();
        getSum();
    })
    //2.删除选中的商品
    $('.remove-batch').click(function(){
        //获取选中的商品
        //console.log($('.j-checkbox:checked'));
        $('.j-checkbox:checked').parents('.cart-item').remove();
        getSum();
    })
    //3.删除购物车
    $('.clear-all').click(function(){
        $('.cart-item').remove(); 
        getSum();
    })
    //选中商品添加背景模块
    
        
})
