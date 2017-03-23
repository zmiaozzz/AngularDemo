/**
 * @author : zhangmiao
 * @time   : 2017/3/23
 */


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
