import * as React from 'react';
import { routeActions } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { omit } from 'lodash';

export class Link extends React.Component {
  render() {
    console.log('this.props', this.props);
    const { to, children } = this.props;
    return (
      <a href={to} onClick={this.handleClick}>{children}</a>
    )
  }

  handleClick(event) {
    const { to, push } = this.props;
    event.preventDefault();
    return push(to);
  }
}


export default connect(()=>({}), mapDispatchToProps)(Link);


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ push: routeActions.push }, dispatch)
}
