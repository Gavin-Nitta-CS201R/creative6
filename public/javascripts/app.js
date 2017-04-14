'use strict';

var app = angular.module('creative6', [
  'firebase',
  'ngMaterial',
  'ui.router',
  'firebase'
]);

app.controller('mainController', ['$scope', 'firebaseService',
  function ($scope, firebaseService) {
    $scope.signout = function () {
      firebaseService.auth().signOut();
    };
  }
])


app.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'views/login.html'
      })

      .state('wish-list', {
        url: '/wishlist',
        templateUrl: 'views/wishlist.html'
      });

    $urlRouterProvider.otherwise('/');

  }
])

app.run([
  '$rootScope',
  'firebaseService',
  '$state',
  function ($scope, firebaseService, $state) {

    firebaseService.auth().onAuthStateChanged(function (authData) {
      if (authData) {
        $scope.uid = authData.uid;
        $scope.currentUser = firebaseService.auth().currentUser;
        $state.go('wish-list')
      } else {
        $scope.uid = null;
        $state.go('login');
      }
    });
  }])

app.service('firebaseService', function ($firebaseAuth, $firebaseArray, $firebaseObject) {
  var Ref = firebase.database().ref();
  return {
    auth: function () {
      return firebase.auth();
    },
    getUser: function (uid) {
      return Ref.child(uid);
    },
    updateUser: function (uid, userObj) {
      var updates = {};
      updates[uid] = []
      $firebaseObject(firebase.database().ref(uid)).update(updates);
      this.auth().currentUser.updateProfile({
        displayName: userObj.firstName + ' ' + userObj.lastName
      })
    },
    getUsers: function (success, error) {
      var test = $firebaseArray(Ref.child('list'));
      console.log(test.length);
    },
    getErrorMessage: function (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          error.message = 'The specified user account email is invalid.';
          return error;
        case 'auth/wrong-password':
          error.message = 'The specified user account password is incorrect.';
          return error;
        case 'auth/user-not-found':
          error.message = 'The specified user account does not exist.';
          return error;
        case 'auth/email-already-in-use':
          error.message = 'The specified email is already in use.';
          return error;
        default:
          return error;
      }
    }
  };
});
