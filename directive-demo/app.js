/**
 * Created by Zhangmiao on 2016/5/9.
 */
define(['angular'], function (angular) {
    var app = angular.module('app',[]);
    app.controller('dropdownCtrl', ['$scope', function ($scope) {
        $scope.options = {
            dropdown: [
                {value: 1, name: '选项1'},
                {value: 2, name: '选项2'},
                {value: 3, name: '选项3'}
            ]
        };
        $scope.getData = function () {
            console.log($scope.data);
        };
    }]);
    return app;
})
