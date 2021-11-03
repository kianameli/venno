class AddColumnsToTransactions < ActiveRecord::Migration[6.1]
  def change
    add_reference :transactions, :originator_id, foreign_key: {to_table: :users}
    add_reference :transactions, :payer_id, foreign_key: {to_table: :users}
    add_reference :transactions, :payee_id, foreign_key: {to_table: :users}
    add_column :transactions, :amount, :decimal
    add_column :transactions, :reason, :string
  end
end
