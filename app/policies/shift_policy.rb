# frozen_string_literal: true

class ShiftPolicy < Policy
  ##
  # Returns an ActiveRecord::Relation scoped to what shifts are visible by the current user
  #
  # [1] pry(main)> ShiftPolicy.new(current_user: User.first).scope
  # => #<ActiveRecord::Relation>
  def scope
    return Shift.none unless current_user.present?
    return Shift.all if current_user.admin?
    non_admin_scope
  end

  private

  def non_admin_scope
    shift_scope = Shift.for_company_id(current_user.company_id)
    shift_scope = shift_scope.where(published: true) if current_user.employee?
    shift_scope
  end
end
