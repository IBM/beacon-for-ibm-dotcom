# Developing

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Setup](#setup)
- [Installing dependencies](#installing-dependencies)
- [Common tasks](#common-tasks)
- [Submitting a Pull Request](#submitting-a-pull-request)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Setup

Our repository requires that a forked repo is used for any work before
contributing back to the repository. This includes regular team
members/maintainers.

1. Fork the project by navigating to the main
   [repository](https://github.com/IBM/beacon-for-ibm-dotcom/) and
   clicking the **Fork** button on the top-right corner.

2. Navigate to your forked repository and copy the **SSH url**. Clone your fork
   by running the following in your terminal:

   ```
   $ git clone git@github.com:{ YOUR_USERNAME }/beacon-for-ibm-dotcom.git
   $ cd beacon-for-ibm-dotcom
   ```

   See [GitHub docs](https://help.github.com/articles/fork-a-repo/) for more
   details on forking a repository.

3. Once cloned, you will see `origin` as your default remote, pointing to your
   personal forked repository. Add a remote named `upstream` pointing to the
   main `beacon-for-ibm-dotcom`:

   ```
   $ git remote add upstream git@github.ibm.com:webstandards/beacon-for-ibm-dotcom.git
   $ git remote -v
   ```

4. Switch to our version of Node. If you are using (nvm
   [Node Version Manager](https://github.com/creationix/nvm)), you can run
   `nvm use` to quicky switch Node versions. If you are aren't using nvm, you
   can still check the `.nvmrc` dotfile in the root of this project to find the
   major stable version of Node we are using, and then you can switch manually.

## Installing dependencies

In order for you to install all the dependencies in this project, you'll need to
[install Yarn](https://yarnpkg.com/en/docs/install) and run the following
command in your terminal:

```bash
yarn install
```

This will install all of the dependencies for every package in our project. In
addition, it allows us to link between packages that we are developing.

Afterwards, you should be good to go! For more information about how we handle
dependencies, definitely take a look at our write-up
[here](https://github.com/IBM/beacon-for-ibm-dotcom/blob/main/docs/dependencies.md).

## Common tasks

While working on Beacon for IBM.com, here are some of the top-level tasks that you might
want to run:

| Command                           | Usage                                                           |
| --------------------------------- | --------------------------------------------------------------- |
| `yarn beacon`                     | Uses `lighthouse` to run audits against the specified URL       |
| `yarn format`, `yarn format:diff` | Format files using prettier, check if files have been formatted |

## Submitting a Pull Request

1. Pull the latest main branch from `upstream`:

   ```
   $ git pull upstream main
   ```

2. Always work and submit pull requests from a branch. _Do not submit pull
   requests from the `main` branch of your fork_.

   ```
   $ git checkout -b { YOUR_BRANCH_NAME } main
   ```

3. Create your patch or feature.

4. Test your branch and add new test cases where appropriate.

5. Commit your changes using a descriptive commit message.

   ```
   $ git commit -a -m "chore: Update header with newest designs, resolves #123"
   ```

   **Note:** the optional commit -a command line option will automatically "add"
   and "rm" edited files. See
   [Close a commit via commit message](https://help.github.com/articles/closing-issues-via-commit-messages/)
   and
   [writing good commit messages](https://github.com/erlang/otp/wiki/Writing-good-commit-messages)
   for more details on commit messages.

   Carbon for IBM.com also uses a commit format called
   [Conventional Commits](https://www.conventionalcommits.org). This format is
   used to help automate details about our project and how it changes. When
   committing changes, there will be a tool that automatically looks at commits
   and will check to see if the commit matches the format defined by
   Conventional Commits.

6. Once ready for feedback from other contributors and maintainers, **push your
   commits to your fork** (be sure to run `yarn ci-check` before pushing, to
   make sure your code passes linting and unit tests):

   ```
   $ git push origin { YOUR_BRANCH_NAME }
   ```

7. In Github, navigate to
   [https://github.com/IBM/beacon-for-ibm-dotcom](https://github.com/IBM/beacon-for-ibm-dotcom/pulls)
   to create a pull request.

8. Write a title and description, then click "Create pull request".

   See
   [how to write the perfect pull request](https://github.com/blog/1943-how-to-write-the-perfect-pull-request)
   for more details on writing good PRs.

9. Stay up to date with the activity in your pull request. Maintainers will be
    reviewing your work and making comments, asking questions and suggesting
    changes to be made before they merge your code. When you need to make a
    change, add, commit and push to your branch normally.

    Once all revisions to your pull request are complete, a maintainer will
    squash and merge your commits for you.
