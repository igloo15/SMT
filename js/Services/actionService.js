/**
 * Created with JetBrains WebStorm.
 * User: mtolland
 * Date: 7/23/13
 * Time: 10:14 PM
 * To change this template use File | Settings | File Templates.
 */

app.service('actionService', function(smtService){
    var self = this;
    self.actionPlugins = {

    };

    smtService.getActionPluginNames().success(function(data, status, headers, config){
        for(var i in data){
            var plugName = data[i];
            var newPlugin = new actionPlugin(plugName);
            self.actionPlugins[plugName]=newPlugin;
        }
        console.log(data);
    })
        .error(function(data, status, headers, config){
            toastr.error('Could not connect to function plugin service');
        });

    self.getActionPlugins = function(){
        return self.actionPlugins;
    };

    self.getActionNames = function(){
        var items = [];

        angular.forEach(self.actionPlugins, function(value, key){
            items.push({key:key, name:value.name})
        });

        return items;
    }

    self.getActionOperators = function(name){
        var items = [];
        if(name !== "")   {
            angular.forEach(self.actionPlugins[name].operators, function(value, key){
                items.push({key:value, name:value})
            });
        }

        return items;
    }

    function actionPlugin(name){
        var actionPlug = this;
        actionPlug.name = name;
        smtService.getFunctionPluginOperators(name).success(function(data, status, headers, config){
            actionPlug.operators = data;
        })
        .error(function(data, status, headers, config){
            toastr.error('could not get operators for function plugin '+actionPlug.name);
        });

        return actionPlug;
    }


    return self;
});