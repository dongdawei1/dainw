'use strict';
require('./index.css');
require('ztree/css/zTreeStyle/zTreeStyle.css');
var _user   = require('service/user-service.js');
var _mm     = require('util/mm.js');


// page 逻辑部分











// page 逻辑部分
var page = {
    init: function(){
        this.checkLogin();
    },
    checkLogin : function(){
        var _this = this;

            _this.submit();

    },
    // 检查用户登录状态
    submit :function() {
        //登录状态
        _user.checkLogin(function (res) {
           console.log(res);
            _user.permission(function(res){
                console.log(res)

                console.log(typeof  res)
                var biaoti = res[0].name;
                $("#biaoti").html(biaoti);

                var yijidaohang = res[0].children;

                var yijidaohang_list = "";
                for(var a=0; a<yijidaohang.length;a++){

                    yijidaohang_list += " <ul class='yijidaohang' > <a href=\"#\">" +
                        "<li>"+ yijidaohang[a].name+" </a> </li> <ul  class='erjidaohang' >"



                     for(var b = 0; b<yijidaohang[a].children.length ; b++){

                         yijidaohang_list += "<li><a href=\"#\">"+( yijidaohang[a].children)[b].name + " </a>  </li> ";
                     }
                    yijidaohang_list += "</ul> </ul>"

                }

                console.log(yijidaohang_list)
                $("#gongneng").html( yijidaohang_list);


                //收起展开
                $("#gongneng ul li").next("ul").hide();
                $("#gongneng ul li").click(function()
                {
                    $(this).next("ul").toggle();
                });

            }, function(errMsg){

                window.location.href = './index.html';
            });




        }, function (errMsg) {
            if(errMsg ==="用户未登录,无法获取当前用户的信息") {
                console.log(errMsg);
              window.location.href = './index.html';
            }
        })

    }
};



$(function(){


    page.init();



})


