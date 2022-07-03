import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeItem = {
    id: '1212112',
    title: 'my item',
    price: 4000,
    description: 'description',
    image: 'dog.jpg',
    largeImage: 'largedog.jpg'
}

describe('<Item/>', () => {
   it('renders and matches the snapshot', () => {
    //    const price = '$50.35';
    //    expect(price).toMatchSnapshot();
        const wrapper = shallow(<ItemComponent item={fakeItem}></ItemComponent>);
        // expect(wrapper).toMatchSnapshot();
        expect(toJSON(wrapper)).toMatchSnapshot();
   })
    // it('renders the image properly', () => {
    //     const wrapper = shallow(<ItemComponent item={fakeItem}></ItemComponent>);
    //     const img = wrapper.find('img');
    //     // console.log(img.debug());
    //     expect(img.props().src).toBe(fakeItem.image);
    //     expect(img.props().alt).toBe(fakeItem.title);
    // });

    // it('renders the pricetag and title properly', () => {
    //     const wrapper = shallow(<ItemComponent item={fakeItem}></ItemComponent>);
    //     // console.log(wrapper.debug());
    //     const PriceTag = wrapper.find('PriceTag');
    //     // console.log(PriceTag.dive().text());
    //     expect(PriceTag.children().text()).toBe('$50');
    //     // expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
    // });

    // it('renders out the buttons properly',  () => {
    //     const wrapper = shallow(<ItemComponent item={fakeItem}></ItemComponent>);
    //     const buttonList = wrapper.find('.buttonList');
    //     expect(buttonList.children()).toHaveLength(3);
    //     expect(buttonList.find('Link')).toHaveLength(1);
    //     expect(buttonList.find('Link')).toBeTruthy();
    //     expect(buttonList.find('Link').exists()).toBe(true);
    //     // console.log(buttonList.debug());
    //     expect(buttonList.find('DeleteItem').exists()).toBe(true);
    // })
});