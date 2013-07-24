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
            selectitem: "&"
        },
        template:
            "<div class='measurecomp' ng-click='selectitem({item:object})'>" +
            //"<div class='input-bar'></div>" +
            "<p>Measure Computation </p>" +
            "<p style=''>Operator : {{object.operator}} </p>" +
            "<p style=''>Function Name : {{object.functionName}} </p>"+

            //"<div class='output-bar'></div>" +
            "</div>",

        link: function(scope, element, attrs){
            element.appendTo($('.mainview-workspace'));
        }

    }
});

app.directive("constant", function(){
    return {
        restrict: "E",
        scope: {
            object:"=",
            selectitem: "&"
        },
        template:
            "<div class='measurecomp' ng-click='selectitem({item:object})'>" +
                "<p>Constant </p>" +
                "<p style=''>Name : {{object.name}} </p>" +
                "<p style=''>Value : {{object.value}} </p>"+
            "</div>",

        link: function(scope, element, attrs){
            element.appendTo($('.mainview-workspace'));
        }

    }
});

app.directive("parameter", function(){
    return {
        restrict: "E",
        scope: {
            object:"=",
            selectitem: "&"
        },
        template:
            "<div class='measurecomp' ng-click='selectitem({item:object})'>" +
                "<p>Paramter </p>" +
                "<p style=''>Name : {{object.name}} </p>" +
                "<p style=''>Value : {{object.value}} </p>"+
                "</div>",

        link: function(scope, element, attrs){
            element.appendTo($('.mainview-workspace'));
        }

    }
});

app.directive("datarequest", function(){
    return {
        restrict: "E",
        scope: {
            object:"=",
            selectitem: "&"
        },
        template:
            "<div class='measurecomp' ng-click='selectitem({item:object})'>" +
                "<p>Data Request </p>" +
                "<p style=''>Name : {{object.name}} </p>" +
                "<p style=''>Value : {{object.value}} </p>"+
                "</div>",

        link: function(scope, element, attrs){
            element.appendTo($('.mainview-workspace'));
        }

    }
});