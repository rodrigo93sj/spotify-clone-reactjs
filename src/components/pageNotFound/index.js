import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

import { Container } from "./styles.js";

const PageNotFound = () => (
  <Container>
    <span>
      <FaExclamationTriangle />
    </span>
    <h1>Não foi possível localizar essa página</h1>
  </Container>
);

export default PageNotFound;
