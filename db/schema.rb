# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_11_03_161308) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ledgers", force: :cascade do |t|
    t.boolean "settled"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user1_id"
    t.bigint "user2_id"
    t.index ["user1_id"], name: "index_ledgers_on_user1_id"
    t.index ["user2_id"], name: "index_ledgers_on_user2_id"
  end

  create_table "transactions", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.decimal "amount"
    t.string "reason"
    t.bigint "originator_id"
    t.bigint "payer_id"
    t.bigint "payee_id"
    t.bigint "ledger_id", null: false
    t.index ["ledger_id"], name: "index_transactions_on_ledger_id"
    t.index ["originator_id"], name: "index_transactions_on_originator_id"
    t.index ["payee_id"], name: "index_transactions_on_payee_id"
    t.index ["payer_id"], name: "index_transactions_on_payer_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.decimal "balance"
  end

  add_foreign_key "ledgers", "users", column: "user1_id"
  add_foreign_key "ledgers", "users", column: "user2_id"
  add_foreign_key "transactions", "ledgers"
  add_foreign_key "transactions", "users", column: "originator_id"
  add_foreign_key "transactions", "users", column: "payee_id"
  add_foreign_key "transactions", "users", column: "payer_id"
end
