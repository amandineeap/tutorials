import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CartCount from '../components/CartCount';

describe('<CartCount/>', () => {
    it('renders', () => {
        shallow(<CartCount count={10}/>)
    })

    it('matches the snapshot', () => {
        const wrapper = shallow(<CartCount count={11}/>);
        expect(toJSON(wrapper)).toMatchSnapshot();
    })

    it('it updates via props', () => {
        const wrapper = shallow(<CartCount count={10}/>);
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.setProps({count: 10});
        expect(toJSON(wrapper)).toMatchSnapshot();

        // const wrapper = mount(<CartCount count={10}/>);
        // console.log(wrapper.debug())
    })
})