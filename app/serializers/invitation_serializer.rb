# frozen_string_literal: true

class InvitationSerializer < ApplicationSerializer
  attributes :email, :expires_at, :id
  belongs_to :invited_by

  class UserSerializer < ApplicationSerializer; end
end
