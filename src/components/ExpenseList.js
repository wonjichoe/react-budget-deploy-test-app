import React from 'react'
import './ExpenseList.css'
import ExpenseItem from './ExpenseItem'
import { MdDelete } from 'react-icons/md'

const ExpenseList = ({expenses, handleDelete, handleEdit,clearItems}) => {
  return (
    <React.Fragment> {/*부모 요소로 한번 감싸주기 위한 역할 (div 대신)*/}
      <ul className="list">
        {/* ExpenseItem */}
        {expenses.map((expense) => 
          <ExpenseItem 
            key = {expense.id}
            expense = {expense}
            handleDelete = {handleDelete}
            handleEdit={handleEdit}
          />
        )}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={clearItems} >
        목록 지우기
        <MdDelete />
        </button>
      )}
    </React.Fragment>
  )
}

export default ExpenseList