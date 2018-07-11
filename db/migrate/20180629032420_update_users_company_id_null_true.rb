# frozen_string_literal: true

class UpdateUsersCompanyIdNullTrue < ActiveRecord::Migration[5.2]
  def change
    change_column_null :users, :company_id, true
  end
end
