
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
        pagerPageNumber: '=ivhPagerPageNumber'
      },
      template: [
        '<ul class="pagination" ng-show="pageRange.length > 1">',
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

