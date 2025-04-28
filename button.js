import React from 'react';
import styled from 'styled-components'

const Button = styled.div`
  background-color : ${props => props.color};
  padding: 10px 20px;
  border-radius: 2px;
  box-sizing : border-box;
  text-align: center;
  width: 200px;
`

const ButtonWrapper = ({color,label}) =>{
  return(
   <Button color={color}>{label}</Button>
  )
}

export default ButtonWrapper