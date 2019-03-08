import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  margin: 0 10px;

  display: flex;
  flex-direction: column;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n-1) {
        background: #f5f5f5;
      }
    }
  }

  div {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    border-top: 1px solid lightgray;
    padding: 10px;
  }
`;

export const Button = styled.button`
  width: 40px;
  height: 40px;
  padding: 5px;
  background: ${props => (props.buttonStyle === 'refresh' ? '#65edf5' : '#F58565')};
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  border-radius: 3px;
  border: 0;
  margin-right: ${props => (props.buttonStyle === 'refresh' ? '10px' : 0)};

  &:hover {
    background: ${props => (props.buttonStyle === 'refresh' ? '#65D5F5' : '#F56D65')};
  }
`;
