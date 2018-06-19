# frozen_string_literal: true

class ShiftPolicy < Policy
  def scope
    return Shift.none unless current_user.present?
    return Shift.all if current_user.admin?
    non_admin_scope
  end

  def can_create?
    return false if current_user.nil?
    return can_create_instance? if subject_is_instance?
    false
  end

  private

  def can_create_instance?
    return true if current_user.admin?
    return false if current_user.employee?
    current_user.company == subject.company
  end

  def non_admin_scope
    shift_scope = Shift.for_company_id(current_user.company_id)
    shift_scope = shift_scope.where(published: true) if current_user.employee?
    shift_scope
  end
end
