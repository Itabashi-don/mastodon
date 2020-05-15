# frozen_string_literal: true

namespace :mastodon do
  namespace :unleakable do
    desc 'Count up statuses needed to be replaced'
    task :count => :environment do
      pre_unleakable_count = Status.where(visibility: 3).count
      pre_direct_count = Status.where(visibility: 4).count
    
      puts "Unleakable: #{pre_unleakable_count}, Direct: #{pre_direct_count}"
      puts "All: #{pre_unleakable_count + pre_direct_count}"
    end
  
    desc 'Replace visibility ids between Limited and Unleakable'
    task :replace => :environment do
      puts 'Start to replace visibilities...'
    
      Status.where(visibility: 3).update_all(visibility: 5) # 3 -> 5
      Status.where(visibility: 4).update_all(visibility: 3) # 4 -> 3
    end
  end
end