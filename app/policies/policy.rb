# frozen_string_literal: true

class Policy
  UnableToScopeError = Class.new(StandardError)
  WrongPolicyError = Class.new(StandardError)
  CLASS_SUFFIX = 'Policy'

  attr_reader :current_user, :subject

  ##
  # Returns an instance of a policy and checks to make sure that the correct policy was chosen
  #
  # Parameters:
  #   current_user: the current user of the application
  #   subject: the value for which the current user is requesting access
  #
  # [1] pry(main)> Policy.new(current_user: User.first)
  # => #<Policy>
  def initialize(current_user:, subject: nil)
    @current_user = current_user
    @subject = subject
    raise WrongPolicyError, wrong_policy_message unless correct_policy?
  end

  ##
  # Returns an ActiveRecord::Relation scoped to what the user has permission to interact with
  #
  # Requires that the subject is an ActiveRecord model
  #
  # [1] pry(main)> UserPolicy.new(current_user: User.first).scope
  # => #<ActiveRecord::Relation>
  def scope
    raise UnableToScopeError unless model_class.ancestors.include?(ApplicationRecord)
    model_class.all
  end

  protected

  ##
  # Returns true if the subject is an instance of the policy's model class
  #
  # [1] pry(main)> UserPolicy.new(current_user: User.first, subject: User.first).send(:policing_instance?)
  # => true
  def policing_instance?
    subject.is_a?(model_class)
  end

  ##
  # Returns true if the subject is the policy's model class
  #
  # [1] pry(main)> UserPolicy.new(current_user: User.first, subject: User).send(:policing_class?)
  # => true
  def policing_class?
    subject == model_class
  end

  private

  def correct_policy?
    subject.is_a?(Symbol)   ||
      subject.is_a?(String) ||
      subject.nil?          ||
      policing_class?       ||
      policing_instance?
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
    ##
    # Returns the correct policy class for a given user and subject
    #
    # [1] pry(main)> Policy.for(current_user: User.first, subject: User)
    # => #<UserPolicy>
    def for(current_user:, subject:)
      policy_class_for(subject).new(current_user: current_user, subject: subject)
    end

    ##
    # Returns the correct scope for a given user and subject
    #
    # [1] pry(main)> Policy.scope(current_user: User.first, subject: User)
    # => #<ActiveRecord::Relation>
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
