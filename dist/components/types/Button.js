"use strict";

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _components = require("@storybook/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ButtonType = function ButtonType(_ref) {
  var knob = _ref.knob,
      _onClick = _ref.onClick;
  return _react["default"].createElement(_components.Form.Button, {
    type: "button",
    name: knob.name,
    onClick: function onClick() {
      return _onClick(knob);
    }
  }, knob.name);
};

ButtonType.propTypes = {
  knob: _propTypes["default"].shape({
    name: _propTypes["default"].string
  }).isRequired,
  onClick: _propTypes["default"].func.isRequired
};

ButtonType.serialize = function () {
  return undefined;
};

ButtonType.deserialize = function () {
  return undefined;
};

var _default = ButtonType;
exports["default"] = _default;