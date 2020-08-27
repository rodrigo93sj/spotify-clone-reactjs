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
  padding: 0 30px;
`;

export const Header = styled.div`
  display: flex;
  margin-top: 50px;
  padding: 20px 30px 0;
  background: linear-gradient(to bottom, #414141 0%, #181818 100%), transparent;

  > div {
    display: flex;
    align-items: flex-start;
    width: 100%;

    img {
      width: 220px;
      height:: 220px;
    }
  
    > div {
      margin-left: 20px;
      width: 100%;
  
      h4 {
        font-size: 11px;
        font-weight: 300;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        margin: 5px 0;
      }

      h1 {
        margin-top: 10px;
        font-size: 48px;
        letter-spacing: -.04em;
      }
  
      p {
        font-size: 14px;
        color: #b3b3b3;
        margin-top: 10px;

        span {
          font-size: 14px;
          color: #fff;
          font-weight: 300;
        }
      }
      
      div {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 10px;

        span {
          font-size: 14px;
          color: #b3b3b3;

          &:last-child:before {
            content: "\\2022";
            margin: 0 4px;
          }
        }
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
      align-items: center;
      
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

        div {
          justify-content: center;
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

  thead {
  }

  thead th {
    font-size: 11px;
    border-bottom: 1px solid #282828;
    color: #b3b3b3;
    letter-spacing: 0.16em;
    font-weight: normal;
    text-transform: uppercase;
    padding: 5px 10px;
  }

  @media (max-width: 576px) {
    thead th {
      &:nth-child(4) {
        display: none;
      }
    }
  }
`;

export const SongItem = styled.tr`
  td {
    max-width: 0;
    border-bottom: 1px solid #282828;
    font-size: 13px;
    padding: 0 10px;
    line-height: 40px;
    background-color: ${(props) =>
      props.selected && props.previewUrl ? "#282828" : "transparent"};
    color: ${(props) =>
      props.previewUrl ? (props.playing ? "#1ED760" : "#fff") : "#b3b3b3"};
    text-align: left;

    img {
      position: relative;
      top: 3px;
    }

    &:nth-child(1) {
      width: 5%;
      color: #b3b3b3 !important;
    }

    &:nth-child(2) {
      width: 4%;
    }

    &:nth-child(3) {
      width: 80%;
    }

    &:nth-child(4) {
      width: 11%;
      color: #b3b3b3;
    }
  }

  &:hover td {
    background-color: ${(props) =>
      props.previewUrl ? "#282828" : "transparent"};
  }

  @media (max-width: 576px) {
    td {
      &:nth-child(4) {
        display: none;
      }
    }
  }
`;

export const Footer = styled.div`
  padding: 0 30px 30px 30px;

  p {
    font-size: 11px;
    font-weight: 400;
    color: #b3b3b3;
    line-height: 16px;
  }
`;

export const Message = styled.div`
  position: fixed;
  display: flex;
  top: 60px;
  right: 40px;
  background-color: #4984d4;
  padding: 10px;
  z-index: 10;

  span {
    display: flex;
    align-items: center;
    margin-right: 7px;
    font-size: 20px;
  }

  p {
    line-height: 30px;
    font-size: 16px;
    margin-right: 7px;
    letter-spacing: 0.016rem;
  }

  button {
    border: 0;
    background-color: transparent;
    color: #fff;
    width: 20px;
    height: 30px;
  }
`;