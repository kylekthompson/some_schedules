# frozen_string_literal: true

class UserPolicy < Policy
  ##
  # Returns an ActiveRecord::Relation scoped to what users are visible by the user
  #
  # [1] pry(main)> UserPolicy.new(user: User.first).scope
  # => #<ActiveRecord::Relation>
  def scope
    return User.none unless user.present?
    User.where(company_id: user.company_id)
  end

  ##
  # Returns true if the user is able to create a user
  #
  # [1] pry(main)> UserPolicy.new(user: nil).can_create?
  # => true
  def can_create?
    user.nil?
  end
end
