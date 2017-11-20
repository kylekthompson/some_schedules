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
  # Returns true if the user is able to read the policed value
  #
  # [1] pry(main)> UserPolicy.new(user: User.new(company_id: 1), policed: User.new(company_id: 1)).can_read?
  # => true
  def can_read?
    return can_read_instance? if policing_instance?
    false
  end

  ##
  # Returns true if the user is able to create a user
  #
  # [1] pry(main)> UserPolicy.new(user: nil).can_create?
  # => true
  def can_create?
    user.nil?
  end

  private

  def can_read_instance?
    return false unless policed.present?
    user.company_id == policed.company_id
  end
end
