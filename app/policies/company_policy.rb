# frozen_string_literal: true

class CompanyPolicy < Policy
  ##
  # Returns an ActiveRecord::Relation scoped to what companies are visible by the current user
  #
  # [1] pry(main)> CompanyPolicy.new(current_user: User.first).scope
  # => #<ActiveRecord::Relation>
  def scope
    return Company.none unless current_user.present?
    Company.joins(:users).where(users: { id: current_user.id })
  end

  ##
  # Returns true if the current user is able to create a company
  #
  # [1] pry(main)> CompanyPolicy.new(current_user: User.new).can_create?
  # => true
  def can_create?
    current_user.present? && current_user.company.nil?
  end
end
