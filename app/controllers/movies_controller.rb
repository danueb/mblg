class MoviesController < ApplicationController
  def index
    @data ||= File.read('app/assets/javascripts/fake_movies.json')
    render :json => @data
  end
end
