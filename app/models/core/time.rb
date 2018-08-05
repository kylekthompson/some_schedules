# frozen_string_literal: true

module Core
  class Time
    attr_reader :raw_time

    delegate_missing_to :coerced_time
    delegate :blank?, :present?, :presence, to: :coerced_time

    def initialize(raw_time)
      @raw_time = raw_time
    end

    private

    def coerced_time
      @coerced_time ||= coerce_time
    end

    def coerce_time
      return raw_time if raw_time.is_a?(::Time)
      ::Time.parse(raw_time.to_s)
    rescue ArgumentError
      nil
    end
  end
end
