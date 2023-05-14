class Person
  def a(seconds)
    sleep(seconds)
    "Hello"
  end
end

RSpec.describe Person do
  describe 'regular double' do
    it 'can implement any method' do
      person = double(a: "Hello", b: 20) # b does not exist on the Real Person
      expect(person.a).to eq("Hello")
    end
  end

  describe 'instance double' do
    it 'can only implement methods defined on the class' do
      # person = instance_double(Person, a: "Hello") # emulates Person.new
      # expect(person.a).to eq("Hello")

      person = instance_double(Person)
      # allow(person).to receive(:a).with(3, 10).and_return("Hello") # arguments do not exist on method a, it will raise an error
      allow(person).to receive(:a).with(3).and_return("Hello")
      expect(person.a(3)).to eq("Hello")
    end
  end
end