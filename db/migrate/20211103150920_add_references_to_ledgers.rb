class AddReferencesToLedgers < ActiveRecord::Migration[6.1]
  def change
    add_reference :transactions, :user1, foreign_key: {to_table: :users}
    add_reference :transactions, :user2, foreign_key: {to_table: :users}
  end
end
