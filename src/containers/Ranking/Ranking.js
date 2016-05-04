import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {init} from 'redux/modules/ranking';
import styles from './Ranking.scss';
import classNames from 'classnames';
import {Ranking as RankingComp} from 'components';
import {App} from '../';

@asyncConnect([{
  promise: ({ store: { dispatch } }) => dispatch(init())
}])
@connect(state => ({ ...state.ranking }), {})
export default class Ranking extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    return (
      <App>
        <div className={classNames(styles.Ranking, 'container')}>
          <div className="row">
            <div className="col-md-12">
              <h4>Overall ranking</h4>
              <RankingComp {...this.props} />
            </div>
          </div>
        </div>
      </App>
    );
  }
}
