# frozen_string_literal: true

class Shift < ApplicationRecord
  belongs_to :user

  validates :end_time, presence: true
  validates :start_time, presence: true
  validates :user, presence: true
end
