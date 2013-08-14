/**
 * Created with JetBrains WebStorm.
 * User: igloo15
 * Date: 4/28/13
 * Time: 6:52 PM
 * To change this template use File | Settings | File Templates.
 */


app.service('measureService',['$compile','plumbServiceNew', 'actionService', 'functionService', 'dataService', function($compile, plumbService, actionService, functionService, dataService){
    var self = this;

    self.measureTemplates = [];
    self.measureDefinitions = [];
    self.dataRequests = [];

    self.guidLookup = {};

    self.plumbservice = plumbService;
    self.actionservice = actionService;
    self.functionservice = functionService;
    self.dataservice = dataService;

    self.compile = $compile;



    self.measureTemplate = null;
    self.measureDefinition = null;
    self.dataRequest = null;

    self.currentView = {};

    self.setMeasureTemplate = function(template){
        self.measureTemplate = template;
        self.currentView = template;
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
        }
        return item;
    }

    self.createMeasureTemplate = function(){

        var newMeasure = new MeasureTemplate();
        self.measureTemplates.push(newMeasure);



        return newMeasure;
    };



    self.createMeasureDefinition = function(){
        var newDefinition = new MeasureDefinition();
        self.measureDefinitions.push(newDefinition);
        return newDefinition;
    }

    self.createParameter = function(){
        checkMeasure();


        var item = new Parameter();

        item.plumbObject = plumbService.createObject(item);

        item.plumbObject.setup = function(){
            item.plumbObject.setSourceEndpoint(new plumbService.createSoleSourceEndpoint(-1));
            self.currentView.parameters.push(item);
        }

        return item;
    };

    self.createComputation = function(){
        checkMeasureTemplate();


        var item = new MeasureComputation(self.functionservice);
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

        var item = new Constant();

        item.plumbObject = plumbService.createObject(item);

        item.plumbObject.setup = function(){
            item.plumbObject.setSourceEndpoint(new plumbService.createSoleSourceEndpoint(-1));
            self.currentView.constants.push(item);
        }

        return item;
    };

    self.createDataRequest = function(){
        checkMeasureTemplate();

        var item = new DataRequest(self.dataservice);

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

        var item = new EnvironmentVariable();
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

    self.createAction = function(item){
        checkMeasureDefinition();

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