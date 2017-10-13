class AddShifts < ActiveRecord::Migration[5.1]
  def change
    create_table :shifts do |t|
      t.datetime :end_time, null: false
      t.datetime :start_time, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
