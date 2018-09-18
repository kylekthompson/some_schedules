# frozen_string_literal: true

class InvitationSerializer < ApplicationSerializer
  attributes :email, :expires_at, :role
  belongs_to :invited_by

  class UserSerializer < ApplicationSerializer; end
end
