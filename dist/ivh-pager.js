
/**
 * Main module declaration for ivh.pager
 *
 * @package ivh.pager
 * @copyright 2015 iVantage Health Analytics, Inc.
 */

angular.module('ivh.pager', []);


/**
 * Dead simple pagination controls
 *
 * @package ivh.pager
 * @copyright 2015 iVantage Health Analytics, Inc.
 */

angular.module('ivh.pager')
  .directive('ivhPager', function() {
    'use strict';
    return {
      restrict: 'AE',
      scope: {
        /**
         * The total number of items in your paged collection
         */
        pagerTotal: '=ivhPagerTotal',

        /**
         * The number of items to display per page
         *
         * Defaults to `15`
         */
        pagerPageSize: '=ivhPagerPageSize',

        /**
         * The currently visible page index
         *
         * Defaults to `0`, the first page.
         */
        pagerPageNumber: '=ivhPagerPageNumber',

        /**
         * If provided, should be one of:
         * - '' (the emtpy string)
         * - 'sm' (for small buttons)
         * - 'lg' (for large buttons)
         */
        pagerButtonSize: '=ivhPagerButtonSize'
      },
      template: [
        '<ul class="pagination"',
            'ng-class="{\'pagination-lg\': pagerButtonSize === \'lg\', \'pagination-sm\': pagerButtonSize === \'sm\'}"',
            'ng-show="pageRange.length > 1">',
          '<li ng-class="{disabled: pagerPageNumber == 0}">',
            '<a ng-click="goTo(0)">&laquo;</a>',
          '</li>',
          '<li ng-hide="start == 0" class="disabled"><a>...</a></li>',
          '<li ng-repeat="ix in pageRange" ng-class="{active: ix == pagerPageNumber}">',
            '<a ng-click="goTo(ix)">',
              '{{1 + ix}}',
            '</a>',
          '</li>',
          '<li class="disabled" ng-hide="end == maxPageNumber"><a>...</a></li>',
          '<li ng-class="{disabled: pagerPageNumber == maxPageNumber}">',
            '<a ng-click="goTo(maxPageNumber)">&raquo;</a>',
          '</li>',
        '</ul>'
      ].join('\n'),
      link: function(scope, element, attrs) {
        scope.pagerPageNumber = scope.pagerPageNumber || 0;

        var updatePager = function() {
          var numItems = scope.pagerTotal
            , pageSize = scope.pagerPageSize || 15
            , pageNum = scope.pagerPageNumber || 0
            , leader = 3
            , tail = 3;

          var max = scope.maxPageNumber = (function() {
            var p = numItems / pageSize
              , max = Math.floor(p);
            return p === max ? --max : max;
          }());

          // If the current page is too high to display any items,
          // go back to the first page.
          if(pageNum * pageSize > numItems) {
            scope.pagerPageNumber = 0;
            pageNum = scope.pagerPageNumber;
          }

          scope.start = Math.max(pageNum - tail, 0);

          scope.end = Math.min(pageNum + tail, max);

          if(0 === scope.start) {
            while(scope.end - scope.start < leader + tail + 1 && scope.end !== max) {
              scope.end++;
            }
          }

          if(max === scope.end) {
            while(scope.end - scope.start < leader + tail + 1 && scope.start !== 0) {
              scope.start--;
            }
          }

          scope.pageRange = [];
          for(var ix = scope.start; ix < scope.end + 1; ix++) {
            scope.pageRange.push(ix);
          }
        };

        scope.goTo = function(pageNumber) {
          scope.pagerPageNumber = pageNumber;
          updatePager();
        };

        scope.$watch('pagerTotal', updatePager);
      }
    };
  });



/**
 * Filter a collection down to a single page
 *
 * Meant to be used with the `ivh-pager` directive.
 *
 * Given an array, page size, and page index (zero-based) this returns a new
 * array with just items from that "page". E.g. for the array:
 *
 * ```
 * [0,1,2,3,4,5,6,7,8,9]
 * ```
 *
 * The 0th page of 3 elements would be `[0,1,2]`, the 1st page `[3,4,5]`, etc.
 *
 * @package ivh.pager
 * @copyright 2015 iVantage Health Analytics, Inc.
 */

angular.module('ivh.pager')
  .filter('ivhPaginate', function() {
    'use strict';
    return function(array, pageIx, pageSize) {
      pageIx = pageIx || 0;
      pageSize = pageSize || 15;
      return (array || []).slice(pageIx * pageSize, (pageIx + 1) * pageSize);
    };
  });


