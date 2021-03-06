"use strict";

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerKnobs = registerKnobs;
exports.manager = void 0;

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _coreEvents = require("@storybook/core-events");

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _KnobManager = _interopRequireDefault(require("./KnobManager"));

var _shared = require("./shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var manager = new _KnobManager["default"]();
exports.manager = manager;
var knobStore = manager.knobStore;
var COMPONENT_FORCE_RENDER_DEBOUNCE_DELAY_MS = 325;

function forceReRender() {
  _addons["default"].getChannel().emit(_coreEvents.FORCE_RE_RENDER);
}

function setPaneKnobs() {
  var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : +new Date();

  var channel = _addons["default"].getChannel();

  channel.emit(_shared.SET, {
    knobs: knobStore.getAll(),
    timestamp: timestamp
  });
}

var resetAndForceUpdate = function resetAndForceUpdate() {
  knobStore.markAllUnused();
  forceReRender();
}; // Increase performance by reducing how frequently the story is recreated during knob changes


var debouncedResetAndForceUpdate = (0, _debounce["default"])(resetAndForceUpdate, COMPONENT_FORCE_RENDER_DEBOUNCE_DELAY_MS);

function knobChanged(change) {
  var name = change.name;
  var value = change.value; // Update the related knob and it's value.

  var knobOptions = knobStore.get(name);
  knobOptions.value = value;

  if (!manager.options.disableDebounce) {
    debouncedResetAndForceUpdate();
  } else {
    resetAndForceUpdate();
  }
}

function knobClicked(clicked) {
  var knobOptions = knobStore.get(clicked.name);
  knobOptions.callback();
  forceReRender();
}

function resetKnobs() {
  knobStore.reset();
  setPaneKnobs(false);
}

function resetKnobsAndForceReRender() {
  knobStore.reset();
  forceReRender();
  setPaneKnobs(false);
}

function disconnectCallbacks() {
  var channel = _addons["default"].getChannel();

  channel.removeListener(_shared.CHANGE, knobChanged);
  channel.removeListener(_shared.CLICK, knobClicked);
  channel.removeListener(_coreEvents.STORY_CHANGED, resetKnobs);
  channel.removeListener(_shared.RESET, resetKnobsAndForceReRender);
  knobStore.unsubscribe(setPaneKnobs);
}

function connectCallbacks() {
  var channel = _addons["default"].getChannel();

  channel.on(_shared.CHANGE, knobChanged);
  channel.on(_shared.CLICK, knobClicked);
  channel.on(_coreEvents.STORY_CHANGED, resetKnobs);
  channel.on(_shared.RESET, resetKnobsAndForceReRender);
  knobStore.subscribe(setPaneKnobs);
  return disconnectCallbacks;
}

function registerKnobs() {
  _addons["default"].getChannel().emit(_coreEvents.REGISTER_SUBSCRIPTION, connectCallbacks);
}