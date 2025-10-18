import { render, screen } from '@testing-library/vue'
import About from '@/pages/AboutPage.vue'

describe('About', () => {
  it('タイトルとメッセージを表示する', () => {
    render(About)
    // <h1>Home</h1>
    expect(screen.getByRole('heading', { level: 1, name: 'About' })).toBeInTheDocument()
    // <p>Todoアプリ（仮）へようこそ</p>
    expect(screen.getByText('これはVueの学習用ページです。')).toBeInTheDocument()
  })

  it('アンマウント時に console.log が呼ばれる', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

    const { unmount } = render(About)
    unmount()

    expect(logSpy).toHaveBeenCalledWith('✅ Aboutページがアンマウントされました')

    logSpy.mockRestore()
  })
})