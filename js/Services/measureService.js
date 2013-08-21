/**
 * Created with JetBrains WebStorm.
 * User: igloo15
 * Date: 4/28/13
 * Time: 6:52 PM
 * To change this template use File | Settings | File Templates.
 */


app.service('measureService',['$compile','plumbServiceNew', 'actionService', 'functionService', 'smtService', function($compile, plumbService, actionService, functionService, smtService){
    var self = this;

    self.measureTemplates = [];
    self.defObjects = [];
    self.dataRequests = [];

    self.guidLookup = {};

    self.plumbservice = plumbService;
    self.actionservice = actionService;
    self.functionservice = functionService;

    self.compile = $compile;



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
        self.defObjects.push(defTemp);

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

            self.currentView.definitions.push(item);
        }


        return item;
    }

    self.createParameter = function(){
        checkMeasure();


        var item = new ParameterHeader();

        item.plumbObject = plumbService.createObject(item);

        item.plumbObject.setup = function(){
            item.plumbObject.setSourceEndpoint(new plumbService.createSoleSourceEndpoint(-1));
            self.currentView.parameters.push(item);
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

            self.currentView.computations.push(item);
        }



        return item;
    };

    self.createConstant = function(){
        checkMeasure();

        var item = new ConstantHeader();

        item.plumbObject = plumbService.createObject(item);

        item.plumbObject.setup = function(){
            item.plumbObject.setSourceEndpoint(new plumbService.createSoleSourceEndpoint(-1));
            self.currentView.constants.push(item);
        }

        return item;
    };

    self.createDataRequest = function(){
        checkMeasureTemplate();

        var item = new DataRequestHeader();

        item.plumbObject = plumbService.createObject(item);

        item.plumbObject.setup = function(){
            item.plumbObject.setSourceEndpoint(new plumbService.createSoleSourceEndpoint(-1));
            self.currentView.dataRequests.push(item);
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

            self.currentView.environmentvars.push(item);
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

            self.currentView.actions.push(item);
        }

        return item;

    }

    self.createMeasureTrigger = function(){
        var item = new MeasureTriggerHeader();
        item.plumbObject = plumbService.createObject(item);
        item.plumbObject.setup = function(){
            item.plumbObject.setSourceEndpoint(new plumbService.createSoleSourceEndpoint(1, 'trigger'));
            item.plumbObject.addTargetEndpoint(new plumbService.createInputEndpoints(0.5, 0.0, 1));
            self.currentView.triggers.push(item);
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

    function compile(scope, list, index, model, location, createPlumb){
        var element = $compile(this.compileScriptStart+" object='"+list+"["+index+"]' selectItem='callSelectItem(item)'"+this.compileScriptEnd)(scope);
        this.elem = element;

        if(createPlumb)
            createPlumbObject(model, this, location);
    }

    function createPlumbObject(model, item, location){
        self.plumbservice.addElement(model, item, location);
    }

    function setupMeasureComputationEndpoints(service, item){
        service.createEndpoints(item.elem, 4);
    }

    function setupDataRequestInputs(service, item){
        jsPlumb.removeAllEndpoints(item.elem);
        service.createEndpoints(item.elem, item.parameters.length);
    }

    return self;
}]);