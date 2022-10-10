import NewPostForm from './index'

export default {
  title: 'NewPostForm',
  component: NewPostForm, 
  argTypes: {
    selected: {
      options: ['None', 'Articles', 'Videos'],
      control: { type: 'radio' },
      defaultValue: 'None',
    },
    onSubmit: { action: 'submit' },
  }
}


export const Primary = (args) => <NewPostForm {...args} />
export const SignedOut = (args) => <NewPostForm {...args} />
