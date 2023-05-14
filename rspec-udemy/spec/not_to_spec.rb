RSpec.describe 'not_to method' do
  it 'checks for the inverse of a matcher' do
    expect(5).not_to eq(10)
    expect([1, 2, 3]).not_to equal([1, 2, 3]) # not same object
    expect(10).not_to be_odd
    expect([1, 2, 3]).not_to be_empty

    expect(nil).not_to be_truthy

    expect('hello').not_to start_with('lo')
    expect('hello').not_to end_with('el')

    expect(5).not_to respond_to(:length)

    expect([:a, :b, :c]).not_to include(:d)

    expect { 11 / 3 }.not_to raise_error # keep generic here as opposed to checking for an error, then it should be more specific
  end  
end
