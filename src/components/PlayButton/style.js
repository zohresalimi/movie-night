import styled from "styled-components";

export const PlayBtn = styled.a`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  margin: -30px 0 0 -30px;
  z-index: 3;
  font-size: 30px;
  color: #fd6060;
  transition: 0.4s ease;
  &:before {
    content: "";
    position: absolute;
    display: block;
    width: 48px;
    height: 48px;
    top: 50%;
    left: 50%;
    margin: -24px 0 0 -24px;
    border-radius: 50%;
    background-color: #fff;
    z-index: 1;
  }
  & i {
    position: relative;
    z-index: 2;
    margin: 2px 0 0 3px;
  }
  &:hover {
    background-color: rgba(253, 96, 96, 0.6);
    color: #fd6060;
  }
`;
