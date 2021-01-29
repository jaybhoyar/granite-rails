class ApplicationController < ActionController::Base
  before_filter :activate_profiler
  def activate_profiler
    ENV['RACK_MINI_PROFILER'] = 'on' if params['pp']
    ENV['RACK_MINI_PROFILER'] = 'off' if params['pp'] == 'disabled'
  end
end
