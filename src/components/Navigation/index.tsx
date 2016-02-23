import * as React from 'react';
import Link from '../../containers/Link/index';

export function Navigation() {
  return (
    <div className="Navigation" role="navigation">
      <Link to="/about/">About</Link>
    </div>
  )
}
