const downloadGitRepo = require('download-git-repo');
const downloadRepo = (repoName, target) => {
  return new Promise((resolve, reject) => {
    downloadGitRepo(repoName, target, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};
module.exports = {
  downloadRepo
};
