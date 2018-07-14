# frozen_string_literal: true

module Helpers
  module EmailFormatter
    FORMAT = {
      with: /\A.+@.+\..+\z/,
      message: "must be an email address",
    }.freeze

    def self.before_validation(object)
      object.email.downcase! if object.email.present?
    end
  end
end
