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
      Movie.find(i+1).create_post(content: content)
    end
  end
end