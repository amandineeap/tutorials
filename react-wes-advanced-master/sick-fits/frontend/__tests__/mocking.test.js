function Person(name, foods){
    this.name = name;
    this.foods = foods;
}

Person.prototype.fetchFavFoods = () =>{
    return new Promise((resolve, reject) => {
        // simulates an api
        setTimeout(() => resolve(this.foods), 2000);
    });
};    

describe('mocking learning', () => {
    it('mocks a reg function', () => {
        const fetchDogs = jest.fn();
        fetchDogs('snickers');
        expect(fetchDogs).toHaveBeenCalled();
        expect(fetchDogs).toHaveBeenCalledWith('snickers');
        fetchDogs('hugo');
        expect(fetchDogs).toHaveBeenCalledTimes(2);
    });

    it('can create a person', () =>  {
        const me = new Person('amandine', ['pizza', 'rice']);
        expect(me.name).toBe('amandine');
    });
    
    it('can fetch foods', async () => {
        const me = new Person('amandine', ['pizza', 'rice']);
        // mock the favFoods function
        me.fetchFavFoods = jest.fn().mockResolvedValue(['sushi', 'ramen']);
        const favFoods = await me.fetchFavFoods();
        // console.log(favFoods);
        expect(favFoods).toContain('sushi');
      });
})