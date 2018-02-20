# frozen_string_literal: true

module Resolvers
  class SignUp
    COMPANY_AUTHORIZATION_ERROR_MESSAGE = 'Not authorized to create a company with those parameters'
    USER_AUTHORIZATION_ERROR_MESSAGE = 'Not authorized to create a user with those parameters'

    include ActiveModel::Validations

    validates :company_params, presence: true
    validates :user_params, presence: true
    validate :not_signed_in

    attr_accessor :company, :company_params, :current_user, :user, :user_params

    def self.call(_object, arguments, context)
      new(arguments.to_h.with_indifferent_access.merge(current_user: context[:current_user])).to_h
    end

    def initialize(arguments)
      @company_params = company_params_from_arguments(arguments)
      @user_params = user_params_from_arguments(arguments)
      @current_user = arguments[:current_user]
    end

    def to_h
      return { errors: errors.messages } unless valid?
      set_company_and_user
      return sign_up_errors if sign_up_errors.present?
      save_company_and_user
      { company: company, user: user, token: token }
    end

    private

    def set_company_and_user
      sign_up_user!
      sign_up_company!
    end

    def sign_up_user!
      @user = ::User.new(user_params.merge(role: :owner))

      raise GraphQL::ExecutionError, USER_AUTHORIZATION_ERROR_MESSAGE unless Policy.for(
        current_user: current_user,
        subject: user
      ).can_create?
    end

    def sign_up_company!
      @company = ::Company.new(company_params)

      raise GraphQL::ExecutionError, COMPANY_AUTHORIZATION_ERROR_MESSAGE unless Policy.for(
        current_user: current_user || user,
        subject: company
      ).can_create?

      user.company = company
    end

    def save_company_and_user
      user.save
    end

    def token
      Knock::AuthToken.new(payload: user.to_token_payload).token
    end

    def sign_up_errors
      return nil if company.valid? && user.valid?
      {
        company_errors: company.errors.messages,
        user_errors: user.errors.messages
      }.reject { |_key, val| val.empty? }
    end

    def not_signed_in
      errors.add(:user, 'must not be signed in') if current_user.present?
    end

    def company_params_from_arguments(arguments)
      ActionController::Parameters.new(arguments.to_h).require(:company).permit(
        :name,
        :slug
      )
    end

    def user_params_from_arguments(arguments)
      ActionController::Parameters.new(arguments.to_h).require(:user).permit(
        :first_name,
        :last_name,
        :email,
        :password,
        :password_confirmation
      )
    end
  end
end
