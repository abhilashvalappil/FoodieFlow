
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Checkout from './Checkout'
import { MemoryRouter } from 'react-router-dom'
import { useCart } from '../context/CartContext'

vi.mock('../context/CartContext', () => ({
    useCart: vi.fn()
}))

describe('Checkout Component', () => {
    it('shows empty cart message when cart is empty', () => {
        vi.mocked(useCart).mockReturnValue({
            cartItems: [],
            cartTotal: 0,
            clearCart: vi.fn(),
        } as any)

        render(
            <MemoryRouter>
                <Checkout />
            </MemoryRouter>
        )

        expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument()
    })

    it('renders checkout form when items are in cart', () => {
        vi.mocked(useCart).mockReturnValue({
            cartItems: [{ id: '1', name: 'Pizza', price: 250, quantity: 1, image: '' }],
            cartTotal: 250,
            clearCart: vi.fn(),
        } as any)

        render(
            <MemoryRouter>
                <Checkout />
            </MemoryRouter>
        )

        expect(screen.getByText(/Delivery Details/i)).toBeInTheDocument()
    })
})
