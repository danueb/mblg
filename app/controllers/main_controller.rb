class MainController < ApplicationController
  def index
    movies ||= Movie.all
    posts ||= Post.all
    @movies ||= movies.active_model_serializer.new(movies).to_json
    @posts ||= posts.active_model_serializer.new(posts, each_serializer: SimplePostSerializer).to_json
  end
  def test
  end
end
