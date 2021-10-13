echo "saving config"

cp .git/config config

echo "getting origin"

node bin/getorigin.js

echo "exporting"

. bin/exportorigin.sh

echo "removing exports script"

rm bin/exportorigin.sh

echo "determined remote origin url"

echo $GIT_REMOTE_ORIGIN_URL

echo "setting git user $GIT_USER_EMAIL $GIT_USER_NAME"

git config --global user.email $GIT_USER_EMAIL
git config --global user.name $GIT_USER_NAME

echo "removing .git"

rm -rf .git

echo "init repo"

git init

echo "setting remote origin"

git remote add origin $GIT_PUSH_URL

echo "creating main branch"

git checkout -b main

echo "adding files to commit"

git add .

echo "removing config from commit"

git reset HEAD -- config

echo "making initial commit"

git commit -m "Initial commit"

echo "pusing to remote"

git push --set-upstream --force origin main

echo "done"

echo "restoring original config"

mv config .git/config