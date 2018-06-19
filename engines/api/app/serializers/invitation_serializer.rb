# frozen_string_literal: true

class InvitationSerializer < ApplicationSerializer
  attributes :email, :expires_at, :id
  belongs_to :user

  class UserSerializer < ApplicationSerializer; end
end
