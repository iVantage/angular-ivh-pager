
# ivh.pager

[![Build Status](https://secure.travis-ci.org/iVantage/angular-ivh-pager.png?branch=master)](https://travis-ci.org/iVantage/angular-ivh-pager)

> Dead simple paging for angular apps.


## Installation

Install with bower:

```
bower install --save angular-ivh-pager
```


## Usage

Add this module as a dependency to your app:

```
angular.module('myApp', ['ivh.pager']);
```

Now simply run your collection through the `ivhPaginate` filter and add the
`ivh-pager` element to your page:

```html
<!--
$scope = {
  bigCollection: [...],
  ixPage: 0
}
-->
<ul>
  <li ng-repeat="item in bigCollection | ivhPaginate:ixPage">
    <!-- item stuff -->
  </li>
</ul>

<!-- attribute form is fine too -->
<ivh-pager
    ivh-pager-page-number="ixPage"
    ivh-pager-total="bigCollection.length">
</ivh-pager>
```

You can also set custom page sizes:

```html
<!--
$scope = {
  bigCollection: [...],
  sizeOfPage: 100,
  ixPage: 0
}
-->
<ul>
  <li ng-repeat="item in bigCollection | ivhPaginate:ixPage:sizeOfPage">
    <!-- item stuff -->
  </li>
</ul>

<!-- attribute form is fine too -->
<ivh-pager
    ivh-pager-page-number="ixPage"
    ivh-pager-page-size="sizeOfPage"
    ivh-pager-total="bigCollection.length">
</ivh-pager>
```

As well as button sizes:

```html
<ivh-pager
    ivh-pager-page-number="ixPage"
    ivh-pager-button-size="'lg'" 
    ivh-pager-total="bigCollection.length">
</ivh-pager>
```

Button sizes can be one of `'lg'`, ''sm'` or `''` (the empty string) for the
default button size.

### Page Change Callbacks

IVH Pager provides a hook for user-driven page changes. Assign an angular
expression to `ivh-pager-on-page-change`, you will have access to the variables
`newPage` and `oldPage` corresponding to the new and old page indexes
respectively.

```html
<ivh-pager
    ivh-pager-page-number="ixPage"
    ivh-pager-button-size="'lg'" 
    ivh-pager-total="bigCollection.length"
    ivh-pager-on-page-change="myChangeHandler(newPage, oldPage)">
</ivh-pager>
```

## Testing

Use `npm test` to run the full suite of linting, style checks, and unit tests.

Or, run each individually:

- Use `grunt jshint` for linting
- Use `grunt jscs` for coding style checks
- Use `grunt jasmine` to unit tests

For ease of development the `grunt watch` task will run each of the above as
needed when you make changes to source files.


## Changelog

- 2015-10-07 v0.1.0 Initial release


## License

MIT
