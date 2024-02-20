import sys
from matic_release.axioma.version import Version
from matic_release.capabilities.commit_analyzer import CommitAnalyzer
from matic_release.capabilities.compute_tag import ComputeTag
from matic_release.capabilities.publish_tag import PublishTag
from matic_release.integration.git import GitService


args = sys.argv[1:]
git = GitService()

latest_tag = git.get_latest_tag()

version = Version(latest_tag)

commit_analyzer = CommitAnalyzer()
compute_tag = ComputeTag(git, commit_analyzer)

compute_tag.execute(version)


if '--ci' in args:
  publish = PublishTag(git)
  publish.execute(version)

print(version.future_tag.value)
