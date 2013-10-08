class PostsController < ApplicationController
  def index
    @data ||= Post.all
    render :json => @data, each_serializer: SimplePostSerializer
  end

  def show
    @data ||= Post.find(params[:id])
    render :json => @data, root: false
  end

end
