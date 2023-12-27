# Vite React Template 

A React template that generates a new project with automatic deployment to GitHub Pages.

1. Press green button right top corner **Use this template** and select **Create new repository** to initialize the repository with template configuration.
2. Update **vite.config.js** the base URL in this file by setting it with the name of your repository, for example _base: '/vite-react-template/'_
3. Inside **package.json** set the complete website URL as  _"homepage": "https://{username}.github.io/{repo-name}/"_
4. Run command `npm i` to install all dependencies
5. Run `git add .` `git commit -m 'add your comment here'` and `git push`  to push all your changes to your repository
6. Navigate to your remote repository on GitHub -> Settings -> Actions -> General. Scroll down to the **Workflow permissions** and select the **Read and Write permissions** and **Allow GitHub Actions to create and approve pull requests**
7. Navigate to your remote repository on GitHub -> Settings -> Pages (left sidebar). Select source as “Deploy from branch” and branch as “gh-pages”.
8. Now whenever you push your changes to GitHub the page will be automatically updated 