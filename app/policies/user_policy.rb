# frozen_string_literal: true

class UserPolicy < Policy
  def read?
    return read_instance? if policing_instance?
    false
  end

  def create?
    user.nil?
  end

  private

  def read_instance?
    return false unless policed.present?
    user.company_id == policed.company_id
  end
end
