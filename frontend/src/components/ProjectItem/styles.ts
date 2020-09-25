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
 

    p a {
    text-decoration: none;
    color: #4949aa;
  }

  :hover {
      box-shadow: 2px 4px 5px #ddddddee;
  }

  button{
      border: 0;
      background-color: #ff6677;
      color: #fff;
      padding: 7px;
      border-radius: 2px;
      cursor: pointer;
  }
  button:hover {
    background-color: #ff2233;

  }
`;
