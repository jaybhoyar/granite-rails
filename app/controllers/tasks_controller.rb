class TasksController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    tasks = Task.all
    render status: :ok, json: { tasks: tasks }
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      render status: :ok, json: { notice: 'Task was successfully created' }
    else
      errors = @task.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors  }
    end
  end

  def show
    task = Task.find(params[:id])
    render status: :ok, json: { task: task }
    rescue ActiveRecord::RecordNotFound => errors
      render json: {errors: errors}, status: :not_found
  end

  private
  def task_params
    params.require(:task).permit(:title)
  end

end
