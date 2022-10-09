import SignIn from './index'

export default {
  title: 'SignIn',
  component: SignIn, 
  argTypes: {
    // selected: {
    //   options: ['None', 'Articles', 'Videos'],
    //   control: { type: 'radio' },
    //   defaultValue: 'None',
    // },
    onSearch: { action: 'search' },
  }
}

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]


export const Primary = (args) => <SignIn {...args} navigation={navigation} />
