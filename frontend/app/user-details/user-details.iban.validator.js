'use strict';

angular
    .module('userDetails')
    .directive('iban', function (){
        return {
            require: 'ngModel',
            link: function(scope, elem, attr, ngModel) {
                var iban = attr.iban;

                var validator = function(value) {
                    var valid = IBAN.isValid(value);
                    ngModel.$setValidity('iban', valid);
                    return valid ? value : undefined;
                };

                //For DOM -> model validation
                ngModel.$parsers.unshift(validator);

                //For model -> DOM validation
                ngModel.$formatters.unshift(validator);
            }
        };
    });