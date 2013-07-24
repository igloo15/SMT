/**
 * Created with JetBrains WebStorm.
 * User: mtolland
 * Date: 7/21/13
 * Time: 5:50 PM
 * To change this template use File | Settings | File Templates.
 */



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

    self.addElement = function(item){

        item.elem.css({
            'top': item.location.y,
            'left': item.location.x
        })
            /*
        var endpoints = [];
        endpoints.push(new self.createEndpoint(0.1, 0.0, 1));
        endpoints.push(new self.createEndpoint(0.5, 0.0, 1));
        endpoints.push(new self.createEndpoint(0.9, 0.0, 1));

        for(var i in endpoints){
            jsPlumb.addEndpoint(item.elem, endpoints[i]);
        }
              */
        jsPlumb.addEndpoint(item.elem, new createSourceEndpoint(0.5, 1.0, -1, false))

        //var newState = $('<MeasureComputation>').attr('object', item).addClass('jsplumb-box').appendTo($('.mainview-workspace'));

        //var title = $('<div>').addClass('title').text('State ' + item.id);
        //var connect = $('<div>').addClass('connect');
        //var output = element.find('.output-bar');


        //var input = element.find('.input-bar');


        /*
        jsPlumb.makeTarget(item.elem, {
            anchor: 'Continuous'
        });

        jsPlumb.makeSource(output, {
            parent: element,
            anchor: 'Continuous'
        });*/

        //newState.append(title);
        //newState.append(connect);

        jsPlumb.draggable(item.elem, {
            containment: 'parent',
            stop: function(ev){
                item.location.y = ev.pageY;
                item.location.x = ev.pageX;
            }
        });
    };

    self.createEndpoints = function(elem, numberEndpoints){

        var width = 0.8/numberEndpoints;
        var index = 0.1
        for(var i = 0; i < numberEndpoints; i){
            var offset = index + i*width;
            jsPlumb.addEndpoint(elem, new createEndpoint(offset, 0.0, -1, true))
        }

    }

    self.getElements = function(){

    }

    self.getConnections = function(){
        return jsPlumb.getConnections();
    }

    function createEndpoint(x, y, maxConnections, isTarget){

        if(typeof(isTarget)==='undefined') isTarget = true;
        if(typeof(maxConnections)==='undefined') maxConnections = -1;

        var self = this;
        var color = "rgba(229,219,61,0.5)";
        self.endpoint = "Rectangle";
        self.anchor = [x, y, 0, 1, 0, 1];
        self.paintStyle = { width:15, height:15, fillStyle:color, opacity:0.5 };
        self.isSource = !isTarget;
        self.scope = 'yellow dot';
        self.connectorStyle = { strokeStyle:color, lineWidth:4 };
        self.connector = "Straight";
        self.isTarget = isTarget;
        self.maxConnections = maxConnections;
        self.dropOptions = exampleDropOptions;
        self.beforeDetach = function(conn) {
            return confirm("Detach connection?");
        };
        self.onMaxConnections = function(info) {
            alert("Cannot drop connection " + info.connection.id + " : maxConnections has been reached on Endpoint " + info.endpoint.id);
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
        self.beforeDetach = function(conn) {
            return confirm("Detach connection?");
        };
        self.onMaxConnections = function(info) {
            alert("Cannot drop connection " + info.connection.id + " : maxConnections has been reached on Endpoint " + info.endpoint.id);
        };

        return self;
    }


    return self;

});


