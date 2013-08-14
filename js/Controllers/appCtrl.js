/**
 * Created with JetBrains WebStorm.
 * User: mtolland
 * Date: 8/4/13
 * Time: 1:34 AM
 * To change this template use File | Settings | File Templates.
 */

'use strict'

app.controller('appCtrl', function ($rootScope, plumbServiceNew) {

    $rootScope.$on("$routeChangeStart", function(){
        $rootScope.$broadcast('unload');
    })

});
