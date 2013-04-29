/**
 * Created with JetBrains WebStorm.
 * User: igloo15
 * Date: 4/28/13
 * Time: 5:41 PM
 * To change this template use File | Settings | File Templates.
 */


var ConstantType = "Constant";
var ParameterType = "Parameter";
var MeasureComputationType = "MeasureComputation";

function Measure(name, id){
    var self = this;
    self.id = id;
    self.name = name;
    self.computation = null;
    self.parameters = [];
    self.constants = [];

    self.addParameter = function(parameter){
        self.parameters.push(parameter);
    }

    self.addConstant = function(constant){
        self.constants.push(constant);
    }
}

function Parameter(name){
    var self = this;
    self.name = name;
    self.type = ParameterType;
}

function ParameterValue(name, value, inputType){
    var self = this;
    self.name = name;
    self.value = value;
    self.inputType = inputType;
}

function Constant(name, value){
    self.name = name;
    self.value = value;
    self.type = ConstantType;
}

function MeasureComputation(name, operator, functionName){
    var self = this;
    self.operator = operator;
    self.functionName = functionName;
    self.name = name;
    self.inputs = [];

    self.addInput = function(input){
        self.inputs.push(input);
    }

    self.type = MeasureComputationType;
}