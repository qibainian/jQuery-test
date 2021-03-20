$(function(){
    load();
    //1.按下回车，把完整数据存储到本地存储里
    //存储的数据格式  var todolist = [{title:'xxx',done:false}]
    $('#title').on('keydown',function(event){
        if(event.keyCode === 13){
            if($(this).val()===''){
                alert('请输入有效内容');
            }else{
                //先读取本地存储原来的数据
                var local = getDate();
                //把local数组进行数据更新，把最新的数据追加给local数组
                local.push({title:$(this).val(),done:false});
                //把local存储给本地存储
                saveDate(local);
                //2.toDoList 本地存储数据渲染到页面
                load();
                $(this).val('');
            } 
        }
    });
    //删除操作
    $('ol,ul').on('click','a',function(){
        //获取本地数据
        var data = getDate();
        //修改数据
        var index = $(this).attr('id');
        console.log(index);
        data.splice(index,1);
        //保存到本地存储
        saveDate(data);
        //重新渲染页面
        load();
    });
    //4.正在进行和已完成选项操作
    $('ol,ul').on('click','input',function(){
        //获取本地数据
        var data = getDate();
        //修改数据
        var index = $(this).siblings('a').attr('id');
        data[index].done = $(this).prop('checked');
        console.log(index);
        //保存到本地存储
        saveDate(data);
        //重新渲染页面
        load();
    })
    //读取本地存储的数据
    function getDate(){
        var date = localStorage.getItem('todolist');
        if(date !== null){
            //本地存储的数据是字符串格式，需要转为对象格式
            return JSON.parse(date);
        }else{
            return [];
        }
    };
    //保存本地存储数据
    function saveDate(data){
        localStorage.setItem('todolist',JSON.stringify(data));
    }
    //本地存储数据渲染到页面
    function load(){
        //获取本地数据
        var data = getDate();
        var todocount = 0;
        var donecount = 0;
        $('ol,ul').empty();
        $.each(data,function(i,n){
            if(n.done){
                $('ul').prepend("<li><input type='checkbox' checked='checked'><p>"+n.title+"</p><a href='javascript:;' id="+i+"></a></li>");
                donecount++;
            }else{
                $('ol').prepend("<li><input type='checkbox'><p>"+n.title+"</p><a href='javascript:;' id="+i+"></a></li>");
                todocount++;
            }
        });
        $('#todocount').text(todocount);
        $('#donecount').text(donecount);
    }
})
