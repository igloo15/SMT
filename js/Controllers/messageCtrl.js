/**
 * Created with JetBrains WebStorm.
 * User: mtolland
 * Date: 4/29/13
 * Time: 12:04 PM
 * To change this template use File | Settings | File Templates.
 */


controllers["messageCtrl"] = function MeasureCtrl($scope, measureService){
    $scope.selectedMeasure = measureService.selectedMeasure;
}