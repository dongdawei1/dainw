'use strict';
require('./index.css');
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
    // 提交表单
    submit :function() {
        _user.checkLogin(function (res) {
            console.log(res);

        }, function (errMsg) {
            if(errMsg ==="用户未登录,无法获取当前用户的信息") {
                console.log(errMsg);
             //   window.location.href = './index.html';
            }
        })

    }
};
$(function(){
    page.init();
})


