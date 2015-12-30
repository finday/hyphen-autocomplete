/*
 * Author: Yogasaikrishna
 * License: MIT
 */

(function() {
  'use strict';

  angular.module('hyphen-autocomplete', [])
    .directive('fdAutocomplete', fdAutoComplete);

    function fdAutoComplete() {
      return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
          items: '=',
          onSelect: '&'
        },
        link: function(scope, elem, attrs, ngModel) {
          var bind = attrs.bind, label = attrs.label;
          var isSelected = false, element = elem[0].parentElement;
          var width = elem[0].clientWidth;

          scope.$watch(function() {
            return ngModel.$modelValue;
          }, function(value, oldValue) {
            if (!isSelected) {
              if (value !== oldValue) {
                buildSuggestions(value.toLowerCase());
              }
            } else {
              isSelected = false;
            }
          });

          function removeSuggestions() {
            var container = element.getElementsByClassName('fd-suggestions')[0];
            if (container) {
              element.removeChild(container);
            }
          }

          function onItemSelect(event) {
            var value;
            if (bind && label) {
              value = event.target.dataset.value;
            } else {
              value = event.target.innerText;
            }
            elem.val(event.target.innerText);
            scope.$apply(function() {
              isSelected = true;
              ngModel.$setViewValue(value);
              removeSuggestions();
              scope.onSelect();
            });
          }

          function buildSuggestions(value) {
            var container = element.getElementsByClassName('fd-suggestions')[0];
            if (container) {
              element.removeChild(container);
            }
            if (value.length > 0 && scope.items) {
              var i, items = scope.items;
              container = document.createElement('div');
              container.className = 'fd-suggestions';
              container.style.width = (width  - 8) + 'px';

              var template = '', results = [];
              for (i = 0; i < items.length; i++) {
                if (bind && label) {
                  if (items[i][label].toLowerCase().indexOf(value) !== -1) {
                    results.push(items[i]);
                  }
                } else {
                  if (items[i].toLowerCase().indexOf(value) !== -1) {
                    results.push(items[i]);
                  }
                }
              }

              var count = results.length > 10 ? 10 : results.length;
              for (i = 0; i < count; i++) {
                if (bind && label) {
                  template += '<div class="fd-suggestion-item" data-value="' + results[i][bind] +
                    '">' + results[i][label] + '</div>';
                } else {
                  template += '<div class="fd-suggestion-item">' + results[i] + '</div>';
                }
              }

              element.appendChild(container);
              container.innerHTML = template;

              var elems = element.getElementsByClassName('fd-suggestion-item');
              for (i = 0; i < elems.length; i++) {
                if (window.addEventListener) {
                  elems[i].addEventListener('click', onItemSelect, false);
                } else {
                  elems[i].attachEvent('onclick', onItemSelect, false);
                }
              }
            }
          }

          document.addEventListener('click', function(e) {
            var container = element.querySelector('.fd-suggestions');
            if (e && e.target) {
              var target = e.target;
              while(target.parentNode) {
                if (target !== container) {
                  removeSuggestions();
                  return;
                }
                target = target.parentNode;
              }
            }
          });

        }
      };

    }
})();
