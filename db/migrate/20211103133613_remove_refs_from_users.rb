class RemoveRefsFromUsers < ActiveRecord::Migration[6.1]
  def change
    remove_reference :transactions, :originator_id, null: false, foreign_key: {to_table: :users}
    remove_reference :transactions, :payer_id, null: false, foreign_key: {to_table: :users}
    remove_reference :transactions, :payee_id, null: false, foreign_key: {to_table: :users}
    add_reference :transactions, :originator, foreign_key: {to_table: :users}
    add_reference :transactions, :payer, foreign_key: {to_table: :users}
    add_reference :transactions, :payee, foreign_key: {to_table: :users}
  end
end
