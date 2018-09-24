import { connect } from 'react-redux';
import { cancelQuoteCompose, changeDoesNotifyToQuotees } from '../../../actions/compose';
import { makeGetStatus } from '../../../selectors';
import QuoteIndicator from '../components/quote_indicator';

const makeMapStateToProps = () => {
  const getStatus = makeGetStatus();

  const mapStateToProps = state => ({
    status: getStatus(state, { id: state.getIn(['compose', 'quote_from']) }),
  });

  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({

  onCancel () {
    dispatch(cancelQuoteCompose());
  },

  onChangeDoesNotifyToQuoteesState (value) {
    dispatch(changeDoesNotifyToQuotees(value));
  },

});

export default connect(makeMapStateToProps, mapDispatchToProps)(QuoteIndicator);
