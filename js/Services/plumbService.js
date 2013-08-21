/**
 * Created with JetBrains WebStorm.
 * User: mtolland
 * Date: 7/21/13
 * Time: 5:50 PM
 * To change this template use File | Settings | File Templates.
 */


/*
app.service('plumbService', function(){
    var self = this;

    var anchors = [[]];

    // configure some drop options for use by all endpoints.
    var exampleDropOptions = {
        tolerance:"touch",
        hoverClass:"dropHover",
        activeClass:"dragActive"
    };

    jsPlumb.importDefaults({
        DragOptions : { cursor: 'pointer', zIndex:2000 },
        PaintStyle : { strokeStyle:'#666' },
        EndpointStyle : { width:20, height:16, strokeStyle:'#666' },
        Endpoint : "Rectangle",
        Anchors : ["TopCenter", "TopCenter"],
        ConnectionOverlays : [
            [ "Arrow", {
                location:1,
                id:"arrow",
                length:14,
                foldback:0.8
            } ]

        ]
    });

    self.models = {};
    self.allItems = {};
    self.currentModel = {};


    self.plumbObjects = [];

    function model(name){
        var self = this;
        self.name = name;
        self.items = [];
        self.conns = [];
        self.redraw = function(){
            for(var i = 0; i < self.items.length; i++){
                self.items[i].redraw();
            }
        }

        self.removeConnections = function(id){
            var plumbObject = getItemWithId(self.items, id);
            jsPlumb.detachAllConnections(plumbObject.elem());
            plumbObject.connections = [];

            self.conns = self.conns.filter(function(item){
                return item.targetId !== id;
            });
        };

        self.removeConnection = function(id){
            var plumbConn = getItemWithId(self.conns, id);
            jsPlumb.detach(plumbConn.connection);
            var plumbObject = getItemWithId(self.items, plumbConn.targetId);
            plumbObject.connections = plumbObject.connections.filter(function(item){
                return item.id != id;
            });

            self.conns = self.conns.filter(function(item){
                return item.id !== id;
            });
        };

        self.removeItem = function(id){
            var plumbObject = getItemWithId(self.items, id);
            jsPlumb.remove(plumbObject.elem());
            self.conns = self.conns.filter(function(item){
                return item.targetId !== id;
            });

            self.items = self.items.filter(function(item){
                return item.id !== id;
            });
        };

        return self;
    }

    self.getModel = function(name){
        if(self.models[name] === undefined){
            self.models[name] = new model(name);
        }
        self.currentModel = self.models[name];
        return self.models[name];
    }

    self.addElement = function(model, item, location){


        var newPlumb = new plumbItem(item, location)

        self.getModel(model).items.push(newPlumb);
        self.allItems[newPlumb.id] = newPlumb;



        /*
        jsPlumb.makeTarget(item.elem, {
            anchor: 'Continuous'
        });

        jsPlumb.makeSource(output, {
            parent: element,
            anchor: 'Continuous'
        });

        //newState.append(title);
        //newState.append(connect);


    };

    self.createEndpoints = function(elem, numberEndpoints){

        var width = 0.8/(numberEndpoints-1);
        var index = 0.1
        for(var i = 0; i < numberEndpoints; i++){
            var offset = index + i*width;
            jsPlumb.addEndpoint(elem, new createEndpoint(offset, 0.0, 1, true))
        }

    }

    self.getConnections = function(){
        return jsPlumb.getConnections();
    }

    self.removeConnections = function(id){
        self.currentModel.removeConnections(id);
    }

    self.removeConnection = function(id){
        self.currentModel.removeConnection(id);
    }

    self.removeElement = function(id){
        self.currentModel.removeItem(id);
    }



    function plumbEndpoint(settings){
        var self = this;
        self.id = '';
        self.endpoint = {};
        self.settings = settings;

        return self;
    }

    function createEndpoint(x, y, maxConnections, isTarget){

        if(typeof(isTarget)==='undefined') isTarget = true;
        if(typeof(maxConnections)==='undefined') maxConnections = -1;

        var self = this;
        var color = "yellow";
        self.endpoint = "Rectangle";
        self.anchor = [x, y, 0, 1, 0, -5];
        self.paintStyle = { width:20, height:20, fillStyle:color, opacity:0.5, strokeStyle:'black', lineWidth:3 };
        self.isSource = !isTarget;
        self.scope = 'yellow dot';
        self.connectorStyle = { strokeStyle:color, lineWidth:4 };
        self.connector = "Straight";
        self.isTarget = isTarget;
        self.maxConnections = maxConnections;
        self.dropOptions = exampleDropOptions;
        self.beforeDetach = function(conn) {
            return toastr.info('Removing connection on '+conn.targetId);
        };
        self.onMaxConnections = function(info) {
            toastr.warning('Too many connections on '+info.endpoint.getAttachedElements()[0].targetId);
        };

        return self;
    }

    function createSourceEndpoint(x, y, maxConnections, isTarget){

        if(typeof(isTarget)==='undefined') isTarget = true;
        if(typeof(maxConnections)==='undefined') maxConnections = -1;

        var self = this;
        var color = 'red';
        self.endpoint = ['Dot', {radius:11}];
        self.anchor = [x, y, 0, 1];
        self.paintStyle = { fillStyle:color, opacity:0.5, lineWidth: 3, strokeStyle:'#056' };
        self.hoverPaintStyle = {strokeStyle:'#dbe300'};
        self.isSource = true;
        self.scope = 'yellow dot';
        self.connectorStyle = { strokeStyle:color, lineWidth:4 };
        self.connector = "StateMachine";
        self.isTarget = false;
        self.maxConnections = maxConnections;
        self.dropOptions = exampleDropOptions;
        self.onMaxConnections = function(info) {
            //alert("Cannot drop connection " + info.connection.id + " : maxConnections has been reached on Endpoint " + info.endpoint.id);
            toastr.warning('Too many connections on '+info.endpoint.getAttachedElements()[0].targetId);
        };

        return self;
    }

    function plumbItem(measure, location){
        var self = this;
        self.location = location;
        self.id = measure.id;
        //self.form = measure.form;

        self.measure = measure;
        self.elem = function(){
            return self.measure.elem
        };
        self.endpoints = [];
        self.allEndpoints = [];

        self.connections = [];

        self.redraw = function(){
            self.elem().appendTo($('.mainview-workspace'));

            self.elem().css({
                'top': self.location.y,
                'left': self.location.x
            });

            for(var i =0; i < self.allEndpoints.length; i++){
                var newEndpoint = jsPlumb.addEndpoint(self.elem(), self.allEndpoints[i].settings);
                self.allEndpoints[i].endpoint = newEndpoint;
                self.allEndpoints[i].id = newEndpoint.id;
            }

            jsPlumb.draggable(self.elem(), {
                containment: 'parent',
                stop: function(ev){
                    self.location.y = ev.pageY;
                    self.location.x = ev.pageX;
                }
            });
        }

        self.addEndpoint = function(endpoint, isSource){
            if(isSource){
                self.sourceEndpoint = endpoint;
            }else{
                self.endpoints.push(endpoint);
            }
            endpoint.index = self.allEndpoints.length;
            self.allEndpoints.push(endpoint);
        }

        self.redraw();

        self.addEndpoint(new plumbEndpoint(new createSourceEndpoint(0.5, 1.0, -1, false)), true);

        self.sourceEndpoint.endpoint = jsPlumb.addEndpoint(self.elem(), self.sourceEndpoint.settings);
        self.sourceEndpoint.id = self.sourceEndpoint.endpoint.id;

        if(measure.connectors !== undefined){
            createMultiple(self, measure.connectors)
        }




        return self;
    }

    function createMultiple(item, numberEndpoints){

        var width = 0.8/(numberEndpoints-1);
        var index = 0.1
        if(numberEndpoints == 1){
            index = 0.5;
            width=1;
        }


        for(var i = 0; i < numberEndpoints; i++){
            var offset = index + i*width;
            var endpoint = new plumbEndpoint(new createEndpoint(offset, 0.0, 1, true));
            item.addEndpoint(endpoint, false);
            var jsEndpoint = jsPlumb.addEndpoint(item.elem(), endpoint.settings);
            endpoint.id = jsEndpoint.id;
            endpoint.endpoint = jsEndpoint;
        }

    }




    function plumbConnection(connection, targetIndex, sourceIndex){
        var self = this;
        self.id = connection.id;
        self.targetId = connection.targetId;
        self.sourceId = connection.sourceId;
        self.targetIndex = targetIndex;
        self.sourceIndex = sourceIndex;
        self.connection = connection;

        self.redraw = function(items){
            var sourceEndpoint = getItemWithId(items, self.sourceId).allEndpoints[self.sourceIndex].endpoint;
            var targetEndpoint = getItemWithId(items, self.targetId).allEndpoints[self.targetIndex].endpoint;
            var conn = jsPlumb.connect({source:sourceEndpoint, target:targetEndpoint});
            self.id = conn.id;
            self.connection = conn;
        }

        return self;
    }



    self.addConnections = true;

    jsPlumb.bind("connection", function(info){
        if(self.addConnections){
            var targetpoints = self.allItems[info.targetId].allEndpoints;
            var targetEndpoint = getItemWithId(targetpoints, info.targetEndpoint.id);
            var sourcepoints = self.allItems[info.sourceId].allEndpoints;
            var sourceEndpoint = getItemWithId(sourcepoints, info.sourceEndpoint.id);
            var newConn =  new plumbConnection(info.connection, targetEndpoint.index, sourceEndpoint.index);
            self.allItems[info.targetId].connections.push(newConn);
            self.currentModel.conns.push(newConn);
        }
    });

    jsPlumb.bind('dblclick', function(conn, event){
        self.removeConnection(conn.id);
    });

    //prevent circular references
    jsPlumb.bind("beforeDrop", function(info){
        var targetItem = self.allItems[info.targetId];
        var sourceItem = self.allItems[info.sourceId];

        if(info.targetId === info.sourceId){
            toastr.error('Invalid connection between '+info.targetId+' and '+info.sourceId);
            return false;
        }

        for(var i in sourceItem.connections){
            var conn = sourceItem.connections[i];
            if(conn.sourceId === targetItem.id){
                toastr.error('Circular reference detected between '+targetItem.id+' and '+sourceItem.id);
                return false;
            }
        }

        return true;

    });

    return self;

});  */


app.service('plumbServiceNew', function(){
    var service = this;


    var exampleDropOptions = {
        tolerance:"touch",
        hoverClass:"dropHover",
        activeClass:"dragActive"
    };

    jsPlumb.importDefaults({
        DragOptions : { cursor: 'pointer', zIndex:2000 },
        PaintStyle : { strokeStyle:'#666' },
        EndpointStyle : { width:20, height:16, strokeStyle:'#666' },
        Endpoint : "Rectangle",
        Anchors : ["TopCenter", "TopCenter"],
        ConnectionOverlays : [
            [ "Arrow", {
                location:1,
                id:"arrow",
                length:14,
                foldback:0.8
            } ]

        ]
    });

    service.createObject = function(measure){
        var item = new plumbObject(measure);
        return item;
    }

    service.createSoleSourceEndpoint = function(maxConnections, scope){
        return new service.createSourceEndpoint(0.5, 1.0, maxConnections, scope);
    }

    service.createSourceEndpoint = function(x, y, maxConnections, scope){
        if(typeof(scope) === 'undefined') scope = 'inputsource';
        if(typeof(maxConnections)==='undefined') maxConnections = -1;

        var self = this;
        var color = 'red';
        self.endpoint = ['Dot', {radius:11}];
        self.anchor = [x, y, 0, 1];
        self.paintStyle = { fillStyle:color, opacity:0.5, lineWidth: 3, strokeStyle:'#056' };
        self.hoverPaintStyle = {strokeStyle:'#dbe300'};
        self.isSource = true;
        self.scope = scope;
        self.connectorStyle = { strokeStyle:color, lineWidth:4 };
        self.connector = "StateMachine";
        self.isTarget = false;
        self.maxConnections = maxConnections;
        //self.dropOptions = exampleDropOptions;
        self.reattach = true;
        self.onMaxConnections = function(info) {
            //alert("Cannot drop connection " + info.connection.id + " : maxConnections has been reached on Endpoint " + info.endpoint.id);
            toastr.warning('Too many connections on '+info.endpoint.getAttachedElements()[0].targetId);
        };

        return self;
    }

    service.createInputEndpoints = function(x, y, maxConnections){
        if(typeof(maxConnections)==='undefined') maxConnections = -1;

        var self = this;
        var color = "yellow";
        self.endpoint = "Rectangle";
        self.anchor = [x, y, 0, 1, 0, -5];
        self.paintStyle = { width:20, height:20, fillStyle:color, opacity:0.5, strokeStyle:'black', lineWidth:3 };
        self.isSource = false;
        self.scope = 'inputsource';
        self.connectorStyle = { strokeStyle:color, lineWidth:4 };
        self.connector = "Straight";
        self.isTarget = true;
        self.maxConnections = maxConnections;
        self.dropOptions = exampleDropOptions;
        self.beforeDetach = function(conn) {
            toastr.info('Removing connection on '+conn.targetId);
            return false;
        };
        self.onMaxConnections = function(info) {
            toastr.warning('Too many connections on '+info.endpoint.getAttachedElements()[0].targetId);
        };

        return self;
    }

    service.createTriggerEndpoint = function(maxConnections){
        if(typeof(maxConnections)==='undefined') maxConnections = -1;

        var self = this;
        var color = "green";
        self.endpoint = "Rectangle";
        self.anchor = [1.0, 0.5, 0, 1, 0, 0];
        self.paintStyle = { width:20, height:20, fillStyle:color, opacity:0.5, strokeStyle:'black', lineWidth:2 };
        self.isSource = false;
        self.scope = 'trigger';
        self.connectorStyle = { strokeStyle:color, lineWidth:4 };
        self.connector = "Straight";
        self.isTarget = true;
        self.maxConnections = maxConnections;
        self.dropOptions = exampleDropOptions;
        self.beforeDetach = function(conn) {
            toastr.info('Removing connection on '+conn.targetId);
            return false;
        };
        self.onMaxConnections = function(info) {
            toastr.warning('Too many connections on '+info.endpoint.getAttachedElements()[0].targetId);
        };

        return self;
    }

    service.createActionEndpoint = function(maxConnections){
        if(typeof(maxConnections)==='undefined') maxConnections = -1;

        var self = this;
        var color = "lightblue";
        self.endpoint = "Rectangle";
        self.anchor = [0.0, 0.5, 0, 1, 0, 0];
        self.paintStyle = { width:20, height:20, fillStyle:color, opacity:0.5, strokeStyle:'black', lineWidth:2 };
        self.isSource = false;
        self.scope = 'action';
        self.connectorStyle = { strokeStyle:color, lineWidth:4 };
        self.connector = "Straight";
        self.isTarget = true;
        self.maxConnections = maxConnections;
        self.dropOptions = exampleDropOptions;
        self.beforeDetach = function(conn) {
            toastr.info('Removing connection on '+conn.targetId);
            return false;
        };
        self.onMaxConnections = function(info) {
            toastr.warning('Too many connections on '+info.endpoint.getAttachedElements()[0].targetId);
        };

        return self;
    }

    function plumbObject(item){
        var plumbObj = this;
        plumbObj.location = {};
        plumbObj.item = item;
        plumbObj.elem = {};
        plumbObj.endpoints = [];
        plumbObj.sourceEndpoint = {};
        plumbObj.connections = [];

        plumbObj.setLocation = function(location){
            if(plumbObj.location !== null){
                plumbObj.location.x = location.x;
                plumbObj.location.y = location.y;
            }else{
                plumbObj.location = location;
            }
        }

        plumbObj.addTargetEndpoint = function(endpointSettings, type){
            var plumbEnd = new plumbEndpoint(endpointSettings, type);
            plumbEnd.settings.beforeDrop = function(connection){
                plumbObj.setTarget();
                plumbObj.setTargetEndpoint(plumbEnd);
                plumbObj.createConnection(connection);
                return true;
            }
            plumbObj.endpoints.push(plumbEnd);
        }

        plumbObj.removeTargetEndpoints = function(type){
            plumbObj.endpoints = plumbObj.endpoints.filter(function(item){
                if(item.type === type){
                    plumbObj.removeConnection(item)
                    jsPlumb.deleteEndpoint(item.endpoint);
                }
                return item.type !== type;
            })
        }

        plumbObj.removeConnection = function(endpoint){
            plumbObj.connections = plumbObj.connections.filter(function(item){
                return item.target === endpoint;
            })
        }

        plumbObj.setSourceEndpoint = function(endpointSettings){
            var plumbEnd = new plumbEndpoint(endpointSettings, SOURCE_ENDPOINT_TYPE);
            plumbObj.endpoints.push(plumbEnd);
            plumbObj.sourceEndpoint = plumbEnd;
        }

        plumbObj.redrawEndpoints = function(){
            for(var i in plumbObj.endpoints){
                var endpoint = plumbObj.endpoints[i];
                endpoint.endpoint = jsPlumb.addEndpoint(plumbObj.elem, endpoint.settings);
                if(endpoint.type === SOURCE_ENDPOINT_TYPE){
                    endpoint.endpoint.bind("mousedown", function(connection, event){
                        plumbObj.setSource();
                    });
                }
            }
        }


        plumbObj.setSource = function(){
            service.source = item;
        }

        plumbObj.setTargetEndpoint = function(targetEndpoint){
            service.targetEndpoint = targetEndpoint;
        }

        plumbObj.setTarget = function(){
            service.target = item;
        }

        plumbObj.createConnection = function(plumbConn){
            var newConnection = new plumbConnection(service.source, service.target, service.targetEndpoint, plumbConn);
            plumbObj.connections.push(newConnection);
        }

        plumbObj.redraw = function(){
            plumbObj.elem.css({
                'top': plumbObj.location.y,
                'left': plumbObj.location.x
            });
            jsPlumb.draggable(plumbObj.elem, {
                containment: 'parent',
                stop: function(ev){
                    plumbObj.location.y = ev.pageY;
                    plumbObj.location.x = ev.pageX;
                }
            });
            plumbObj.redrawEndpoints();
            //plumbObj.item.redraw();
        }

        plumbObj.updateConnections = function(){
            for(var i in plumbObj.connections){
                var conn = plumbObj.connections[i];
                var newConnection = jsPlumb.connect({source:conn.source.plumbObject.sourceEndpoint.endpoint, target:conn.targetEndpoint.endpoint});
                conn.connection = newConnection;
            }
        }

        return plumbObj;
    }

    function plumbConnection(source, target, targetEndpoint, conn){
        var plumbConn = this;
        plumbConn.source = source;
        plumbConn.target = target;
        plumbConn.targetEndpoint = targetEndpoint;
        plumbConn.connection = conn;

        return plumbConn;
    }

    function plumbEndpoint(settings, type){
        var plumbEnd = this;
        plumbEnd.settings = settings;
        plumbEnd.endpoint = {};
        plumbEnd.type = type;

        plumbEnd.setSourceEndpoint = function(endpoint){
            plumbEnd.endpoint = endpoint;
        }

        return plumbEnd;
    }

    return service;
});

var SOURCE_ENDPOINT_TYPE = 'SOURCE';
var TARGET_TRIGGER_TYPE = 'TRIGGER';
var TARGET_INPUT_TYPE = 'INPUT';
var TARGET_ACTION_TYPE = 'ACTION';









