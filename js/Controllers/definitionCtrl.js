/**
 * Created with JetBrains WebStorm.
 * User: mtolland
 * Date: 7/20/13
 * Time: 4:02 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict'
app.controller('definitionCtrl', ['$scope', '$compile', 'measureService', 'plumbService', 'functionService', function($scope, $compile, measureService, plumbService, functionService){
    /*$("#panArea").panzoom({
        $zoomIn: $(".zoom-in"),
        $zoomOut: $(".zoom-out"),
        $zoomRange: $(".zoom-range"),
        $reset: $(".reset")
    });*/

    $scope.measureservice = measureService;

    $scope.functionservice = functionService;

    $scope.callSelectItem = function(item){
        $scope.selectedForm = item.form;
        $scope.selectedItem = item;
    };

    $scope.selectedItem = {};
    $scope.selectedForm = {};


    $scope.drawAbleItems = [];

    $scope.addItem = function(data, ev){
        var item;
        var element;
        if(data == MeasureComputationType){
            item = measureService.createComputation($scope.functionservice);

            var index = $scope.drawAbleItems.length;

            $scope.drawAbleItems.push(item);

            item.location = new Location(ev.pageX, ev.pageY);
            element = $compile("<measurecomputation class='jsplumb-box' id='"+item.id+"' object='drawAbleItems["+index+"]' selectItem='callSelectItem(item)'></measurecomputation>")($scope);

        }

        plumbService.addElement(item, element);
        /*$('#'+data).clone().attr('id', data+''+componentIndex).removeAttr('ondragstart').removeAttr('draggable').removeClass('component-box').addClass('jsplumb-box').appendTo(ev.target);
        jsPlumb.draggable($('.jsplumb-box'), {containment: 'parent'});
        componentIndex++;*/
    }


}]);