class Product < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_many :favorites, dependent: :destroy
  validates_presence_of :title, :description, :user_id, :imageurl
  validates :title, length: { minimum: 10 }
  validates :description, length: { minimum: 10 }
end
