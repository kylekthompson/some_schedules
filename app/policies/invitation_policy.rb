# frozen_string_literal: true

class InvitationPolicy < Policy
  ##
  # Returns an ActiveRecord::Relation scoped to what invitations are visible by the current user
  #
  # [1] pry(main)> InvitationPolicy.new(current_user: User.first).scope
  # => #<ActiveRecord::Relation>
  def scope
    return Invitation.none unless current_user.present?
    return Invitation.all if current_user.admin?
    return Invitation.none if current_user.employee?
    Invitation.joins(user: :company).where(users: { companies: { id: current_user.company_id } })
  end

  ##
  # Returns true if the user is able to create an invitation
  #
  # [1] pry(main)> InvitationPolicy.new(current_user: nil).can_create?
  # => false
  def can_create?
    return false if current_user.nil?
    return can_create_instance? if subject_is_instance?
    false
  end

  private

  def can_create_instance?
    return true if current_user.admin?
    return false if current_user.employee?
    subject.user == current_user
  end
end
