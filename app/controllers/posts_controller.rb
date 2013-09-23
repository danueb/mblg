class PostsController < ApplicationController
  def index
    @data ||= File.read('app/assets/javascripts/fake_posts.json')
    render :json => @data
  end
end
