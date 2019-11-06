import PropTypes from 'prop-types';
import React from 'react';

import { Form } from '@storybook/components';

function formatArray(value, separator) {
  if (value === '') {
    return [];
  }
  return value.split(separator);
}

class ArrayType extends React.Component {
  constructor(props) {
    super(props);
    this.state = { keys: Object.entries(props.knob.value[0]).map(key => key[0]) };
  }

  shouldComponentUpdate(nextProps) {
    const { knob } = this.props;

    return nextProps.knob.value !== knob.value;
  }

  handleChange = (e, idx, key) => {
    e.stopPropagation();
    e.preventDefault();
    const { knob, onChange } = this.props;
    const { value } = e.target;
    const values = [...knob.value];
    values[idx][key] = JSON.parse(value);
    onChange(values);
  };

  handleDelete = (e, idx) => {
    if (!e.nativeEvent.detail) return;
    e.stopPropagation();
    e.preventDefault();
    const { knob, onChange } = this.props;
    const values = [...knob.value];
    values.splice(idx, 1);
    onChange(values);
  };

  addField = e => {
    e.stopPropagation();
    e.preventDefault();
    const { knob, onChange } = this.props;
    const { keys } = this.state;
    const values = [...knob.value];
    const newItem = {};
    keys.forEach(key => {newItem[key] = ""});
    values.push(newItem);
    onChange(values);
  };

  renderKeys = (val, knob, idx) => {
    return Object.entries(val).map((key, vl) =>
    <div style={{display: "flex", marginBottom: "10px" }} key={`${idx}${vl}`}>
    <div style={{width: "70px", alignSelf: "center"}}>{key[0]}</div>
    <Form.Textarea
    id={vl}
    name={`${knob.name}-${idx}-${vl}`}
    value={JSON.stringify(key[1])}
    onChange={(e) => this.handleChange(e, idx, key[0])}
    size="100%"
    />
    </div>
    )
  }

  render() {
    const { knob } = this.props;
    const value = knob.value.join(knob.separator);

    return (
      <div style={{width: "100%"}} >
      {knob.value.map((val, idx) =>
      <div style={{display: "flex"}} key={`${idx}`}>
      <div style={{marginTop: "-30px", alignSelf: "center"}}><button type="button"
      style={{marginRight: "20px", color: "white", background: "rgb(202, 60, 60)", borderRadius: "4px", border: "none"}}
      onClick={(e) => {this.handleDelete(e, idx)}}>Delete</button></div>
      <div style={{width: "100%",marginBottom: "20px", paddingBottom: "10px", borderBottom: "1px solid #F3F3F3"}}>
      {this.renderKeys(val, knob, idx)}
    </div></div>
    )}
    <div style={{textAlign: "center"}}><button type="button"
    style={{color: "white", background: "rgb(28, 184, 65)", borderRadius: "4px", border: "none"}}
    onClick={(e) => this.addField(e)}>Add field</button></div>
    </div>
    )
  }
}

ArrayType.defaultProps = {
  knob: {},
  onChange: value => value,
};

ArrayType.propTypes = {
  knob: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.array,
    separator: PropTypes.string,
  }),
  onChange: PropTypes.func,
};

ArrayType.serialize = value => value;
ArrayType.deserialize = value => {
  if (Array.isArray(value)) return value;

  return Object.keys(value)
    .sort()
    .reduce((array, key) => [...array, value[key]], []);
};

export default ArrayType;
