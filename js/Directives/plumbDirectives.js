/**
 * Created with JetBrains WebStorm.
 * User: mtolland
 * Date: 7/21/13
 * Time: 9:06 PM
 * To change this template use File | Settings | File Templates.
 */


app.directive("measurecomputation", function(){
    return {
        restrict: "E",
        scope: {
            object:"=",
            selectItem: "&"
        },
        template:
            //"<div class='measurecomp' ng-click='selectItem({{object}})'>" +
            //"<div class='input-bar'></div>" +
            "<p>Measure Computation </p>" +
            "<p style=''>Operator : {{object.operator}} </p>" +
            "<p style=''>Function Name : {{object.functionName}} </p>",

            //"<div class='output-bar'></div>" +
            //"</div>",

        link: function(scope, element, attrs){
            element.appendTo($('.mainview-workspace'));
        }

    }
});