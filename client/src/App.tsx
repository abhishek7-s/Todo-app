import { useState } from 'react'
import './App.scss'
import Todo from './components/Todo';

function App() {
  const [value, setValue] = useState<String>("");
  return (
    <>

      <div className="mainSec">
        <div className="todoSection">
          <Todo/>
        </div>
      </div>

    </>
  )
}

export default App
