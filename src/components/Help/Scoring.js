import React, {PropTypes} from 'react';
import styles from './Help.scss';

export default class Scoring extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div className={styles.steps}>
        <h1 className="text-center">Scoring</h1>
        <section>
          You receive score for each solved problems. <br/>
          Very Easy = 1 score <br/>
          Easy = 2 score <br/>
          Medium = 4 score <br/>
          Hard = 7 score <br/>
        </section>
      </div>
    );
  }
}
