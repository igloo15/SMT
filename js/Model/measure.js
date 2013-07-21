/**
 * Created with JetBrains WebStorm.
 * User: igloo15
 * Date: 4/28/13
 * Time: 5:41 PM
 * To change this template use File | Settings | File Templates.
 */


var ConstantType = "CONSTANT";
var ParameterType = "PARAMETER";
var MeasureType = "MEASURE";
var DataRequestType = "DATA_REQUEST";
var ValueType = "VALUE";
var TriggerStartType = "TriggerStart";
var TriggerStopType = "TriggerStop";
var MeasureComputationType = "MeasureComputation";

var modelIndex = 0;
var modelIdPrefix = "measureModel";

function GetModelId(){
    var id = modelIdPrefix+modelIndex;
    modelIndex++;
    return id;
}


function MeasureDefinition(){
    var self = this;
    self.Guid = "";
    self.id = GetModelId();
    self.name = "";
    self.outputUnits = "";
    self.overrideUnits = "";
    self.visibility = "";
    self.systemMeasureTemplateId = "";
    self.description = "";
    self.properties = [];
    self.inputs = [];
    self.triggers = [];
    self.actions = [];


    self.addProperty = function(property){
        self.properties.push(property);
    }

    self.removeProperty = function(id){
        for(var i in self.properties){
            if(self.properties[i].id == id){
                self.properties.splice(i, 1);
            }
        }
    }

    self.addInput = function(input, index){
        self.inputs.splice(index, 0, input);
    }

    self.removeInput = function(id){
        for(var i in self.inputs){
            if(self.inputs[i].id == id){
                self.inputs.splice(i, 1);
            }
        }
    }

    self.addTrigger = function(trigger, index){
        self.triggers.splice(index, 0, trigger);
    }

    self.removeTrigger = function(id){
        for(var i in self.triggers){
            if(self.triggers[i].id == id){
                self.triggers.splice(i, 1);
            }
        }
    }

    self.addAction = function(action){
        self.actions.push(action);
    }

    self.removeAction = function(id){
        for(var i in self.actions){
            if(self.actions[i].id == id){
                self.actions.splice(i, 1);
            }
        }
    }

    return self;
}


function MeasureTemplate(){
    var self = this;
    self.id = GetModelId;
    self.Guid = "";
    self.name = "";
    self.computation = null;
    self.description = "";
    self.properties = [];
    self.parameters = [];
    self.constants = [];

    self.addProperty = function(property){
        self.properties.push(property);
    }

    self.removeProperty = function(id){
        for(var i in self.properties){
            if(self.properties[i].id == id){
                self.properties.splice(i, 1);
            }
        }
    }

    self.addParameter = function(parameter){
        self.parameters.push(parameter);
    }

    self.removeParameter = function(id){
        for(var i in self.parameters){
            if(self.parameters[i].id == id){
                self.parameters.splice(i, 1);
            }
        }
    }

    self.addConstant = function(constant){
        self.constants.push(constant);
    }

    self.removeConstant = function(id){
        for(var i in self.constants){
            if(self.constants[i].id == id){
                self.constants.splice(i, 1);
            }
        }
    }

    return self;
}

function MeasureTrigger(){
    var self = this;
    self.id = GetModelId();
    self.type = "";
    self.resetOnTrigger = false;
    self.measureDefinitionId = "";
    self.updateImmediately = false;
    self.oneOff = false;
    self.triggerType = "";

    return self;
}

function Action(){
    var self = this;
    self.id = GetModelId();
    self.actionName = "";
    self.name = "";
    self.inputs = [];

    self.addInput = function(input, index){
        self.inputs.splice(index, 0, input);
    }

    self.removeInput = function(id){
        for(var i in self.inputs){
            if(self.inputs[i].id == id){
                self.inputs.splice(i, 1);
            }
        }
    }

    return self;
}

function Property(){
    var self = this;
    self.id = GetModelId();
    self.name = "";
    self.value = "";

    return false;
}

function Parameter(){
    var self = this;
    self.id = GetModelId();
    self.name = "";
    self.type = "";
    self.enumName = "";
    self.enumValues = "";
    self.defaultValue = "";
    self.displayUnits = "";
    self.description = "";
    return self;
}

function Constant(){
    var self = this;
    self.id = GetModelId();
    self.name = "";
    self.type = "";
    self.units = "";
    self.value = "";

    return self;
}


function Input(){
    var self = this;
    self.ref = "";
    self.name = "";
    self.inputType = "";
    self.value = "";
    self.type = "";
    self.inputs = [];

    //Assign id and increment index;
    self.id = GetModelId();

    self.addInput = function(input, index){
        self.inputs.splice(index, 0, input);
    }

    self.removeInput = function(id){
        for(var i in self.inputs){
            if(self.inputs[i].id == id){
                self.inputs.splice(i, 1);
            }
        }
    }

    return self;
}

function MeasureComputation(name, operator, functionName){
    var self = this;
    self.operator = operator;
    self.functionName = functionName;
    self.name = name;
    self.operands = [];
    self.id = GetModelId();

    self.addInput = function(input, index){
        self.operands.splice(index, 0, input);
    }
    self.removeInput = function(id){
        for(var i in self.operands){
            if(self.operands[i].id == id){
                self.operands.splice(i, 1);
            }
        }
    }

    self.type = MeasureComputationType;
    return self;
}

function EnvironmentVariable(){
    var self = this;
    self.name = "";
    self.value = "";
    self.id = GetModelId();
    return self;
}

function DataRequest(){
    var self = this;
    self.id = GetModelId();
    self.type = "";
    self.dataSourceRef = "";
    self.where = "";
    self.from ="";
    self.select = "";
    self.Guid = generateGuid();
    self.subscriptionType = "";
    self.units = "";
    self.limit = "";

    return self;
}
