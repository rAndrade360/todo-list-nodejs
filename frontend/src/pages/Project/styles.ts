import styled from 'styled-components';

export const Container = styled.div`
    height: 100%;
    width: 100%;
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
  background-color: #fff;
  width: 100%;
  margin-top: 30px;
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
  li{
     width: 100%;
     display: flex;
     justify-content: space-between;
     align-items: center;
     border: 1px solid #fafafaee;
     margin: 5px;
     padding: 20px;

     border-radius: 7px;
  }

  li a {
    text-decoration: none;
    color: #4949aa;
    padding: 10px 20px;
    cursor: pointer;
  }


  li:hover {
      box-shadow: 2px 4px 5px #ddddddee;
  }


  button{
      border: 0;
      background-color: #4a2;
      color: #fff;
      padding: 7px;
      border-radius: 2px;
      cursor: pointer;
  }
  button:hover {
    background-color: #040;

  }

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
`;

export const DeleteButton = styled.button`
border: 0;
      background-color: #ff6677 !important;
      color: #fff;
      padding: 7px;
      border-radius: 2px;
      cursor: pointer;

      :hover {
        background-color: #ff2233 !important;
      }
`;
