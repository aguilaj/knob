"use strict";

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Input = _theming.styled.input({
  display: 'table-cell',
  boxSizing: 'border-box',
  verticalAlign: 'top',
  height: 21,
  outline: 'none',
  border: '1px solid #ececec',
  fontSize: '12px',
  color: '#555'
});

var BooleanType = function BooleanType(_ref) {
  var knob = _ref.knob,
      _onChange = _ref.onChange;
  return _react["default"].createElement(Input, {
    id: knob.name,
    name: knob.name,
    type: "checkbox",
    onChange: function onChange(e) {
      return _onChange(e.target.checked);
    },
    checked: knob.value
  });
};

BooleanType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  }
};
BooleanType.propTypes = {
  knob: _propTypes["default"].shape({
    name: _propTypes["default"].string,
    value: _propTypes["default"].bool
  }),
  onChange: _propTypes["default"].func
};

BooleanType.serialize = function (value) {
  return value ? String(value) : null;
};

BooleanType.deserialize = function (value) {
  return value === 'true';
};

var _default = BooleanType;
exports["default"] = _default;