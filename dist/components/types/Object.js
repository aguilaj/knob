"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _components = require("@storybook/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ObjectType =
/*#__PURE__*/
function (_Component) {
  _inherits(ObjectType, _Component);

  function ObjectType() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ObjectType);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ObjectType)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      value: {},
      failed: false,
      json: ''
    };

    _this.handleChange = function (e) {
      var value = e.target.value;
      var stateJson = _this.state.json;
      var _this$props = _this.props,
          knob = _this$props.knob,
          onChange = _this$props.onChange;

      try {
        var json = JSON.parse(value.trim());

        _this.setState({
          value: value,
          json: json,
          failed: false
        });

        if ((0, _fastDeepEqual["default"])(knob.value, stateJson)) {
          onChange(json);
        }
      } catch (err) {
        _this.setState({
          value: value,
          failed: true
        });
      }
    };

    return _this;
  }

  _createClass(ObjectType, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          value = _this$state.value,
          failed = _this$state.failed;
      var knob = this.props.knob;
      return _react["default"].createElement(_components.Form.Textarea, {
        name: knob.name,
        valid: failed ? 'error' : null,
        value: value,
        onChange: this.handleChange,
        size: "flex"
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (!(0, _fastDeepEqual["default"])(props.knob.value, state.json)) {
        try {
          return {
            value: JSON.stringify(props.knob.value, null, 2),
            failed: false,
            json: props.knob.value
          };
        } catch (e) {
          return {
            value: 'Object cannot be stringified',
            failed: true
          };
        }
      }

      return null;
    }
  }]);

  return ObjectType;
}(_react.Component);

ObjectType.propTypes = {
  knob: _propTypes["default"].shape({
    name: _propTypes["default"].string,
    value: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].array])
  }).isRequired,
  onChange: _propTypes["default"].func.isRequired
};

ObjectType.serialize = function (object) {
  return JSON.stringify(object);
};

ObjectType.deserialize = function (value) {
  return value ? JSON.parse(value) : {};
};

(0, _reactLifecyclesCompat.polyfill)(ObjectType);
var _default = ObjectType;
exports["default"] = _default;