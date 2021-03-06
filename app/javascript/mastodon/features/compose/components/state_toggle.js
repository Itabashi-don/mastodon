import React from 'react';
import PropTypes from 'prop-types';
import Toggle from 'react-toggle';

export default class StateToggle extends React.PureComponent {

  static propTypes = {
    prefix: PropTypes.string,
    stateName: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  }

  onChange = ({ target }) => {
    this.props.onChange([ this.props.prefix, this.props.stateName ].join('-'), target.checked);
  }

  render () {
    const { prefix, stateName, label, checked } = this.props;
    const id = ['state-toggle', prefix, stateName].filter(Boolean).join('-');

    return (
      <div className='state-toggle'>
        <Toggle id={id} checked={checked || false} onChange={this.onChange} />
        <label htmlFor={id} className='state-toggle__label'>{label}</label>
      </div>
    );
  }

}