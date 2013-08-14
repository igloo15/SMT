/**
 * Created with JetBrains WebStorm.
 * User: mtolland
 * Date: 7/23/13
 * Time: 10:08 PM
 * To change this template use File | Settings | File Templates.
 */


var classTypeOptions = [

]

var PropModelType = 'PROPMODELTYPE';
var ClassModelType = 'CLASSMODELTYPE';

app.service('dataService', function(){
    var self = this;
    self.models = {
        'NASMP': new dataModel('NASMP'),
        'DDD': new dataModel('DDD')
    }


    var aircraft = self.models['NASMP'].createClass('Aircraft');
    aircraft.type = datasourceQueryTypeOptions[0].key;
    var location = aircraft.createProp('Location');
    location.type = datatypeOptions[4].key;
    location.createProp('X').type = datatypeOptions[0].key;
    location.createProp('Y').type = datatypeOptions[0].key;
    location.createProp('Z').type = datatypeOptions[0].key;


    self.addModel = function(modelName){
        console.log('maybe in the future');
    }

    self.getSourceNames = function(){
        return self.functionPlugins;
    };

    self.draggedData = null;

    self.getProperties = function(name){
        var items = [];

        angular.forEach(self.functionPlugins, function(value, key){
            items.push({key:key, name:value.name})
        });

        return items;
    }

    self.getClasses = function(name){
        var items = [];
        if(name !== "")   {
            angular.forEach(self.functionPlugins[name].operators, function(value, key){
                items.push({key:value, name:value})
            });
        }

        return items;
    }




    function dataModel(name){
        var self = this;
        self.name = name;
        self.fullName = name;
        self.type = "DATA MODEL";
        self.objectType = '';
        self.classes = [];
        self.props = [];

        self.createClass = function(name){
            var classItem = new classModel(self.fullName, name);
            self.classes.push(classItem);
            classItem.fullName = classItem.name;
            return classItem;
        }

        self.removeClass = function(name){
            self.classes = self.classes.filter(function(item){
                return item.name != name;
            });
        }

        self.form = [
            new Form('Name', 'name', 'text', true, null, null)

        ]

        return self;
    }

    function classModel(dataModelName, name){
        var self = this;
        self.name = name;
        self.parentName = '';
        self.fullName = '';
        self.dataModelName = dataModelName;
        self.type = '';
        self.objectType = ClassModelType;
        self.classes = [];
        self.props = [];

        self.createProp = function(name){
            var prop = new propModel(self.dataModelName, self.fullName, name);
            self.props.push(prop);
            prop.fullName = prop.name;
            return prop;
        }

        self.removeProp = function(name){
            self.props = self.props.filter(function(item){
                return item.name != name;
            });
        }

        self.createClass = function(name){
            var classItem = new classModel(self.dataModelName, name);
            classItem.type = self.type;
            self.classes.push(classItem);
            classItem.fullName = self.fullName+'.'+classItem.name;
            classItem.parentName = self.fullName;
            return classItem;
        }

        self.removeClass = function(name){
            self.classes = self.classes.filter(function(item){
                return item.name != name;
            });
        }

        self.form = [
            new Form('Name', 'name', 'text', true, null, null),
            new Form('Type', 'type', 'select', true, datasourceQueryTypeOptions, null)
        ]

        return self;
    }

    function propModel(dataModelName, className, name){
        var self = this;
        self.name = name;
        self.parentName = '';
        self.fullName = '';
        self.className = className;
        self.dataModelName = dataModelName;
        self.type = '';
        self.objectType = PropModelType;
        self.props = [];
        self.classes = [];

        self.createProp = function(name){
            if(self.type === datatypeOptions[4].key){
                var prop = new propModel(self.dataModelName, self.className, name);
                self.props.push(prop);
                prop.fullName = self.fullName+'.'+prop.name;
                prop.parentName = self.fullName;
                return prop;
            }else{
                toastr.error("Can't add property to non-complex property");
            }
        }

        self.removeProp = function(name){
            self.props = self.props.filter(function(item){
                return item.name != name;
            });
        }

        self.form = [
            new Form('Name', 'name', 'text', true, null, null),
            new Form('Data Type', 'type', 'select', true, datatypeOptions, null)
        ]
    }




    return self;
});