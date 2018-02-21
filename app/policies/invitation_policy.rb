# frozen_string_literal: true

class InvitationPolicy < Policy
  def scope
    return Invitation.none unless current_user.present?
    return Invitation.all if current_user.admin?
    return Invitation.none if current_user.employee?
    Invitation.joins(user: :company).where(users: { companies: { id: current_user.company_id } })
  end

  def can_invite?
    return false if current_user.nil?
    return can_invite_instance? if subject_is_instance?
    false
  end

  private

  def can_invite_instance?
    return true if current_user.admin?
    return false if current_user.employee?
    subject.user == current_user
  end
end
