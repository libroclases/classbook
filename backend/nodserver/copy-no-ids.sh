for file in ./csv/*.csv; do
    name=${file##*/}
    cut --complement -f 1 -d "|" "$file" > ./csv/csv-no-id/"$name"
    truncate -s -1 ./csv/csv-no-id/"$name"
done