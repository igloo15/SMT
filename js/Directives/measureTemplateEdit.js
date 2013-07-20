/**
 * Created with JetBrains WebStorm.
 * User: mtolland
 * Date: 4/29/13
 * Time: 11:33 AM
 * To change this template use File | Settings | File Templates.
 */


directives["measuretemplatedit"] = function(){
    return {
        restrict: "E",
        scope: {
            object:"="
        },
        template:
            "<div class='templateEditBox'>" +
                "<p>ID : <input ng-model='object.id'></p>" +
                "<p style='white-space:nowrap;'>Name : <input ng-model='object.name'></p>" +
                "<div class='btn' style='float:left;'>Add</div>" +
                "<div class='btn' style='float:right;'>Edit</div>" +
                "</div>",

        link: function(scope){

        }

    }
}