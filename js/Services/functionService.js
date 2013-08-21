/**
 * Created with JetBrains WebStorm.
 * User: mtolland
 * Date: 7/22/13
 * Time: 3:16 AM
 * To change this template use File | Settings | File Templates.
 */


app.service('functionService', function(smtService){
    var self = this;
    self.functionPlugins = {};

    smtService.getFunctionPluginNames().success(function(data, status, headers, config){
        for(var i in data){
            var plugName = data[i];
            var newPlugin = new functionPlugin(plugName);
            self.functionPlugins[plugName]=newPlugin;
        }
        console.log(data);
    })
    .error(function(data, status, headers, config){
        toastr.error('Could not connect to function plugin service');
    });

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

    function functionPlugin(name){
        var functionPlug = this;
        functionPlug.name = name;
        smtService.getFunctionPluginOperators(name).success(function(data, status, headers, config){
            functionPlug.operators = data;
        })
        .error(function(data, status, headers, config){
            toastr.error('could not get operators for function plugin '+functionPlug.name);
        });

        return functionPlug;
    }


    return self;
});