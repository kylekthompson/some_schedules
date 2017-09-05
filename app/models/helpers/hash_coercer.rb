# frozen_string_literal: true

module Helpers
  class HashCoercer
    attr_reader :ambiguous_param

    def initialize(ambiguous_param:)
      @ambiguous_param = ambiguous_param
    end

    def to_h
      case ambiguous_param
      when String
        string_to_h
      when Hash, ActionController::Parameters
        ambiguous_param
      when nil
        {}
      else
        raise ArgumentError, "Unexpected parameter: #{ambiguous_param.inspect}"
      end
    end

    private

    def string_to_h
      if ambiguous_param.present?
        Helpers::HashCoercer.new(ambiguous_param: parse_string_param).to_h
      else
        {}
      end
    end

    def parse_string_param
      JSON.parse(ambiguous_param)
    rescue JSON::ParserError
      {}
    end
  end
end
