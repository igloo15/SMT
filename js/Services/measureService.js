/**
 * Created with JetBrains WebStorm.
 * User: igloo15
 * Date: 4/28/13
 * Time: 6:52 PM
 * To change this template use File | Settings | File Templates.
 */


app.service('measureService', function($compile){
    var self = this;
    self.measureTemplates = [];
    self.measureDefinitions = [];
    self.computations = [];
    self.parameters = [];
    self.constants = [];
    self.dataRequests = [];

    self.measureTemplate = null;
    self.measureDefinition = null;

    MeasureComputation.prototype.plumbSetup = createPlumbObject;
    MeasureComputation.prototype.updatePlumb = setupMeasureComputationEndpoints;
    Parameter.prototype.plumbSetup = createPlumbObject;
    DataRequest.prototype.plumbSetup = createPlumbObject;
    Constant.prototype.plumbSetup = createPlumbObject;
    MeasureTrigger.prototype.plumbSetup = createPlumbObject;
    Action.prototype.plumbSetup = createPlumbObject;

    self.createMeasureTemplate = function(){
        var newMeasure = new MeasureTemplate();
        newMeasure.Guid = generateGuid();
        self.measureTemplates.push(newMeasure);
        return newMeasure;
    };

    self.createParameter = function(compile, scope, location){
        checkMeasure();
        var newParameter = new Parameter();
        newParameter.location = location;
        self.parameters.push(newParameter);

        var index = scope.drawAbleItems.length;
        scope.drawAbleItems.push(newParameter);
        var element = compile("<parameter class='jsplumb-box' id='"+newParameter.id+"' object='drawAbleItems["+index+"]' selectItem='callSelectItem(item)'></parameter>")(scope);
        newParameter.elem = element;

        newParameter.plumbSetup(scope.plumbservice, newParameter);

        return newParameter;
    };

    self.createComputation = function(compile, scope, location){
        checkMeasureTemplate();

        var newComp = new MeasureComputation(scope.functionservice);
        newComp.location = location;
        self.computations.push(newComp);

        var index = scope.drawAbleItems.length;
        scope.drawAbleItems.push(newComp);
        var element = compile("<measurecomputation class='jsplumb-box' id='"+newComp.id+"' object='drawAbleItems["+index+"]' selectItem='callSelectItem(item)'></measurecomputation>")(scope);
        newComp.elem = element;

        newComp.plumbSetup(scope.plumbservice, newComp);
        newComp.updatePlumb(scope.plumbservice, newComp);

        return newComp;
    };

    self.createConstant = function(compile, scope, location){
        checkMeasure();

        var newConst = new Constant();
        newConst.location = location;
        self.constants.push(newConst);

        var index = scope.drawAbleItems.length;
        scope.drawAbleItems.push(newConst);
        var element = compile("<constant class='jsplumb-box' id='"+newConst.id+"' object='drawAbleItems["+index+"]' selectItem='callSelectItem(item)'></constant>")(scope);
        newConst.elem = element;

        newConst.plumbSetup(scope.plumbservice, newConst);

        return newConst;
    };

    self.createDataRequest = function(compile, scope, location){
        checkMeasureTemplate();

        var newDR = new DataRequest(scope.dataservice);
        newDR.location = location;
        self.dataRequests.push(newDR);

        var index = scope.drawAbleItems.length;
        scope.drawAbleItems.push(newDR);
        var element = compile("<datarequest class='jsplumb-box' id='"+newDR.id+"' object='drawAbleItems["+index+"]' selectItem='callSelectItem(item)'></datarequest>")(scope);
        newDR.elem = element;

        newDR.plumbSetup(scope.plumbservice, newDR);

        return newDR;
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



    function checkMeasure(){
        checkMeasureDefinition();
        checkMeasureTemplate();
    }

    function checkMeasureTemplate(){
        if(self.measureTemplate != null){
            self.measureTemplate = self.createMeasureTemplate();
        }
    }

    function checkMeasureDefinition(){
        if(self.measureDefinition != null){
            self.measureDefinition = self.createMeasureDefintion();
        }
    }

    function createPlumbObject(service, item){
        service.addElement(item);
    }

    function setupMeasureComputationEndpoints(service, item){
        service.createEndpoints(item.elem, 4);
    }

    return self;
});