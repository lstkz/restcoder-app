import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import * as actions from '../../redux/modules/ranking';
import styles from './Ranking.scss';
import classNames from 'classnames';
import {Ranking as RankingComp, ChallengeFilter, Paginate} from '../../components';
import {App} from '../';

@asyncConnect([{
  promise: ({ store: { dispatch } }) => dispatch(actions.init())
}])
@connect(state => ({ ...state.ranking }), {...actions})
export default class Ranking extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    filter: PropTypes.object.isRequired,
    filters: PropTypes.array.isRequired,
    changeLanguage: PropTypes.func.isRequired,
    changePage: PropTypes.func.isRequired
  };

  toggleFilter({name}) {
    const current = this.props.filter.language[0];
    if (current === name) {
      return;
    }
    this.props.changeLanguage(name);
  }

  render() {
    const {filters, filter, changePage} = this.props;
    return (
      <App>
        <div className={classNames(styles.Ranking, 'container')}>
          <div className="row">
            <div className="col-md-9">
              <h4>Overall ranking2</h4>
              <RankingComp {...this.props} />

              <Paginate pageNum={60} clickCallback={(item) => changePage(item.selected)} />
            </div>

            <div className="col-md-3">
              <h4>Filter</h4>
              <ChallengeFilter filters={filters} toggleFilter={::this.toggleFilter} filter={filter}/>
            </div>
          </div>
        </div>
      </App>
    );
  }
}
