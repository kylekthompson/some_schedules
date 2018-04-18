import React from 'react';

import PropTypes from 'prop-types';

class HeaderLinksProvider extends React.Component {
  static propTypes = {
    initialHeaderLinks: PropTypes.element.isRequired,
    render: PropTypes.func.isRequired,
  };

  state = {
    headerLinks: this.props.initialHeaderLinks,
  };

  handleSetHeaderLinks = (headerLinks) => this.setState({ headerLinks });

  render() {
    return this.props.render({
      headerLinks: this.state.headerLinks,
      setHeaderLinks: this.handleSetHeaderLinks,
    });
  }
}

export default HeaderLinksProvider;
