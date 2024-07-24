import {useState} from 'react'
import './App.css'
import ExpenseForm from "./components/ExpenseForm.js"
import ExpenseList from "./components/ExpenseList.js"
import Alert from "./components/Alert.js"

const App = () => {

  const [ charge, setCharge ] = useState('')
  const [ id, setId ] = useState('')
  const [ amount, setAmount ] = useState('')
  const [ alert, setAlert ] = useState({show: false})
  const [ edit, setEdit ] = useState(false)

  const [ expenses, setExpenses ] = useState([
    { id: 1, charge: "렌트비", amount: 1600},
    { id: 2, charge: "교통비", amount: 400},
    { id: 3, charge: "식비", amount: 1200}
  ]) // 초기 배열

  //input에 값을 state에 저장
  const handleCharge = (e) => {
    setCharge(e.target.value)
  }

  const handleAmount = (e) => {
    setAmount(e.target.valueAsNumber)
  }

  const handleAlert = ({type, text}) => {
    setAlert({show: true, type: type, text: text})
    setTimeout(() => {
      setAlert({show: false})
    }, 7000)
  }

  // 아이템 삭제 함수
  const handleDelete = (id) => {
    const newExpenses = expenses.filter(expense => expense.id !== id)
    setExpenses(newExpenses)
    handleAlert({type: "danger", text: "아이템이 삭제되었습니다."})
  }

  //아이템 수정 함수
  const handleEdit = (id) => {
    const expense = expenses.find(item => item.id === id)
    const { charge, amount } = expense
    setId(id)
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
  }

  //아이템 추가 함수
  const handleSubmit = (e) => {
    e.preventDefault()
    if(charge !== "" && amount > 0){
      if(edit) {
        const newExpenses = expenses.map((item) => {
          return item.id === id ? {...item, charge, amount} : item
        })
        setExpenses(newExpenses)
        setEdit(false)
        handleAlert({type: "success", text: "아이템이 수정되었습니다."})
      } else {
        const newExpense = { id: crypto.randomUUID(), charge: charge, amount: amount }
        const newExpenses = [...expenses, newExpense]
        setExpenses(newExpenses)
        setCharge('')
        setAmount(0)
        handleAlert({type: "success", text: "아이템이 생성되었습니다."})
      }
    } else {
      console.log("error")
      handleAlert({type: "danger", text: "지출항목은 빈 값일 수 없으며, 비용은 0보다 커야합니다."})
    }
  }

  // 아이템 일괄 삭제
  const clearItems = () => {
    setExpenses([])
  }

  return (
    <main className="main-container">
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}

      <h1>예산 계산기</h1>

      <div style={{ width: '100%', background: '#fff', padding: '1rem' }}>
        <ExpenseForm 
          handleCharge={handleCharge} 
          charge={charge}
          handleAmount={handleAmount} 
          amount={amount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
      </div>

      <div style={{ width: '100%', background: '#fff', padding: '1rem' }}>
        <ExpenseList 
          expenses={expenses} 
          handleDelete={handleDelete} 
          handleEdit={handleEdit}
          clearItems={clearItems}
          />
      </div>

      <div style={{ display: 'flex', justifyContent: 'end' , marginTop: '1rem' }}>
        <p style={{ fontSize: '2rem' }}>
          총 지출:
          <span>
            {expenses.reduce((acc, curr) => {
              return acc + curr.amount
            }, 0)}
            원
          </span>
        </p>
      </div>



    </main>
  );
}


export default App;
