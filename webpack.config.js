const path = require('path'); //path内置的模块，用来设置路径。
var webpack             = require('webpack');// 提取通用模块用
var ExtractTextPlugin   = require('extract-text-webpack-plugin'); //处理css
var HtmlWebpackPlugin = require('html-webpack-plugin');


// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';

// 获取html-webpack-plugin参数的方法
// html模板的处理,打完包样式就有了，访问打包后的html
var getHtmlConfig = function(name, title){
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common', name]
    };
};

var config  = {
    //配置入口
    entry: {
        'index'             : ['./src/page/index/index.js'],
        //所有页面都会用的组件
        'common'            : ['./src/page/common/index.js'],
         'main'              : ['./src/page/main/index.js'],
        // 'detail'            : ['./src/page/detail/index.js'],
        // 'cart'              : ['./src/page/cart/index.js'],
       // 'user-login'        : ['./src/page/user-login/index.js'],
        // 'user-register'     : ['./src/page/user-register/index.js'],
        // 'user-pass-reset'   : ['./src/page/user-pass-reset/index.js'],
        // 'user-center'       : ['./src/page/user-center/index.js'],
        // 'user-center-update': ['./src/page/user-center-update/index.js'],
        // 'user-pass-update'  : ['./src/page/user-pass-update/index.js'],
        // 'result'            : ['./src/page/result/index.js'],
    },
    //配置出口（打包后文件存放位置）
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath : '/dist',
        filename: 'js/[name].js'
    },
    //设置jquery
    externals : {
        'jquery' : 'window.jQuery'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=css/resource/[name].[ext]' },

        ]
    },
 //配置全局变量的一些简写
    resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },
    plugins: [

        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),


        // 把css单独打包到文件里
       new ExtractTextPlugin("css/[name].css"),
        // html模板的处理,打完包样式就有了，访问打包后的html
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('main', '主页面')),
        // new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情页')),
        // new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
       // new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        // new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        // new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        // new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        // new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        // new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        // new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
    ]
};
//指定启动环境和端口号
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;