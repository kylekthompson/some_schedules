# frozen_string_literal: true

class UserPolicy < Policy
  def scope
    return User.none unless current_user.present?
    return User.all if current_user.admin?
    User.where(company_id: current_user.company_id)
  end

  def can_create?
    return can_create_instance? if subject_is_instance?
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
