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
