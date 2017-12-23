import React from 'react';

import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

import styled from 'styled-components';

import { footerBackgroundColor } from './styles';

const StaticFooter = styled.footer`
  background-color: ${footerBackgroundColor};
  bottom: 0;
  height: 60px;
  position: absolute;
  width: 100%;
`;

const PseudoCenteredDiv = styled.div`
  margin: 20px 0;
`;

const Footer = () => (
  <StaticFooter>
    <Grid>
      <Row>
        <Col md={12}>
          <PseudoCenteredDiv>
            Copyright &copy; Kyle Thompson
          </PseudoCenteredDiv>
        </Col>
      </Row>
    </Grid>
  </StaticFooter>
);

export default Footer;
