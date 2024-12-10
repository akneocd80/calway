'use client'

import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import * as math from 'mathjs'
import 'katex/dist/katex.min.css'
import { PhysicsFormula, PhysicsValues } from './types'

// Dynamically import Excalidraw
const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw),
  {
    ssr: false,
    loading: () => (
      <div className="drawing-area flex items-center justify-center">
        Loading drawing tool...
      </div>
    )
  }
);

export default function Page() {
  const [equation, setEquation] = useState('')
  const [result, setResult] = useState('')
  const [mode, setMode] = useState<'basic' | 'physics'>('basic')

  const physicsFormulas: Record<string, PhysicsFormula> = {
    'v=d/t': (values) => {
      const d = values['d']
      const t = values['t']
      return d && t ? d / t : undefined
    },
    'F=ma': (values) => {
      const m = values['m']
      const a = values['a']
      return m && a ? m * a : undefined
    }
  }

  const handlePhysicsCalculation = () => {
    try {
      const [formula, valuesStr] = equation.split(':')
      if (!valuesStr || !physicsFormulas[formula]) {
        throw new Error('Invalid formula format')
      }

      const values: PhysicsValues = {}
      valuesStr.split(',').forEach(pair => {
        const [key, value] = pair.split('=')
        values[key] = parseFloat(value)
      })

      const result = physicsFormulas[formula](values)
      setResult(result !== undefined ? result.toString() : 'Invalid input values')
    } catch (error) {
      setResult('Error: Invalid physics equation format')
    }
  }

  const calculateResult = () => {
    try {
      if (mode === 'basic') {
        const answer = math.evaluate(equation)
        setResult(answer.toString())
      } else {
        handlePhysicsCalculation()
      }
    } catch (error) {
      setResult('Error: Invalid equation')
    }
  }

  return (
    <main className="container mx-auto p-4">
      <header>
        <h1 className="text-3xl font-bold mb-4">CalWay - Math & Physics Calculator</h1>
      </header>

      <nav className="mb-4">
        <label htmlFor="calc-mode" className="sr-only">Calculator Mode</label>
        <select 
          id="calc-mode"
          value={mode} 
          onChange={(e) => setMode(e.target.value as 'basic' | 'physics')}
          className="border p-2 rounded"
          aria-label="Calculator Mode"
        >
          <option value="basic">Basic Math</option>
          <option value="physics">Physics</option>
        </select>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="border p-4 rounded" aria-label="Drawing Tool">
          <h2 className="text-xl mb-2">Drawing Area</h2>
          <div className="drawing-area">
            <Excalidraw />
          </div>
        </section>

        <section className="border p-4 rounded" aria-label="Calculator">
          <h2 className="text-xl mb-2">Calculator</h2>
          <label htmlFor="equation-input" className="sr-only">Enter Equation</label>
          <input
            id="equation-input"
            type="text"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            placeholder={mode === 'basic' ? "Enter equation (e.g., 2+2)" : "Enter physics formula (e.g., v=d/t:d=100,t=10)"}
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={calculateResult}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Calculate
          </button>
          <div className="mt-4">
            <h3 className="font-bold">Result:</h3>
            <output className="p-2 bg-gray-100 rounded block">{result}</output>
          </div>
        </section>
      </div>

      <footer className="mt-4">
        <section aria-label="Formula Reference">
          <h2 className="text-xl mb-2">Common Physics Formulas</h2>
          <ul className="list-disc pl-4">
            <li>Velocity (v=d/t): v=d/t:d=distance,t=time</li>
            <li>Force (F=ma): F=ma:m=mass,a=acceleration</li>
          </ul>
        </section>
      </footer>
    </main>
  )
}
