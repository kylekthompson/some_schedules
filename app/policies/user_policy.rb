# frozen_string_literal: true

class UserPolicy < Policy
  ##
  # Returns an ActiveRecord::Relation scoped to what users are visible by the user
  #
  # [1] pry(main)> UserPolicy.new(user: User.first).scope
  # => #<ActiveRecord::Relation>
  def scope
    return User.none unless current_user.present?
    User.where(company_id: current_user.company_id)
  end

  ##
  # Returns true if the user is able to create a user
  #
  # [1] pry(main)> UserPolicy.new(current_user: nil).can_create?
  # => true
  def can_create?
    return can_create_instance? if policing_instance?
    current_user.nil? || current_user.admin?
  end

  private

  def can_create_instance?
    if current_user.present?
      current_user.admin?
    else
      !subject.admin?
    end
  end
end
