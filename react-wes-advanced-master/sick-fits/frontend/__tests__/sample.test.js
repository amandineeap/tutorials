describe('Sample test 101', () => {
    const age = 100;
    it('works as expected', () => {
        expect(1).toEqual(1);
        expect(age).toEqual(100);
    });

    it('handles range just fine', () => {
        const age = 100;
        expect(age).toBeGreaterThan(20);
    });

    xit('makes a list of dog names', () => {
        const dogs = ['snickers', 'hugo'];
        expect(dogs).toEqual(dogs);
        expect(dogs).toContain('snickers');
    });
})