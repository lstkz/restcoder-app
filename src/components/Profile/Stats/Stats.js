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
    const languages = [];
    _.map(stats.languages, (score, name) => {
      languages.push({score, name});
    });
    const technologies = [];
    _.map(stats.technologies, (score, name) => {
      technologies.push({score, name});
    });
    languages.sort((a, b) => b.score - a.score);
    technologies.sort((a, b) => b.score - a.score);
    if (languages.length === 0 && technologies.length === 0) {
      return (
        <div className={styles.Stats}>
          <h3 className="text-center mvl">No stats...</h3>
        </div>
      );
    }

    return (
      <div className={styles.Stats}>

        <div className="row">
          <div className="col-md-6 col-sm-6">
            <h3><i className="fa fa-code"/> Languages</h3>
            {languages.map((item) =>
              <ProgressBar key={item.name} title={item.name} score={item.score} />
            )}
          </div>
          <div className="col-md-6 col-sm-6">
            <h3><i className="fa fa-cloud"/> Technologies</h3>
            {technologies.map((item) =>
              <ProgressBar key={item.name} title={item.name} score={item.score} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
