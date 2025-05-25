class TasksController < ApplicationController
    before_action :authenticate_user!
  
    def index
        @date = params[:date] ? Date.parse(params[:date]) : Date.current
        start_date = @date.beginning_of_month
        end_date = @date.end_of_month
        @tasks = Task.where(start_time: start_date..end_date)
        @days = (@date.beginning_of_month.beginning_of_week(:monday)..@date.end_of_month.end_of_week(:sunday)).to_a
      end
      
  
    def create
        day = params[:task][:day] # "2025-05-24"
        start_time_str = params[:task][:start_time] # "09:00"
        end_time_str = params[:task][:end_time] # "10:00"
      
        start_time = Time.zone.parse("#{day} #{start_time_str}")
        end_time = Time.zone.parse("#{day} #{end_time_str}")
      
        @task = current_user.tasks.new(task_params.except(:day, :start_time, :end_time))
        @task.start_time = start_time
        @task.end_time = end_time
      
        if @task.save
          redirect_to tasks_path(date: @task.start_time.to_date), notice: "Zadanie dodane pomyślnie."
        else
          redirect_to tasks_path(date: @task.start_time.to_date), alert: "Nie udało się dodać zadania."
        end
      end
      
      private
      def task_params
        params.require(:task).permit(:title, :importance, :description)
      end
  end
  