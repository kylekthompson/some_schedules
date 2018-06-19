# frozen_string_literal: true

class CompanyPolicy < Policy
  def scope
    return Company.none unless current_user.present?
    return Company.all if current_user.admin?
    Company.joins(:users).where(users: { id: current_user.id })
  end

  def can_create?
    no_user = current_user.nil?
    is_user_without_company = current_user.present? && current_user.company.nil?
    is_admin_user = current_user&.admin?

    no_user || is_user_without_company || is_admin_user
  end
end
