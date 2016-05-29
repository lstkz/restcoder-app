import React, {PropTypes} from 'react';
import styles from './Composer.scss';
import classNames from 'classnames';

export default class Composer extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    preview: PropTypes.string,
    category: PropTypes.number,
    error: PropTypes.string,
    categories: PropTypes.array.isRequired,
    isShowPreview: PropTypes.bool.isRequired,
    isTitleReadOnly: PropTypes.bool.isRequired,
    isVisible: PropTypes.bool.isRequired,
    togglePreview: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    discard: PropTypes.func.isRequired,
    setContent: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setCategory: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
  };

  renderTitleRow() {
    const {isTitleReadOnly, title, setTitle, categories, category, setCategory} = this.props;
    if (isTitleReadOnly) {
      return (
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <span className={`${styles.title} form-control`}>{title}</span>
          </div>
        </div>
      );
    }
    return (
      <div className="row">
        <div className="col-lg-9 col-md-12">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your topic title here..."
            className={`${styles.title} form-control`}/>
        </div>
        <div className="col-lg-3 col-md-12">
          <select className="form-control" value={category} onChange={(e) => setCategory(Number(e.target.value))}>
            {categories.map((item) => <option key={item.cid} value={item.cid} dangerouslySetInnerHTML={{__html: item.name}}/>)}
          </select>
        </div>
      </div>
    );
  }

  renderError() {
    const {error, clearError} = this.props;
    if (!error) {
      return null;
    }
    return (
      <div className="dialog dialog-danger" onClick={() => clearError()}>
        <div className="container">{error}</div>
      </div>
    );
  }

  render() {
    const { isVisible } = this.props;
    if (!isVisible) {
      return null;
    }
    const {content, preview, isShowPreview, togglePreview, submit, discard, setContent} = this.props;
    return (
      <div className={styles.Composer}>
        <div className="resizable">
          {this.renderTitleRow()}
          <div className="btn-toolbar mvm">
            <div className="btn-group pull-right ">
              <button onClick={discard} className="btn btn-default"><i className="fa fa-times"/> Discard</button>
              <button onClick={submit} className="btn btn-primary btn-inverse"><i className="fa fa-check"/> Submit</button>
            </div>
          </div>

          {this.renderError()}
          <div className="row">
            <div className={classNames('col-sm-12', {'col-md-6': isShowPreview, 'col-md-12': !isShowPreview})}>
              {!isShowPreview && <div className={styles.helpText}>
                <span onClick={togglePreview} className="toggle-preview">Show Preview</span>
              </div>}
              <textarea onChange={(e) => setContent(e.target.value)} className={styles.editor} value={content}/>
              <small>This forum is powered by Markdown. For full documentation, click <a target="_blank"
                                                                                         href="http://commonmark.org/help/">here</a>
              </small>
            </div>
            {isShowPreview && <div className={`col-md-6 hidden-sm hidden-xs`} style={{height: '100%'}}>
              <div className={styles.helpText}>
                <span onClick={togglePreview}>Hide Preview</span>
              </div>
              <div className={`well ${styles.preview}`} dangerouslySetInnerHTML={{__html: preview}}></div>
            </div>}
          </div>

          <div>
            <div className="text-center"><i className="fa"/></div>
          </div>
        </div>
      </div>
    );
  }
}
