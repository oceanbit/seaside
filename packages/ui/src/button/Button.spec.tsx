import {Button} from "./Button";
import {render} from "@testing-library/react-native";

test('Should show props', () => {
    const {getByText} = render(<Button text={"Hello"}/>)
    expect(getByText("Hello")).toBeTruthy();
})
