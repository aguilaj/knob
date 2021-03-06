"use strict";

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find-index");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.string.includes");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSelect = _interopRequireDefault(require("react-select"));

var _theming = require("@storybook/theming");

var _Radio = _interopRequireDefault(require("./Radio"));

var _Checkboxes = _interopRequireDefault(require("./Checkboxes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// TODO: Apply the Storybook theme to react-select
var OptionsSelect = (0, _theming.styled)(_reactSelect["default"])({
  width: '100%',
  maxWidth: '300px',
  color: 'black'
});

var OptionsType = function OptionsType(props) {
  var knob = props.knob,
      onChange = props.onChange;
  var display = knob.optionsObj.display;

  if (display === 'check' || display === 'inline-check') {
    var isInline = display === 'inline-check';
    return _react["default"].createElement(_Checkboxes["default"], _extends({}, props, {
      isInline: isInline
    }));
  }

  if (display === 'radio' || display === 'inline-radio') {
    var _isInline = display === 'inline-radio';

    return _react["default"].createElement(_Radio["default"], _extends({}, props, {
      isInline: _isInline
    }));
  }

  if (display === 'select' || display === 'multi-select') {
    var options = Object.keys(knob.options).map(function (key) {
      return {
        value: knob.options[key],
        label: key
      };
    });
    var isMulti = display === 'multi-select';
    var optionsIndex = options.findIndex(function (i) {
      return i.value === knob.value;
    });
    var defaultValue = options[optionsIndex];

    var handleChange = function handleChange(e) {
      return onChange(e.value);
    };

    if (isMulti) {
      defaultValue = options.filter(function (i) {
        return knob.value.includes(i.value);
      });

      handleChange = function handleChange(values) {
        return onChange(values.map(function (item) {
          return item.value;
        }));
      };
    }

    return _react["default"].createElement(OptionsSelect, {
      value: defaultValue,
      options: options,
      isMulti: isMulti,
      onChange: handleChange
    });
  }

  return null;
};

OptionsType.defaultProps = {
  knob: {},
  display: 'select',
  onChange: function onChange(value) {
    return value;
  }
};
OptionsType.propTypes = {
  knob: _propTypes["default"].shape({
    name: _propTypes["default"].string,
    value: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].string]),
    options: _propTypes["default"].object
  }),
  display: _propTypes["default"].oneOf(['check', 'inline-check', 'radio', 'inline-radio', 'select', 'multi-select']),
  onChange: _propTypes["default"].func
};

OptionsType.serialize = function (value) {
  return value;
};

OptionsType.deserialize = function (value) {
  return value;
};

var _default = OptionsType;
exports["default"] = _default;