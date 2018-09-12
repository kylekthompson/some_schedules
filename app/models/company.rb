# frozen_string_literal: true

class Company < ApplicationRecord
  has_many :users, inverse_of: :company

  validates :name, presence: true
  validates :users, presence: true
end
