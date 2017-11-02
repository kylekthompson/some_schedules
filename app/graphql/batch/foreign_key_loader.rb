# frozen_string_literal: true

module Batch
  class ForeignKeyLoader < GraphQL::Batch::Loader
    attr_reader :foreign_key, :model, :records

    def initialize(model, foreign_key)
      @foreign_key = foreign_key
      @model = model
      @records = nil
    end

    def load(values)
      super(Array(values))
    end

    def perform(value_sets)
      lookup(value_sets)
      value_sets.each { |values| fulfill(values, records_for_foreign_values(values)) }
    end

    private

    def records_for_foreign_values(values)
      records.select { |record| values.include?(record.send(foreign_key)) }
    end

    def lookup(value_sets)
      @records ||= model.where(foreign_key => value_sets.flatten.uniq).to_a
    end
  end
end
