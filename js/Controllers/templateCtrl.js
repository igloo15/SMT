/**
 * Created with JetBrains WebStorm.
 * User: mtolland
 * Date: 7/20/13
 * Time: 4:04 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict'
app.controller('templateCtrl', ['$scope', 'measureService', 'plumbServiceNew', '$dialog', '$timeout', function($scope, measureService, plumbService, $dialog, $timeout){

    $('.mainview-workspace').droppable({
        hoverClass: "ui-state-hover",
        accept: ".component-box",
        drop: function(event, ui){
            var item;
            var location = new Location(event.pageX, event.pageY);

            if($scope.dropItem instanceof DataRequest){
                item = $scope.dropItem;
            }else{
                item = measureService.createItem($scope.dropItem.id);
            }


            if(item !== undefined){
                item.plumbObject.setup();
                item.plumbObject.setLocation(location);

                //$scope.drawAbleItems.push(item);
                //item.compile($scope, 'drawAbleItems', $scope.drawAbleItems.length-1, 'template', location, true);

                $scope.$apply();
            }
        }
    })


    $scope.openItemEditor = function(){
        var d = $dialog.dialog({dialogFade: false });
        d.open('partials/dialogs/template.html', 'templateModalCtrl');
        //d.open();
    };


    $scope.measureservice = measureService;
    $scope.plumbservice = plumbService;



    $scope.setTemplate = function(template){
        $scope.$broadcast('unload');
        measureService.setMeasureTemplate(template);
        $scope.template = template;
        $timeout(function(){
            $scope.$broadcast('dataloaded');
        });
    }

    if(measureService.measureTemplate === null){
        $scope.setTemplate(measureService.createMeasureTemplate());
    }else{
        $scope.setTemplate(measureService.measureTemplate);
    }


    $scope.drawAbleItems = [];

    $scope.callSelectItem = function(item){
        $scope.selectedForm = item.form;
        $scope.selectedItem = item;
    };

    $scope.selectedItem = {};
    $scope.selectedForm = {};

    $scope.callSelectItem($scope.template);


    $scope.findDataRequest = function(item){
        if(typeof($scope.searchText) === 'undefined'){
            return true;
        }


        if(item.name.indexOf($scope.searchText) !== -1){
            return true;
        }
        if(item.select.indexOf($scope.searchText) !== -1){
            return true;
        }
        if(item.from.indexOf($scope.searchText) !== -1){
            return true;
        }
        if(item.dataSourceRef.indexOf($scope.searchText) !== -1){
            return true;
        }


        return false;
    }

    $scope.components = [
        {id:MeasureComputationType,
         name:'Measure Computation',
         myClass:''},
        {id:ParameterType,
            name:'Parameter',
            myClass:''},
        {id:ConstantType,
            name:'Constant',
            myClass:''},
        {id:EnvironmentVariableType,
            name:'Environment Variable',
            myClass:''}
    ];

    $scope.dropItem = {};

    $scope.actions = [
        {
            click:function()
            {
                $scope.$broadcast('unload');
                var item = measureService.createMeasureTemplate();
                measureService.setMeasureTemplate(item);
                $scope.template = item;
                $scope.callSelectItem(item);
            },
            label:'New Template'
        },
        {
            click:function()
            {console.log('click 2');},
            label:'Click 2'
        }
    ];

    $scope.$watch(function(){ return measureService.measureTemplate; }, function(newVal){

        $scope.setTemplate(measureService.measureTemplate);
    });




}]);