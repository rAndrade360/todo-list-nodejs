import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eaeaea;
`;

export const FormContainer = styled.div`
  background-color: #fff;
  width: 95%;
  max-width: 500px;
  border-radius: 7px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  margin-top: 10px;
  width: 100%;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  button {
    width: 100%;
      height: 38px;
      cursor: pointer;
      border: 1px solid #4a4a4a
      border-radius: 7px;
  }
`;

export const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 25px;
  width: 100%;

  input {
      width: 100%;
      height: 38px;

      border: 1px solid #4a4a4a
      border-radius: 7px;
  }
`;

