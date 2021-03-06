import styled from 'styled-components';

export const Container = styled.div`
    height: 100%;
  background-color: #eaeaea;
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const InputContainer = styled.div`
  display: flex;
  margin: 20px;
  width: 100%;
  align-items: center;
  justify-content: center;

  input{
      border: 1px solid #454545;
      background-color: #fefefeff;
      padding: 3px;
      height: 37px;
      border-radius: 7px;
      margin-right: 5px;
  }

  button{
    border: 1px solid #FEFEFE;
    color: #fff;
    cursor: pointer;
      background-color: #4545AA;
      padding: 3px;
      height: 37px;
      border-radius: 7px;
  }


`;

export const MainContainer = styled.div`
  margin-top:20px;
  background-color: #fff;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  border-radius: 7px;
  h1 {
      font-size: 25px;
  }
  h1 {
      font-size: 25px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
`;


export const ListContainer = styled.ul`
  background-color: #fff;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  border-radius: 7px;


  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
`;
