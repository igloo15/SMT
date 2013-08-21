/**
 * Created with JetBrains WebStorm.
 * User: mtolland
 * Date: 7/20/13
 * Time: 4:02 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict'
app.controller('definitionCtrl', ['$scope', 'measureService', 'plumbServiceNew', '$dialog', '$timeout', function($scope, measureService, plumbService, $dialog, $timeout){

    $('.mainview-workspace').droppable({
        hoverClass: "ui-state-hover",
        accept: ".component-box",
        drop: function(event, ui){
            var item;
            var location = new Location(event.pageX, event.pageY);

            if($scope.dropItem instanceof MeasureTemplateHeader){
                item = measureService.createMeasureDefinition($scope.dropItem);

            }else{
                item = measureService.createItem($scope.dropItem.id);
            }


            if(item !== undefined){
                item.plumbObject.setup();
                item.plumbObject.setLocation(location);

                $scope.$apply();
            }
        }
    })


    $scope.openItemEditor = function(){
        var d = $dialog.dialog({dialogFade: false });
        d.open('partials/dialogs/definition.html', 'definitionModalCtrl');
    };


    $scope.measureservice = measureService;
    $scope.plumbservice = plumbService;


    $scope.setDefObject = function(defObject){
        $scope.$broadcast('unload');
        measureService.setDefObject(defObject);
        $scope.defObject = defObject;
        $timeout(function(){
            $scope.$broadcast('dataloaded');
        });
    }

    if(measureService.defObject === null){
        $scope.setDefObject(measureService.createDefFile());
    }else{
        $scope.setDefObject(measureService.defObject);
    }

    $scope.callSelectItem = function(item){
        $scope.selectedForm = item.form;
        $scope.selectedItem = item;
    };

    $scope.selectedItem = {};
    $scope.selectedForm = {};

    $scope.callSelectItem($scope.defObject);


    $scope.findTemplate = function(item){
        if(typeof($scope.searchText) === 'undefined'){
            return true;
        }

        if(item.name.indexOf($scope.searchText) !== -1){
            return true;
        }

        return false;
    }

    $scope.components = [

        {id:ParameterType,
            name:'Parameter',
            myClass:''},
        {id:ConstantType,
            name:'Constant',
            myClass:''},
        {id:TriggerType,
            name:'Measure Trigger',
            myClass:''},
        {id:ActionType,
            name:'Action',
            myClass:''}
    ];

    $scope.dropItem = {};

    $scope.actions = [
        {
            click:function()
            {
                $scope.$broadcast('unload');
                var item = measureService.createDefFile();
                $scope.setDefObject(item);
                $scope.callSelectItem(item);
            },
            label:'New HPML File'
        }
    ];

    $scope.$watch(function(){ return measureService.defObject; }, function(newVal){
        $scope.setDefObject(measureService.defObject);
    });


}]);