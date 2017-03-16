/**
 * Created by Zhangmiao on 2016/5/9.
 */
require.config({
    //baseUrl: '/WebStromProjects/angular-test/directive-demo',
    paths: {
        'angular': 'dep/angular'
    },
    shim: {
        'angular': {
            exports: 'angular'
        }
    }
})
require(['angular', 'app', 'directive/dropdownButton'], function (angular, app) {

    angular.element(document).ready(function() {
        angular.bootstrap(document, ['app']);

    });

});
