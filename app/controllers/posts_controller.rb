class PostsController < ApplicationController
  http_basic_authenticate_with name: ENV['username'], password: ENV['password'], except: [:index, :show]

  def index
    @data ||= Post.all
    render :json => @data, each_serializer: SimplePostSerializer
  end

  def show
    @data ||= Post.find(params[:id])
    render :json => @data, root: false
  end

  def new
    @movies = Movie.all
    @movies.delete_if do |movie|
      movie.post != nil
    end
    @post = Post.new
  end

  def create
    @movie = Movie.find(params[:movie][:id])
    @post = @movie.create_post(content: params[:post][:content])
    if @post.save
      redirect_to '/'
    else
      render 'new'
    end
  end
end
