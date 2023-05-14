class Deck
  def self.build # no need to do Deck.new, can just invoke the class itself directly elsewhere
    # business logic to build a whole bunch of cards
  end
end

class CardGame
  attr_reader :cards
  def start
    @cards = Deck.build
  end
end

RSpec.describe CardGame do
  it 'can only implement class methods that are defined on a class' do
    deck_klass = class_double(Deck, build: ["Ace", "Queen"]).as_stubbed_const # will replace all calls to Deck with this double

    expect(deck_klass).to receive(:build).once
    subject.start
    expect(subject.cards).to eq(["Ace", "Queen"])
  end
end
