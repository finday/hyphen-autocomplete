(function() {
  'use strict';

  angular.module('demo', ['hyphen-autocomplete'])
    .controller('demoCtrl', DemoCtrl);

  function DemoCtrl($scope) {

    addData();

    $scope.change = function() {
      console.log($scope.city);
    };

    function addData() {
      $scope.data = [{id: 1, name: 'Vijayawada'},
      {id: 2, name: 'Hyderabad'},
      {id: 3, name: 'Chennai'},
      {id: 4, name: 'Bangalore'},
      {id: 5, name:'Mumbai'},
      {id: 6, name: 'Pune'},
      {id: 7, name: 'Delhi'},
      {id: 8, name: 'Vizag'}];
    }
  }

})();
