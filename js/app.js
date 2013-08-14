/**
 * Created with JetBrains WebStorm.
 * User: igloo15
 * Date: 4/28/13
 * Time: 3:00 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

var controllers = {}
var directives = {}

toastr.options ={
    positionClass:'toast-bottom-right',
    fadeIn:300,
    fadeOut:1000,
    timeOut:5000,
    extendTimeOut:1000
};

var app = angular.module("measureApp", ['ui.bootstrap', 'measure.filters', 'measure.directives', 'ngResource', 'ui.sortable']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/template', {templateUrl: 'partials/template.html', controller: 'templateCtrl'});
    $routeProvider.when('/definition', {templateUrl: 'partials/definition.html', controller: 'definitionCtrl'});
    $routeProvider.when('/data', {templateUrl: 'partials/data.html', controller: 'dataCtrl'});
    $routeProvider.otherwise({redirectTo: '/definition'});
}]);

toastr.info('Measure Tool Started');

