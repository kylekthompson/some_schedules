# frozen_string_literal: true

class Company < ApplicationRecord
  has_many :users
  has_many :invitations, through: :users
  has_many :shifts, through: :users

  validates :name, presence: true
  validates :slug, presence: true
  validates :slug, uniqueness: true
  validates :slug, format: {
    with: /\A[\w-]+\z/,
    message: 'must contain only letters, numbers, underscores, or hyphens'
  }
end
