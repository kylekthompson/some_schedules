# frozen_string_literal: true

module Fields
  module User
    module TokenField
      def self.field
        GraphQL::Field.define do
          name 'token'
          description 'A JWT for the user to authenticate with'
          type types.String
          argument :password, types.String, 'The password of the user'
          resolve Resolvers::User::Token
        end
      end
    end
  end
end
