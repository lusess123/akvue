import React, { Fragment } from 'react';
import Link from 'umi/link';

export default () => <div>
    Index Page
    <Link to="/login">login</Link>
    <Link to="/web">web</Link>
    </div>;