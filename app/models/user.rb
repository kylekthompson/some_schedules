class User < ApplicationRecord
  has_secure_password

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true
  validates :email, format: {
    with: /\A.+@.+\..+\z/,
    message: 'must be an email address'
  }

  def full_name
    "#{first_name} #{last_name}"
  end
end
