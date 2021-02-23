class Category < ApplicationRecord
  has_many :products, dependent: :destroy
  validates_presence_of :type
end
