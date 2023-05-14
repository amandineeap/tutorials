RSpec.describe 'spies' do
  let(:animal) { spy('animal') } # do not need to create the methods on the spy, just invoke it within the test
  
  it 'confirms that a message has been received' do
    animal.eat_food # invoke whatever here before testing that it has been invoked

    expect(animal).to have_received(:eat_food) # after animal.eat_food is invoked
    expect(animal).to_not have_received(:eat_human) # after animal.eat_food is invoked
  end

  it 'resets between examples' do
    expect(animal).to_not have_received(:eat_food) # nothing has been invoked in this test block
  end

  it 'retains the same functionality of a regular double' do
    animal.eat_food
    animal.eat_food
    animal.eat_food('Sushi')

    expect(animal).to have_received(:eat_food).exactly(3).times
    expect(animal).to have_received(:eat_food).at_least(2).times
    expect(animal).to have_received(:eat_food).with("Sushi")
    expect(animal).to have_received(:eat_food).once.with("Sushi")
  end
end
