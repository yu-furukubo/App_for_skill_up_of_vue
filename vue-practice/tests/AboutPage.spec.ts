import { render } from '@testing-library/vue'
import About from '@/pages/AboutPage.vue'

describe('AboutPage', () => {
  it('アンマウント時に console.log が呼ばれる', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

    const { unmount } = render(About)
    unmount()

    expect(logSpy).toHaveBeenCalledWith('✅ Aboutページがアンマウントされました')

    logSpy.mockRestore()
  })
})
