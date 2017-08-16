# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  has_many :company_users
  has_many :companies, through: :company_users

  before_validation :downcase_email

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true
  validates :email, uniqueness: true
  validates :email, format: {
    with: /\A.+@.+\..+\z/,
    message: 'must be an email address'
  }
  validates :password, confirmation: true
  validates :password, length: { minimum: 8 }

  ##
  # Returns the full name of the user
  #
  # [1] pry(main)> User.new(first_name: 'Kyle', last_name: 'Thompson').full_name
  # => "Kyle Thompson"
  def full_name
    "#{first_name} #{last_name}"
  end

  ##
  # Returns the payload representation of the user
  #
  # [1] pry(main)> User.new(email: 'someone@email.com').to_token_payload
  # => {:sub=>"someone@email.com", :uid=>1}
  def to_token_payload
    {
      sub: email,
      uid: id
    }
  end

  ##
  # Returns the user that matches the auth params
  #
  # [1] pry(main)> request = ActionDispatch::Request.new(
  # [1] pry(main)*   params: ActionController::Parameters.new(
  # [1] pry(main)*     auth: { email: 'someone@email.com' }
  # [1] pry(main)*   )
  # [1] pry(main)* )
  # => #<ActionDispatch::Request>
  # [2] pry(main)> User.from_token_request(request)
  # => #<User>
  def self.from_token_request(request)
    find_by(email: request.params[:auth] && request.params[:auth][:email]&.downcase)
  end

  ##
  # Returns the user that matches the payload of a token
  #
  # [1] pry(main)> User.from_token_payload({ 'sub' => 'someone@email.com' })
  # => #<User>
  def self.from_token_payload(payload)
    find_by(email: payload['sub']&.downcase)
  end

  private

  def downcase_email
    self.email = email.downcase if email.present?
  end
end
