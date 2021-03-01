$(function(){
    $(window).scrollTop(0);
    //点击li时不需要执行页面滚动事件里的添加current类，可以添加节流阀/互斥锁控制
    var flag = true;
    //显示隐藏电梯导航
    var toolTop = $('.recommend').offset().top;
    toggleTool();
    function toggleTool(){
        if($(window).scrollTop() >= toolTop){
            $('.fixedtool').fadeIn();
        }else{
            $('.fixedtool').fadeOut();
        }
    }
    $(window).scroll(function(){
        toggleTool();
        //页面滚动到某个内容区域时，左侧电梯导航对应的li添加current类，其他li移除current类
        if(flag){
            $('.floor .w').each(function(i,ele){
                if($(window).scrollTop() >= $(ele).offset().top){
                    $('.fixedtool li').eq(i).addClass('current').siblings().removeClass();
                }
            })
        }
    });
    //点击电梯导航页面可以滚动到相应内容区域
    $('.fixedtool li').click(function(){
        flag = false;
        //console.log($(this).index());
        var current = $('.floor .w').eq($(this).index()).offset().top;
        $('body,html').stop().animate({
            scrollTop:current
        },function(){
            flag = true;
        })
        //点击li后 添加current类，其他li移除current类
        $(this).addClass('current').siblings().removeClass();
    });
    //
})
