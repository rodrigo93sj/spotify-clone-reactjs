import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 72px;
  background-color: #282828;
  padding: 12px;
  z-index: 3;
`;

export const Current = styled.div`
  display: flex;
  align-items: center;
  width: 20%;

  img {
    display: block;
    width: 48px;
    height: 48px;
  }

  div {
    margin-left: 12px;
    display: flex;
    flex-direction: column;
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    span {
      font-size: 13px;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    small {
      font-size: 11px;
      color: #b3b3b3;
      margin-top: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  @media (max-width: 576px) {
    display: none;
  }
`;

export const Progress = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;

  @media (max-width: 768px) {
    width: 40%;
  }

  @media (max-width: 576px) {
    width: 80%;
  }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;

  button {
    background-color: transparent;
    border: 0;
    margin: 0 15px;
  }
`;

export const Time = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 5px;

  span {
    font-size: 11px;
    color: #b3b3b3;
  }
`;

export const ProgressSlider = styled.div`
  width: 100%;
  margin: 0 15px;

  @media (max-width: 992px) {
    width: 
  }
`;

export const Volume = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 20%;

  > div {
    display: flex;
    align-items: center;
    width: 100px;

    img {
      margin-right: 5px;
    }
  }
`;
