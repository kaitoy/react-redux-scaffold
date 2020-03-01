import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const Home: FunctionComponent = () => (
  <div>
    <ul>
      <li>
        <Link to="/zundoko">ズンドコ</Link>
      </li>
    </ul>
  </div>
);

export default Home;
