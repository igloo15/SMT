/**
 * Created with JetBrains WebStorm.
 * User: igloo15
 * Date: 4/28/13
 * Time: 6:52 PM
 * To change this template use File | Settings | File Templates.
 */


app.service('measureService', function(){
    var self = this;
    self.measureTemplates = [];
    self.computations = [];
    self.parameters = [];
    self.constants = [];

    self.measureDefinitions = [];

    self.selectedMeasure = null;

    self.createMeasureTemplate = function(name, description){
        var newMeasure = new MeasureTemplate();
        newMeasure.Guid = generateGuid();
        newMeasure.name = name;
        newMeasure.description = description;
        self.addMeasureTemplate(newMeasure);
    }

    self.createParameter = function(name, type, enumName, enumValues, defaultValue, displayUnits, description){
        var newParameter = new Parameter();
        newParameter.name = name;
        newParameter.type = type;
        newParameter.enumName = enumName;
        newParameter.enumValues = enumValues;
        newParameter.defaultValue = defaultValue;
        newParameter.displayUnits = displayUnits;
        newParameter.description = description;
        self.addParameter(newParameter);
    }

    self.createComputation = function(){
        var newComp = new MeasureComputation("", "","");
        self.computations.push(newComp);
    }

    self.createConstant = function(){
        var newConst = new Constant();
        self.constants.push(newConst);
    }

    self.createDataRequest = function(){
        var newDR = new DataR
    }

    self.addParameter = function(parameter){
        self.parameters.push(parameter);
    }

    self.addMeasureTemplate =  function(measure){
        self.measures.push(measure);
    }

    self.selectMeasure = function(measure){
        self.selectedMeasure = measure;
    }

    return self;
});