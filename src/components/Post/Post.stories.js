import Post from './index'

export default {
  title: 'Post',
  component: Post, 
  argTypes: {
    onSubmit: { action: 'submit' },
  }
}


export const Primary = (args) => <Post 
className='max-w-2xl mx-auto' 
href="#"
post={{
  title: "My first post",
  code: "const a = 1",
  totalComments: 10,
  totalLikes: 10,
}} 
user={{
  name: "John Doe",
  image: "https://www.placecage.com/gif/284/196"
}}
{...args} 
/>


export const liked = (args) => <Post 
className='max-w-2xl mx-auto' 
href="#"
post={{
  title: "My first post",
  code: "const a = 1",
  totalComments: 10,
  totalLikes: 10,
  liked: true
}} 
user={{
  name: "John Doe",
  image: "https://www.placecage.com/gif/284/196"
}}
{...args} 
/>
