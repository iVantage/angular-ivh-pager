
describe('Filter: ivhPaginate', function() {
  'use strict';

  beforeEach(module('ivh.pager'));

  var p, col;

  var getPage = function(ix, size) {
    return p(col, ix, size).join(',');
  };

  beforeEach(inject(function(ivhPaginateFilter) {
    p = ivhPaginateFilter;
    col = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  }));

  it('should be able to fetch the first page of results', function() {
    var actual = getPage(0, 3);
    expect(actual).toBe('0,1,2');
  });

  it('should be able to fetch the Nth page of results', function() {
    var actual = getPage(3, 2);
    expect(actual).toBe('6,7');
  });

  it('should return an empty list when asked for an index greater than the max', function() {
    var actual = getPage(3, 4);
    expect(actual).toBe('');
  });

  it('should return an empty list when asked for a negative page index', function() {
    var actual = getPage(-1, 3);
    expect(actual).toBe('');
  });

  it('should return a short list when the last page is not full', function() {
    var actual = getPage(2, 4);
    expect(actual).toBe('8,9');
  });

  it('should return everything when the page size is greater than the collection size', function() {
    var actual = getPage(0, 20);
    expect(actual).toBe('0,1,2,3,4,5,6,7,8,9');
  });
});
