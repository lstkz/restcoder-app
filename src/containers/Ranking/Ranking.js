import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import * as actions from '../../redux/modules/ranking';
import styles from './Ranking.scss';
import classNames from 'classnames';
import {Ranking as RankingComp, ChallengeFilter, Paginate} from '../../components';
import {App} from '../';
import Helmet from 'react-helmet';

@asyncConnect([{
  promise: ({ store: { dispatch } }) => dispatch(actions.init())
}])
@connect(state => ({ ...state.ranking }), {...actions})
export default class Ranking extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    filters: PropTypes.array.isRequired,
    language: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    changeLanguage: PropTypes.func.isRequired,
    changePage: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = this.getStateFromProps(props);
  }

  componentWillReceiveProps(props) {
    this.setState(this.getStateFromProps(props));
  }

  getStateFromProps(props) {
    const {language} = props;
    return {
      filter: { language: [language || 'any'] }
    };
  }

  toggleFilter({name: language}) {
    if (language === this.props.language) {
      return;
    }
    this.props.changeLanguage(language);
  }

  render() {
    const {filters, changePage, page, totalPages} = this.props;
    const {filter} = this.state;
    return (
      <App>
        <Helmet title="Ranking" />
        <div className={classNames(styles.Ranking, 'container')}>
          <div className="row">
            <div className="col-sm-9">
              <h4>Overall ranking</h4>
              <RankingComp {...this.props} />

              <Paginate pageNum={totalPages} clickCallback={(item) => changePage(item.selected)} />
            </div>

            <div className="col-sm-3">
              <h4>Filter</h4>
              <ChallengeFilter filters={filters} toggleFilter={::this.toggleFilter} filter={filter}/>
            </div>
          </div>
        </div>
      </App>
    );
  }
}
