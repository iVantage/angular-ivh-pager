
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


