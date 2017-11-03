# frozen_string_literal: true

module Batch
  class RecordLoader < GraphQL::Batch::Loader
    attr_reader :lookup_column, :lookup_column_type, :merge, :model

    def initialize(model, lookup_column: model.primary_key, merge: nil)
      @model = model
      @lookup_column = lookup_column.to_s
      @lookup_column_type = model.type_for_attribute(@lookup_column)
      @merge = merge
    end

    def load(key)
      super(lookup_column_type.cast(key))
    end

    def perform(keys)
      lookup(keys).each { |record| fulfill(record.public_send(lookup_column), record) }
      keys.each { |key| fulfill(key, nil) unless fulfilled?(key) }
    end

    private

    def lookup(keys)
      scope = model.all
      scope = scope.merge(merge) if merge.present?
      scope.where(lookup_column => keys)
    end
  end
end
