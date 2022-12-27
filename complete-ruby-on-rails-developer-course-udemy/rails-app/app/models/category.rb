class Category < ApplicationRecord
  validates :name, presence: true, length: { maximum: 25, minimum: 5}
  validates_uniqueness_of :name
end