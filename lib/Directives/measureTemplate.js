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
            object:"="
        },

        template:
            "<div class='templateInnerBox'>" +
            "<p></p>" +
            "<p>ID : {{object.id}} </p>" +
            "<p style='white-space:nowrap;'>Name : {{object.name}} </p>" +
            "<button style='float:left;'>Add</button>" +
            "<button style='float:right;'>Edit</button>" +
            "</div>",

        link: function(scope){

        }

    }
}