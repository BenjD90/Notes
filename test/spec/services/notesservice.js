'use strict';

describe('Service: notesService', function () {

  // load the service's module
  beforeEach(module('notesApp'));

  // instantiate service
  var notesService;
  beforeEach(inject(function (_notesService_) {
    notesService = _notesService_;
  }));

  it('should do something', function () {
    expect(!!notesService).toBe(true);
  });

});
