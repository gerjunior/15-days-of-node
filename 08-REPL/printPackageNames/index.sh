FOLDER_AMOUNT=4
for index in $(seq 1 $FOLDER_AMOUNT); do

folder=$([ $index -ge 3 ] && echo bash-0$index || echo shell-0$index)
mkdir -p $folder 

cd $(pwd)/$folder
npm init -y --scope @gerjunior --silent > /dev/null
cat package.json | jq  '{n: .name, v: .version}'
cd ..

done

rm -rf bash* shell*