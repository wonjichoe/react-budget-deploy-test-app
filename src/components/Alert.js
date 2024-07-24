// rafce 함수형 컴포넌트 생성
import React from 'react'
import './Alert.css'

const Alert = ({ type, text }) => {
  return (
    <div className={`alert alert-${type}`}>{text}</div>
  )
}

export default Alert