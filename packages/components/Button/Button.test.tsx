import { describe, expect, it, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'



describe('Button', () => {
    // it('should render', () => {
    //     const wrapper = mount(Button)
    //     expect(wrapper.text()).toBe('')
    // })
    test('should render text', () => {
        const wrapper = mount(Button, {
            props: {
                text: '123',
            },
        })
        expect(wrapper.text()).toBe('123')
    })
})


