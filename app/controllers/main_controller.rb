class MainController < ApplicationController
  def index
    @movies ||= File.read('app/assets/javascripts/fake_movies.json')
    @posts ||= File.read('app/assets/javascripts/fake_posts.json')
  end
  def test
  end
end
