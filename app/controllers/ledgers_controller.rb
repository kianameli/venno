class LedgersController < ApplicationController
  before_action :set_ledger, only: [:show, :update, :destroy]

  # GET /ledgers
  def index
    @ledgers = Ledger.all

    render json: @ledgers
  end

  # GET /ledgers/1
  def show
    render json: @ledger
  end

  # POST /ledgers
  def create
    @ledger = Ledger.new(ledger_params)

    if @ledger.save
      render json: @ledger, status: :created, location: @ledger
    else
      render json: @ledger.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /ledgers/1
  def update
    if @ledger.update_attribute(:settled, true)
      render json: @ledger
    else
      render json: @ledger.errors, status: :unprocessable_entity
    end
  end

  # DELETE /ledgers/1
  def destroy
    @ledger.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ledger
      @ledger = Ledger.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def ledger_params
      params.require(:ledger).permit(:user1_id, :user2_id, :settled)
    end
end
