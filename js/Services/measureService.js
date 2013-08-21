/**
 * Created with JetBrains WebStorm.
 * User: igloo15
 * Date: 4/28/13
 * Time: 6:52 PM
 * To change this template use File | Settings | File Templates.
 */


app.service('measureService',['plumbServiceNew', 'actionService', 'functionService', 'smtService', function(plumbService, actionService, functionService, smtService){
    var self = this;

    self.measureTemplates = [];
    self.measureFiles = [];
    self.dataRequests = [];

    self.guidLookup = {};

    self.plumbservice = plumbService;
    self.actionservice = actionService;
    self.functionservice = functionService;

    self.measureTemplate = null;
    self.defObject = null;
    self.dataRequest = null;

    self.currentView = {};

    self.setMeasureTemplate = function(template){
        self.measureTemplate = template;
        self.currentView = template;
        smtService.saveFileToXml(self.measureTemplate.item, '');
    }

    self.setDefObject = function(defObject){
        self.defObject = defObject;
        self.currentView = defObject;
    }

    self.createItem = function(itemType){
        var item;
        if(itemType == MeasureComputationType){
            item = self.createComputation();
        }else if(itemType == ConstantType){
            item = self.createConstant();
        }else if(itemType == ParameterType){
            item = self.createParameter();
        }else if(itemType == DataRequestType){
            item = self.createDataRequest();
        }else if(itemType == EnvironmentVariableType){
            item = self.createEnvironmentVariable();
        }else if(itemType == TriggerType){
            item = self.createMeasureTrigger();
        }else if(itemType == ActionType){
            item = self.createAction();
        }
        return item;
    }

    self.createDefFile = function(){
        var defTemp = new MeasureFile();
        self.measureFiles.push(defTemp);

        return defTemp;
    }

    self.createMeasureTemplate = function(){

        var newMeasure = new MeasureTemplateHeader();
        self.measureTemplates.push(newMeasure);

        return newMeasure;
    };



    self.createMeasureDefinition = function(template){
        var item = new MeasureDefinitionHeader(template);

        item.plumbObject = plumbService.createObject(item);
        item.plumbObject.setup = function(){
            item.plumbObject.setSourceEndpoint(new plumbService.createSoleSourceEndpoint(-1));
            item.plumbObject.addTargetEndpoint(new plumbService.createTriggerEndpoint(-1), TARGET_TRIGGER_TYPE);
            item.plumbObject.addTargetEndpoint(new plumbService.createActionEndpoint(-1), TARGET_ACTION_TYPE);

            self.currentView.addDefinition(item);
        }


        return item;
    }

    self.createParameter = function(){
        checkMeasure();


        var item = new ParameterHeader();

        item.plumbObject = plumbService.createObject(item);

        item.plumbObject.setup = function(){
            item.plumbObject.setSourceEndpoint(new plumbService.createSoleSourceEndpoint(-1));
            self.currentView.addParameter(item);
        }

        return item;
    };

    self.createComputation = function(){
        checkMeasureTemplate();


        var item = new MeasureComputationHeader(self.functionservice);
        item.plumbObject = plumbService.createObject(item);

        item.plumbObject.setup = function(){
            item.plumbObject.addTargetEndpoint(new plumbService.createInputEndpoints(0.5,0.0, -1), TARGET_INPUT_TYPE);
            item.plumbObject.setSourceEndpoint(new plumbService.createSoleSourceEndpoint(1));

            self.currentView.addComputation(item);
        }



        return item;
    };

    self.createConstant = function(){
        checkMeasure();

        var item = new ConstantHeader();

        item.plumbObject = plumbService.createObject(item);

        item.plumbObject.setup = function(){
            item.plumbObject.setSourceEndpoint(new plumbService.createSoleSourceEndpoint(-1));
            self.currentView.addConstant(item);
        }

        return item;
    };

    self.createDataRequest = function(){
        checkMeasureTemplate();

        var item = new DataRequestHeader();

        item.plumbObject = plumbService.createObject(item);

        item.plumbObject.setup = function(){
            item.plumbObject.setSourceEndpoint(new plumbService.createSoleSourceEndpoint(-1));
            self.currentView.addDataRequest(item);
        }

        self.dataRequests.push(item);

        return item;
    };

    self.createEnvironmentVariable = function(){
        checkMeasureTemplate();

        var item = new EnvironmentVariableHeader();
        item.plumbObject = plumbService.createObject(item);

        item.plumbObject.setup = function(){
            item.plumbObject.setSourceEndpoint(new plumbService.createSoleSourceEndpoint(-1));

            self.currentView.addEnvironmentVar(item);
        }

        return item;
    };

    self.createInput = function(item, index, inputType, ref, name, type, value){
        var newItem = new Input();
        newItem.inputType = inputType;
        newItem.ref = ref;
        newItem.name = name;
        newItem.type = type;
        newItem.value = value;

        item.addInput(item, index);
    }

    self.createAction = function(){
        checkMeasureDefinition();

        var item = new ActionHeader(actionService);
        item.plumbObject = plumbService.createObject(item);
        item.plumbObject.setup = function(){
            item.plumbObject.setSourceEndpoint(new plumbService.createSoleSourceEndpoint(-1, 'action'));
            item.plumbObject.addTargetEndpoint(new plumbService.createInputEndpoints(0.5, 0.0, -1));

            self.currentView.addAction(item);
        }

        return item;

    }

    self.createMeasureTrigger = function(){
        var item = new MeasureTriggerHeader();
        item.plumbObject = plumbService.createObject(item);
        item.plumbObject.setup = function(){
            item.plumbObject.setSourceEndpoint(new plumbService.createSoleSourceEndpoint(1, 'trigger'));
            item.plumbObject.addTargetEndpoint(new plumbService.createInputEndpoints(0.5, 0.0, 1));
            self.currentView.addTriggers(item);
        }

        return item;
    }



    function checkMeasure(){
        checkMeasureDefinition();
        checkMeasureTemplate();
    }

    function checkMeasureTemplate(){
        if(self.measureTemplate === null){
            self.measureTemplate = self.createMeasureTemplate();
        }
    }

    function checkMeasureDefinition(){
        if(self.measureDefinition === null){
            self.measureDefinition = self.createMeasureDefinition();
        }
    }

    function MeasureTemplateHeader(){
        var self = this;
        self.hpmlObject = new MeasureTemplate();
        self.id = GetModelId();
        self.computations = [];
        self.environmentvars = [];
        self.dataRequests = [];
        self.parameters = [];
        self.constants = [];
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
            self.hpmlObject.properties.push(property);
        }

        self.removeProperty = function(id){
            for(var i in self.item.properties){
                if(self.hpmlObject.properties[i].id == id){
                    self.hpmlObject.properties.splice(i, 1);
                }
            }
        }

        self.addParameter = function(parameterHeader){
            self.newParam = true;
            self.hpmlObject.parameters.push(parameterHeader.hpmlObject);
            self.parameters.push(parameterHeader);
        }

        self.removeParameter = function(id){
            self.newParam = true;
            for(var i in self.hpmlObject.parameters){
                if(self.hpmlObject.parameters[i].id == id){
                    self.hpmlObject.parameters.splice(i, 1);
                    self.parameters.splice(i, 1);
                }
            }
        }

        self.addConstant = function(constantHeader){
            self.hpmlObject.constants.push(constantHeader.hpmlObject);
            self.constants.push(constantHeader);
        }

        self.removeConstant = function(id){
            for(var i in self.item.constants){
                if(self.hpmlObject.constants[i].id == id){
                    self.hpmlObject.constants.splice(i, 1);
                    self.constants.splice(i, 1);
                }
            }
        }

        self.addEnvironmentVar = function(envVarHeader){
            self.environmentvars.push(envVarHeader);
        }

        self.addComputation = function(computationHeader){
            self.computations.push(computationHeader);
        }

        self.addDataRequest = function(drHeader){
            self.dataRequests.push(drHeader);
        }

        return self;
    }

    function MeasureDefinitionHeader(templateHeader){
        var self = this;
        self.hpmlObject = new MeasureDefinition(templateHeader.hpmlObject);
        self.systemMeasureTemplate = templateHeader;
        self.id = GetModelId();
        self.triggers = [];
        self.actions = [];

        self.addProperty = function(property){
            self.hpmlObject.properties.push(property);
        }

        self.removeProperty = function(id){
            for(var i in self.hpmlObject.properties){
                if(self.hpmlObject.properties[i].id == id){
                    self.hpmlObject.properties.splice(i, 1);
                }
            }
        }

        self.addTrigger = function(triggerHeader, index){
            self.hpmlObject.triggers.splice(index, 0, triggerHeader.hpmlObject);
            self.triggers.splice(index, 0, triggerHeader);
        }

        self.removeTrigger = function(id){
            for(var i in self.hpmlObject.triggers){
                if(self.hpmlObject.triggers[i].id == id){
                    self.hpmlObject.triggers.splice(i, 1);
                    self.triggers.splice(i, 1);
                }
            }
        }

        self.addAction = function(actionHeader){
            self.hpmlObject.actions.push(actionHeader.hpmlObject);
            self.actions.push(actionHeader);
        }

        self.removeAction = function(id){
            for(var i in self.hpmlObject.actions){
                if(self.hpmlObject.actions[i].id == id){
                    self.hpmlObject.actions.splice(i, 1);
                    self.actions.splice(i, 1);
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


    function MeasureTriggerHeader(){
        var self = this;
        self.id = GetModelId();
        self.hpmlObject = new MeasureTrigger();

        self.form = [
            new Form('Guid', 'Guid', 'read', false, null, null),
            new Form('Type', 'type', 'read', true, null, null),
            new Form('Reset On Trigger', 'resetOnTrigger', 'select', true, booleanOptions, null),
            new Form('Update Immediately', 'updateImmediately', 'select', true, booleanOptions, null),
            new Form('One Off', 'oneOff', 'select', true, booleanOptions, null),
            new Form('Trigger Type', 'triggerType', 'select', true, triggerOptions, null)
        ];

        return self;
    }

    function ActionHeader(actionService){
        var self = this;
        self.hpmlObject = new Action(actionService);
        self.id = GetModelId();

        self.getActionOperators = function(item){
            return actionService.getActionOperators(item);
        }

        self.form = [
            new Form('ID', 'id', 'read', true, null, null),
            new Form('Guid', 'Guid', 'read', false, null, null),
            new Form('Name', 'name', 'text', true, null, null),
            new Form('Action Name', 'actionName', 'select', true, actionService.getActionNames(), null),
            new Form('Operator', 'operator', 'functionselect', true, 'getActionOperators', 'actionName')
        ]

        return self;
    }

    function ParameterHeader(){
        var self = this;
        self.hpmlObject = new Parameter();
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

    function ConstantHeader(){
        var self = this;
        self.hpmlObject = new Constant();

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

    function MeasureComputationHeader(functionService){
        var self = this;
        self.hpmlObject = new MeasureComputation();
        self.id = GetModelId();

        self.form = [
            new Form('Guid', 'Guid', 'read', false, null, null),
            new Form('Name', 'name', 'text', true, null, null),
            new Form('Function Name', 'functionName', 'select', true, functionService.getFunctionPluginNames(), null),
            new Form('Operator', 'operator', 'functionselect', true, 'getFunctionPluginOperators', 'functionName')
        ]

        self.getFunctionPluginOperators = function(item){
            return functionService.getFunctionPluginOperators(item);
        }

        return self;
    }

    function EnvironmentVariableHeader(){
        var self = this;
        self.hpmlObject = new EnvironmentVariable();
        self.id = GetModelId();
        self.form = [
            new Form('Guid', 'Guid', 'read', false, null, null),
            new Form('Name', 'name', 'text', true, null, null),
            new Form('Value', 'value', 'select', true, environmentVariableOptions, null)
        ]
        return self;
    }

    function DataRequestHeader(){
        var self = this;
        self.id = GetModelId();
        self.hpmlObject = new DataRequest();
        self.selectItems = [];
        self.parameters = [];
        self.newParams = true;

        self.addProperty = function(dataModelName, className, propName){
            if(self.hpmlObject.from !== className && self.selectItems.length> 0){
                toastr.error("cannot add a property from class "+className+" when class "+self.from+" is already selected.");
                return;
            }

            if(self.hpmlObject.dataSourceRef !== dataModelName && self.selectItems.length> 0){
                toastr.error("cannot add a property from data model "+dataModelName+" when data model "+self.dataSourceRef+" is already selected.");
                return;
            }

            self.hpmlObject.from = className;
            self.hpmlObject.dataSourceRef = dataModelName;
            self.selectItems.push(propName);

            updateSelect();

        }

        self.removeProperty = function(propName){
            self.selectItems = self.selectItems.filter(function(item){
                return item != propName;
            });

            if(self.selectItems.length === 0){
                self.hpmlObject.from = '';
                self.hpmlObject.dataSourceRef = '';
            }

            updateSelect();
        }

        function updateSelect(){
            self.hpmlObject.select = '';
            for(var i in self.selectItems){
                if(i > 0)
                    self.hpmlObject.select += ', ';
                self.hpmlObject.select += self.selectItems[i];
            }
        }

        self.addParameter = function(parameterHeader){
            self.hpmlObject.parameters.push(parameterHeader.hpmlObject);
            self.parameters.push(parameterHeader);
            self.newParam = true;
        }

        self.removeParameter = function(id){
            for(var i in self.parameters){
                if(self.parameters[i].id == id){
                    self.hpmlObject.parameters.splice(i, 1);
                    self.parameters.splice(i, 1);
                }
            }
            self.newParam = true;
        }

        self.form = [
            new Form('Guid', 'Guid', 'read', false, null, null),
            new Form('Name', 'name', 'text', false, null, null),
            new Form('Data Source', 'dataSourceRef', 'read', true, null, null),
            new Form('From', 'from', 'read', true, null, null),
            new Form('Select', 'select', 'read', true, null, null),
            new Form('Where', 'where', 'largetext', true, null, null)
        ]
        return self;
    }



    return self;
}]);