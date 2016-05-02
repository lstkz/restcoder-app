import React from 'react';
import {App} from '../';

export default function NotFound() {
  return (
    <App>
      <div className="container text-center">
        <h1>Doh! 404!</h1>
        <p>This page doesn't exist</p>
      </div>
    </App>
  );
}
