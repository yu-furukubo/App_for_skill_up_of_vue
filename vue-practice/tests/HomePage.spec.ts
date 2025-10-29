import { render, screen } from '@testing-library/vue'
import Home from '@/pages/HomePage.vue'

describe('Home', () => {
  it('タイトルとメッセージを表示する', () => {
    render(Home)
    // <h1>Home</h1>
    expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeInTheDocument()
    // <p>Todoアプリ（仮）へようこそ</p>
    expect(screen.getByText('Todoアプリ（仮）へようこそ')).toBeInTheDocument()
  })
})