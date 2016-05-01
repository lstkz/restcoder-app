import React, {Component, PropTypes} from 'react';

export default class Top5 extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    loadTop5: PropTypes.func.isRequired,
    error: PropTypes.string
  };

  onChange(e) {
    this.props.loadTop5(e.target.value);
  }

  render() {
    const styles = require('./top5.scss');
    const {items} = this.props;

    return (
      <div className={styles.top5}>
        <div className="panel panel-info">
          <div className="panel-heading">
            <div>TOP 5</div>
            <div className="select text-center">
              <select className="form-control input-sm" onChange={::this.onChange}>
                <option value="">Global</option>
                <option value="nodejs">Nodejs</option>
                <option value="ruby">Ruby</option>
              </select>
            </div>
          </div>
          <div className="items">
            {items.map((item, i) =>
              <div key={i} className="rank-item clearfix">
                <div className="pull-left">
                  <strong className="rank">{item.rank}.</strong>
                  <a className="photo">
                    <img src={item.image}/>
                  </a>
                </div>
                <div className="username pull-left">
                  <a>{item.username}</a>
                  <small>
                    Score: {item.score}
                  </small>
                </div>
              </div>
            )}
          </div>
          <a className="view-all">View All</a>
        </div>
      </div>
    );
  }
}