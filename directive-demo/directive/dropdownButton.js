/**
 * 下拉框指令
 *
 * 用法：
 * <dropdown-button options="options" value="data" selected='{value:'',name:''}'></dropdown-button>
 *
 * 定义下拉框菜单数组options = [{value:'' ,name:''}, {value:'' ,name:'' }, ...]
 * value为提交数据
 * selected可省略
 */
define(['app'], function(app) {
	app.directive('dropdownButton', function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'directive/tpl/dropdown-button.html',
			scope: {
				options: '=',
				value: '=',
				selected: '='
			},
			link: function (scope, ele, attr, ctrl) {
				scope.menuShow = false;
				scope.toggle = function () {
					scope.menuShow = !scope.menuShow;
				};

				//若下拉菜单通过ajax获取，数据可能不会立即返回
				scope.$watch('options', function (newValue, oldValue) {
					setDisplayName(scope);
				});

				//初始展示值
				setDisplayName(scope);

				//选择下拉菜单某一项
				scope.select = function (option) {
					scope.selected = option;
					setDisplayName(scope);
				}
			}
		};
		function setDisplayName(scope) {
			if(scope.selected) {
				scope.displayName = scope.selected.name;
				scope.value = scope.selected.value;
			}
			else if(scope.options) {
				if(scope.value) { //回显
					for(var i=0;i<scope.options.length;i++) {
						if(scope.value == scope.options[i].value) {
							scope.selected = scope.options[i];
							scope.displayName = scope.selected.name;
						}
					}
				}
				else {
					scope.selected = scope.options[0];
					scope.displayName = scope.selected.name;
					scope.value = scope.selected.value;
				}
			}
			scope.menuShow = false;
		}
	})
})


