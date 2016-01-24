var App = angular.module('App', []);

App.factory('Excel',function($window){
        var uri='data:application/vnd.ms-excel;base64,',
            template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
            format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
        return {
            tableToExcel:function(tableId,worksheetName){
                var table=$(tableId),
                    ctx={worksheet:worksheetName,table:table.html()},
                    href=uri+base64(format(template,ctx));
                return href;
            }
        };
    })
App.config(['$routeProvider', function($routeProvider)
{  
	$routeProvider.     
	when('/AddEmp', 
	{	
templateUrl: 'AddEmp.html',	
controller: 'AddEmpController'
	}).     
	when('/Dashboard', {
templateUrl: 'Dashboard.html',	
controller: 'DashboardController'
	}).
	otherwise({
redirectTo: '/Dashboard'
	});
}]);


App.controller('TodoCtrl', function($scope, $http, $location) {
	$http.get('EmpDB.json')
	.then(function(res){
		$scope.EmpData = res.data;            
	});	
	
	$scope.saveRecord = function () {     
		$http.get('EmpDB.json')
		.then(function(res){
			var x=res.data;
			for (i in x) {
				if (x[i].txt1 == $scope.newEmployee.txt1) {
					x[i] = $scope.newEmployee;
									}
				var da=JSON.stringify(x);
				$.ajax({
					url: 'json.php',
					data: {json : da, par:'edit'},
					dataType:'json' ,
					type: "POST"					
				});				
			}
			$scope.newEmployee = {};
			
		});	   
	}
	
	$scope.delete = function (id) {
		
		$http.get('EmpDB.json')
		.then(function(res){
			x = $.grep(res.data, function(e) { return e.txt1!=id });
			
			$.ajax({
				url: 'json.php',
				data: {json : JSON.stringify(x), par:'del'},
				dataType:'json' ,
				type: "POST"
			});			
		});				
	}

	$scope.edit = function (id) {
		for (i in $scope.todos) {
			if ($scope.todos[i].txt1 == id) {
				$scope.newEmployee = angular.copy($scope.todos[i]);				
			}
		}
	}	
});

App.controller('AddEmpController', function($scope) {	
	$scope.name = "Rahul";
	$scope.date = new Date(); 

});

App.controller('DashboardController', function($scope, $http,Excel,$timeout) {
	$http.get('EmpDB.json')
	.then(function(res){
		$scope.EmpData = res.data;            
	});
	
		   $scope.exportToExcel=function(tableId){ 
            var exportHref=Excel.tableToExcel(tableId,'EmployeeDetail');
            $timeout(function(){location.href=exportHref;},100);
        }
		$scope.visible=true;
		
		$scope.saveRecord = function () {     
		$http.get('todos.json')
		.then(function(res){
			
			//$scope.todos[i] = $scope.newEmployee;
			var x=res.data;
			for (i in x) {
				if (x[i].txt1 == $scope.newEmployee.txt1) {
					x[i] = $scope.newEmployee;
					
					//alert(res.data[i].txt1);
				}
				var da=JSON.stringify(x);
								$.ajax({
				url: 'json.php',
				data: {json : da, par:'edit'},
				dataType:'json' ,
				type: "POST"
					
				});
				
			}
			$scope.newEmployee = {};
			
		});	   
	}
	$scope.delete = function (id) {
		
		$http.get('todos.json')
		.then(function(res){
			x = $.grep(res.data, function(e) { return e.txt1!=id });
			alert(x[0].txt1);
			
					$.ajax({
				url: 'json.php',
				data: {json : JSON.stringify(x), par:'del'},
				dataType:'json' ,
				type: "POST",
				success:function(data)
				{
					alert('hello');
				}
			});
			// for (var key in res.data) {
			// if (res.data.hasOwnProperty(key)) {
			// if(res.data[key].txt1== id)
			// {
			// alert(res.data);
			// }
			
			// }
			// }	
		});		
		
	}
$scope.edit = function (id) {
		for (i in $scope.todos) {
			if ($scope.todos[i].txt1 == id) {
				$scope.newEmployee = angular.copy($scope.todos[i]);
				
			}
		}
	}
	
});
