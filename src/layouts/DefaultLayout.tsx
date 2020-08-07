import * as React from "react";
import styled from "styled-components";

import Header from "components/header";
import Footer from "components/footer";

interface Props {
  children: React.ReactNode;
}

const Container = styled.main`
  display: flex;
  flex: 1;
  min-height: 100vh;
  flex-direction: column;
`;
const Body = styled.main`
  display: flex;
  flex: 1;
`;

const DefaultLayout: React.FC<Props> = ({ children }) => (
  <Container>
    <Header />
    <Body>{children}</Body>
    <Footer />
  </Container>
);

export default DefaultLayout;
