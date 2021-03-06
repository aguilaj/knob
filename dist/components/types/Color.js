"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _global = require("global");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactColor = require("react-color");

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Button = _components.Form.Button;

var Swatch = _theming.styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: 6,
    width: 16,
    height: 16,
    boxShadow: "".concat(theme.appBorderColor, " 0 0 0 1px inset"),
    borderRadius: '1rem'
  };
});

var ColorButton = (0, _theming.styled)(Button)(function (_ref2) {
  var active = _ref2.active;
  return {
    zIndex: active ? 3 : 'unset'
  };
});

var Popover = _theming.styled.div({
  position: 'absolute',
  zIndex: '2'
});

var ColorType =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ColorType, _React$Component);

  function ColorType() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ColorType);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ColorType)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      displayColorPicker: false
    };

    _this.handleWindowMouseDown = function (e) {
      var displayColorPicker = _this.state.displayColorPicker;

      if (!displayColorPicker || _this.popover.contains(e.target)) {
        return;
      }

      _this.setState({
        displayColorPicker: false
      });
    };

    _this.handleClick = function () {
      var displayColorPicker = _this.state.displayColorPicker;

      _this.setState({
        displayColorPicker: !displayColorPicker
      });
    };

    _this.handleChange = function (color) {
      var onChange = _this.props.onChange;
      onChange("rgba(".concat(color.rgb.r, ",").concat(color.rgb.g, ",").concat(color.rgb.b, ",").concat(color.rgb.a, ")"));
    };

    return _this;
  }

  _createClass(ColorType, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _global.document.addEventListener('mousedown', this.handleWindowMouseDown);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var knob = this.props.knob;
      var displayColorPicker = this.state.displayColorPicker;
      return nextProps.knob.value !== knob.value || nextState.displayColorPicker !== displayColorPicker;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _global.document.removeEventListener('mousedown', this.handleWindowMouseDown);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var knob = this.props.knob;
      var displayColorPicker = this.state.displayColorPicker;
      var colorStyle = {
        background: knob.value
      };
      return _react["default"].createElement(ColorButton, {
        active: displayColorPicker,
        type: "button",
        name: knob.name,
        onClick: this.handleClick,
        size: "flex"
      }, knob.value && knob.value.toUpperCase(), _react["default"].createElement(Swatch, {
        style: colorStyle
      }), displayColorPicker ? _react["default"].createElement(Popover, {
        ref: function ref(e) {
          _this2.popover = e;
        }
      }, _react["default"].createElement(_reactColor.SketchPicker, {
        color: knob.value,
        onChange: this.handleChange
      })) : null);
    }
  }]);

  return ColorType;
}(_react["default"].Component);

ColorType.propTypes = {
  knob: _propTypes["default"].shape({
    name: _propTypes["default"].string,
    value: _propTypes["default"].string
  }),
  onChange: _propTypes["default"].func
};
ColorType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  }
};

ColorType.serialize = function (value) {
  return value;
};

ColorType.deserialize = function (value) {
  return value;
};

var _default = ColorType;
exports["default"] = _default;