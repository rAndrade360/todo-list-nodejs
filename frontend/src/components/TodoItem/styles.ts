import styled from 'styled-components';

export const Container = styled.li`
     width: 100%;
     display: flex;
     justify-content: space-between;
     align-items: center;
     border: 1px solid #fafafaee;
     margin: 5px;
     padding: 20px;
     border-radius: 7px;
     
 a {
    text-decoration: none;
    color: #4949aa;
    padding: 10px 20px;
    cursor: pointer;

    
  }


  :hover {
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
