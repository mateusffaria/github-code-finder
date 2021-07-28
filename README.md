# Github Code Search

This project is a simple github code finder using React and [Octokit](https://github.com/octokit/octokit.js) library. You can search for any code in all github grouping by repositories.

## How to run this project?

First, you need to generate `Personal access token` from [GitHub](https://github.com/settings/tokens)

When you finished, duplicate the `.env.example` file and rename it to `.env`

Paste your token inside of `.env` file should look like this:

`REACT_APP_GITHUB_DEV_KEY=your_personal_token`

In the project directory, you run:

`$ yarn install`

and then

`$ yarn start`

[http://localhost:3000](http://localhost:3000) to view it in the browser.

# Prints of application running:

![home](https://github.com/MateusFaria-TGG/github-code-finder/blob/main/public/docsImages/home.png)

![result](https://github.com/MateusFaria-TGG/github-code-finder/blob/main/public/docsImages/result.png)

# Next Steps:

1. Implement Pagination
2. Add more options to search
3. UI improvement
4. And more..
