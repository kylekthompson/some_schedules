# frozen_string_literal: true

class ApplicationSerializer < ActiveModel::Serializer
  attribute :created_at, if: -> { object.respond_to?(:created_at) }
  attribute :id, if: -> { object.respond_to?(:id) }
  attribute :updated_at, if: -> { object.respond_to?(:updated_at) }
end
