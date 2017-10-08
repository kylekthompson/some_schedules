# frozen_string_literal: true

module Resolvers
  class SignUp
    include ActiveModel::Validations

    validates :company_params, presence: true
    validates :user_params, presence: true
    validate :not_signed_in

    attr_accessor :company, :company_params, :current_user, :user, :user_params

    def self.call(_obj, args, ctx)
      new(args.to_h.with_indifferent_access.merge(current_user: ctx[:current_user])).to_h
    end

    def initialize(args)
      @company_params = company_params_from_args(args)
      @user_params = user_params_from_args(args)
      @current_user = args[:current_user]
    end

    def to_h
      return { errors: errors.messages } unless valid?
      sign_up_company_and_user
      return sign_up_errors if sign_up_errors.present?
      { company: company, user: user, token: token }
    end

    private

    def sign_up_company_and_user
      @company = ::Company.new(company_params)
      @user = company.users.build(user_params.merge(role: :owner))
      company.save
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

    def company_params_from_args(args)
      ActionController::Parameters.new(args.to_h).require(:company).permit(
        :name,
        :slug
      )
    end

    def user_params_from_args(args)
      ActionController::Parameters.new(args.to_h).require(:user).permit(
        :first_name,
        :last_name,
        :email,
        :password,
        :password_confirmation
      )
    end
  end
end
