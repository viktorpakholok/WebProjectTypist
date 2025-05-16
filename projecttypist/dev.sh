json_log_path="json-server.log"
if [ -f $json_log_path ]
then
    rm $json_log_path
fi

touch $json_log_path
npm run json-server <$json_log_path &>$json_log_path &
vite
