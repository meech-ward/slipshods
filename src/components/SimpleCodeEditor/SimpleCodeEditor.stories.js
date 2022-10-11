import SimpleCodeEditor from './index'

export default {
  title: 'SimpleCodeEditor',
  component: SimpleCodeEditor, 
  argTypes: {
    onSubmit: { action: 'submit' },
  }
}


export const Primary = (args) => <SimpleCodeEditor 
defaultValue={`
import SimpleCodeEditor from './index'

export default {
  title: 'SimpleCodeEditor',
  component: SimpleCodeEditor,
  argTypes: {
    onSubmit: { action: 'submit' },
    }
  }
}`}
 {...args} 
 />
