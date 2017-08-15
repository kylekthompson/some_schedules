class CreateCompanyUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :company_users do |t|
      t.references :company, foreign_key: true, null: false
      t.references :user, foreign_key: true, null: false
      t.integer :role, null: false

      t.timestamps
    end
  end
end
