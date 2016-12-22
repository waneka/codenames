# Script to deploy application to Heroku's .
#

# Usage:
#  - ./deploy <-- deploys local master
#  - ./deploy BRANCH_NAME <- deploys specified branch.
if [[ $1 && $1 == '--help' ]]; then
  echo 'Usage: ./deploy OPTIONAL_BRANCH_NAME'
  exit -1
fi

branch_to_deploy=${1:-master}

echo "checking out to tmp branch"
git checkout -B tmp

echo "resetting to ${branch_to_deploy}"
git reset --hard $branch_to_deploy\

echo "cleaning up old remote"
git remote remove heroku >/dev/null 2>&1

echo "adding heroku remote"
git remote add heroku https://git.heroku.com/codenamed.git

echo "compiling assets and html"
npm run build

echo "tracking compiled assets in git for deployment"
git mv web/templates/page/.gitignore web/templates/page/.dont-ignore
git add web/templates/page/show.html.eex

git mv priv/static/.gitignore priv/static/.dont-ignore
git add priv/static/compiled
git commit -m "compile assets for production"

echo "returning to old branch"
git co -

echo deploying branch $branch_to_deploy\ to heroku
git push --force heroku tmp:master


