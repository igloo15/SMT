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
    self.dataRequests = [];

    self.measureDefinitions = [];

    self.selectedMeasure = null;

    self.createMeasureTemplate = function(name, description){
        var newMeasure = new MeasureTemplate();
        newMeasure.Guid = generateGuid();
        newMeasure.name = name;
        newMeasure.description = description;
        self.addMeasureTemplate(newMeasure);
        return newMeasure;
    };

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
        return newParameter;
    };

    self.createComputation = function(functionService){
        var newComp = new MeasureComputation(functionService);
        self.computations.push(newComp);
        return newComp;
    };

    self.createConstant = function(){
        var newConst = new Constant();
        self.constants.push(newConst);
        return newConst;
    };

    self.createDataRequest = function(){
        var newDR = new DataRequest();
        self.dataRequests.push(newDR);
        return newDR;
    };

    self.addParameter = function(parameter){
        self.parameters.push(parameter);
    };

    self.addMeasureTemplate =  function(measure){
        self.measures.push(measure);
    };

    self.selectMeasure = function(measure){
        self.selectedMeasure = measure;
    };

    return self;
});