import React, {PropTypes} from 'react';
import styles from './ForumUnread.scss';
import ForumWrapper from '../ForumWrapper/ForumWrapper';
import * as actions from '../../redux/modules/forum';
import {asyncConnect} from 'redux-async-connect';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {UnreadTypeBtn, Paginate, TopicItem} from '../../components/Forum';
import Helmet from 'react-helmet';

@asyncConnect([{
  promise: ({ location, params, store: { dispatch } }) => dispatch(actions.initUnread(params.type, location.query))
}])
@connect(state => ({ ...state.forum }), actions)
export default class ForumUnread extends React.Component {
  static propTypes = {
    unread: PropTypes.object.isRequired,
    markAllAsRead: PropTypes.func.isRequired,
  };

  render() {
    const { unread, markAllAsRead } = this.props;
    if (!unread.topics) {
      return <ForumWrapper/>;
    }

    return (
      <ForumWrapper>
        <Helmet title="Unread topics" />
        <div className={styles.ForumUnread}>
          <div className="container">

            <div className="clearfix">
              <div className="pull-left">
                <ol className="breadcrumb">
                  <li>
                    <Link to="/forum">
                <span>
                  Forum
                </span>
                    </Link>
                  </li>
                  <li className="active">
                    <span>Unread</span>
                  </li>
                </ol>
              </div>

              <div className="pull-right">
                <UnreadTypeBtn
                  filters={unread.filters}
                  selectedFilter={unread.selectedFilter}
                  queryString={unread.querystring}/>
                &nbsp;
                <button onClick={markAllAsRead} className="btn btn-default">Mark all as read</button>
              </div>
            </div>

            {unread.topics.map((topic) => <TopicItem showCategory topic={topic} />)}

            <Paginate baseUrl={`/${unread.selectedFilter.url}`} pagination={unread.pagination}/>
          </div>
        </div>
      </ForumWrapper>
    );
  }
}
