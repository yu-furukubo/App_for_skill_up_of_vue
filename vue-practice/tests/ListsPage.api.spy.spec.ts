import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'

jest.mock('vue-router', () => ({ useRouter: () => ({ push: jest.fn() }) }))

import * as listsApi from '@/api/lists'
import Lists from '@/pages/lists/ListsIndex.vue'

describe('ListsPage - API spy', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('createList を spy し、呼び出し・UI反映を検証', async () => {
    const spy = jest.spyOn(listsApi, 'createList').mockResolvedValue({
      id: 456,
      name: 'Spy版の名前',
    })

    const user = userEvent.setup()
    const pinia = createTestingPinia({ stubActions: false })

    render(Lists, {
      global: {
        plugins: [pinia],
        stubs: { RouterLink: { template: '<a><slot/></a>' } },
      },
    })

    await user.type(
      screen.getByPlaceholderText('新しいリスト名を入力'),
      '買い物リスト'
    )
    await user.click(screen.getByRole('button', { name: '追加' }))

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('買い物リスト')
    expect(await screen.findByText('Spy版の名前')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('新しいリスト名を入力')).toHaveValue('')
  })
})
