import PropTypes from 'prop-types';
import React from 'react';

import { Form } from '@storybook/components';
import { styled } from '@storybook/theming';

const DeleteButtonContainer = styled.div({
  marginTop: '-30px',
  alignSelf: 'center',
});
const DeleteButton = styled.button({
  marginRight: '20px',
  color: 'white',
  background: 'rgb(202, 60, 60)',
  borderRadius: '4px',
  border: 'none',
});
const AddButton = styled.button({
  color: 'white',
  background: 'rgb(28, 184, 65)',
  borderRadius: '4px',
  border: 'none',
});
const CellsContainer = styled.div({
  width: '100%',
  marginBottom: '20px',
  paddingBottom: '10px',
  borderBottom: '1px solid #F3F3F3',
});
const Cell = styled.div({
  display: 'flex',
  marginBottom: '10px',
});
const Key = styled.div({
  width: '70px',
  alignSelf: 'center',
});

class ArrayObjectType extends React.Component {
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
    keys.forEach(key => {
      newItem[key] = '';
    });
    values.push(newItem);
    onChange(values);
  };

  renderCells = (val, knob, idx) => {
    return Object.entries(val).map((key, vl) => (
      <Cell key={`${idx}-${vl}`}>
        <Key>{key[0]}</Key>
        <Form.Textarea
          id={vl}
          name={`${knob.name}-${idx}-${vl}`}
          value={JSON.stringify(key[1])}
          onChange={e => this.handleChange(e, idx, key[0])}
          size="100%"
        />
      </Cell>
    ));
  };

  render() {
    const { knob } = this.props;
    const value = knob.value.join(knob.separator);

    return (
      <div style={{ width: '100%' }}>
        {knob.value.map((val, idx) => (
          <div style={{ display: 'flex' }} key={idx}>
            <DeleteButtonContainer>
              <DeleteButton
                type="button"
                onClick={e => {
                  this.handleDelete(e, idx);
                }}
              >
                Delete
              </DeleteButton>
            </DeleteButtonContainer>
            <CellsContainer>{this.renderCells(val, knob, idx)}</CellsContainer>
          </div>
        ))}
        <div style={{ textAlign: 'center' }}>
          <AddButton type="button" onClick={e => this.addField(e)}>
            Add field
          </AddButton>
        </div>
      </div>
    );
  }
}

ArrayObjectType.defaultProps = {
  knob: {},
  onChange: value => value,
};

ArrayObjectType.propTypes = {
  knob: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.array,
  }),
  onChange: PropTypes.func,
};

ArrayObjectType.serialize = value => value;
ArrayObjectType.deserialize = value => {
  if (Array.isArray(value)) return value;

  return Object.keys(value)
    .sort()
    .reduce((array, key) => [...array, value[key]], []);
};

export default ArrayObjectType;
