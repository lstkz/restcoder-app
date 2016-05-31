import React, {PropTypes} from 'react';
import styles from './Stats.scss';
import ProgressBar from './ProgressBar';
import _ from 'underscore';

export default class Stats extends React.Component {
  static propTypes = {
    stats: PropTypes.object.isRequired
  };

  render() {
    const {stats} = this.props;
    return (
      <div className={styles.Stats}>

        <div className="row">
          <div className="col-md-6">
            <h3><i className="fa fa-code"/> Languages</h3>
            {_.map(stats.languages, (score, name) =>
              <ProgressBar key={name} title={name} score={score} />
            )}
          </div>
          <div className="col-md-6">
            <h3><i className="fa fa-cloud"/> Technologies</h3>
            {_.map(stats.technologies, (score, name) =>
              <ProgressBar key={name} title={name} score={score} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
