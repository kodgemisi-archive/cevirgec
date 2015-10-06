'use strict';

import React from 'react/addons';
import { Link } from 'react-router';

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="notice">This is homepage!</div>
        <Link className="notice" to="/dashboard">Dashboard</Link>
      </div>
    );
  }
}

export default Home;
