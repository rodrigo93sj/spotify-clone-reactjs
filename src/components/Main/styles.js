import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  position: relative;
  height: calc(100% - 72px);
`;

export const Content = styled.div`
  position: relative;
  width: calc(100% - 230px);
  background-color: #181818;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
