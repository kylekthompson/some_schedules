# frozen_string_literal: true

module Batch
  class RecordLoader < GraphQL::Batch::Loader
    attr_reader :lookup_column, :lookup_column_type, :scope_proc, :model, :user

    def initialize(model, user:, lookup_column: model.primary_key, scope_proc: ->(scope) { scope })
      @model = model
      @lookup_column = lookup_column.to_s
      @lookup_column_type = model.type_for_attribute(@lookup_column)
      @scope_proc = scope_proc
      @user = user
    end

    ##
    # Casts the passed key into the correct type for the lookup column
    def load(key)
      super(lookup_column_type.cast(key))
    end

    ##
    # Finds and fulfills the values requested
    def perform(keys)
      lookup(keys).each { |record| fulfill(record.public_send(lookup_column), record) }
      keys.each { |key| fulfill(key, nil) unless fulfilled?(key) }
    end

    private

    def lookup(keys)
      scope = Policy.scope(current_user: user, subject: model)
      scope = scope_proc.call(scope)
      scope.where(lookup_column => keys)
    end
  end
end
