/**
 * Created with JetBrains WebStorm.
 * User: igloo15
 * Date: 4/28/13
 * Time: 5:18 PM
 * To change this template use File | Settings | File Templates.
 */


directives["measuretemplate"] = function(){
    return {
        restrict: "A",
        scope: {
            object:"=",
            editMeasure: "&"
        },
        template:
            "<div class='templateInnerBox'>" +
            "<p>ID : {{object.id}} </p>" +
            "<p style='white-space:nowrap;'>Name : {{object.name}} </p>" +
            "<div class='btn' style='float:left;'>Add</div>" +
            "<div class='btn' style='float:right;' ng-click='editMeasure({{object}})'>Edit</div>" +
            "</div>",

        link: function(scope, element, attrs){

        }

    }
}