/**
 * Created with JetBrains WebStorm.
 * User: mtolland
 * Date: 8/6/13
 * Time: 3:47 PM
 * To change this template use File | Settings | File Templates.
 */


'use strict'
app.controller('defModalCtrl', ['$scope', 'dialog', 'dataService', 'measureService', function($scope, dialog, dataService, measureService){
    $scope.open = function () {
        $scope.shouldBeOpen = true;
    };

    $scope.close = function () {
        $scope.closeMsg = 'I was closed at: ' + new Date();
        dialog.close();
    };

    $scope.dataRequests = measureService.dataRequests;

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

    $scope.selectDR = function(dr){
        measureService.dataRequest = dr;
    }

    $scope.isActive = function(dr){
        return dr === measureService.dataRequest;
    }

    $scope.opts = {
        backdropFade: true,
        dialogFade:true
    };

}]);

app.controller('templateModalCtrl', ['$scope', 'dialog', 'dataService', 'measureService', function($scope, dialog, dataService, measureService){
    $scope.open = function () {
        $scope.shouldBeOpen = true;
    };

    $scope.close = function () {
        $scope.closeMsg = 'I was closed at: ' + new Date();
        dialog.close();
    };

    $scope.templates = measureService.measureTemplates;

    $scope.findTemplate = function(item){
        if(typeof($scope.searchText) === 'undefined'){
            return true;
        }


        if(item.name.indexOf($scope.searchText) !== -1){
            return true;
        }
        if(item.Guid.indexOf($scope.searchText) !== -1){
            return true;
        }



        return false;
    }

    $scope.selectItem = function(item){
        measureService.measureTemplate = item;
    }

    $scope.isActive = function(item){
        return item === measureService.measureTemplate;
    }

    $scope.opts = {
        backdropFade: true,
        dialogFade:true
    };

}]);
