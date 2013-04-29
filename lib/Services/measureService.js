/**
 * Created with JetBrains WebStorm.
 * User: igloo15
 * Date: 4/28/13
 * Time: 6:52 PM
 * To change this template use File | Settings | File Templates.
 */


app.service('measureService', function(){
    var self = this;
    self.measures = [];
    self.addMeasure =  function(measure){
        self.measures.push(measure);
    }
})