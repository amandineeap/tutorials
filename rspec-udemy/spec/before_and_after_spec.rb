RSpec.describe 'before and after hooks' do
  before(:context) do
    puts 'before context'
  end

  after(:context) do
    puts 'after context'
  end

  before(:example) do
    puts 'before example'
  end

  after(:example) do
    puts 'after example'
  end

  context 'random stuff' do
    it 'is just a random example' do
      expect(5 * 4).to eq(20)
    end
  
    it 'is just another random example' do
      expect(3 - 2).to eq(1)
    end
  end  
end
