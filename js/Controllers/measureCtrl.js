/**
 * Created with JetBrains WebStorm.
 * User: igloo15
 * Date: 4/28/13
 * Time: 5:13 PM
 * To change this template use File | Settings | File Templates.
 */

/*
measureService.addMeasure(new Measure("measure1", 1));
measureService.addMeasure(new Measure("measure2", 2));
measureService.addMeasure(new Measure("measureTemp", 4));
measureService.addMeasure(new Measure("measure adsfa dafa adsfasdfa asdfasd", 5));
*/


controllers["measureCtrl"] = function MeasureCtrl($scope, measureService){
    $scope.measures = measureService.measures;


    $scope.addMeasure = function(measure){
        measureService.addMeasure(measure);
    };

    $scope.addNewMeasure = function(){
        measureService.addMeasure(new Measure("temp", measureService.measureIndex));
    };

    $scope.editMeasure = function(measure){
        measureService.selectedMeasure = measure;
    }
}