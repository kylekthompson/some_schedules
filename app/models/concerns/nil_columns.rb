# frozen_string_literal: true

module NilColumns
  extend ActiveSupport::Concern

  class_methods do
    def define_nil_columns_for(klass)
      klass.columns.each do |column|
        define_method column.name do
          nil
        end
      end
    end
  end
end
