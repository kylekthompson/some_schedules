# frozen_string_literal: true

module API
  module Serialization
    def serialized(instance)
      "#{instance.class}Serializer".constantize.new(instance).to_h
    rescue NameError => e
      raise e unless e.class == NameError
      instance
    end
  end
end
