fx_version 'cerulean'
games { 'gta5' }

author 'ONEDev Studio'
version '1.0.0'

ui_page 'ui/index.html'

client_scripts {
    'client/*.lua'
}

server_scripts {
    'server/*.lua',
    '@oxmysql/lib/MySQL.lua',
}

files {
    'ui/*.html'
}