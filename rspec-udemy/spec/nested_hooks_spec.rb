RSpec.describe 'nested hooks' do
  before(:context) do
    puts 'OUTER before context'
  end

  before(:example) do
    puts 'OUTER before example'
  end

  it 'does basic math' do
    expect(1 + 1).to eq(2)
  end

  context 'with condition A' do
    before(:context) do
      puts 'INNER before context'
    end

    before(:example) do
      puts 'INNER before example'
    end

    it 'does basic math' do
      expect(1 + 1).to eq(2)
    end

    it 'does substraction' do
      expect(1 - 1).to eq(0)
    end
  end
end