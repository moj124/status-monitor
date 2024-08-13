import './styles/App.css';
import StatusBoard from './components/StatusBoard';

function App() {
  return (
    <main>
      <h1 className='status-board__title'>DevOps Status Board</h1>
      <StatusBoard />
    </main>
  );
}

export default App;
