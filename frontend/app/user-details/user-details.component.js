'use strict';

angular.
  module('userDetails').
  component('userDetails', {
    templateUrl: 'app/user-details/user-details.template.html',
    bindings: {
        selected: '<',
        onSubmit : '&',
        onCancel : '&',
        onDelete : '&'
    }
  });
