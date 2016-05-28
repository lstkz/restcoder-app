import React, {PropTypes} from 'react';
import styles from './Composer.scss';

export default class Composer extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    preview: PropTypes.string,
    isShowPreview: PropTypes.bool.isRequired,
    isTitleReadOnly: PropTypes.bool.isRequired,
    isVisible: PropTypes.bool.isRequired,
    togglePreview: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    discard: PropTypes.func.isRequired,
    setContent: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
  };

  render() {
    const { isVisible } = this.props;
    if (!isVisible) {
      return null;
    }
    const {
      title, content, preview, isShowPreview, isTitleReadOnly, togglePreview, submit, discard, setContent, setTitle,
    } = this.props;
    return (
      <div className={styles.Composer}>
        <div className="resizable">

          <div className="row">
            <div className="col-lg-12 col-md-12">
              {isTitleReadOnly && <span className={`${styles.title} form-control`}>{title}</span>}
              {!isTitleReadOnly && <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your topic title here..."
                className={`${styles.title} form-control`}/>}
            </div>
          </div>
          <div className="btn-toolbar mbl">
            <div className="btn-group pull-right ">
              <button onClick={discard} className="btn btn-default"><i className="fa fa-times"/> Discard</button>
              <button onClick={submit} className="btn btn-primary btn-inverse"><i className="fa fa-check"/> Submit</button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-12">
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
