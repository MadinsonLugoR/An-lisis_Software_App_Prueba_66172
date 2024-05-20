import { it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RFCInput from '../RFCInput.vue'

const wrapper = mount(RFCInput)

it('renders the component', () => {
  expect(wrapper.html()).toMatchSnapshot()
})

it('not pass RFC XXX901010', async () => {
  const input = wrapper.find('input')
  await input.setValue('XXX901010')
  expect(wrapper.vm.isValid).toBe(false)
})

it('not pass RFC 123456789', async () => {
  const input = wrapper.find('input')
  await input.setValue('123456789')
  expect(wrapper.vm.isValid).toBe(false)
})

it('pass RFC AAAA010101AAA', async () => {
  const input = wrapper.find('input')
  await input.setValue('AAAA010101AAA')
  expect(wrapper.vm.isValid).toBe(true)
})

it('not pass RFC of moral entity invalid', async () => {
  const input = wrapper.find('input')
  await input.setValue('XXX010101XXX')
  expect(wrapper.vm.isValid).toBe(false)
})

it('pass RFC of moral entity valid', async () => {
  const input = wrapper.find('input')
  await input.setValue('XAXX010101000')
  expect(wrapper.vm.isValid).toBe(true)
})
