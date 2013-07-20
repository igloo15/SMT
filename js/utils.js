/**
 * Created with JetBrains WebStorm.
 * User: mtolland
 * Date: 7/20/13
 * Time: 5:14 PM
 * To change this template use File | Settings | File Templates.
 */

var componentIndex = 0;

function allowDrop(ev)
{
    ev.preventDefault();
}

function drag(ev)
{
    ev.dataTransfer.setData("Text",ev.target.id);
}

function drop(ev)
{
    ev.preventDefault();
    var data=ev.dataTransfer.getData("Text");
    $('#'+data).clone().attr('id', data+''+componentIndex).attr('ondragstart','').attr('draggable','').removeClass('component-box').addClass('jsplumb-box').appendTo(ev.target);
    jsPlumb.draggable($('#'+data+''+componentIndex));
    componentIndex++;
}