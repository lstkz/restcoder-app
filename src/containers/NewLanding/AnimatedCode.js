import React, {PropTypes} from 'react';
import styles from './NewLanding.scss';
import ReactDOM from 'react-dom';

const lines = [
  {command: 'restcoder submit', delay: 70},
  {line: 'Submitting source code...', delay: 1000},
  {line: '<span style="color: yellow"><strong>Problem:</strong> My First Challenge</span>', delay: 0},
  {line: '<span style="color: yellow"><strong>Language:</strong> nodejs@4.4.4</span>', delay: 0},
  {line: 'Waiting for tester...', delay: 1000},
  {line: '<span style="color: cyan">tester:</span> Initializing unit tests..', delay: 1000},
  {line: '<span style="color: cyan">tester:</span> Running <span style="color: cyan">4</span> test(s)', delay: 1000},
  {line: '<span style="color: cyan">tester:</span> TEST 1: running...', delay: 2000},
  {line: '<span style="color: cyan">tester:</span> TEST 1: <span style="color: greenyellow">PASS</span>', delay: 1000},
  {line: '<span style="color: cyan">tester:</span> TEST 2: running...', delay: 2000},
  {line: '<span style="color: cyan">tester:</span> TEST 2: <span style="color: greenyellow">PASS</span>', delay: 1000},
  {line: '<span style="color: cyan">tester:</span> TEST 3: running...', delay: 2000},
  {line: '<span style="color: cyan">tester:</span> TEST 3: <span style="color: greenyellow">PASS</span>', delay: 1000},
  {line: '<span style="color: cyan">tester:</span> TEST 4: running...', delay: 2000},
  {line: '<span style="color: cyan">tester:</span> TEST 4: <span style="color: greenyellow">PASS</span>', delay: 500},
  {line: '<span style="color: cyan">tester:</span> Result: <span style="color: greenyellow">PASS</span>', delay: 0},
];

let timeoutId;
let startIntervalId;

function checkVisible(elm) {
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

export default class AnimatedCode extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      html: '',
      l: 0,
      pos: 0,
    };
  }

  componentDidMount() {
    startIntervalId = setInterval(() => {
      const ele = ReactDOM.findDOMNode(this);
      if (checkVisible(ele)) {
        clearInterval(startIntervalId);
        this.nextStep();
      }
    }, 50);
  }
  componentWillUnmount() {
    clearTimeout(timeoutId);
    clearInterval(startIntervalId);
  }

  nextStep() {
    let { html, l, pos } = this.state;
    if (!lines[l]) {
      html += '$ ';
      this.setState({html});
      return;
    }
    const {command, delay, line} = lines[l];
    if (command) {
      if (pos >= command.length) {
        html += '<br/>';
        l++;
        this.setState({l, html, pos: 0});
      } else {
        if (pos === 0) {
          html += '$ ';
        }
        html += command[pos];
        pos++;
        this.setState({html, pos});
      }
    } else if (line) {
      html += line + '<br/>';
      l++;
      this.setState({html, l});
    }
    timeoutId = setTimeout(::this.nextStep, delay);
  }

  render() {
    const {html} = this.state;
    const showReset = false;
    const reset = () => {
      this.setState({
        html: '',
        l: 0,
        pos: 0,
      }, () => this.nextStep());
    };
    return (
      <div>
        {showReset && <button onClick={reset}>reset</button>}
        <code>
          <span dangerouslySetInnerHTML={{__html: html}}/>
          <span className={styles.cursor}>| </span>
        </code>
      </div>
    );
  }
}
