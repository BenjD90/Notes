(function () {

  angular
    .module('Notes')
    .controller('NotesController',
    function NotesController($scope, $route, $routeParams, $location, $mdSidenav, $mdToast, $mdBottomSheet, $mdDialog, $log, $notesService) {
      $scope.allNotes = $notesService.getAllNotes();

      $scope.toggleMenuList = function () {
        var pending = $mdBottomSheet.hide() || $q.when(true);

        pending.then(function () {
          $mdSidenav('left').toggle();
        });
      }

      $scope.addNote = function (ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'views/createNote.html',
          locals: {
            index: undefined
          },
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true
        })
          .then(function (note) {
            $notesService.addNote(note);
            showMessage($mdToast, 'Ajouté !');
          }, function () {
          });
      };

      $scope.editNote = function (note, ev) {
        var index = $notesService.getAllNotes().indexOf(note);
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'views/createNote.html',
          locals: {
            index: index
          },
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true
        })
          .then(function (note) {
            $notesService.editNote(index, note);
          }, function () {
          });
      };

      $scope.deleteNote = function (note, ev) {
        var index = $notesService.getAllNotes().indexOf(note);
        $notesService.deleteNote(index);
      };


      $scope.detailNote = function (note, ev) {
        var index = $notesService.getAllNotes().indexOf(note);
        $mdDialog.show({
          controller: DetailNoteController,
          templateUrl: 'views/detailNote.html',
          locals: {
            index: index
          },
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true
        });
      };

      $scope.setState = function (note, ev, newState) {
        var index = $notesService.getAllNotes().indexOf(note);
        var note = $notesService.getNoteByIndex(index);
        note.state = newState;
        $notesService.editNote(index, note);
      };

      $scope.setColor = function (note, ev, newColor) {
        var index = $notesService.getAllNotes().indexOf(note);
        var note = $notesService.getNoteByIndex(index);
        note.color = newColor;
        $notesService.editNote(index, note);
      };
    });

  function showMessage($mdToast, message) {
    $mdToast.show(
      $mdToast.simple()
        .content(message)
        .hideDelay(2000)
    );
  }

  function DialogController($scope, $mdDialog, $notesService, index) {
    $scope.index = index;
    $scope.note = $notesService.getNoteByIndex(index);

    $scope.shouldBeOpen = true;

    $mdDialog.onComplete = function(){
      $scope.shouldBeOpen = true;
    }

    $scope.hide = function () {
      $mdDialog.hide();
    };
    $scope.cancel = function () {
      $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
      if ($scope.noteForm.$valid) {
        $mdDialog.hide($scope.note);
      }
    };
  }

  function DetailNoteController($scope, $mdDialog, $notesService, index) {
    $scope.index = index;
    $scope.note = $notesService.getNoteByIndex(index);

    $scope.hide = function () {
      $mdDialog.hide();
    };
    $scope.cancel = function () {
      $mdDialog.cancel();
    };
  }
})();
