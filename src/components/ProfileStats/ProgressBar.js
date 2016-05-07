import React, {PropTypes} from 'react';

const steps = [2, 4, 6, 10, 16, 26, 42, 100, 150, 1000000];

export default class ProgressBar extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired
  };
  constructor(props) {
    super(props);
    this.state = this.getStateFromProps(props);
  }

  componentWillReceiveProps(props) {
    this.setState(this.getStateFromProps(props));
  }

  getStateFromProps(props) {
    let level = 0;
    let score = props.score;
    while (score >= steps[level]) {
      score -= steps[level];
      level++;
    }
    let type;
    if (level < 2) {
      type = 'info';
    } else if (level < 4) {
      type = 'success';
    } else if (level < 6) {
      type = 'warning';
    } else {
      type = 'danger';
    }
    return {score, level, type};
  }

  render() {
    const {title} = this.props;
    const {level, score, type} = this.state;
    const nextLevelScore = steps[level];
    let percent = Math.floor((score / nextLevelScore * 100));
    if (percent === 0) {
      percent = 1;
    }

    return (
      <div>
        <h4 className="mbs">{title}</h4>
        <small>Level {level + 1} ({score}/{nextLevelScore})</small>
        <div className="progress">
          <div className={'progress-bar progress-bar-' + type} style={{width: percent + '%'}}></div>
        </div>
      </div>
    );
  }
}
