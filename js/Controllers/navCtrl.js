/**
 * Created with JetBrains WebStorm.
 * User: mtolland
 * Date: 7/20/13
 * Time: 4:14 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict'

app.controller('navCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.navClass = function (page) {
        var currentRoute = $location.path().substring(1) || 'definition';
        return page === currentRoute ? 'active' : '';
    };

}]);