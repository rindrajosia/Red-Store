class Category < ApplicationRecord
  has_many :products, dependent: :destroy
  validates_presence_of :name
  validates :name, uniqueness: { case_sensitive: false }, length: { minimum: 2, maximum: 50 }
end
