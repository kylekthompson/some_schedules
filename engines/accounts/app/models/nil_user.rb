# frozen_string_literal: true

class NilUser
  include NilColumns

  define_nil_columns_for User

  def authenticate(password)
    User.new(password: "fake_password").authenticate(password)
    false
  end

  def persisted?
    false
  end
end
