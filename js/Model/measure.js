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

    self.addDefinition = function(defHeader){
        self.definitions.push(defHeader);
    }

    self.addParameter = function(parameterHeader){
        self.parameters.push(parameterHeader);
    }

    self.addConstant = function(constantHeader){
        self.constants.push(constantHeader);
    }

    self.addTrigger = function(triggerHeader){
        self.triggers.push(triggerHeader);
    }

    self.addAction = function(actionHeader){
        self.actions.push(actionHeader);
    }

    self.form = [
        new Form('ID', 'id', 'read', true, null, null),
        new Form('Guid', 'Guid', 'read', false, null, null),
        new Form('Name', 'name', 'text', true, null, null),
        new Form('Description', 'description', 'largetext', true, null, null)
    ]

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

function Action(actionService){
    var self = this;

    self.Guid = generateGuid();
    self.id = self.Guid;
    self.actionName = "";
    self.operator = "";
    self.name = "";
    self.inputs = [];



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

function Constant(){
    var self = this;
    self.Guid = generateGuid();
    self.id = "";
    self.type = "";
    self.units = "";
    self.value = "";

    return self;
}

function MeasureComputation(){
    var self = this;
    self.operator = "";
    self.functionName = "";
    self.name = "";
    self.operands = [];
    self.Guid = generateGuid();

    return self;
}

function EnvironmentVariable(){
    var self = this;
    self.Guid = generateGuid();
    self.name = "";
    self.value = "";

    return self;
}

function DataRequest(){
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
