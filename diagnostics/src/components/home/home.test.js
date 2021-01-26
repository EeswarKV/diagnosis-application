import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Home from './home.js';

const server = setupServer(
    rest.get('http://localhost:8001/api/v1/diagnostics/tests', (req, res, ctx) => {
      return res(ctx.json({ tests: 'get the list of tests' }))
    })
)
  
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays greeting', async () => {
    render(<Home />)
  })