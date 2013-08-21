/**
 * Created with JetBrains WebStorm.
 * User: mtolland
 * Date: 7/21/13
 * Time: 9:06 PM
 * To change this template use File | Settings | File Templates.
 */


app.directive("measurecomputation", function(){
    return {
        restrict: "E",
        scope: {
            object:"=",
            select: "&"
        },
        templateUrl: 'partials/directives/measurecomputation.html',
        controller: function($scope, $element, $attrs){
            $scope.callSelectItem = function(){
                $scope.select({item: $scope.object});
            }
        },
        link: function(scope, element, attrs){
            scope.object.plumbObject.elem = element;
            scope.object.plumbObject.redraw();
            scope.$on('dataloaded', function () {
                scope.object.plumbObject.updateConnections();
            })
            scope.$on('unload', function () {
                jsPlumb.removeAllEndpoints(scope.object.plumbObject.elem);
            })
        }

    }
});

app.directive("constant", function(){
    return {
        restrict: "E",
        scope: {
            object:"=",
            select: "&"
        },
        templateUrl: 'partials/directives/constant.html',
        controller: function($scope, $element, $attrs){
            $scope.callSelectItem = function(){
                $scope.select({item: $scope.object});
            }
        },
        link: function(scope, element, attrs){
            scope.object.plumbObject.elem = element;
            scope.object.plumbObject.redraw();
            scope.$on('dataloaded', function () {
                scope.object.plumbObject.updateConnections();
            })
            scope.$on('unload', function () {
                jsPlumb.removeAllEndpoints(scope.object.plumbObject.elem);
            })
        }
    }
});

app.directive("parameter", function(){
    return {
        restrict: "E",
        scope: {
            object:"=",
            select: "&"
        },
        templateUrl:'partials/directives/parameter.html',
        controller: function($scope, $element, $attrs){
            $scope.callSelectItem = function(){
                $scope.select({item: $scope.object});
            }
        },
        link: function(scope, element, attrs){
            scope.object.plumbObject.elem = element;
            scope.object.plumbObject.redraw();
            scope.$on('dataloaded', function () {
                scope.object.plumbObject.updateConnections();
            })
            scope.$on('unload', function () {
                jsPlumb.removeAllEndpoints(scope.object.plumbObject.elem);
            })
        }
    }
});

app.directive("datarequest", function(plumbServiceNew){
    return {
        restrict: "E",
        scope: {
            object:"=",
            select: "&"
        },
        templateUrl: 'partials/directives/datarequest.html',
        controller: function($scope, $element, $attrs){
            $scope.callSelectItem = function(){
                $scope.select({item: $scope.object});
            }
        },
        link: function(scope, element, attrs){
            if(scope.object.newParam){
                scope.object.plumbObject.removeTargetEndpoints(TARGET_INPUT_TYPE);
                var width = 0.8/(scope.object.parameters.length-1);
                var index = 0.1
                if(scope.object.parameters.length == 1){
                    index = 0.5;
                    width=1;
                }
                for(var i in scope.object.parameters){
                    var param = scope.object.parameters[i];
                    var offset = index + i*width;
                    var endpointSettings = new plumbServiceNew.createInputEndpoints(offset, 0.0, 1);
                    scope.object.plumbObject.addTargetEndpoint(endpointSettings, TARGET_INPUT_TYPE);
                }
                scope.object.newParam = false;
            }
            scope.object.plumbObject.elem = element;
            scope.object.plumbObject.redraw();
            scope.$on('dataloaded', function () {
                scope.object.plumbObject.updateConnections();
            })
            scope.$on('unload', function () {
                jsPlumb.removeAllEndpoints(scope.object.plumbObject.elem);
            })
        }
    }
});

app.directive("environmentvariable", function(){
    return {
        restrict: "E",
        scope: {
            object:"=",
            select: "&"
        },
        templateUrl: 'partials/directives/environmentvariable.html',
        controller: function($scope, $element, $attrs){
            $scope.callSelectItem = function(){
                $scope.select({item: $scope.object});
            }
        },
        link: function(scope, element, attrs){
            scope.object.plumbObject.elem = element;
            scope.object.plumbObject.redraw();
            scope.$on('dataloaded', function () {
                scope.object.plumbObject.updateConnections();
            })
            scope.$on('unload', function () {
                jsPlumb.removeAllEndpoints(scope.object.plumbObject.elem);
            })
        }
    }
});

app.directive("measuretrigger", function(){
    return {
        restrict: "E",
        scope: {
            object:"=",
            select: "&"
        },
        templateUrl:'partials/directives/measuretrigger.html',
        controller: function($scope, $element, $attrs){
            $scope.callSelectItem = function(){
                $scope.select({item: $scope.object});
            }
        },
        link: function(scope, element, attrs){
            scope.object.plumbObject.elem = element;
            scope.object.plumbObject.redraw();
            scope.$on('dataloaded', function () {
                scope.object.plumbObject.updateConnections();
            })
            scope.$on('unload', function () {
                jsPlumb.removeAllEndpoints(scope.object.plumbObject.elem);
            })
        }
    }
});

app.directive("action", function(){
    return {
        restrict: "E",
        scope: {
            object:"=",
            select: "&"
        },
        templateUrl:'partials/directives/action.html',
        controller: function($scope, $element, $attrs){
            $scope.callSelectItem = function(){
                $scope.select({item: $scope.object});
            }
        },
        link: function(scope, element, attrs){
            scope.object.plumbObject.elem = element;
            scope.object.plumbObject.redraw();
            scope.$on('dataloaded', function () {
                scope.object.plumbObject.updateConnections();
            })
            scope.$on('unload', function () {
                jsPlumb.removeAllEndpoints(scope.object.plumbObject.elem);
            })
        }
    }
});

app.directive("measuredefinition", function(plumbServiceNew){
    return {
        restrict: "E",
        scope: {
            object:"=",
            select: "&"
        },
        templateUrl:'partials/directives/measuredefinition.html',
        controller: function($scope, $element, $attrs){
            $scope.callSelectItem = function(){
                $scope.select({item: $scope.object});
            }
        },
        link: function(scope, element, attrs){
            if(scope.object.systemMeasureTemplate.newParam){
                scope.object.plumbObject.removeTargetEndpoints(TARGET_INPUT_TYPE);
                var width = 0.8/(scope.object.systemMeasureTemplate.parameters.length-1);
                var index = 0.1
                if(scope.object.systemMeasureTemplate.parameters.length == 1){
                    index = 0.5;
                    width=1;
                }
                for(var i in scope.object.systemMeasureTemplate.parameters){
                    var offset = index + i*width;
                    var endpointSettings = new plumbServiceNew.createInputEndpoints(offset, 0.0, 1);
                    scope.object.plumbObject.addTargetEndpoint(endpointSettings, TARGET_INPUT_TYPE);
                }
                scope.object.systemMeasureTemplate.newParam = false;
            }
            scope.object.plumbObject.elem = element;
            scope.object.plumbObject.redraw();
            scope.$on('dataloaded', function () {
                scope.object.plumbObject.updateConnections();
            })
            scope.$on('unload', function () {
                jsPlumb.removeAllEndpoints(scope.object.plumbObject.elem);
            })
        }
    }
});