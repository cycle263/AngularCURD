/**
 * Created with JetBrains WebStorm.
 * User: cc73
 * Date: 8/7/13
 * Time: 1:42 PM
 * To change this template use File | Settings | File Templates.
 */
var app = angular.module('myApp', ['ui.bootstrap', function($dialogProvider){
    $dialogProvider.options({backdropClick: false, dialogFade: true});
}]);

app.config(function($routeProvider){
    $routeProvider
        .when('/', {templateUrl: 'list.html'})
        .when('/new', {templateUrl: 'edit.html', controller: newCtrl})
        .when('/edit/:id', {templateUrl: 'edit.html', controller: editCtrl})
        .when('/delete/:id', {templateUrl: 'list.html'})
        .otherwise({redirectTo:'/'});
});

function editCtrl($scope, $routeParams, $location){
    $scope.project = $scope.pros[$scope.delObjArr($scope.pros, 'num', $routeParams.id)];

    $scope.save = function(){
        $location.path('/');
    };

    $scope.cancel = function(){
        $location.path('/');
    }
}

function appCtrl($scope, $routeParams, $location, $dialog){
    // should use $scope.data = {pros:[{},{},{}]}
    $scope.fieldName = '-Num';
    $scope.pros = [
        {
            num: 1,
            name: 'AngularJS',
            site: 'http://angularjs.org/',
            description: 'Javascript MVC Framework'
        },
        {
            num: 2,
            name: 'Jquery',
            site: 'http://jquery.com/',
            description:'Javascript base Library'
        },
        {
            num: 3,
            name:'Bootstrap',
            site: 'http://www.bootcss.com/',
            description: 'Css classic Library'
        },
        {
            num: 4,
            name: 'Jquery UI',
            site:'http://jqueryui.com/',
            description: 'Jquery User Interface'
        },
        {
            num: 5,
            name:'AngularUI',
            site:'http://angular-ui.github.io/',
            description: 'The AngularJS framework'
        },
        {
            num:6,
            name:'YUI3',
            site:'http://yuilibrary.com/projects/yui3/',
            description:'Yahoo javascript framework'
        },
        {
            num:7,
            name:'TodoMVC',
            site:'http://todomvc.com/',
            description:'Helping you select an MV* framework'
        },
        {
            num:8,
            name:'NodeJs',
            site:'http://nodejs.org/',
            description:'Node.js is a server-side framework'
        }
    ];

    var t = '<div class="modal-header">'+
        '<h3>Delete Confirm</h3>'+
        '</div>'+
        '<div class="modal-body">'+
        '<p>Enter a value to pass to <code>close</code> as the result: <input ng-model="result" /></p>'+
        '</div>'+
        '<div class="modal-footer">'+
        '<button ng-click="close(result)" class="btn btn-primary" >Close</button>'+
        '</div>';

    $scope.delObjArr = function(arrs,k,v,o){
        o ? o : false;
        for(var i = 0, l = arrs.length; i < l; i++){
            if(arrs[i][k] == v){
                console.log('index: ' + i + ', value: ' + arrs[i][k]);
                o && arrs.splice(i, 1);
                return i;
            }
        }
    }

    $scope.delConfirm = function(title, msg, btns){
        var title = title ? title : 'Dialog Confirmation',
            msg = msg ? msg : 'Are you sure to delete?',
            btns = [{result:false, label:'Cancel'}, {result:true, label:'OK', cssClass:'btn'}];

        $dialog.messageBox(title, msg, btns).open().then(function(result){
             if(result){
                 $scope.delObjArr($scope.pros, 'num', $routeParams.id, true);
                 // $scope.pros.splice($routeParams.id, 1);
             }
             $location.path('/');
        });
    };
}

function newCtrl($scope, $location){
    $scope.project = {num:$scope.pros.length + 1,name:'',site:'',description:''};

    $scope.save = function(){
        $scope.pros.push($scope.project);

        $location.path('/');
    };

    $scope.cancel = function(){
        $location.path('/');
    }
}
