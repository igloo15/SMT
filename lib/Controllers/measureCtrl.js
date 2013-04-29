/**
 * Created with JetBrains WebStorm.
 * User: igloo15
 * Date: 4/28/13
 * Time: 5:13 PM
 * To change this template use File | Settings | File Templates.
 */




controllers["measureCtrl"] = function MeasureCtrl($scope, measureService){
    $scope.measures = measureService.measures;

    measureService.addMeasure(new Measure("measure1", 1));
    measureService.addMeasure(new Measure("measure2", 2));
    measureService.addMeasure(new Measure("measureTemp", 4));
    measureService.addMeasure(new Measure("measure adsfa dafa adsfasdfa asdfasd", 5));
    measureService.addMeasure(new Measure("measure3", 6));
    measureService.addMeasure(new Measure("measure3", 7));
    measureService.addMeasure(new Measure("measure3", 8));
    measureService.addMeasure(new Measure("measure3", 9));
    measureService.addMeasure(new Measure("measure3", 10));
    measureService.addMeasure(new Measure("measure3", 11));
    measureService.addMeasure(new Measure("measure3", 12));

    $scope.addTemplate = function(measure){

    }

    $scope.addMeasure = function(measure){
        measureService.addMeasure(measure);
    };
}