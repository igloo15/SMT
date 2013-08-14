/**
 * Created with JetBrains WebStorm.
 * User: mtolland
 * Date: 7/23/13
 * Time: 10:14 PM
 * To change this template use File | Settings | File Templates.
 */

app.service('actionService', function(){
    var self = this;
    self.actionPlugins = {
        measureCueAction:{
            name: 'Measure Cueing Action',
            operators:[
                'Remote',
                'Local'
            ]
        }

    };

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


    return self;
});