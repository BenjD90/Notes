'use strict';

angular.module('Notes')
  .service('$notesService', function ($log, $localStorage) {
    $localStorage.$default({
      notes: []
    });

    this.addNote = function (note) {
      note.dates = [new Date()];
      note.datesStatesChanged = [{date: new Date(), state: ''}];
      note.state = 'TODO';
      note.color = 'white';
      $localStorage.notes.push(note);
    };

    this.editNote = function (index, note) {
      var oldNote = $localStorage.notes[index];
      if (note.state != oldNote.state) {
        note.datesStatesChanged.push({date: new Date(), state: oldNote.state, newState: note.state});
      }
      if (note.color != oldNote.color) {
        note.datesStatesChanged.push({date: new Date(), state: oldNote.color, newState: note.color});
      }
      note.dates.push(new Date());

      $localStorage.notes[index] = note;
    };

    this.deleteNote = function (index) {
      $localStorage.notes.splice(index, 1);
    }

    this.getNoteByIndex = function (index) {
      if (index !== undefined) {
        var note = $localStorage.notes[index];
        var copy = note.constructor();
        for (var attr in note) {
          if (note.hasOwnProperty(attr)) copy[attr] = note[attr];
        }
        return copy;
      }
    };

    this.getAllNotes = function () {
      return $localStorage.notes;
    };
  });
