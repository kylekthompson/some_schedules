# frozen_string_literal: true

class Invitation < ApplicationRecord
  belongs_to :user
  has_one :company, through: :user

  before_validation Helpers::EmailFormatter
  before_validation :set_expires_at, on: :create

  validates :user, presence: true
  validates :email, presence: true
  validates :email, uniqueness: true
  validates :email, format: Helpers::EmailFormatter::FORMAT

  private

  def set_expires_at
    self.expires_at = 1.day.from_now
  end
end
