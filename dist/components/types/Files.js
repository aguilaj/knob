"use strict";

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _global = require("global");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FileInput = (0, _theming.styled)(_components.Form.Input)({
  paddingTop: 4
});

function fileReaderPromise(file) {
  return new Promise(function (resolve) {
    var fileReader = new _global.FileReader();

    fileReader.onload = function (e) {
      return resolve(e.currentTarget.result);
    };

    fileReader.readAsDataURL(file);
  });
}

var FilesType = function FilesType(_ref) {
  var knob = _ref.knob,
      _onChange = _ref.onChange;
  return _react["default"].createElement(FileInput, {
    type: "file",
    name: knob.name,
    multiple: true,
    onChange: function onChange(e) {
      return Promise.all(Array.from(e.target.files).map(fileReaderPromise)).then(_onChange);
    },
    accept: knob.accept,
    size: "flex"
  });
};

FilesType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  }
};
FilesType.propTypes = {
  knob: _propTypes["default"].shape({
    name: _propTypes["default"].string
  }),
  onChange: _propTypes["default"].func
};

FilesType.serialize = function () {
  return undefined;
};

FilesType.deserialize = function () {
  return undefined;
};

var _default = FilesType;
exports["default"] = _default;