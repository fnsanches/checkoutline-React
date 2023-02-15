
import { useEffect, useState } from 'react'
import './App.css'



const App = () => {
  const [lines, setLines] = useState<number[][]>([[], [], [], [], []]);
  const [person, setPerson] = useState<number>(0);

  const time = 3000;

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prevLines) => {
        const newLines = [...prevLines];
        newLines.forEach((line) => {
          if (line.length > 0) {
            line[0] -= 1;
            if (line[0] === 0) {
              line.shift();
            }
          }
        }
        );
        return newLines;
      });
    }, time);
    return () => clearInterval(interval);
  }, []);

  
  const addPersonToQueue = (person: number) => {
    const newLines = [...lines];
    const shortestLine = newLines.reduce((acc, line) => {
      if (line.reduce((sum, cV) => sum + cV, 0) < acc.reduce((sum, cV) => sum + cV, 0)) {
        return line;
      }
      return acc;
    }, newLines[0]);
    shortestLine.push(person);
    setLines(newLines);
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = document.querySelector('form');
    const alert = document.querySelector('#alert-p');
    
    if (alert) form?.removeChild(alert);
    if (person <= 0) {
      const error = document.createElement('p');
      error.id = 'alert-p'
      error.innerText = 'Please enter a number greater than 0';
      error.style.color = 'red';
      form?.appendChild(error);      
      return;
    }
    addPersonToQueue(person);
  }

  return (
    <div className="App">
      <form>
        <input 
        min={1}
        onChange={(e) => setPerson(parseInt(e.target.value)) }
        type="number" />
        <button
        onClick={(e) => handleSubmit(e)}
        >Add Person to Queue</button>
        <p>Every {time / 1000} seconds a product is scanned and removed from the queue</p>
      </form>
      <div className="lines">
        {lines.map((line, index) => (
          <div className="line" key={index}>
            <h3>Line {index + 1}</h3>
            <p>{line.length} people</p>
            <p>{line.reduce((a, b) => a + b, 0)} products</p>
            {line.map((person, index) => (
              <div className='person-card' key={index}>Person {index + 1}
                <p>{person} products</p>
              </div>
            ))}
          </div>
        ))}
        </div>
    </div>
  )
}

export default App
