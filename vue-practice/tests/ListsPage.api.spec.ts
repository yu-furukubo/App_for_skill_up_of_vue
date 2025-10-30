import { render, screen, waitFor } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'

jest.mock('vue-router', () => ({ useRouter: () => ({ push: jest.fn() }) }))

jest.mock('@/api/lists', () => ({
  createList: jest.fn().mockResolvedValue({ id: 123, name: 'APIからの名前' }),
}))
import { createList as mockCreateList } from '@/api/lists'

import Lists from '@/pages/lists/ListsIndex.vue'

describe('ListsPage - APIモック', () => {
  it('フォーム送信でAPIを呼び、UIに反映される', async () => {
    const user = userEvent.setup()
    const pinia = createTestingPinia({ stubActions: false })

    render(Lists, {
      global: {
        plugins: [pinia],
        stubs: { RouterLink: { template: '<a><slot/></a>' } },
      },
    })

    await user.type(screen.getByPlaceholderText('新しいリスト名を入力'), '買い物リスト')
    await user.click(screen.getByRole('button', { name: '追加' }))

    // APIが正しく呼ばれた
    expect(mockCreateList).toHaveBeenCalledTimes(1)
    expect(mockCreateList).toHaveBeenCalledWith('買い物リスト')

    // UI反映を待つ
    await waitFor(() => {
      expect(screen.getByText('APIからの名前')).toBeInTheDocument()
      expect(screen.getByText(/未完了\s*:\s*0\s*件/)).toBeInTheDocument()
    })

    // 入力クリア
    expect(screen.getByPlaceholderText('新しいリスト名を入力')).toHaveValue('')
  })
})
