class MoviesController < ApplicationController
  def index
    @data ||= Movie.all
    render :json => @data
  end
end
