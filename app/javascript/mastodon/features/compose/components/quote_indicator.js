import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import Avatar from '../../../components/avatar';
import IconButton from '../../../components/icon_button';
import DisplayName from '../../../components/display_name';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { isRtl } from '../../../rtl';
import { StateToggle } from './state_toggle';

const messages = defineMessages({
  cancel: { id: 'quote_indicator.cancel', defaultMessage: 'Cancel' },
});

@injectIntl
export default class QuoteIndicator extends ImmutablePureComponent {

  static contextTypes = {
    router: PropTypes.object,
  };

  static propTypes = {
    status: ImmutablePropTypes.map,
    onCancel: PropTypes.func.isRequired,
    onChangeDoesNotifyToQuoteesState: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  };

  handleClick = () => {
    this.props.onCancel();
  }

  handleAccountClick = (e) => {
    if (e.button === 0) {
      e.preventDefault();
      this.context.router.history.push(`/accounts/${this.props.status.getIn(['account', 'id'])}`);
    }
  }

  handleChangeState = (stateName, checked) => {
    switch (stateName) {
    case 'quote_indicator-does_notify_to_quotees':
      this.props.onChangeDoesNotifyToQuoteesState(checked);
      break;
    }
  }

  render () {
    const { status, intl } = this.props;

    if (!status) {
      return null;
    }

    const content = { __html: status.get('contentHtml') };
    const style   = {
      direction: isRtl(status.get('search_index')) ? 'rtl' : 'ltr',
    };

    return (
      <div className='quote-indicator'>
        <div className='quote-indicator__header'>
          <div className='quote-indicator__cancel'><IconButton title={intl.formatMessage(messages.cancel)} icon='times' onClick={this.handleClick} /></div>

          <a href={status.getIn(['account', 'url'])} onClick={this.handleAccountClick} className='quote-indicator__display-name'>
            <div className='quote-indicator__display-avatar'><Avatar account={status.get('account')} size={24} /></div>
            <DisplayName account={status.get('account')} />
          </a>
        </div>

        <div className='quote-indicator__content' style={style} dangerouslySetInnerHTML={content} />

        <div className='quote-indicator__footer'>
          <StateToggle prefix='quote_indicator' stateName='does_notify_to_quotees' label={<FormattedMessage id='quote_indicator.states.does_notify' defaultMessage='Notify to original tooter' />} />
        </div>
      </div>
    );
  }

}
