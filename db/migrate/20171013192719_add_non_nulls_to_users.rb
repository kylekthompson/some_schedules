class AddNonNullsToUsers < ActiveRecord::Migration[5.1]
  def change
    change_column_null(:users, :company_id, false)
    change_column_null(:users, :role, false)
  end
end
