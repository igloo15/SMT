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
    try{
        var data=ev.dataTransfer.getData("Text");

        $('#mainsection').scope().addItem(data, ev);
    }catch(err){

    }


}

function generateGuid()
{
    var result, i, j;
    result = '';
    for(j=0; j<32; j++)
    {
        if( j == 8 || j == 12|| j == 16|| j == 20)
            result = result + '-';
        i = Math.floor(Math.random()*16).toString(16).toUpperCase();
        result = result + i;
    }
    return result
}