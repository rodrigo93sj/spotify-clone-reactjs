import styled, { css } from "styled-components";

import { Spinner } from "../../components/Loading/styles";

export const Container = styled.div`
  overflow-y: scroll;
  height: calc(100vh - 70px);

  ${Spinner} {
    height: 48px;
  }

  ${(props) =>
    props.loading &&
    css`
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;

export const Content = styled.div`
  padding: 0 20px;
`;

export const Header = styled.div`
  display: flex;
  min-height: 290px;
  margin-top: 50px;
  padding: 20px 30px 0;
  background: linear-gradient(to bottom, #414141 0%, #181818 100%), transparent;

  > div {
    display: flex;
    align-items: center;
    width: 100%;

    img {
      width: 220px;
    }
  
    div {
      margin-left: 20px;
  
      span {
        font-size: 11px;
        font-weight: 300;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }
  
      h1 {
        margin-top: 10px;
        font-size: 48px;
      }
  
      p {
        font-size: 14px;
        color: #b3b3b3;
        margin-top: 10px;
      }
  
      button {
        background-color: #1ED760;
        height: 32px;
        border-radius: 16px;
        color: #fff;
        line-height: 32px;
        padding: 0 35px;
        border: 0;
        margin-top: 10px;
        font-size: 12px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }
    }
  }

  @media (max-width: 768px) {
    > div {
      div {
        h1 {
          font-size: 38px;
        }
      }
    }
  }

  @media (max-width: 576px) {
    > div {
      flex-direction: column;
      
      img {
        margin-bottom: 30px;
      }

      div {
        text-align: center;
        margin: 0;

        span {
          font-size: 10px;
        }

        h1 {
          font-size: 22px;
        }

        p {
          display: none;
        }
      }
    }
  }
`;

export const SongList = styled.table`
  width: 100%;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;

  thead th {
    font-size: 11px;
    color: #b3b3b3;
    letter-spacing: 0.16em;
    font-weight: normal;
    text-transform: uppercase;
    padding: 5px 10px;
  }

  @media (max-width: 576px) {
    thead th {
      &:nth-child(1) {
        display: none;
      }

      &:nth-child(4) {
        display: none;
      }

      &:nth-child(5) {
        display: none;
      }
    }
  }
`;

export const SongItem = styled.tr`
  td {
    max-width: 0;
    border-top: 1px solid #282828;
    font-size: 13px;
    padding: 0 10px;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: ${(props) =>
      props.selected && props.previewUrl ? "#282828" : "transparent"};
    color: ${(props) =>
      props.previewUrl ? (props.playing ? "#1ED760" : "#fff") : "#b3b3b3"};
    text-align: left;

    &:nth-child(1) {
      width: 7%;
      text-align: right;
    }

    &:nth-child(2) {
      width: 35%;
    }

    &:nth-child(3) {
      width: 20%;
    }

    &:nth-child(4) {
      width: 28%;
    }

    &:nth-child(5) {
      width: 10%;
      text-align: left;
    }
  }

  &:hover td {
    background-color: ${(props) =>
      props.previewUrl ? "#282828" : "transparent"};
  }

  @media (max-width: 576px) {
    td {
      &:nth-child(1) {
        display: none;
      }

      &:nth-child(2) {
        width: 46%;
      }
  
      &:nth-child(3) {
        width: 46%;
      }

      &:nth-child(4) {
        display: none;
      }
  
      &:nth-child(5) {
        display: none;
      }
    }
  }
`;
