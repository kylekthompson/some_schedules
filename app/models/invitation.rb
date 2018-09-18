# frozen_string_literal: true

class Invitation < ApplicationRecord
  belongs_to :invited_by, class_name: :User
  has_one :company, through: :invited_by

  before_validation Helpers::EmailFormatter
  before_validation :set_expires_at, on: :create

  validates :invited_by, presence: true
  validates :email, presence: true
  validates :email, uniqueness: true
  validates :email, format: Helpers::EmailFormatter::FORMAT
  validates :role, presence: true
  validates :role, inclusion: { in: User::Role::ALL }

  private

  def set_expires_at
    self.expires_at = 1.day.from_now
  end
end
