# frozen_string_literal: true

class User < ApplicationRecord
  module Role
    ALL = [
      EMPLOYEE = "employee",
      MANAGER = "manager",
      OWNER = "owner",
    ].freeze

    MANAGERIAL = [MANAGER, OWNER].freeze
  end

  has_secure_password

  belongs_to :company, optional: true

  before_validation Helpers::EmailFormatter

  validates :email, presence: true
  validates :email, uniqueness: true
  validates :email, format: Helpers::EmailFormatter::FORMAT
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :password, confirmation: true, on: :create
  validates :password, length: { minimum: 8 }, on: :create
  validates :role, inclusion: { in: User::Role::ALL }

  def managerial?
    role.in?(Role::MANAGERIAL)
  end

  def owner?
    role == Role::OWNER
  end

  def token
    ::Authentication::Tokens::EncodeService.encode(user: self)
  end
end
