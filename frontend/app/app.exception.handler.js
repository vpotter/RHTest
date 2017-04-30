'use strict';

angular
    .module('exceptionHandler', ['ngMaterial'])
    .factory('$exceptionHandler', ['$log', '$injector', function($log, $injector) {
        return function myExceptionHandler(exception, cause, permanent) {
            permanent = permanent || false;
            var $mdDialog = $injector.get('$mdDialog');

            var title = exception.name || 'Unexpected Error';
            var message = exception.message || 'Unexpected error occurred: ' + exception;

            $log.warn(exception, cause);

            var dialog_options = {
                'title': title,
                'textContent': message,
                'ariaLabel': title,
                'ok': 'Close',
                'clickOutsideToClose': true
            };

            if (permanent) {
                dialog_options['escapeToClose'] = false;
                dialog_options['clickOutsideToClose'] = false;

                /* Custom dialog template without buttons */
                dialog_options['template'] =
'<md-dialog md-theme="{{ dialog.theme || dialog.defaultTheme }}" aria-label="{{ dialog.ariaLabel }}" ng-class="dialog.css">' +
'  <md-dialog-content class="md-dialog-content" role="document" tabIndex="-1">' +
'    <h2 class="md-title">{{ dialog.title }}</h2>' +
'    <div ng-if="::dialog.mdHtmlContent" class="md-dialog-content-body" ' +
'        ng-bind-html="::dialog.mdHtmlContent"></div>' +
'    <div ng-if="::!dialog.mdHtmlContent" class="md-dialog-content-body">' +
'      <p>{{::dialog.mdTextContent}}</p>' +
'    </div>' +
'  </md-dialog-content>' +
'</md-dialog>';
            }
            return $mdDialog.show($mdDialog.alert(dialog_options));
        };
    }]);