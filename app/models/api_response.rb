# frozen_string_literal: true

class APIResponse
  attr_reader :errors, :status, :value

  BadStatusError = Class.new(StandardError)

  def initialize(status:, errors: [], value: nil)
    raise BadStatusError, 'status must be an http status symbol' unless valid_status?(status)

    @errors = errors
    @status = status_symbol_to_i(status)
    @value = value
  end

  def success?
    status >= 200 && status < 400
  end

  def failure?
    status >= 400
  end

  private

  def valid_status?(status)
    Rack::Utils::SYMBOL_TO_STATUS_CODE.keys.include?(status)
  end

  def status_symbol_to_i(status)
    Rack::Utils::SYMBOL_TO_STATUS_CODE[status]
  end
end
