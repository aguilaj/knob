"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _components = require("@storybook/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

  function ArrayType() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ArrayType);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ArrayType)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleChange = function (e) {
      var _this$props = _this.props,
          knob = _this$props.knob,
          onChange = _this$props.onChange;
      var value = e.target.value;
      var newVal = formatArray(value, knob.separator);
      onChange(newVal);
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
      var knob = this.props.knob;
      var value = knob.value.join(knob.separator);
      return _react["default"].createElement(_components.Form.Textarea, {
        id: knob.name,
        name: knob.name,
        value: value,
        onChange: this.handleChange,
        size: "flex"
      });
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