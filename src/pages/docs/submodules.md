---
title: Working with Submodules
layout: prose
order: 2
---

# {{title}}

This library includes the [teamsnap-ui](https://github.com/teamsnap/teamsnap-ui) repository of CSS components as a `git submodule`.

Below are a few `git submodule` commands that may come in handy. For more helpful reading, take a peek at [Git Tools - Submodules] and  [Working with submodules].

All of the following `git submodule` commands are to be executed from the `ui-patterns` repository.

command | description
--- | ---
`git submodule update src/teamsnap-ui` | This will update (or reset) the `teamsnap-ui` submodule by checking out the files at the current submodule commit hash that has been committed to the `ui-patterns` repository.
`git submodule update --remote src/teamsnap-ui` | This will update the `teamsnap-ui` submodule by checking out the latest from the _remote_ repository. This is handy if you want to pull in the latest commit from `master` in the `teamsnap-ui` remote repository.
`git diff --submodule src/teamsnap-ui` | This will show us a diff of the `teamsnap-ui` submodule only.

You can also `cd` into the `src/teamsnap-ui` submodule and work within the CSS the same way you'd work within the `teamsnap-ui` repo. You can commit changes and submit PRs from within this directory.

<br>

## Bumping the submodule

We want to keep our submodule up to date with remote master. If changes have been made to the remote version of `teamsnap-ui`, we can update our commit hash reference to match by committing it within the `ui-patterns` repo.

0. Run the command `git submodule update --remote src/teamsnap-ui`.

  Alternately, you can always `cd` into the `src/teamsnap-ui` submodule and run `git checkout master` and `git pull` to get the latest.

0. You will now see `modified:   src/teamsnap-ui (new commits)` when running `git status` from the `ui-patterns` repo.

0. Commit the change by `add`ing and `commit`ing `src/teamsnap-ui` like you would any other file.
