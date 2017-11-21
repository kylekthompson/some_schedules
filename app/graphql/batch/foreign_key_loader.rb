# frozen_string_literal: true

module Batch
  class ForeignKeyLoader < GraphQL::Batch::Loader
    attr_reader :foreign_key, :model, :records, :user

    def initialize(model, foreign_key, user:)
      @foreign_key = foreign_key
      @model = model
      @records = nil
      @user = user
    end

    ##
    # Normalizes the values being loaded into an Array
    def load(values)
      super(Array(values))
    end

    ##
    # Finds and fulfills the values requested
    def perform(value_sets)
      lookup(value_sets)
      value_sets.each { |values| fulfill(values, records_for_foreign_values(values)) }
    end

    private

    def records_for_foreign_values(values)
      records.select { |record| values.include?(record.send(foreign_key)) }
    end

    def lookup(value_sets)
      @records = Policy.scope(current_user: user, subject: model)
      @records = @records.where(foreign_key => value_sets.flatten.uniq)
    end
  end
end
