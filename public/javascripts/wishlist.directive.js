'use strict';

function wishListDirective($firebaseObject, $mdDialog, firebaseService) {
  return {
    restrict: 'E',
    link: function ($scope) {

      $scope.loaded = false;

      function setup() {
        console.log('uid: ', $scope.uid)
        firebaseService.getUsers(function (data) {
          $scope.wishList = data;
          $scope.loaded = true;
        }, function () {
          console.log('There was an error');
        });

        $scope.opened = [];
      }

      // $scope.purchase = function (item) {
      //   item.purchased = !item.purchased;
      //   save();
      // };

      // $scope.add = function (person, name, desc) {
      //   if (!desc) {
      //     desc = '';
      //   }
      //   if (!person.items) {
      //     person.items = [];
      //   }
      //   person.items.push({
      //     name: name,
      //     description: desc,
      //     purchased: false
      //   });
      //   save();
      // };

      // $scope.showConfirm = function (ev, person, item) {
      //   var confirm = $mdDialog.confirm()
      //     .title('Are you sure you want to delete?')
      //     .ariaLabel('Delete')
      //     .targetEvent(ev)
      //     .ok('Yes')
      //     .cancel('Cancel');
      //   $mdDialog.show(confirm).then(function () {
      //     removeItem(person, item);
      //   });
      // };

      // function removeItem(person, item) {
      //   var itemIndex = person.items.indexOf(item);
      //   person.items.splice(itemIndex, 1);
      //   save();
      // }

      // $scope.beforeEdit = function (item) {
      //   $scope.before = {};
      //   $scope.before.name = item.name;
      //   $scope.before.description = item.description;
      // };

      // $scope.cancelEdit = function (item) {
      //   item.name = $scope.before.name;
      //   item.description = $scope.before.description;
      // };

      // function save() {
      //   for (var i = 0; i < $scope.wishList.length; i++) {
      //     console.log($scope.wishList[i]);
      //     delete $scope.wishList[i].opened;
      //   }
      //   $scope.wishList.$save();
      // }

      setup();
    }
  };
}

angular.module('creative6')
  .directive('wishList', ['$firebaseObject', '$mdDialog', 'firebaseService', wishListDirective]);
