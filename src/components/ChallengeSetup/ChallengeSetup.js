import React, {PropTypes} from 'react';
import styles from './ChallengeSetup.scss';

export default class ChallengeSetup extends React.Component {
  static propTypes = {
    challenge: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {tab: 'local'};
  }

  renderDocker() {
    return null;
  }

  renderC9() {
    return null;
  }

  render() {
    const {tab} = this.state;
    const {challenge: {localSetup, c9Setup}} = this.props;
    const html = tab === 'local' ? localSetup : c9Setup;

    return (
      <div className={styles.ChallengeSetup}>
        <div className="row">
          <div className="col-sm-3">
            <ul className="nav nav-list">
              <li onClick={() => this.setState({tab: 'local'})} className={tab === 'local' ? 'active' : ''}>
                <a>local</a>
              </li>
              <li onClick={() => this.setState({tab: 'c9'})} className={tab === 'c9' ? 'active' : ''}>
                <a>c9.io</a>
              </li>
            </ul>
          </div>
          <div className="col-sm-9" dangerouslySetInnerHTML={{__html: html}}>
          </div>
        </div>
      </div>
    );
  }
}
