/**
 * Created by ZhangMiao on 2017/3/14.
 */
function Scope() {
    this.$$watchers = []; //记录所有观察者
}

/**
 * Scope原型
 */
Scope.prototype = {
    constructor: Scope,
    /**
     * 添加观察者，向$$watchers数组中添加一个对象
     * @param watchFn
     * @param listenerFn
     */
    $watch: function (watchFn, listenerFn) {
        var watch = {
            watchFn: watchFn,
            listenerFn: listenerFn
        };
        this.$$watchers.push(watch);
    },
    /**
     * 脏值检测
     */
    $digest: function () {
        var ttl = 10;
        var dirty;
        do {
            dirty = this.$$digestOnce();
            if(dirty && !(ttl--)) {
                throw '10 digest iterations reached';
            }
        } while (dirty)
    },
    $$digestOnce: function () {
        var dirty;
        this.$$watchers.forEach(function (watch) {
            var newValue = watch.watchFn();
            var oldValue = watch.last;
            if (newValue !== oldValue) {
                watch.listenerFn(newValue, oldValue);
                dirty = true;
                watch.last = newValue;
            }
        })
        return dirty;
    }
}


/**
 * 例子
 */
window.onload = function () {
    var $input = $('#input');
    var $content = $('#content');

    //Scope实例
    var $scope = new Scope();
    $scope.name = 'foo';


    /**
     * 添加一个观察者（Angular内部在指令编译过程中完成）
     */
    $scope.$watch(function () {
        return $scope.name;
    }, function (newValue, oldValue) {
        $input.val(newValue);
        $content.text(newValue);
        console.log(newValue)
    })

    /**
     * 执行脏值检测，视图更新
     * （Angular内部，当DOM ready之后，Angular启动，然后进行指令编译过程，指令编译完成之后执行$digest循环）
     */
    $scope.$digest();

    /**
     * 视图上更改input的值，更新数据并执行脏值检测
     */
    $input.on('input', listener);
    $input.on('change', listener);
    function listener(e) {
        $scope.name = $(e.target).val();
        $scope.$digest();
    }
}
