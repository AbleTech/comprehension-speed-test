env_name = ENV['APP_ENV'] || 'development'
require "config/environments/#{env_name}"
require 'helpers/asset_helpers'
require 'uglifier'

###
# Page options, layouts, aliases and proxies
###

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

set :env_name, env_name

set :font_dir, 'fonts'
set :css_dir, 'css'
set :js_dir, 'js'
set :images_dir, 'img'

set :url_root, ApplicationConfig::BASE_URL

activate :gzip

sprockets.append_path File.join root, 'source', '_bower'
sprockets.import_asset 'angular/angular.js'
sprockets.import_asset 'angular-ui-router/release/angular-ui-router.js'
sprockets.append_path File.join root, 'source', 'img'

activate :autoprefixer do |config|
  config.browsers = ['last 2 versions', 'Explorer >= 9']
  config.cascade  = false
end

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript
  set :js_compressor, Uglifier.new(:mangle => false)

  # Enable cache buster
  activate :asset_hash, :ignore => [/touch-icon/]

  activate :minify_html do |html|
    # html.remove_multi_spaces        = true
    # html.remove_comments            = true
    html.remove_quotes              = false
    # html.simple_doctype             = false
    # html.remove_script_attributes   = true
    # html.remove_style_attributes    = true
    # html.remove_link_attributes     = true
    # html.remove_form_attributes     = false
    # html.remove_javascript_protocol = true
    # html.remove_https_protocol      = false
    # html.simple_boolean_attributes  = true
    html.remove_http_protocol    = false
    html.remove_input_attributes = false
    # html.remove_intertag_spaces  = true
    # html.preserve_line_breaks    = true
  end
end

test_mode = Object.const_defined?(:RSpec)

if !test_mode && ApplicationConfig.const_defined?(:S3)
  activate :s3_sync do |s3_sync|
    s3_sync.bucket                     = ApplicationConfig::S3::BUCKET # The name of the S3 bucket you are targeting. This is globally unique.
    s3_sync.region                     = 'ap-southeast-2'     # The AWS region for your bucket.
    s3_sync.aws_access_key_id          = ApplicationConfig::S3::ACCESS_ID
    s3_sync.aws_secret_access_key      = ApplicationConfig::S3::SECRET_KEY
    s3_sync.delete                     = false # We delete stray files by default.
    s3_sync.after_build                = false # We do not chain after the build step by default.
    s3_sync.prefer_gzip                = true
    s3_sync.path_style                 = true
    s3_sync.reduced_redundancy_storage = false
    s3_sync.acl                        = 'public-read'
    s3_sync.encryption                 = false
  end

  caching_policy 'text/css',               max_age: (60 * 60 * 24 * 365), public: true
  caching_policy 'application/javascript', max_age: (60 * 60 * 24 * 365), public: true
  caching_policy 'image/gif',              max_age: (60 * 60 * 24 * 365), public: true
  caching_policy 'image/png',              max_age: (60 * 60 * 24 * 365), public: true
  caching_policy 'image/jpeg',             max_age: (60 * 60 * 24 * 365), public: true
  caching_policy 'image/x-icon',           max_age: (60 * 60 * 24 * 365), public: true
  caching_policy 'text/x-component',       max_age: (60 * 60 * 24 * 365), public: true
end