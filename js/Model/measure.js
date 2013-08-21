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
var EnvironmentVariableType = "ENVIRONMENTVARIABLE";
var TriggerType = "TRIGGER";
var ActionType = "ACTION";
var TriggerStartType = "TriggerStart";
var TriggerStopType = "TriggerStop";
var MeasureComputationType = "MeasureComputation";


var booleanOptions = [
    {key:true,
     name: "True"},
    {key:false,
        name: "False"}
];

var triggerOptions = [
    {key:TriggerStartType,
        name: TriggerStartType},
    {key:TriggerStopType,
        name: TriggerStopType}
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

var datatypeOptions = [
    {key:"double",
        name: "Double"},
    {key:"int32",
        name: "Integer"},
    {key:"string",
        name: "String"},
    {key:"boolean",
        name: "Boolean"},
    {key:"complex",
        name: "Complex Type"}
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

var displayFormatOptions = [
    {key:"Standard",
        name: "Standard"},
    {key:"LatLong",
        name: "Latitude Longitude"}

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
    return self;
}

function MeasureFile(){
    var self = this;
    self.name = '';
    self.id = GetModelId();
    self.Guid = generateGuid();
    self.triggers = [];
    self.actions = [];
    self.constants = [];
    self.parameters = [];
    self.definitions = [];
    self.description = '';

    self.form = [
        new Form('ID', 'id', 'read', true, null, null),
        new Form('Guid', 'Guid', 'read', false, null, null),
        new Form('Name', 'name', 'text', true, null, null),
        new Form('Description', 'description', 'largetext', true, null, null)
    ]

    return self;
}

function MeasureDefinitionHeader(template){
    var self = this;
    self.item = new MeasureDefinition(template);
    self.id = GetModelId();

    self.addProperty = function(property){
        self.item.properties.push(property);
    }

    self.removeProperty = function(id){
        for(var i in self.item.properties){
            if(self.item.properties[i].id == id){
                self.item.properties.splice(i, 1);
            }
        }
    }

    self.addTrigger = function(trigger, index){
        self.item.triggers.splice(index, 0, trigger);
    }

    self.removeTrigger = function(id){
        for(var i in self.item.triggers){
            if(self.item.triggers[i].id == id){
                self.item.triggers.splice(i, 1);
            }
        }
    }

    self.addAction = function(action){
        self.item.actions.push(action);
    }

    self.removeAction = function(id){
        for(var i in self.item.actions){
            if(self.item.actions[i].id == id){
                self.item.actions.splice(i, 1);
            }
        }
    }

    self.form = [
        new Form('Guid', 'Guid', 'read', false, null, null),
        new Form('System Measure Template', 'systemMeasureTemplateId', 'read', true, null, null),
        new Form('Name', 'name', 'text', true, null, null),
        new Form('Visibility', 'visibility', 'select', true, visibilityOptions, null),
        new Form('Output Units', 'outputUnits', 'text', true, null, null),
        new Form('Override Units', 'overrideUnits', 'text', true, null, null),
        new Form('Description', 'description', 'largetext', true, null, null)
    ];
    return self;
}


function MeasureDefinition(template){
    var self = this;
    self.Guid = generateGuid();
    self.id = self.Guid;
    self.name = "";
    self.outputUnits = "";
    self.overrideUnits = "";
    self.visibility = "";
    self.systemMeasureTemplateId = template.Guid;
    self.systemMeasureTemplate = template;
    self.description = "";
    self.properties = [];
    self.inputs = [];
    self.triggers = [];
    self.actions = [];

    return self;
}


function MeasureTemplateHeader(){
    var self = this;
    self.item = new MeasureTemplate();
    self.id = GetModelId();
    self.computations = [];
    self.environmentvars = [];
    self.dataRequests = [];
    self.newParam = true;

    self.form = [
        new Form('Guid', 'Guid', 'read', false, null, null),
        new Form('Name', 'name', 'text', true, null, null),
        new Form('Time Format', 'timeFormat', 'text', true, null, null),
        new Form('Display Format', 'displayFormat', 'select', true, displayFormatOptions, null),
        new Form('Units', 'units', 'text', true, null, null),
        new Form('One Off', 'oneOff', 'select', true, booleanOptions, null),
        new Form('Description', 'description', 'largetext', true, null, null)
    ]

    self.addProperty = function(property){
        self.item.properties.push(property);
    }

    self.removeProperty = function(id){
        for(var i in self.item.properties){
            if(self.item.properties[i].id == id){
                self.item.properties.splice(i, 1);
            }
        }
    }

    self.addParameter = function(parameter){
        self.newParam = true;
        self.item.parameters.push(parameter);
    }

    self.removeParameter = function(id){
        self.newParam = true;
        for(var i in self.item.parameters){
            if(self.item.parameters[i].id == id){
                self.item.parameters.splice(i, 1);
            }
        }
    }

    self.addConstant = function(constant){
        self.item.constants.push(constant);
    }

    self.removeConstant = function(id){
        for(var i in self.item.constants){
            if(self.item.constants[i].id == id){
                self.item.constants.splice(i, 1);
            }
        }
    }

    return self;
}


function MeasureTemplate(){
    var self = this;
    self.Guid = generateGuid();
    self.id = self.Guid;
    self.name = "";
    self.computation = null;
    self.description = "";
    self.properties = [];
    self.parameters = [];
    self.constants = [];
    self.timeFormat = '';
    self.displayFormat = '';
    self.precision = '';
    self.units = '';
    self.oneOff = '';

    return self;
}


function MeasureTriggerHeader(){
    var self = this;
    self.id = GetModelId();
    self.item = new MeasureTrigger();

    self.form = [
        new Form('ID', 'id', 'read', true, null, null),
        new Form('Guid', 'Guid', 'read', false, null, null),
        new Form('Type', 'type', 'read', true, null, null),
        new Form('Reset On Trigger', 'resetOnTrigger', 'select', true, booleanOptions, null),
        new Form('Update Immediately', 'updateImmediately', 'select', true, booleanOptions, null),
        new Form('One Off', 'oneOff', 'select', true, booleanOptions, null),
        new Form('Trigger Type', 'triggerType', 'select', true, triggerOptions, null)
    ];

    return self;
}


function MeasureTrigger(){
    var self = this;

    self.Guid = generateGuid();
    self.id = self.Guid;
    self.type = "Measure";
    self.resetOnTrigger = false;
    self.measureDefinitionId = "";
    self.updateImmediately = false;
    self.oneOff = false;
    self.triggerType = "";


    return self;
}

function ActionHeader(actionService){
    var self = this;
    self.item = new Action(actionService);
    self.id = GetModelId();

    self.form = [
        new Form('ID', 'id', 'read', true, null, null),
        new Form('Guid', 'Guid', 'read', false, null, null),
        new Form('Name', 'name', 'text', true, null, null),
        new Form('Action Name', 'actionName', 'select', true, actionService.getActionNames(), null),
        new Form('Operator', 'operator', 'functionselect', true, 'getActionOperators', 'actionName')
    ]

    return self;
}

function Action(actionService){
    var self = this;

    self.Guid = generateGuid();
    self.id = self.Guid;
    self.actionName = "";
    self.operator = "";
    self.name = "";
    self.inputs = [];

    self.getActionOperators = function(item){
        return actionService.getActionOperators(item);
    }

    return self;
}



function ParameterHeader(){
    var self = this;
    self.item = new Parameter();
    self.id = GetModelId();

    self.form = [
        new Form('Guid', 'Guid', 'read', false, null, null),
        new Form('Name', 'id', 'text', false, null, null),
        new Form('Type', 'type', 'select', true, typeOptions, null),
        new Form('enumName', 'enumName', 'text', true, null, null),
        new Form('enumValues', 'enumValues', 'text', true, null, null),
        new Form('defaultValue', 'defaultValue', 'text', true, null, null),
        new Form('displayUnits', 'displayUnits', 'text', true, null, null),
        new Form('description', 'description', 'largetext', true, null, null)
    ]

    return self;
}


function Parameter(){
    var self = this;
    self.Guid = generateGuid();
    self.id = '';
    self.type = "";
    self.enumName = "";
    self.enumValues = "";
    self.defaultValue = "";
    self.displayUnits = "";
    self.description = "";




    return self;
}

function ConstantHeader(){
    var self = this;
    self.item = new Constant();
    self.id = GetModelId();
    self.form = [
        new Form('Guid', 'Guid', 'read', false, null, null),
        new Form('Name', 'id', 'text', false, null, null),
        new Form('Type', 'type', 'select', true, typeOptions, null),
        new Form('Units', 'units', 'text', true, null, null),
        new Form('Value', 'value', 'text', true, null, null)
    ];

    return self;
}

function Constant(){
    var self = this;
    self.Guid = generateGuid();
    self.id = "";
    self.type = "";
    self.units = "";
    self.value = "";

    return self;
}


function MeasureComputationHeader(functionService){
    var self = this;
    self.item = new MeasureComputation(functionService);
    self.id = GetModelId();

    self.form = [
        new Form('Guid', 'Guid', 'read', false, null, null),
        new Form('Name', 'name', 'text', true, null, null),
        new Form('Function Name', 'functionName', 'select', true, functionService.getFunctionPluginNames(), null),
        new Form('Operator', 'operator', 'functionselect', true, 'getFunctionPluginOperators', 'functionName')
    ]

    return self;
}

function MeasureComputation(functionService){
    var self = this;
    self.operator = "";
    self.functionName = "";
    self.name = "";
    self.operands = [];
    self.Guid = generateGuid();

    self.getFunctionPluginOperators = function(item){
        return functionService.getFunctionPluginOperators(item);
    }

    return self;
}

function EnvironmentVariableHeader(){
    var self = this;
    self.item = new EnvironmentVariable();
    self.id = GetModelId();
    self.form = [
        new Form('Guid', 'Guid', 'read', false, null, null),
        new Form('Name', 'name', 'text', true, null, null),
        new Form('Value', 'value', 'select', true, environmentVariableOptions, null)
    ]
    return self;
}


function EnvironmentVariable(){
    var self = this;
    self.Guid = generateGuid();
    self.name = "";
    self.value = "";

    return self;
}

function DataRequestHeader(){
    var self = this;
    self.id = GetModelId();
    self.item = new DataRequest();
    self.selectItems = [];
    self.newParams = true;

    self.addProperty = function(dataModelName, className, propName){
        if(self.item.from !== className && self.selectItems.length> 0){
            toastr.error("cannot add a property from class "+className+" when class "+self.from+" is already selected.");
            return;
        }

        if(self.item.dataSourceRef !== dataModelName && self.selectItems.length> 0){
            toastr.error("cannot add a property from data model "+dataModelName+" when data model "+self.dataSourceRef+" is already selected.");
            return;
        }

        self.item.from = className;
        self.item.dataSourceRef = dataModelName;
        self.selectItems.push(propName);

        updateSelect();

    }

    self.removeProperty = function(propName){
        self.selectItems = self.selectItems.filter(function(item){
            return item != propName;
        });

        if(self.selectItems.length === 0){
            self.from = '';
            self.dataSourceRef = '';
        }

        updateSelect();
    }

    function updateSelect(){
        self.item.select = '';
        for(var i in self.selectItems){
            if(i > 0)
                self.select += ', ';
            self.item.select += self.selectItems[i];
        }
    }

    self.addParameter = function(parameter){
        self.item.parameters.push(parameter);
        self.newParam = true;
    }

    self.removeParameter = function(id){
        for(var i in self.item.parameters){
            if(self.item.parameters[i].id == id){
                self.item.parameters.splice(i, 1);
            }
        }
        self.newParam = true;
    }

    self.form = [
        new Form('ID', 'id', 'read', true, null, null),
        new Form('Guid', 'Guid', 'read', false, null, null),
        new Form('Name', 'name', 'text', false, null, null),
        new Form('Data Source', 'dataSourceRef', 'read', true, null, null),
        new Form('From', 'from', 'read', true, null, null),
        new Form('Select', 'select', 'read', true, null, null),
        new Form('Where', 'where', 'largetext', true, null, null)
    ]
    return self;
}


function DataRequest(dataSourceService){
    var self = this;
    self.Guid = generateGuid();
    self.id = self.Guid;
    self.name = "";
    self.parameters = [];

    self.type = "";
    self.dataSourceRef = "";
    self.where = "";
    self.from ="";
    self.select = '';

    self.subscriptionType = "";
    self.units = "";
    self.limit = "";

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

function Property(){
    var self = this;
    self.id = GetModelId();
    self.name = "";
    self.value = "";

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
