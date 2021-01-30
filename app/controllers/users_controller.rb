class UsersController < ApplicationController

  def index
    users = User.all.as_json(only: %i[id name])
    puts users
    render status: :ok, json: { users: users }
  end

  def create
  end

  def update
  end

  def destroy
  end

  private

end
