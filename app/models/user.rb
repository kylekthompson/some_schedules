##
# The User model represents any user of the application
class User < ApplicationRecord
  has_secure_password

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true
  validates :email, format: {
    with: /\A.+@.+\..+\z/,
    message: 'must be an email address'
  }

  ##
  # Returns the full name of the user
  #
  # [1] pry(main)> User.new(first_name: 'Kyle', last_name: 'Thompson').full_name
  # => "Kyle Thompson"
  def full_name
    "#{first_name} #{last_name}"
  end
end
