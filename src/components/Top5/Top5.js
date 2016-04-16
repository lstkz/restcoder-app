import React, {Component} from 'react';

export default class Top5 extends Component {
  render() {
    const styles = require('./top5.scss');
    const items = [
      {
        rank: 1,
        user: 'user1',
        score: 100,
        image: '//www.gravatar.com/avatar/006a8679155473958833a56b803eaf7d?d=identicon&s=35'
      },
      {
        rank: 2,
        user: 'user12',
        score: 70,
        image: '//www.gravatar.com/avatar/006a8679155473958833a56b803eaf7d?d=identicon&s=35'
      },
      {
        rank: 3,
        user: 'user2',
        score: 50,
        image: '//www.gravatar.com/avatar/70a910d1849c17436d6099bcc31ed1a5?d=identicon&s=35'
      },
      {
        rank: 4,
        user: 'user4',
        score: 30,
        image: '//www.gravatar.com/avatar/006a8679155473958833a56b803eaf7d?d=identicon&s=35'
      },
      {
        rank: 5,
        user: 'user2',
        score: 10,
        image: '//www.gravatar.com/avatar/59029276955677351421b3ff6bf5ee4c?d=identicon&s=35'
      }
    ];

    return (

      <div className={styles.top5}>
        <div className="panel panel-info">
          <div className="panel-heading">
            TOP 5
            <div className="select text-center">
              <select className="form-control input-sm">
                <option value="">Global</option>
                <option value="nodejs">Nodejs</option>
                <option value="ruby">Ruby</option>
              </select>
            </div>
          </div>
          <div className="items">
            {items.map((item) =>
              <div className="rank-item clearfix">
                <div className="pull-left">
                  <strong className="rank">{item.rank}.</strong>
                  <a className="photo">
                    <img src={item.image}/>
                  </a>
                </div>
                <div className="username pull-left">
                  <a>{item.user}</a>
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