/**
 * Created with JetBrains WebStorm.
 * User: mtolland
 * Date: 4/29/13
 * Time: 12:12 PM
 * To change this template use File | Settings | File Templates.
 */


controllers["workspaceCtrl"] = function MeasureCtrl($scope, measureService){
    $scope.selectedMeasure = measureService.selectedMeasure;

    $scope.showProperties = function(){
        if(measureService.selectedMeasure != null)
            return true;
        else
            return false;
    }
}