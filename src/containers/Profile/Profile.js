import React, {PropTypes} from 'react';
import styles from './Profile.scss';
import {asyncConnect} from 'redux-async-connect';
import {connect} from 'react-redux';
import {App} from '../';
import * as actions from '../../redux/modules/profile';
import {Link} from 'react-router';
import {Tabs, Tab} from 'react-bootstrap';
import {Paginate} from '../../components';
import {Stats, SubmissionHistory, HeaderInfo, ForumPosts} from '../../components/Profile';

@asyncConnect([{
  promise: ({ params, store: { dispatch } }) => dispatch(actions.init(params.username))
}])
@connect(state => state.profile, { ...actions })
export default class Profile2 extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    submissions: PropTypes.object.isRequired,
    forumPosts: PropTypes.object.isRequired,
    changeSubmissionsPage: PropTypes.func.isRequired,
    changeForumPostsPage: PropTypes.func.isRequired,
  };

  render() {
    const {user, submissions, changeSubmissionsPage, forumPosts, changeForumPostsPage} = this.props;

    return (
      <App>
        <div className={styles.Profile}>
          <div className="container">
            <ol className="breadcrumb">
              <li>
                <Link to="/home">
                <span>
                  Home
                </span>
                </Link>
              </li>
              <li className="active">
                <span>{user.username}</span>
              </li>
            </ol>

            <HeaderInfo user={user} />
            <hr/>


            <Tabs defaultActiveKey={1} id="profileTabs">
              <Tab eventKey={1} title="Stats">
                <Stats stats={user.stats} />
              </Tab>
              <Tab eventKey={2} title="Submission history">
                <SubmissionHistory items={submissions.items} />
                {submissions.totalPages > 1 && <Paginate pageNum={submissions.totalPages} clickCallback={(item) => changeSubmissionsPage(item.selected)} />}
              </Tab>
              <Tab eventKey={3} title="Forum posts">
                <ForumPosts forumPosts={forumPosts} />
                {forumPosts.pagination.pageCount > 1 &&
                  <Paginate pageNum={forumPosts.pagination.pageCount} clickCallback={(item) => changeForumPostsPage(item.selected + 1)} />}
              </Tab>
            </Tabs>

          </div>
        </div>
      </App>
    );
  }
}
