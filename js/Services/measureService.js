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

    self.createMeasureTemplate = function(){
        var newMeasure = new MeasureTemplate();
        newMeasure.Guid = generateGuid();

        self.addMeasureTemplate(newMeasure);
        return newMeasure;
    };

    self.createParameter = function(){
        checkMeasure();
        var newParameter = new Parameter();

        self.addParameter(newParameter);
        return newParameter;
    };

    self.createComputation = function(functionService){
        checkMeasureTemplate();
        var newComp = new MeasureComputation(functionService);
        var index = self.computations.length;
        self.computations.push(newComp);
        var element = $compile("<measurecomputation class='jsplumb-box' id='"+newComp.id+"' object='computations["+index+"]' selectItem='callSelectItem(item)'></measurecomputation>")(self);
        return {item: newComp, elem:element};
    };

    self.createConstant = function(){
        checkMeasure();
        var newConst = new Constant();
        self.constants.push(newConst);
        return newConst;
    };

    self.createDataRequest = function(){
        checkMeasureTemplate();
        var newDR = new DataRequest();
        self.dataRequests.push(newDR);
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

    return self;
});