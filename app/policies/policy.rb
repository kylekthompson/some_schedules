# frozen_string_literal: true

class Policy
  UnableToScopeError = Class.new(StandardError)
  WrongPolicyError = Class.new(StandardError)
  CLASS_SUFFIX = 'Policy'

  attr_reader :user, :policed

  def initialize(user:, policed: nil)
    @user = user
    @policed = policed
    raise WrongPolicyError, wrong_policy_message unless correct_policy?
  end

  def scope
    raise UnableToScopeError unless model_class.ancestors.include?(ApplicationRecord)
    model_class.all
  end

  protected

  def policing_instance?
    policed.is_a?(model_class)
  end

  def policing_class?
    policed == model_class
  end

  private

  def correct_policy?
    policed.is_a?(Symbol)   ||
      policed.is_a?(String) ||
      policed.nil?          ||
      policing_class?       ||
      policing_instance?
  end

  def wrong_policy_message
    <<~WRONG_POLICY_MESSAGE
      \nError in #{self.class}:
      \tExpected `policed` to be an instance of #{model_class} or to be #{model_class}.
      \tIf you would prefer to use the same value for `policed`, please use a different policy.
    WRONG_POLICY_MESSAGE
  end

  def model_class
    Class.const_get(self.class.to_s.chomp(CLASS_SUFFIX))
  end

  class << self
    def for(user:, policed:)
      policy_class_for(policed).new(user: user, policed: policed)
    end

    def scope(user:, policed:)
      self.for(user: user, policed: policed).scope
    end

    private

    def policy_class_for(policed)
      Class.const_get("#{class_string_for(policed)}#{CLASS_SUFFIX}")
    end

    def class_string_for(policed)
      case policed
      when Class
        policed.to_s
      when Symbol, String
        policed.to_s.camelize
      else
        policed.class.to_s
      end
    end
  end
end
