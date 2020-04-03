var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}
var encodeUrlVars = function encodeUrlVars(vars) {
  var varStr = Object.keys(vars).map(function (key) {
    return key + '=' + vars[key];
  }).join('&');
  return varStr;
};
function getUrlParam(parameter, defaultvalue) {
  var urlparameter = defaultvalue;
  if (window.location.href.indexOf(parameter) > -1) {
    urlparameter = getUrlVars()[parameter];
  }
  return urlparameter;
}

var Search = function (_React$Component) {
  _inherits(Search, _React$Component);

  function Search(props) {
    _classCallCheck(this, Search);

    var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      configuration: {
        searchableFields: ['Last_Name', 'First_Name', 'Birth_Year', 'Middle_Name', 'Cemetery Name'],
        sortings: {
          name_asc: {
            field: 'Last_Name',
            order: 'asc'
          }
        },
        aggregations: {
          Birth_Year: {
            title: 'Birth Year',
            size: 10
          },
          Death_Year: {
            title: 'Death Year',
            size: 10
          },
          Cemetery_Name: {
            title: 'Cemetary',
            size: 10
          },
          Fraternal_Organization: {
            title: 'Fraternal Organization',
            size: 10
          },
          Church_Affiliation: {
            title: 'Fraternal Organization',
            size: 10
          }
        }
      }
    };

    var newFilters = {};
    Object.keys(_this.state.configuration.aggregations).map(function (v) {
      var urlVars = getUrlVars();
      newFilters[v] = [];
      if (urlVars.hasOwnProperty(v)) {
        newFilters[v] = [decodeURI(urlVars[v])];
      };
    });

    _this.state = Object.assign({}, _this.state, {
      itemsjs: itemsjs(allRecords, _this.state.configuration),
      query: decodeURI(getUrlParam('query', '')),
      filters: newFilters
    });
    return _this;
  }

  _createClass(Search, [{
    key: 'changeQuery',
    value: function changeQuery(e) {
      var query = e.target.value;
      var urlVars = getUrlVars();
      if (query.match(/(\?|\=|\&|\/|\_|\:)/g)) {
        return;
      }
      if (query !== "") {
        var newUrlVars = Object.assign({}, urlVars, { query: query });
        var urlVarStr = encodeUrlVars(newUrlVars);
        window.history.pushState("", "", '?' + urlVarStr);
      } else {
        delete urlVars['query'];
        var _urlVarStr = encodeUrlVars(urlVars);
        window.history.pushState("", "", '?' + _urlVarStr);
      }
      this.setState({
        query: query
      });
    }

    // TODO: Make this work
    // reset() {
    //   var newFilters = {};
    //   Object.keys(this.state.configuration.aggregations).map(function (v) {
    //     newFilters[v] = [];
    //   })
    //   this.setState({
    //     filters: newFilters,
    //     query: '',
    //   })
    // }

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      console.log('Search performed in ' + this.searchResult.timings.search + ' ms, facets in ' + this.searchResult.timings.facets + ' ms');
      return React.createElement(
        'div',
        { className: 'container', style: { marginTop: 0 } },
        React.createElement(
          'div',
          { className: 'row mt-5' },
          React.createElement(
            'div',
            { className: 'col-md-4 col-xs-4', id: 'facet-sidebar' },
            React.createElement(
              'nav',
              { className: 'navbar navbar-default pl-0', style: { marginBottom: 0 } },
              React.createElement(
                'div',
                { id: 'navbar' },
                React.createElement(
                  'form',
                  { className: 'navbar-form navbar-left', style: { paddingLeft: 0 } },
                  React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                      'h1',
                      null,
                      'Search'
                    ),
                    React.createElement('input', { type: 'text', value: this.state.query, onChange: this.changeQuery.bind(this), className: 'form-control', placeholder: 'Search' })
                  )
                )
              )
            ),
            React.createElement(
              'h3',
              null,
              'Results',
              React.createElement(
                'span',
                { className: 'badge badge-secondary ml-2' },
                this.searchResult.pagination.total
              )
            ),
            Object.entries(this.searchResult.data.aggregations).map(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  key = _ref2[0],
                  value = _ref2[1];

              return React.createElement(
                'div',
                { key: key, className: 'facet-section' },
                React.createElement(
                  'h5',
                  null,
                  React.createElement(
                    'strong',
                    null,
                    value.title
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'facet-grouping' },
                  Object.entries(value.buckets).map(function (_ref3) {
                    var _ref4 = _slicedToArray(_ref3, 2),
                        keyB = _ref4[0],
                        valueB = _ref4[1];

                    var isChecked = _this2.state.filters[value.name].indexOf(valueB.key) > -1 || false;

                    return React.createElement(
                      'label',
                      { key: valueB.key, className: (isChecked ? "selected" : "btn-light") + ' btn m-1 facet' },
                      React.createElement('input', {
                        type: 'checkbox',
                        checked: isChecked,
                        onChange: _this2.handleCheckbox(value.name, valueB.key) }),
                      React.createElement(
                        'span',
                        { className: 'pr-2' },
                        valueB.key
                      ),
                      React.createElement(
                        'span',
                        { className: 'badge badge-secondary' },
                        valueB.doc_count
                      )
                    );
                  })
                )
              );
            })
          ),
          React.createElement(
            'div',
            { className: 'col-md-8 col-xs-8', id: 'result-card-container' },
            Object.entries(this.searchResult.data.items).map(function (_ref5) {
              var _ref6 = _slicedToArray(_ref5, 2),
                  key = _ref6[0],
                  item = _ref6[1];

              var Birth_Year = item.Birth_Year,
                  Death_Year = item.Death_Year,
                  Prefix = item.Prefix,
                  First_Name = item.First_Name,
                  Middle_Name = item.Middle_Name,
                  Last_Name = item.Last_Name,
                  Suffix = item.Suffix,
                  Media_URL = item.Media_URL,
                  Cemetery_Name = item.Cemetery_Name,
                  FindGraveURL = item.FindGraveURL,
                  Find_A_Grave = item.Find_A_Grave;

              var birthYear = Birth_Year ? Birth_Year : "?";
              var deathYear = Death_Year ? Death_Year : "?";
              var findGraveUrl = FindGraveURL ? FindGraveURL : Find_A_Grave ? 'https://www.findagrave.com/memorial/' + Find_A_Grave.trim() : null;
              var cemetaryName = Cemetery_Name ? Cemetery_Name : null;
              // TODO: Change placeholder image
              var placeholderImg = "/assets/img/placeholder.jpg";
              var mediaUrl = Media_URL ? Media_URL : placeholderImg;
              var addDefaultSrc = function addDefaultSrc(e) {
                e.target.src = placeholderImg;
              };
              return React.createElement(
                'div',
                { className: 'row rounded-lg mb-4 shadow-lg p-4 result-card', key: key },
                React.createElement(
                  'div',
                  { className: 'col-sm-4 p-0 portrait-container' },
                  React.createElement('img', { src: mediaUrl, onError: addDefaultSrc })
                ),
                React.createElement(
                  'div',
                  { className: 'col-sm-8 pl-4 pr-0 info-container' },
                  React.createElement(
                    'h4',
                    null,
                    Prefix + ' ' + First_Name + ' ' + Middle_Name + ' ' + Last_Name + ' ' + Suffix
                  ),
                  React.createElement(
                    'p',
                    { className: 'life-span' },
                    birthYear + ' - ' + deathYear
                  ),
                  React.createElement(
                    'p',
                    null,
                    cemetaryName ? React.createElement(
                      'small',
                      { className: 'sub-text' },
                      '(' + cemetaryName + ')'
                    ) : ""
                  ),
                  React.createElement(
                    'div',
                    { className: 'rounded-lg p-2 shadow fact-container' },
                    React.createElement(
                      'div',
                      { className: 'col-sm-6 p-0' },
                      React.createElement(
                        'table',
                        { className: 'table table-sm table-borderless' },
                        React.createElement(
                          'tbody',
                          null,
                          React.createElement(
                            'tr',
                            null,
                            React.createElement(
                              'td',
                              { style: { textAlign: 'right' } },
                              React.createElement(
                                'strong',
                                null,
                                'Marital Status'
                              )
                            ),
                            React.createElement(
                              'td',
                              null,
                              'Married'
                            )
                          ),
                          React.createElement(
                            'tr',
                            null,
                            React.createElement(
                              'td',
                              { style: { textAlign: 'right' } },
                              React.createElement(
                                'strong',
                                null,
                                'Occupation'
                              )
                            ),
                            React.createElement(
                              'td',
                              null,
                              'Physician'
                            )
                          ),
                          React.createElement(
                            'tr',
                            null,
                            React.createElement(
                              'td',
                              { style: { textAlign: 'right' } },
                              React.createElement(
                                'strong',
                                null,
                                'Birth Place'
                              )
                            ),
                            React.createElement(
                              'td',
                              null,
                              'Richmond, Virginia'
                            )
                          ),
                          React.createElement(
                            'tr',
                            null,
                            React.createElement(
                              'td',
                              { style: { textAlign: 'right' } },
                              React.createElement(
                                'strong',
                                null,
                                'Spouce Name'
                              )
                            ),
                            React.createElement(
                              'td',
                              null,
                              'Alex Ipsum'
                            )
                          ),
                          React.createElement(
                            'tr',
                            null,
                            React.createElement(
                              'td',
                              { style: { textAlign: 'right' } },
                              React.createElement(
                                'strong',
                                null,
                                'Frat. Org.'
                              )
                            ),
                            React.createElement(
                              'td',
                              null,
                              'Lorem Ipsum Dolor'
                            )
                          )
                        )
                      )
                    ),
                    React.createElement(
                      'div',
                      { className: 'col-sm-6 p-0' },
                      React.createElement(
                        'table',
                        { className: 'table table-sm table-borderless' },
                        React.createElement(
                          'tbody',
                          null,
                          React.createElement(
                            'tr',
                            null,
                            React.createElement(
                              'td',
                              { style: { textAlign: 'right' } },
                              React.createElement(
                                'strong',
                                null,
                                'Military Service'
                              )
                            ),
                            React.createElement(
                              'td',
                              null,
                              'WWII'
                            )
                          ),
                          React.createElement(
                            'tr',
                            null,
                            React.createElement(
                              'td',
                              { style: { textAlign: 'right' } },
                              React.createElement(
                                'strong',
                                null,
                                'Service Info'
                              )
                            ),
                            React.createElement(
                              'td',
                              null,
                              'Co. G, 24th Infantry'
                            )
                          ),
                          React.createElement(
                            'tr',
                            null,
                            React.createElement(
                              'td',
                              { style: { textAlign: 'right' } },
                              React.createElement(
                                'strong',
                                null,
                                'Church Affiliation'
                              )
                            ),
                            React.createElement(
                              'td',
                              null,
                              'Lorem Ipsum Baptist Church'
                            )
                          )
                        )
                      )
                    )
                  ),
                  React.createElement(
                    'div',
                    { className: 'mt-3 link-container' },
                    React.createElement(
                      'a',
                      { target: '_blank', href: findGraveUrl },
                      'View on Findagrave.com'
                    ),
                    React.createElement(
                      'a',
                      { target: '_blank', href: '/' },
                      'View on Cemetary Map'
                    )
                  )
                )
              );
            })
          )
        )
      );
    }
  }, {
    key: 'searchResult',
    get: function get() {

      var result = this.state.itemsjs.search({
        query: this.state.query,
        filters: this.state.filters,
        sort: 'name_asc',
        per_page: 10,
        filter: function filter(item) {
          return item.Last_Name !== "";
        }
      });
      // console.log(result);
      return result;
    }
  }]);

  return Search;
}(React.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.handleCheckbox = function (filterName, filterValue) {
    return function (event) {
      var oldFilters = _this3.state.filters;
      var newFilters = oldFilters;
      var check = event.target.checked;
      var urlVars = getUrlVars();
      if (check) {
        // update url params
        urlVars[filterName] = filterValue;
        var urlVarStr = encodeUrlVars(urlVars);
        window.history.pushState("", "", '?' + urlVarStr);
        // update state
        newFilters[filterName].push(filterValue);
        _this3.setState({
          filters: newFilters
        });
      } else {
        var index = newFilters[filterName].indexOf(filterValue);
        if (index > -1) {
          // update url params
          delete urlVars[filterName];
          var _urlVarStr2 = encodeUrlVars(urlVars);
          window.history.pushState("", "", '?' + _urlVarStr2);
          // update state
          newFilters[filterName].splice(index, 1);
          _this3.setState({
            filters: newFilters
          });
        }
      }
    };
  };
};

ReactDOM.render(React.createElement(Search, null), document.getElementById('react_search_container'));