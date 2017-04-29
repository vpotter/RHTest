'use strict';

angular
    .module('exceptionHandler', ['ngMaterial'])
    .factory('$exceptionHandler', ['$log', '$injector', function($log, $injector) {
        return function myExceptionHandler(exception, cause) {
            var $mdDialog = $injector.get('$mdDialog');

            var title = exception.title || 'Unexpected Error';
            var message = exception.message || 'Unexpected error occurred: ' + exception;

            $log.warn(exception, cause);
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title(title)
                    .textContent(message)
                    .ariaLabel(title)
                    .ok('Close')
            );

        };
    }]);