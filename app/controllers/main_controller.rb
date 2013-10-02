class MainController < ApplicationController
  def index
    @movies ||= Movie.all.to_json
    @posts ||= File.read('app/assets/javascripts/fake_posts.json')
  end
  def test
  end
end
