import React from 'react';
import styles from './Paginate.scss';
import ReactPaginate from 'react-paginate';
import classNames from 'classnames';

export default class Paginate extends React.Component {

  render() {
    return (
      <div className={classNames(styles.Paginate, '')}>
        <div className="pagination aa22">
          <ReactPaginate previousLabel={"previous"}
                         nextLabel={"next"}
                         breakLabel={<span>...</span>}
                         marginPagesDisplayed={2}
                         pageRangeDisplayed={5}
                         activeClassName={"active"}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}
