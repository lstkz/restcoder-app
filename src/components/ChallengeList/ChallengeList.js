import React, {Component} from 'react';

export default class ChallengeList extends Component {
  render() {
    const items = [{
      "slug": "starter-hello",
      "name": "Starter: Hello world",
      "level": "Very Easy",
      "stats": {
        "_id": "56a251af12bc2865f9221cc8",
        "totalUniqueSolved": 5,
        "totalSolved": 13,
        "uniqueAttempts": 6,
        "attempts": 22
      },
      "tags": ["starter"],
      "id": 1
    }, {
      "slug": "starter-fizz-buzz",
      "name": "Starter: FizzBuzz",
      "level": "Very Easy",
      "stats": {
        "_id": "56a251af12bc2865f9221cc8",
        "totalUniqueSolved": 6,
        "totalSolved": 9,
        "uniqueAttempts": 6,
        "attempts": 24
      },
      "tags": ["starter"],
      "id": 2
    }, {
      "slug": "starter-json-response",
      "name": "Starter: JSON response",
      "level": "Very Easy",
      "stats": {
        "_id": "56a251af12bc2865f9221cc8",
        "totalUniqueSolved": 7,
        "totalSolved": 21,
        "uniqueAttempts": 7,
        "attempts": 28
      },
      "tags": ["starter"],
      "id": 3
    }, {
      "slug": "starter-database-connection",
      "name": "Starter: Database connection",
      "level": "Very Easy",
      "stats": {
        "_id": "56a251af12bc2865f9221cc8",
        "totalUniqueSolved": 8,
        "totalSolved": 20,
        "uniqueAttempts": 8,
        "attempts": 32
      },
      "tags": ["starter", "postgres"],
      "id": 4
    }];


    return (

      <table className="table table-striped table-bordered">
        <thead>
        <tr>
          <th>Rendering engine</th>
          <th>Browser</th>
          <th>Platform(s)</th>
          <th>Engine version</th>
          <th>CSS grade</th>
        </tr>
        </thead>
        <tbody>
        <tr className="odd gradeX">
          <td>Trident</td>
          <td>Internet
            Explorer 4.0
          </td>
          <td>Win 95+</td>
          <td className="center"> 4</td>
          <td className="center">X</td>
        </tr>
        <tr className="even gradeC">
          <td>Trident</td>
          <td>Internet
            Explorer 5.0
          </td>
          <td>Win 95+</td>
          <td className="center">5</td>
          <td className="center">C</td>
        </tr>
        <tr className="odd gradeA">
          <td>Trident</td>
          <td>Internet
            Explorer 5.5
          </td>
          <td>Win 95+</td>
          <td className="center">5.5</td>
          <td className="center">A</td>
        </tr>
        <tr className="even gradeA">
          <td>Trident</td>
          <td>Internet
            Explorer 6
          </td>
          <td>Win 98+</td>
          <td className="center">6</td>
          <td className="center">A</td>
        </tr>
        <tr className="odd gradeA">
          <td>Trident</td>
          <td>Internet Explorer 7</td>
          <td>Win XP SP2+</td>
          <td className="center">7</td>
          <td className="center">A</td>
        </tr>
        <tr className="even gradeA">
          <td>Trident</td>
          <td>AOL browser (AOL desktop)</td>
          <td>Win XP</td>
          <td className="center">6</td>
          <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Gecko</td>
          <td>Firefox 1.0</td>
          <td>Win 98+ / OSX.2+</td>
            <td className="center">1.7</td>
            <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Gecko</td>
          <td>Firefox 1.5</td>
          <td>Win 98+ / OSX.2+</td>
            <td className="center">1.8</td>
            <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Gecko</td>
          <td>Firefox 2.0</td>
          <td>Win 98+ / OSX.2+</td>
            <td className="center">1.8</td>
            <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Gecko</td>
          <td>Firefox 3.0</td>
          <td>Win 2k+ / OSX.3+</td>
            <td className="center">1.9</td>
            <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Gecko</td>
          <td>Camino 1.0</td>
          <td>OSX.2+</td>
          <td className="center">1.8</td>
          <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Gecko</td>
          <td>Camino 1.5</td>
          <td>OSX.3+</td>
          <td className="center">1.8</td>
          <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Gecko</td>
          <td>Netscape 7.2</td>
          <td>Win 95+ / Mac OS 8.6-9.2</td>
            <td className="center">1.7</td>
            <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Gecko</td>
          <td>Netscape Browser 8</td>
          <td>Win 98SE+</td>
          <td className="center">1.7</td>
          <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Gecko</td>
          <td>Netscape Navigator 9</td>
          <td>Win 98+ / OSX.2+</td>
            <td className="center">1.8</td>
            <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Gecko</td>
          <td>Mozilla 1.0</td>
          <td>Win 95+ / OSX.1+</td>
            <td className="center">1</td>
            <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Gecko</td>
          <td>Mozilla 1.1</td>
          <td>Win 95+ / OSX.1+</td>
            <td className="center">1.1</td>
            <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Gecko</td>
          <td>Mozilla 1.2</td>
          <td>Win 95+ / OSX.1+</td>
            <td className="center">1.2</td>
            <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Gecko</td>
          <td>Mozilla 1.3</td>
          <td>Win 95+ / OSX.1+</td>
            <td className="center">1.3</td>
            <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Gecko</td>
          <td>Mozilla 1.4</td>
          <td>Win 95+ / OSX.1+</td>
            <td className="center">1.4</td>
            <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Gecko</td>
          <td>Mozilla 1.5</td>
          <td>Win 95+ / OSX.1+</td>
            <td className="center">1.5</td>
            <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Gecko</td>
          <td>Mozilla 1.6</td>
          <td>Win 95+ / OSX.1+</td>
            <td className="center">1.6</td>
            <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Gecko</td>
          <td>Mozilla 1.7</td>
          <td>Win 98+ / OSX.1+</td>
            <td className="center">1.7</td>
            <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Gecko</td>
          <td>Mozilla 1.8</td>
          <td>Win 98+ / OSX.1+</td>
            <td className="center">1.8</td>
            <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Gecko</td>
          <td>Seamonkey 1.1</td>
          <td>Win 98+ / OSX.2+</td>
            <td className="center">1.8</td>
            <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Gecko</td>
          <td>Epiphany 2.20</td>
          <td>Gnome</td>
          <td className="center">1.8</td>
          <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Webkit</td>
          <td>Safari 1.2</td>
          <td>OSX.3</td>
          <td className="center">125.5</td>
          <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Webkit</td>
          <td>Safari 1.3</td>
          <td>OSX.3</td>
          <td className="center">312.8</td>
          <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Webkit</td>
          <td>Safari 2.0</td>
          <td>OSX.4+</td>
          <td className="center">419.3</td>
          <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Webkit</td>
          <td>Safari 3.0</td>
          <td>OSX.4+</td>
          <td className="center">522.1</td>
          <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Webkit</td>
          <td>OmniWeb 5.5</td>
          <td>OSX.4+</td>
          <td className="center">420</td>
          <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Webkit</td>
          <td>iPod Touch / iPhone</td>
          <td>iPod</td>
          <td className="center">420.1</td>
          <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Webkit</td>
          <td>S60</td>
          <td>S60</td>
          <td className="center">413</td>
          <td className="center">A</td>
        </tr>
        <tr className="gradeA">
          <td>Presto</td>
          <td>Opera 7.0</td>
          <td>Win 95+ / OSX.1+</td>
            <td className="center">-</td>
            <td className="center">A</td>
        </tr>
        </tbody>
      </table>
    );
  }
}
