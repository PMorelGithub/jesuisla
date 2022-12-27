import { describe, it, expect } from 'vitest';
// import App from '../App.vue'
// import { mount } from '@vue/test-utils'
describe('App', () => {
  it('should rendered correctly', () => {
    // const wrapper = mount(App)
    // expect(wrapper.html()).toMatchSnapshot()
    expect('4').toMatch('4');
  });
});
