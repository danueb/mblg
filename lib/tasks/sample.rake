namespace :sample do
  desc "Create sample posts for mblg"
  task :generate => :environment do
    Post.destroy_all

    12.times do |i|
      content = Faker::Lorem
                  .paragraphs(12)
                  .map{ |text| "<p>" + text + "</p>" }
                  .join
                  .html_safe
      Post.create!(movie: Movie.find(i+1),
                   content: content)
    end
  end
end