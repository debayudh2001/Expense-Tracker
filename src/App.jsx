import React, { useEffect, useState } from 'react'

const App = () => {
  const [expense,setExpense] = useState('');
  const [amount,setAmount] = useState('');
  const [expenses,setExpenses] = useState([]);

  useEffect(() => {
    let exp = localStorage.getItem("expenses")
    if(exp)
      setExpenses(JSON.parse(exp))
  },[])

  const handleClick = () => {
    if(!expense || !amount)
      return;
    const newExpense = {
      id : expenses.length + 1,
      title : expense,
      amount : amount
    }
    setExpenses([...expenses,newExpense])
    setExpense('')
    setAmount('')
    localStorage.setItem(
      "expenses", JSON.stringify([...expenses,newExpense])
    )
  }

  const handleDelete = (id) => {
    setExpenses(expenses.filter((item) => item.id !== id))
    localStorage.setItem(
      "expenses", JSON.stringify(expenses.filter((item) => item.id !== id))
    )
  }

  return (
    <>
      <div className='flex flex-col gap-8 w-full mt-16 items-center'>
        <span className='font-bold text-6xl'>Expense Tracker</span>
        <input type='text' placeholder='Expense' value={expense} onChange={(e)=>setExpense(e.target.value)} className='w-1/4 p-2 rounded-xl outline-none'></input>
        <input type='number' placeholder='Amount' value={amount} onChange={(e)=>setAmount(e.target.value)} className='w-1/4 p-2 rounded-xl outline-none'></input>
        <button onClick={handleClick} className='w-1/4 bg-slate-600 p-2 text-white font-bold rounded-xl border-2 border-black'>Add Expense</button>
        <span className='font-bold text-2xl'>Your Expenses :</span>
        <ul className='w-1/4'>
          {expenses.map((item) => {
            return(
              <li key={item.id} className='flex justify-between font-bold pb-2'>
                <span>{item.title}</span>
                <span>${item.amount}</span>
                <button onClick={() => handleDelete(item.id)} className='px-2 bg-red-600 text-white rounded-md'>Delete</button>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default App



