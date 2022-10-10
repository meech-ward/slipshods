import NewPostForm from './index'

export default {
  title: 'NewPostForm',
  component: NewPostForm, 
  argTypes: {
    onSubmit: { action: 'submit' },
  }
}


export const Primary = (args) => <NewPostForm className='max-w-2xl mx-auto' {...args} />
