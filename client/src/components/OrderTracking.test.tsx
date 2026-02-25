
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import OrderTracking from './OrderTracking'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import * as ServiceApi from '../api/service'

vi.mock('../api/service')

describe('OrderTracking', () => {
    it('renders the track order page', async () => {
        vi.spyOn(ServiceApi, 'getOrder').mockResolvedValue({
            _id: '123',
            status: 'Preparing',
            totalAmount: 500,
            deliveryDetails: { name: 'User', address: 'Address' },
            createdAt: new Date().toISOString()
        } as any)

        render(
            <MemoryRouter initialEntries={['/order/123']}>
                <Routes>
                    <Route path="/order/:orderId" element={<OrderTracking />} />
                </Routes>
            </MemoryRouter>
        )

        const title = await screen.findByText(/Track Your Order/i)
        expect(title).toBeInTheDocument()

        const status = await screen.findByText(/Preparing/i)
        expect(status).toBeInTheDocument()
    })
})
