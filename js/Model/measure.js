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


var booleanOptions = [
    {key:true,
     name: "True"},
    {key:false,
        name: "False"}
];

var typeOptions = [
    {key:"double",
        name: "Double"},
    {key:"int32",
        name: "Integer"},
    {key:"string",
        name: "String"},
    {key:"measurement",
        name: "Measure"},
    {key:"boolean",
        name: "Boolean"}
];

var inputTypeOptions = [
    {key:"MEASURE",
        name: "Measure"},
    {key:"PARAMETER",
        name: "Parameter"},
    {key:"CONSTANT",
        name: "Constant"},
    {key:"DATA_REQUEST",
        name: "Data Request"},
    {key:"VALUE",
        name: "Value"}
];

var visibilityOptions = [
    {key:"SubMeasure",
        name: "SubMeasure"},
    {key:"MainMeasure",
        name: "Main Measure"},
    {key:"HIDDEN",
        name: "Hidden Measure"}
];

var environmentVariableOptions = [
    {key:"PHASE",
        name: "Phase"},
    {key:"TIMING_SIMTIME",
        name: "Current Simtime"},
    {key:"TIMING_CURRENT_MEASURE_RUNNING_TIME",
        name: "Current Measure Running Time"},
    {key:"TIMING_TOTAL_MEASURE_RUNNING_TIME",
        name: "Total Measure Running Time"},
    {key:"TIMING_TOTAL_MEASURE_STOPPED_TIME",
        name: "Total Measure Stopped Time"},
    {key:"TIMING_LAST_MEASURE_STOPPED_TIME",
        name: "Last Measure Stopped Time"},
    {key:"TIMING_TOTAL_MEASURE_STARTED_TIME",
        name: "Last Measure Started Time"}
];

var datasourceQueryTypeOptions = [
    {key:"ENTITY",
        name: "Entity"},
    {key:"INTERACTION",
        name: "Interaction"}
]


var modelIndex = 0;
var modelIdPrefix = "measureModel";

function GetModelId(){
    var id = modelIdPrefix+modelIndex;
    modelIndex++;
    return id;
}


function Location(x, y){
    var self = this;
    self.x = x;
    self.y = y;
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
    self.location = "";

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
    self.Guid = generateGuid();
    self.name = "";
    self.computation = null;
    self.description = "";
    self.properties = [];
    self.parameters = [];
    self.constants = [];
    self.location = "";

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

function Action(actionService){
    var self = this;
    self.id = GetModelId();
    self.Guid = generateGuid();
    self.actionName = "";
    self.operator = "";
    self.name = "";
    self.inputs = [];
    self.location = "";

    self.getActionOperators = function(item){
        return actionService.getActionOperators(item);
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

    self.form = [
        new Form('ID', 'id', 'read', true, null, null),
        new Form('Guid', 'Guid', 'text', false, null, null),
        new Form('Name', 'name', 'text', true, null, null),
        new Form('Action Name', 'actionName', 'select', true, actionService.getActionNames(), null),
        new Form('Operator', 'operator', 'functionselect', true, 'getActionOperators', 'actionName')
    ]


    return self;
}

function Property(){
    var self = this;
    self.id = GetModelId();
    self.name = "";
    self.value = "";

    return self;
}

function Parameter(){
    var self = this;
    self.id = GetModelId();
    self.Guid = generateGuid();
    self.name = "";
    self.type = "";
    self.enumName = "";
    self.enumValues = "";
    self.defaultValue = "";
    self.displayUnits = "";
    self.description = "";
    self.location = "";


    self.form = [
        new Form('ID', 'id', 'read', true, null, null),
        new Form('Guid', 'Guid', 'text', false, null, null),
        new Form('Type', 'type', 'select', true, typeOptions, null),
        new Form('enumName', 'enumName', 'text', true, null, null),
        new Form('enumValues', 'enumValues', 'text', true, null, null),
        new Form('defaultValue', 'defaultValue', 'text', true, null, null),
        new Form('displayUnits', 'displayUnits', 'text', true, null, null),
        new Form('description', 'description', 'largetext', true, null, null)
    ]

    return self;
}

function Constant(){
    var self = this;
    self.id = GetModelId();
    self.name = "";
    self.type = "";
    self.units = "";
    self.value = "";


    self.form = [
        new Form('ID', 'id', 'read', true, null, null),
        new Form('Name', 'name', 'text', false, null, null),
        new Form('Type', 'type', 'select', true, typeOptions, null),
        new Form('Units', 'units', 'text', true, null, null),
        new Form('Value', 'value', 'text', true, null, null)
    ];

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

function MeasureComputation(functionService, plumbService){
    var self = this;
    self.operator = "";
    self.functionName = "";
    self.name = "";
    self.operands = [];
    self.id = GetModelId();
    self.Guid = generateGuid();
    self.functionPlugins = functionService;
    self.plumbservice = plumbService;
    self.location = "";
    self.getFunctionPluginOperators = function(item){
        return functionService.getFunctionPluginOperators(item);
    }

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

    self.form = [
        new Form('ID', 'id', 'read', true, null, null),
        new Form('Guid', 'Guid', 'read', false, null, null),
        new Form('Name', 'name', 'text', true, null, null),
        new Form('Function Name', 'functionName', 'select', true, functionService.getFunctionPluginNames(), null),
        new Form('Operator', 'operator', 'functionselect', true, 'getFunctionPluginOperators', 'functionName')

    ]

    return self;
}

function EnvironmentVariable(){
    var self = this;
    self.id = GetModelId();
    self.Guid = generateGuid();
    self.name = "";
    self.value = "";

    self.location = "";

    self.form = [
        new Form('ID', 'id', 'read', true, null, null),
        new Form('Guid', 'Guid', 'read', false, null, null),
        new Form('Name', 'name', 'text', true, null, null),
        new Form('Value', 'value', 'select', true, environmentVariableOptions, null)
    ]

    return self;
}

function DataRequest(dataSourceService){
    var self = this;
    self.id = GetModelId();
    self.Guid = generateGuid();
    self.type = "";
    self.dataSourceRef = "";
    self.where = "";
    self.from ="";
    self.select = "";
    self.subscriptionType = "";
    self.units = "";
    self.limit = "";
    self.location = "";

    self.getClasses = function(item){
        return dataSourceService.getClasses(item);
    }

    self.getProperties = function(item){
        return dataSourceService.getProperties(item);
    }


    self.form = [
        new Form('ID', 'id', 'read', true, null, null),
        new Form('Guid', 'Guid', 'read', false, null, null),
        new Form('Data Source', 'dataSourceRef', 'select', true, dataSourceService.getSourceNames(), null),
        new Form('From', 'from', 'functionselect', true, 'getClasses', 'dataSourceRef'),
        new Form('Select', 'select', 'functionselect', true, 'getProperties', 'from')
    ]

    return self;
}

function Form(label, model, widget, required, options, observableFunction){
    var self = this;
    self.label = label;
    self.model = model;
    self.widget = widget;
    self.required = required;
    self.options = options;
    self.observable = observableFunction;
}
