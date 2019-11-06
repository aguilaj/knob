"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _components = require("@storybook/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function formatArray(value, separator) {
  if (value === '') {
    return [];
  }

  return value.split(separator);
}

var ArrayType =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ArrayType, _React$Component);

  function ArrayType(props) {
    var _this;

    _classCallCheck(this, ArrayType);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ArrayType).call(this, props));

    _this.handleChange = function (e, idx, key) {
      e.stopPropagation();
      e.preventDefault();
      var _this$props = _this.props,
          knob = _this$props.knob,
          onChange = _this$props.onChange;
      var value = e.target.value;

      var values = _toConsumableArray(knob.value);

      values[idx][key] = JSON.parse(value);
      onChange(values);
    };

    _this.handleDelete = function (e, idx) {
      if (!e.nativeEvent.detail) return;
      e.stopPropagation();
      e.preventDefault();
      var _this$props2 = _this.props,
          knob = _this$props2.knob,
          onChange = _this$props2.onChange;

      var values = _toConsumableArray(knob.value);

      values.splice(idx, 1);
      onChange(values);
    };

    _this.addField = function (e) {
      e.stopPropagation();
      e.preventDefault();
      var _this$props3 = _this.props,
          knob = _this$props3.knob,
          onChange = _this$props3.onChange;
      var keys = _this.state.keys;

      var values = _toConsumableArray(knob.value);

      var newItem = {};
      keys.forEach(function (key) {
        newItem[key] = "";
      });
      values.push(newItem);
      onChange(values);
    };

    _this.renderKeys = function (val, knob, idx) {
      return Object.entries(val).map(function (key, vl) {
        return _react["default"].createElement("div", {
          style: {
            display: "flex",
            marginBottom: "10px"
          },
          key: "".concat(idx).concat(vl)
        }, _react["default"].createElement("div", {
          style: {
            width: "70px",
            alignSelf: "center"
          }
        }, key[0]), _react["default"].createElement(_components.Form.Textarea, {
          id: vl,
          name: "".concat(knob.name, "-").concat(idx, "-").concat(vl),
          value: JSON.stringify(key[1]),
          onChange: function onChange(e) {
            return _this.handleChange(e, idx, key[0]);
          },
          size: "100%"
        }));
      });
    };

    _this.state = {
      keys: Object.entries(props.knob.value[0]).map(function (key) {
        return key[0];
      })
    };
    return _this;
  }

  _createClass(ArrayType, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var knob = this.props.knob;
      return nextProps.knob.value !== knob.value;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var knob = this.props.knob;
      var value = knob.value.join(knob.separator);
      return _react["default"].createElement("div", {
        style: {
          width: "100%"
        }
      }, knob.value.map(function (val, idx) {
        return _react["default"].createElement("div", {
          style: {
            display: "flex"
          },
          key: "".concat(idx)
        }, _react["default"].createElement("div", {
          style: {
            marginTop: "-30px",
            alignSelf: "center"
          }
        }, _react["default"].createElement("button", {
          type: "button",
          style: {
            marginRight: "20px",
            color: "white",
            background: "rgb(202, 60, 60)",
            borderRadius: "4px",
            border: "none"
          },
          onClick: function onClick(e) {
            _this2.handleDelete(e, idx);
          }
        }, "Delete")), _react["default"].createElement("div", {
          style: {
            width: "100%",
            marginBottom: "20px",
            paddingBottom: "10px",
            borderBottom: "1px solid #F3F3F3"
          }
        }, _this2.renderKeys(val, knob, idx)));
      }), _react["default"].createElement("div", {
        style: {
          textAlign: "center"
        }
      }, _react["default"].createElement("button", {
        type: "button",
        style: {
          color: "white",
          background: "rgb(28, 184, 65)",
          borderRadius: "4px",
          border: "none"
        },
        onClick: function onClick(e) {
          return _this2.addField(e);
        }
      }, "Add field")));
    }
  }]);

  return ArrayType;
}(_react["default"].Component);

ArrayType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  }
};
ArrayType.propTypes = {
  knob: _propTypes["default"].shape({
    name: _propTypes["default"].string,
    value: _propTypes["default"].array,
    separator: _propTypes["default"].string
  }),
  onChange: _propTypes["default"].func
};

ArrayType.serialize = function (value) {
  return value;
};

ArrayType.deserialize = function (value) {
  if (Array.isArray(value)) return value;
  return Object.keys(value).sort().reduce(function (array, key) {
    return [].concat(_toConsumableArray(array), [value[key]]);
  }, []);
};

var _default = ArrayType;
exports["default"] = _default;