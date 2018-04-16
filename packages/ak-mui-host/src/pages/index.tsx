import React, { Fragment } from 'react';
import Link from 'umi/link';

export default () => <div>
    Index Page
    <Link to="login">login</Link>
    <br/>
    <Link to="door">door</Link>
    </div>;