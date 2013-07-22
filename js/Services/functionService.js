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


    return self;
});