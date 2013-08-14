/**
 * Created with JetBrains WebStorm.
 * User: mtolland
 * Date: 7/20/13
 * Time: 4:03 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict'
app.controller('dataCtrl', ['$scope', 'dataService', 'measureService', '$dialog', function($scope, dataService, measureService, $dialog){

    $('#select_box').droppable({
        hoverClass: "ui-state-hover",
        accept: ":not(.invalid-drop)",
        drop: function(event, ui){
            $scope.dataRequest.addProperty(dataService.draggedData.dataModelName, dataService.draggedData.className, dataService.draggedData.fullName);
            $scope.$apply();
        }
    })

    $scope.updateInput = function(item, modelName){
        if(item.objectType === PropModelType){
            if(modelName === 'name'){
                if(item.parentName === ''){
                    item.fullName = item.name;
                }else{
                    item.fullName = item.parentName + '.'+ item.name;
                }
                updateNames(item.props, item.fullName);
            }
        }else if(item.objectType === ClassModelType){
            if(modelName === 'name'){
                if(item.parentName === ''){
                    item.fullName = item.name;
                }else{
                    item.fullName = item.parentName + '.'+ item.name;
                }
                updateNames(item.classes, item.fullName);
                updateClassNames(item.props, item.fullName);
            }
        }
    }

    $scope.addParam = function(){
        var param = measureService.createParameter();
        $scope.dataRequest.addParameter(param);
    }

    $scope.removeParam = function(item){
        $scope.dataRequest.removeParameter(item.id);
    }

    $scope.removeProp = function(item){
        $scope.dataRequest.removeProperty(item);
    }

    function updateNames(list, name){
        for(var i in list){
            var subProp = list[i];
            subProp.parentName = name;
            subProp.fullName = subProp.parentName +'.'+ subProp.name;
            if(subProp.objectType === ClassModelType){
                updateClassNames(subProp.props, subProp.fullName);
            }else{
                updateNames(subProp.props, subProp.fullName);
            }
            updateNames(subProp.classes, subProp.fullName);
        }
    }

    function updateClassNames(list, name){
        for(var i in list){
            var subProp = list[i];
            subProp.className = name;
            updateClassNames(subProp.props, name);
        }
    }

    $scope.openItemEditor = function(item){
        var d = $dialog.dialog({dialogFade: false });
        d.open('partials/dialogs/data-request.html', 'defModalCtrl');
        //d.open();
    };

    $scope.rootModel = dataService.models['NASMP'];
    $scope.models = dataService.models;
    $scope.selectedItem = {};
    $scope.selectedForm = {};
    $scope.dataRequest = measureService.dataRequest;

    if($scope.dataRequest === null){
        var item = measureService.createDataRequest();
        measureService.dataRequest = item;
        //$scope.dataRequest = item;
    }

    $scope.callSelectItem = function(item, event){
        $scope.selectedItem = item;
        $scope.selectedForm = item.form;

        if(event !== undefined){
            event.stopPropagation();
        }
    };

    $scope.addModel = function(){
        dataService.addModel();
    }

    $scope.addProp = function(){
        $scope.selectedItem.createProp('test');
    }

    $scope.addClass = function(){
        $scope.selectedItem.createClass('testclass');
    }

    $scope.selectDR = function(){
        $scope.callSelectItem($scope.dataRequest);
    }


    $scope.actions = [
        {
            click:function()
            {
                var item = measureService.createDataRequest();
                measureService.dataRequest = item;
                //$scope.dataRequest = item;
            },
            label:'New Data Request'
        },
        {
            click:function()
            {console.log('click 2');},
            label:'Click 2'
        }
    ];


    $scope.$watch(function(){ return measureService.dataRequest; }, function(newVal){
        $scope.dataRequest = measureService.dataRequest;
        $scope.selectDR();
    });
    /*Modal Controls*/



}]);