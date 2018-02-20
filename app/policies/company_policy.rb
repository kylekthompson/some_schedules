# frozen_string_literal: true

class CompanyPolicy < Policy
  def scope
    return Company.none unless current_user.present?
    return Company.all if current_user.admin?
    Company.joins(:users).where(users: { id: current_user.id })
  end

  def can_create?
    current_user.present? && current_user.company.nil?
  end
end
