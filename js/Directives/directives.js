/**
 * Created with JetBrains WebStorm.
 * User: igloo15
 * Date: 4/28/13
 * Time: 3:11 PM
 * To change this template use File | Settings | File Templates.
 */


'use strict';

/* Directives */


angular.module('measure.directives', []).
    directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }]);

app.directive("propertylist", function(){
    return {
        restrict: "E",
        templateUrl: 'partials/directives/propertylist.html'
    }
});

app.directive("datadirective", function($compile, dataService){
    return {
        restrict: "E",
        terminal:true,
        scope:{
            object:'=',
            callSelectItem:'&selectitem',
            selecteditem:'='

        },
        templateUrl: 'partials/directives/dataDirective.html',
        controller: function($scope, $element, $attrs){
            $scope.select = function(){
                $scope.callSelectItem({item:$scope.object});
            }
            $scope.selectItem = function(val){
                 $scope.callSelectItem({item:val});
            }
            $scope.isCollapsed = false;
            $scope.collapse = function(){
                $scope.isCollapsed = !$scope.isCollapsed;
                redraw($scope, $element);
            }

            $scope.class = '';

            if($scope.object.objectType === PropModelType){
                $scope.class = 'propClass';
            }else if($scope.object.objectType === ClassModelType){
                $scope.class = 'classClass';
            }else{
                $scope.class = 'dataModelClass';
            }
        },
        link: function(scope, element, attrs){
            //element.attr('id', scope.object.fullName);
            if(scope.object.objectType === PropModelType){
                element.draggable({revert:true, helper:'clone',
                    start:function(){
                        dataService.draggedData = scope.object;
                    },
                    stop:function(){
                        dataService.draggedData = null;
                    }
                })
            }

            redraw(scope, element);
            scope.$watch(function(){ return scope.object.classes.length + scope.object.props.length;}, function(item){
                redraw(scope, element);
            })

        }
    }

    function redraw(scope, element){
        var classDiv = element.children('div').children('#classes');
        var propDiv = element.children('div').children('#properties')
        classDiv.html('');
        propDiv.html('');
        if(!scope.isCollapsed){
            for(var i in scope.object.props){
                var childClass = $compile("<datadirective object='object.props["+i+"]' selectitem='selectItem(item)' selecteditem='selecteditem'></datadirective>")(scope);
                propDiv.append(childClass);

            }
            for(var i in scope.object.classes){
                var childClass = $compile("<datadirective object='object.classes["+i+"]' selectitem='selectItem(item)' selecteditem='selecteditem'></datadirective>")(scope);
                classDiv.append(childClass);
            }
        }

    }
});


app.directive('stopEvent', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind(attr.stopEvent, function (e) {
                e.stopPropagation();
            });
        }
    };
});

app.directive('component', function(){
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'partials/directives/components.html',
        link: function(scope, element, attr){
            element.children('div').children('div').draggable({revert:true, helper:'original',
                start:function(){
                    scope.$parent.dropItem = scope.comp;
                },
                stop:function(){
                    scope.$parent.dropItem = null;
                }
            })
        }
    }
})

app.directive('datarequestcomponent', function(){
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'partials/directives/datarequestcomponents.html',
        link: function(scope, element, attr){
            element.children('div').children('div').draggable({revert:true, helper:'clone',
                start:function(){
                    scope.$parent.dropItem = scope.dr;
                },
                stop:function(){
                    scope.$parent.dropItem = null;
                }
            })
        }
    }
})

app.directive('measuretemplatecomponent', function(){
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'partials/directives/measuretemplatecomponent.html',
        link: function(scope, element, attr){
            element.children('div').children('div').draggable({revert:true, helper:'clone',
                start:function(){
                    scope.$parent.dropItem = scope.mt;
                },
                stop:function(){
                    scope.$parent.dropItem = null;
                }
            })
        }
    }
})