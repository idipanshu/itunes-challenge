/**
 *
 * Header
 *
 */

import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { fonts, colors } from '@themes';
import T from '@components/T';
import logo from '@images/icon.png';
const StyledHeader = styled(Layout.Header)`
  && {
    &.ant-layout-header {
      padding: 0 1rem;
      height: 7rem;
    }
    display: flex;
    justify-content: center;
    background-color: ${colors.primary};
  }
`;
const Logo = styled.img`
  height: 4rem;
  width: auto;
  margin-top: 1.4rem;
  margin-right: 1rem;
`;
const Title = styled(T)`
  && {
    margin-bottom: 0;
    ${fonts.dynamicFontSize(fonts.size.xRegular, 1, 0.5)};
    font-family: verdana, sans-serif;
    display: flex;
    align-self: center;
    color: ${colors.text};
  }
`;
function Header(props) {
  return (
    <StyledHeader {...props} data-testid="header">
      <Logo alt="logo" src={logo} />
      <Title type="heading" id="heading_text" />
    </StyledHeader>
  );
}

export default injectIntl(Header);
