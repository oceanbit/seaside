import { Button } from './button';

export default {
    title: 'Example',
    component: Button,
};

//👇 We create a “template” of how args map to rendering
const Template = (args: {text: string}) => <Button {...args} />;

export const FirstStory = Template.bind({});

// @ts-ignore
FirstStory.args = {
        text: 'test'
};
