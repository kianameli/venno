class CreateLedgers < ActiveRecord::Migration[6.1]
  def change
    create_table :ledgers do |t|
      t.boolean :settled

      t.timestamps
    end
  end
end
