class Transaction < ApplicationRecord
  belongs_to :originator, class_name: 'User', foreign_key: 'originator_id'
  belongs_to :payer, class_name: 'User', foreign_key: 'payer_id'
  belongs_to :payee, class_name: 'User', foreign_key: 'payee_id'
  belongs_to :ledger, foreign_key: "ledger_id"

  validates :amount, presence: true, numericality: {greater_than: 0}
  validates :reason, presence: true, length: {within: 5..255, message: "Reason should be 5 to 255 characters long"}
end
