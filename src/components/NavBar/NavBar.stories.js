import NavBar from './index'

export default {
  title: 'NavBar',
  component: NavBar, 
  argTypes: {
    selected: {
      options: ['None', 'Articles', 'Videos'],
      control: { type: 'radio' },
      defaultValue: 'None',
    },
    onSignIn: { action: 'sign in' },
    onSignOut: { action: 'sign out' },
  }
}

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

const user = {
  name: 'Tom Cook',
}


export const Primary = (args) => <NavBar {...args} navigation={navigation} user={user} />
export const SignedOut = (args) => <NavBar {...args} navigation={navigation} user={null} />
