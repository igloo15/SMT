/**
 * Created with JetBrains WebStorm.
 * User: mtolland
 * Date: 7/22/13
 * Time: 3:16 AM
 * To change this template use File | Settings | File Templates.
 */


app.service('functionService', function(){
    var self = this;
    self.functionPlugins = {
        math:{
            name: 'math',
            operators:[
             'Add',
             'Minus',
             'Multiply',
             'Divide',
             'Absolute',
             'AddAll',
             'Identity',
             'SetInsert',
             'ListInsert',
         ]
        }

    };

    self.getFunctionPlugins = function(){
        return self.functionPlugins;
    };

    self.getFunctionPluginNames = function(){
        var items = [];

        angular.forEach(self.functionPlugins, function(value, key){
            items.push({key:key, name:value.name})
        });

        return items;
    }

    self.getFunctionPluginOperators = function(name){
        var items = [];
        if(name !== "")   {
            angular.forEach(self.functionPlugins[name].operators, function(value, key){
                items.push({key:value, name:value})
            });
        }

        return items;
    }


    return self;
});