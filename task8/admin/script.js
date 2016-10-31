"use strict";

var  profileMod = angular.module('profileMod', []);

profileMod.controller('ProfileController', function($scope, $http){
	$scope.sections = [
		{},
	]
	
    $scope.options = [
        {type : 'string'},
        {type : 'number'},
        {type : 'radio'},
        {type : 'checkbox'},
        {type : 'select'}
    ]
    
	$scope.addSection = function(){
		$scope.sections.push({});
	}
	
	$scope.deleteSection = function(elem){
        var index = $scope.sections.indexOf(elem);
        $scope.sections.splice(index, 1);
	    $scope.createProfile();
	}
    
    $scope.hideValues = function(elem){
        if (elem.dataType == "select" || elem.dataType == "radio"){
            return true;
        } else {
            return false;
        }
    }
    
	$scope.createProfile = function(elem){
        var profile = {};
        for (var i = 0; i < $scope.sections.length; i++){
            var parameterArr = $scope.sections[i].dataParameter;
            var typeArr = $scope.sections[i].dataType;
            var questionArr = $scope.sections[i].dataQuestion;
            var values = $scope.sections[i].dataValues;
            
            if (typeArr == undefined){
                return false;
            }
            if (typeArr == "string" || typeArr == "number" || typeArr == "checkbox") {
                profile[parameterArr] = {
                        type : typeArr, 
                        question : questionArr
                    }
            } 
            if (typeArr == "select" || typeArr == "radio") {
                if (values !== undefined){
                    var valuesArr = values.split(',');
                    profile[parameterArr] = {
                            type : typeArr, 
                            question : questionArr,
                            values : valuesArr
                        }
                } else {
                    return false;
                } 
            }   
        } 
		$scope.sendProfile(profile);
    }

	$scope.sendProfile = function(profile){
		$http({
			method: 'PUT',
			url: "http://localhost:8000/questions",
			data: profile
			}).then(function successCallback(response) {
				console.log(response);
				//console.log($http.url);
				}, function errorCallback(response) {
						console.log("чето сломалось");
				});
	}
})
