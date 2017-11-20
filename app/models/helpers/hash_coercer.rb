# frozen_string_literal: true

module Helpers
  class HashCoercer
    attr_reader :ambiguous_param

    def initialize(ambiguous_param:)
      @ambiguous_param = ambiguous_param
    end

    ##
    # Coerces an ambiguous parameter into a hash-like
    #
    # [1] pry(main)> HashCoercer.new(ambiguous_param: {}).to_h
    # => {}
    # [2] pry(main)> HashCoercer.new(ambiguous_param: '\"{}\"').to_h
    # => {}
    # [3] pry(main)> HashCoercer.new(ambiguous_param: ActionController::Parameters.new).to_h
    # => #<ActionController::Parameters>
    # [4] pry(main)> HashCoercer.new(ambiguous_param: 0).to_h
    # => ArgumentError: Unexpected parameter: 0
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
