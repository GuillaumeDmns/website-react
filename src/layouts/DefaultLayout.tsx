import * as React from "react";

import Header from "components/header";
import Footer from "components/footer";

interface Props {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<Props> = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default DefaultLayout;
