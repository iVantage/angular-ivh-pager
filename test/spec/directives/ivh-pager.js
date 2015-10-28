
describe('Directive: ivhPager', function() {
  'use strict';

  var ng = angular
    , $ = jQuery
    , scope
    , c;

  beforeEach(module('ivh.pager'));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
    scope.state = {};

    c = function(tpl, s) {
      s = s || scope;
      tpl = ng.isArray(tpl) ? tpl.join('\n') : tpl;
      var $el = $compile(ng.element(tpl))(s);
      s.$apply();
      return $el;
    };
  }));

  it('should create an array of buttons page buttons', function() {
    scope.state.pageNum = 1;

    var $el = c([
      '<div ivh-pager',
        'ivh-pager-total="100"',
        'ivh-pager-page-size="3"',
        'ivh-pager-page-number="state.pageNum">',
      '</div>'
    ]);

    var $buttons = $el.find('li a');

    expect($buttons.length).toBe(12);
  });

  it('should accept a callback from when the page changes', function() {
    scope.state.pageNum = 1;

    scope.onChange = jasmine.createSpy('onChange');

    var $el = c([
      '<div ivh-pager',
        'ivh-pager-total="100"',
        'ivh-pager-page-size="3"',
        'ivh-pager-page-number="state.pageNum"',
        'ivh-pager-on-page-change="onChange(newPage, oldPage)">',
      '</div>'
    ]);

    // Go to "visible" page
    $el.find('li a:contains("5")').click();
    expect(scope.onChange).toHaveBeenCalledWith(4, 1);

    // Go to "final" page
    $el.find('li a').last().click();
    expect(scope.onChange).toHaveBeenCalledWith(33, 4);
  });
});
