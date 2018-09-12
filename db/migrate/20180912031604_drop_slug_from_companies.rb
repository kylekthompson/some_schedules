# frozen_string_literal: true

class DropSlugFromCompanies < ActiveRecord::Migration[5.2]
  def change
    remove_column :companies, :slug
  end
end
