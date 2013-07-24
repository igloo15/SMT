/**
 * Created with JetBrains WebStorm.
 * User: mtolland
 * Date: 7/23/13
 * Time: 10:08 PM
 * To change this template use File | Settings | File Templates.
 */


app.service('dataService', function(){
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
                'ListInsert'
            ]
        }

    };

    self.getSourceNames = function(){
        return self.functionPlugins;
    };

    self.getProperties = function(name){
        var items = [];

        angular.forEach(self.functionPlugins, function(value, key){
            items.push({key:key, name:value.name})
        });

        return items;
    }

    self.getClasses = function(name){
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