# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Ledger.destroy_all
Transaction.destroy_all

@user1 = User.create!(username: 'test1', password: '123456', email: 'test1@email.com')
@user2 = User.create!(username: 'test2', password: '123456', email: 'test2@email.com')
@user3 = User.create!(username: 'test3', password: '123456', email: 'test3@email.com')
puts "#{User.count} users created"

@ledger1 = Ledger.create!(user1: @user1, user2: @user2, settled: false)
@ledger2 = Ledger.create!(user1: @user1, user2: @user3, settled: false)
puts "#{Ledger.count} ledgers created"

@txn1 = Transaction.create!(ledger: @ledger1, originator: @user1, payer: @user1, payee: @user2, amount: 11.11, reason: "test txn 1", approved: true)
@txn2 = Transaction.create!(ledger: @ledger1, originator: @user1, payer: @user1, payee: @user2, amount: 22.22, reason: "test txn 2", approved: true)
@txn3 = Transaction.create!(ledger: @ledger2, originator: @user1, payer: @user1, payee: @user3, amount: 33.33, reason: "test txn 3", approved: true)
puts "#{Transaction.count} txns created"




