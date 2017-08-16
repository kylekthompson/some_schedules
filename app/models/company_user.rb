# frozen_string_literal: true

class CompanyUser < ApplicationRecord
  belongs_to :company
  belongs_to :user

  validates :company, presence: true
  validates :role, presence: true
  validates :user, presence: true

  enum role: %i[owner manager supervisor employee]
end
