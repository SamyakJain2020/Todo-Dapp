import "./App.css";
import {useState,useEffect} from 'react';
import {ethers} from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
import Todo from './artifacts/contracts/todo.sol/Todo.json'
import Card from './components/card'
const greeterAddress='0x5FbDB2315678afecb367f032d93F642f64180aa3'
const todoAddress='0xB09EC7f1A52fa0c194E9408A36DB4CCcA4225B08'

function App() {
  const [todos, settodos] = useState([])
  const [todo_h, setodo_h] = useState() 
  const [todo_d, setodo_d] = useState() 
  useEffect(() => {
    fetchTodo()
 }, [])
 
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function setTodo() {
    // if (!todo) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);//eg matamask
      const signer = provider.getSigner()// we
      const contract = new ethers.Contract(todoAddress, Todo.abi, signer)
      const transaction = await contract.setTodo(todo_h,todo_d)
      await transaction.wait()
      console.log( "transactiions: ", transaction)
      fetchTodo()
    }
  }
  async function fetchTodo() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(todoAddress, Todo.abi, provider)
      try {
        const data = await contract.getTodos()
        console.log('data: ', data)
        settodos(data);
      } catch (err) {
        console.error("Error: ", err)
      }
    }
  }
  return (
    <div className="App">
      <div className="container">
        <h1>To-Do DAPP</h1>
        <div className="inputs-container">
          <input
            type="text"
            required
            tabindex="0"
            class="input-text"
            size="29"
            onChange={e => setodo_h(e.target.value)}
            placeholder="Add Heading that you want to do..."
          />
          <input
            type="text"
            required
            class="input-text"
            size="29"
            onChange={e => setodo_d(e.target.value)}
            placeholder="Add Description that you want to do..."
          />
          <button onClick={setTodo} className="input-submit" tabindex="1">
            + Add
          </button>
        </div>
        <hr />
        <div className="main-content">
          <ul>
          {
            [...todos].reverse().map(todo=> <Card user={todo[0]} heading={todo[1]} desc={todo[2]} status={todo[3]} />)
          }
          </ul>
        </div>
        <button className="clear">Clear</button>
      </div>
    </div>
  );
}
// todos.map(todo=> <Card user={todo[0]} heading={todo[1]} desc={todo[2]} status={todo[3]} />)
            
export default App;
