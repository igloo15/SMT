/**
 * Created with JetBrains WebStorm.
 * User: mtolland
 * Date: 8/20/13
 * Time: 7:49 PM
 * To change this template use File | Settings | File Templates.
 */



app.service("smtService", function($http, $timeout){
    var self = this;
    var functionPluginUrl = '../../api/FunctionPlugins/';
    var actionPluginUrl = '../../api/ActionPlugins/';
    var creationUrl = '../../api/XmlCreation/';

    self.getFunctionPluginNames = function(){
        return $http.get(functionPluginUrl+'GetPluginList');
    }

    self.getFunctionPluginInputs = function(name){
        return $http.get(functionPluginUrl+'GetPluginInputs?pluginName='+name);
    }

    self.getFunctionPluginOperators = function(name){
        return $http.get(functionPluginUrl+'GetPluginOperations?pluginName='+name);
    }

    self.getActionPluginNames = function(){
        return $http.get(actionPluginUrl+'GetActionList');
    }

    self.getActionPluginOperators = function(name){
        return $http.get(actionPluginUrl+'GetActionOperators?pluginName='+name);
    }

    self.saveFileToXml = function(object, filePath){
        return $http.post(creationUrl+'CreateJsonXmlFile?filePath='+filePath, object);
    }


    return self;
});

