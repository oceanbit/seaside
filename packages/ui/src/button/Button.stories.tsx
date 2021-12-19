import { Button } from './Button';

export default {
    title: 'Button',
    component: Button,
};

//👇 We create a “template” of how args map to rendering
const Template = (args: {text: string}) => <Button {...args} />;

export const FirstStory = Template.bind({});

// @ts-ignore
FirstStory.args = {
        text: 'test'
};
