/**
 * Created by ZhangMiao on 2017/3/2.
 */
var DI = {
    /**
     * 保存能够被注入的服务
     */
    providerCache: {},
    /**
     * 注册一个新的服务时，以key: value形式保存在providerCache map中
     * @param key
     * @param value
     */
    register: function (key, value) {
        this.providerCache[key] = value;
    },
    /**
     * 实现依赖注入
     * @param fn
     * @param self
     * @returns {*}
     */
    inject: function (fn, self) {
        var $inject = this.annotate(fn), //获得函数的参数（被注入的对象key值）
            args = [];

        //遍历providerCache获得所有注入的对象，用一个数组记录
        for (var i = 0, len = $inject.length; i < len; i++) {
            args.push(this.providerCache[$inject[i]]);
        }
        if (isArray(fn)) {
            fn = fn[len];
        }
        //注入
        return fn.apply(self, args);
    },
    /**
     * 提取函数的参数
     * @param fn
     * @returns {Array}
     */
    annotate: function (fn) {
        var fnString = fn.toString(),
            args = [],
            FUNC_ARGS = /^function\s*[^(]*\(\s*([^)]*)\s*\)/m,
            FUNC_ARG_SPLIT = /,\s*/;
        if (isFunction(fn)) {
            args = fnString.match(FUNC_ARGS)[1].split(FUNC_ARG_SPLIT);
        }
        else if (isArray(fn)) {
            args = fn.slice(0, fn.length - 1);
        }
        return args;
    }
}



/**
 * ******************************* 例子 ********************************
 */
function isFunction(fn) {
    return typeof fn === 'function';
}
function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

/**
 * provider定义方法
 * @param name
 * @param fn
 */
function registerProvider(name, fn) {
    var obj = DI.inject(fn);
    DI.register(name, obj);
}

/**
 * controller定义方法
 * @param name
 * @param fn
 */
function registerController(name, fn) {
    DI.inject(fn);
}

registerProvider('provider1', function () {
    return {
        provider1: 'foo'
    }
})

registerProvider('provider2', function (provider1) {
    return {
        provider2: provider1.provider1 + ' bar'
    }
})

registerController('controller', ['provider2', function (provider2) {
    console.log(provider2.provider2);
}])

