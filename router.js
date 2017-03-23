/**
 * @author : zhangmiao
 * @time   : 2017/3/23
 */

var util = {
    history: !!window.history && window.history.pushState,
    hashchange: 'onhashchange' in window
}

window.onload = function () {
    var router = new Router();


    // 路由配置
    router.when('/page1', {
        template: '<h1>page1</h1>'
    }).when('/page2', {
        template: '<h1>page2</h1>'
    }).when('/page3', {
        template: '<h1>page3</h1>'
    }).otherwise('/page1')

    // 首次进入页面需要触发
    router.fireUrlChange();


    if(util.history) {
        // 页面地址改变，更新页面
        $(window).on('popstate', function () {
            router.fireUrlChange();
        })
    }

    if(util.hashchange) {
        // hash值改变时更新页面
        $(window).on('hashchange', function () {
            router.fireUrlChange();
        });
    }


}

/**
 * 路由
 * @constructor
 */
function Router() {
    this.routers = {};
}
Router.prototype = {
    constructor: Router,

    /**
     * 添加路由
     * @param path
     * @param route
     * @returns {Router}
     */
    when: function (path, route) {
        this.routers[path] = route;

        return this;
    },

    /**
     * 首次加载路由
     * @param url
     */
    otherwise: function (url) {
        this.newUrl = url;
    },

    /**
     * 路由改变时触发
     */
    fireUrlChange: function () {

        // 首次加载otherwise路由
        if(!location.hash) {
            if(util.history) {
                history.pushState(null, '', location.href+'#'+this.newUrl);
            }
            if(util.hashchange) {
                location.hash = this.newUrl;
            }

        }

        this.newUrl = location.hash.substring(1);

        // 路由没有变化
        if(this.newUrl === this.lastUrl) {
            return;
        }

        // 路由发生变化
        this.lastUrl = this.newUrl;


        //更新页面
        var $content = $('#content');
        $content.html(this.routers[this.newUrl].template);

    }

}
