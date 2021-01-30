class UsersController < ApplicationController

  def index
    users = User.all.as_json(only: %i[id name])
    puts users
    render status: :ok, json: { users: users }
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render status: :ok, json: { notice: 'Account created successfully!' }
    else
      render status: :unprocessable_entity, json: {
        errors: @user.errors.full_messages.to_sentence
      }
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
