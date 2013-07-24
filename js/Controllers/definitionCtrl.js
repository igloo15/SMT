/**
 * Created with JetBrains WebStorm.
 * User: mtolland
 * Date: 7/20/13
 * Time: 4:02 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict'
app.controller('definitionCtrl', ['$scope', '$compile', 'measureService', 'plumbService', 'functionService', 'dataService', 'actionService', function($scope, $compile, measureService, plumbService, functionService, dataService, actionService){
    /*$("#panArea").panzoom({
        $zoomIn: $(".zoom-in"),
        $zoomOut: $(".zoom-out"),
        $zoomRange: $(".zoom-range"),
        $reset: $(".reset")
    });*/

    $scope.measureservice = measureService;

    $scope.functionservice = functionService;
    $scope.actionservice = actionService;
    $scope.dataservice = dataService;
    $scope.plumbservice = plumbService;

    $scope.callSelectItem = function(item){
        $scope.selectedForm = item.form;
        $scope.selectedItem = item;
    };

    $scope.selectedItem = {};
    $scope.selectedForm = {};


    $scope.drawAbleItems = [];

    $scope.addItem = function(data, ev){
        var item;
        var location = new Location(ev.pageX, ev.pageY);
        if(data == MeasureComputationType){
            item = measureService.createComputation($compile, $scope, location);
        }else if(data == ConstantType){
            item = measureService.createConstant($compile, $scope, location);
        }else if(data == ParameterType){
            item = measureService.createParameter($compile, $scope, location);
        }else if(data == DataRequestType){
            item = measureService.createDataRequest($compile, $scope, location);
        }


        //plumbService.addElement(item);

    }


}]);