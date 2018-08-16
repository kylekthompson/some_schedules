# frozen_string_literal: true

module Accounts
  module Invitations
    class CreationService < Core::Service
      def self.create(invited_by:, **params)
        raise API::Errors::NotAuthorizedError unless invited_by.managerial? && invited_by.company.present?

        Invitation.create(params.merge(invited_by: invited_by))
      end
    end
  end
end
