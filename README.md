# Ex04 Simple Calculator - React Project
#### Date: 20-08-2026
#### Name : ADITHYA NM
#### Reg No : 212225040011

## AIM
To develop a Simple Calculator using React.js with clean and responsive design, ensuring a smooth user experience across different screen sizes.

## ALGORITHM

### STEP 1
Create a React + Vite application for the Simple Calculator.

### STEP 2
Clone the existing GitHub repository and install the required dependencies.

```bash
git clone https://github.com/adithyanm1982-gif/Simple-Calculator.git
cd Simple-Calculator
npm install
npm run dev
```

### STEP 3
Inside the `src/` folder, use `App.jsx` to define the calculator logic and user interface.

### STEP 4
Plan the calculator UI with a display screen, number buttons (0–9), arithmetic operators (+, −, ×, ÷), percentage, sign toggle, backspace, clear, and equal (=) functions.

### STEP 5
Use `App.css` to add the calculator styling, including the retro amber-LED appearance, display glow, buttons, and pressed-key effects.

### STEP 6
Open `src/main.jsx` and ensure that the React application is rendered through the root element and the required CSS files are imported.

### STEP 7
Start the Vite development server.

```bash
npm run dev
```

### STEP 8
Open the local Vite URL in the browser:

```text
http://localhost:5173/
```

### STEP 9
Test the calculator by entering numbers and performing addition, subtraction, multiplication, division, percentage, sign toggle, backspace, and chained operations.

### STEP 10
Test keyboard support and fix any styling or functionality issues to refine the calculator's appearance and usability.

### STEP 11
Build the project for production using:

```bash
npm run build
```

### STEP 12
Commit and push the completed project and README documentation to the GitHub repository for version control and hosting.


## PROGRAM

### src/App.css
```
.calc {
  --amber: #ff9d4d;
  --amber-bright: #ffb977;
  --body: #2a251e;
  --body-dark: #201c17;
  --key: #3c362c;
  --key-light: #4a4237;
  --stone: #56503f;

  width: min(360px, 100%);
  padding: 20px 18px 24px;
  border-radius: 26px;
  background: linear-gradient(155deg, var(--body) 0%, var(--body-dark) 100%);
  box-shadow:
    0 30px 60px -20px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.04) inset,
    0 1px 0 rgba(255, 255, 255, 0.06) inset;
}

.calc__vent {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 6px 14px;
}

.calc__led {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4a3624;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.4) inset;
  transition: background 0.2s ease, box-shadow 0.2s ease;
}

.calc__led[data-on='true'] {
  background: var(--amber);
  box-shadow: 0 0 8px 2px rgba(255, 157, 77, 0.7);
}

.calc__brand {
  font-family: 'Manrope', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: #7a7264;
}

.calc__display {
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  padding: 22px 18px 16px;
  margin-bottom: 18px;
  background: linear-gradient(180deg, #1a0f08 0%, #100a06 100%);
  box-shadow:
    0 2px 6px rgba(0, 0, 0, 0.5) inset,
    0 0 0 1px rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(255, 255, 255, 0.03);
  text-align: right;
}

.calc__expression {
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  min-height: 16px;
  color: #8a5c38;
  letter-spacing: 0.02em;
  margin-bottom: 6px;
}

.calc__value {
  font-family: 'Space Mono', monospace;
  font-size: clamp(32px, 9vw, 40px);
  font-weight: 700;
  color: var(--amber-bright);
  text-shadow: 0 0 14px rgba(255, 157, 77, 0.55), 0 0 2px rgba(255, 185, 119, 0.8);
  line-height: 1.1;
  overflow-x: auto;
  white-space: nowrap;
}

.calc__value[data-error='true'] {
  color: #ff6b6b;
  text-shadow: 0 0 14px rgba(255, 107, 107, 0.55);
  font-size: 26px;
}

.calc__scanline {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.025) 0px,
    rgba(255, 255, 255, 0.025) 1px,
    transparent 1px,
    transparent 3px
  );
  mix-blend-mode: overlay;
}

.calc__pad {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.key {
  font-family: 'Manrope', sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: #ece6da;
  padding: 16px 0;
  border: none;
  border-radius: 12px;
  background: linear-gradient(180deg, var(--key-light) 0%, var(--key) 100%);
  box-shadow:
    0 3px 0 rgba(0, 0, 0, 0.35),
    0 4px 8px rgba(0, 0, 0, 0.3),
    0 1px 0 rgba(255, 255, 255, 0.08) inset;
  cursor: pointer;
  transition: transform 0.08s ease, box-shadow 0.08s ease;
}

.key:hover {
  background: linear-gradient(180deg, #524a3d 0%, #423b30 100%);
}

.key:active {
  transform: translateY(3px);
  box-shadow:
    0 0 0 rgba(0, 0, 0, 0.35),
    0 1px 2px rgba(0, 0, 0, 0.3),
    0 1px 0 rgba(255, 255, 255, 0.05) inset;
}

.key:focus-visible {
  outline: 2px solid var(--amber);
  outline-offset: 2px;
}

.key--func {
  color: #d8cfbf;
  background: linear-gradient(180deg, var(--stone) 0%, #453f32 100%);
  font-size: 15px;
}

.key--op {
  color: var(--amber-bright);
  background: linear-gradient(180deg, #5a3d24 0%, #4a3018 100%);
  font-size: 19px;
}

.key--active {
  background: linear-gradient(180deg, var(--amber) 0%, #cc7530 100%);
  color: #241205;
  box-shadow:
    0 3px 0 rgba(0, 0, 0, 0.35),
    0 0 12px 2px rgba(255, 157, 77, 0.5),
    0 1px 0 rgba(255, 255, 255, 0.15) inset;
}

.key--equals {
  background: linear-gradient(180deg, #ff9d4d 0%, #e07a2e 100%);
  color: #241205;
  box-shadow:
    0 3px 0 #a3551a,
    0 4px 10px rgba(224, 122, 46, 0.4),
    0 1px 0 rgba(255, 255, 255, 0.25) inset;
}

.key--equals:hover {
  background: linear-gradient(180deg, #ffab66 0%, #e6853c 100%);
}

.key--equals:active {
  transform: translateY(3px);
  box-shadow:
    0 0 0 #a3551a,
    0 1px 3px rgba(224, 122, 46, 0.3),
    0 1px 0 rgba(255, 255, 255, 0.15) inset;
}

.key--wide {
  grid-column: span 2;
}

@media (prefers-reduced-motion: reduce) {
  .key {
    transition: none;
  }
}
```

### src/App.jsx
```
import { useEffect, useState } from 'react'
import './App.css'

const OPERATORS = {
  '÷': (a, b) => a / b,
  '×': (a, b) => a * b,
  '−': (a, b) => a - b,
  '+': (a, b) => a + b,
}

function formatValue(value) {
  if (value === 'Error') return value
  const num = Number(value)
  if (Number.isNaN(num)) return '0'

  // Keep manual decimal typing intact (e.g. "12.")
  if (typeof value === 'string' && value.endsWith('.')) return value

  const str = num.toString()
  if (str.length > 11) {
    return num.toPrecision(8).replace(/\.?0+$/, '').length > 11
      ? num.toExponential(4)
      : Number(num.toPrecision(8)).toString()
  }
  return str
}

export default function App() {
  const [display, setDisplay] = useState('0')
  const [prevValue, setPrevValue] = useState(null)
  const [operator, setOperator] = useState(null)
  const [overwrite, setOverwrite] = useState(true)
  const [expression, setExpression] = useState('')

  const inputDigit = (digit) => {
    if (overwrite) {
      setDisplay(digit === '.' ? '0.' : digit)
      setOverwrite(false)
      return
    }
    if (digit === '.' && display.includes('.')) return
    if (display.replace('-', '').replace('.', '').length >= 10) return
    setDisplay(display + digit)
  }

  const clearAll = () => {
    setDisplay('0')
    setPrevValue(null)
    setOperator(null)
    setOverwrite(true)
    setExpression('')
  }

  const backspace = () => {
    if (overwrite) return
    const next = display.slice(0, -1)
    if (next === '' || next === '-') {
      setDisplay('0')
      setOverwrite(true)
    } else {
      setDisplay(next)
    }
  }

  const toggleSign = () => {
    if (display === '0') return
    setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display)
  }

  const percent = () => {
    setDisplay(formatValue(String(Number(display) / 100)))
  }

  const chooseOperator = (nextOperator) => {
    if (display === 'Error') return

    if (operator && !overwrite) {
      const result = OPERATORS[operator](Number(prevValue), Number(display))
      const resultStr = Number.isFinite(result) ? formatValue(String(result)) : 'Error'
      setDisplay(resultStr)
      setPrevValue(resultStr)
      setExpression(`${formatValue(resultStr)} ${nextOperator}`)
    } else {
      setPrevValue(display)
      setExpression(`${formatValue(display)} ${nextOperator}`)
    }

    setOperator(nextOperator)
    setOverwrite(true)
  }

  const calculate = () => {
    if (operator == null || prevValue == null || display === 'Error') return
    const result = OPERATORS[operator](Number(prevValue), Number(display))
    const resultStr = Number.isFinite(result) ? formatValue(String(result)) : 'Error'
    setExpression(`${formatValue(prevValue)} ${operator} ${formatValue(display)} =`)
    setDisplay(resultStr)
    setPrevValue(null)
    setOperator(null)
    setOverwrite(true)
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key >= '0' && e.key <= '9') inputDigit(e.key)
      else if (e.key === '.') inputDigit('.')
      else if (e.key === '+') chooseOperator('+')
      else if (e.key === '-') chooseOperator('−')
      else if (e.key === '*') chooseOperator('×')
      else if (e.key === '/') { e.preventDefault(); chooseOperator('÷') }
      else if (e.key === 'Enter' || e.key === '=') calculate()
      else if (e.key === 'Backspace') backspace()
      else if (e.key === 'Escape') clearAll()
      else if (e.key === '%') percent()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  const isActive = (op) => operator === op && overwrite

  return (
    <div className="calc">
      <div className="calc__vent" aria-hidden="true">
        <span className="calc__led" data-on={operator != null} />
        <span className="calc__brand">MODEL Σ-7</span>
      </div>

      <div className="calc__display">
        <div className="calc__expression">{expression || '\u00A0'}</div>
        <div className="calc__value" data-error={display === 'Error'}>
          {display}
        </div>
        <div className="calc__scanline" aria-hidden="true" />
      </div>

      <div className="calc__pad">
        <button className="key key--func" onClick={clearAll}>AC</button>
        <button className="key key--func" onClick={toggleSign}>+/−</button>
        <button className="key key--func" onClick={percent}>%</button>
        <button className={`key key--op ${isActive('÷') ? 'key--active' : ''}`} onClick={() => chooseOperator('÷')}>÷</button>

        <button className="key" onClick={() => inputDigit('7')}>7</button>
        <button className="key" onClick={() => inputDigit('8')}>8</button>
        <button className="key" onClick={() => inputDigit('9')}>9</button>
        <button className={`key key--op ${isActive('×') ? 'key--active' : ''}`} onClick={() => chooseOperator('×')}>×</button>

        <button className="key" onClick={() => inputDigit('4')}>4</button>
        <button className="key" onClick={() => inputDigit('5')}>5</button>
        <button className="key" onClick={() => inputDigit('6')}>6</button>
        <button className={`key key--op ${isActive('−') ? 'key--active' : ''}`} onClick={() => chooseOperator('−')}>−</button>

        <button className="key" onClick={() => inputDigit('1')}>1</button>
        <button className="key" onClick={() => inputDigit('2')}>2</button>
        <button className="key" onClick={() => inputDigit('3')}>3</button>
        <button className={`key key--op ${isActive('+') ? 'key--active' : ''}`} onClick={() => chooseOperator('+')}>+</button>

        <button className="key key--wide" onClick={() => inputDigit('0')}>0</button>
        <button className="key" onClick={() => inputDigit('.')}>.</button>
        <button className="key key--func" onClick={backspace}>⌫</button>
        <button className="key key--equals" onClick={calculate}>=</button>
      </div>
    </div>
  )
}

```

### src/index.css
```
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
  background: #17110d;
  background-image:
    radial-gradient(circle at 20% 10%, rgba(255, 138, 61, 0.06), transparent 45%),
    radial-gradient(circle at 80% 90%, rgba(255, 138, 61, 0.05), transparent 45%);
  font-family: 'Manrope', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

#root {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

```

### src/main.jsx
```
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

```

### index.html
```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Calculator</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Manrope:wght@500;600;700;800&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

### package.json
```
{
  "name": "react-calculator",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.1"
  }
}

```

## OUTPUT
![alt text](screenshots/mwad-exp4-1.png)

![alt text](screenshots/mwad-exp4-2.png)

## RESULT
The program for developing a simple calculator in React.js is executed successfully.