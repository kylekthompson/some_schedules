# frozen_string_literal: true

class Policy
  UnableToScopeError = Class.new(StandardError)
  WrongPolicyError = Class.new(StandardError)
  CLASS_SUFFIX = 'Policy'

  attr_reader :current_user, :subject

  def initialize(current_user:, subject: nil)
    @current_user = current_user
    @subject = subject
    raise WrongPolicyError, wrong_policy_message unless correct_policy?
  end

  def scope
    raise UnableToScopeError unless model_class.ancestors.include?(ApplicationRecord)
    model_class.all
  end

  protected

  def subject_is_instance?
    subject.is_a?(model_class)
  end

  def subject_is_class?
    subject == model_class
  end

  private

  def correct_policy?
    subject.is_a?(Symbol)   ||
      subject.is_a?(String) ||
      subject.nil?          ||
      subject_is_class?     ||
      subject_is_instance?
  end

  def wrong_policy_message
    <<~WRONG_POLICY_MESSAGE
      \nError in #{self.class}:
      \tExpected `subject` to be an instance of #{model_class} or to be #{model_class}.
      \tIf you would prefer to use the same value for `subject`, please use a different policy.
    WRONG_POLICY_MESSAGE
  end

  def model_class
    Class.const_get(self.class.to_s.chomp(CLASS_SUFFIX))
  end

  class << self
    def for(current_user:, subject:)
      policy_class_for(subject).new(current_user: current_user, subject: subject)
    end

    def scope(current_user:, subject:)
      self.for(current_user: current_user, subject: subject).scope
    end

    private

    def policy_class_for(subject)
      Class.const_get("#{class_string_for(subject)}#{CLASS_SUFFIX}")
    end

    def class_string_for(subject)
      case subject
      when Class
        subject.to_s
      when Symbol, String
        subject.to_s.camelize
      else
        subject.class.to_s
      end
    end
  end
end
