class AddApprovedToTransactions < ActiveRecord::Migration[6.1]
  def change
    add_column :transactions, :approved, :boolean, default: false
  end
end
