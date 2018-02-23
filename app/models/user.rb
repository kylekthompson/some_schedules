# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  belongs_to :company
  has_many :invitations, dependent: :destroy
  has_many :shifts, dependent: :destroy

  enum role: %i[owner manager employee]

  before_validation Helpers::EmailFormatter

  validates :company, presence: true
  validates :email, presence: true
  validates :email, uniqueness: true
  validates :email, format: Helpers::EmailFormatter::FORMAT
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :password, confirmation: true, on: :create
  validates :password, length: { minimum: 8 }, on: :create
  validates :role, presence: true
end
