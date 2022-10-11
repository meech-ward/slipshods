import ShareActions from './index'

export default {
  title: 'ShareActions',
  component: ShareActions, 
  argTypes: {
    onComment: { action: 'comment' },
    onLike: { action: 'like' },
  }
}


export const Primary = (args) => <ShareActions
url={"https://www.google.com"}
title={"My first post"}
{...args} 
/>
