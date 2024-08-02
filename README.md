# nextFitness
nextFitness is a workout log and exercise database app built for demonstration purposes only.


## Prerequisites
- [PostgreSQL database](https://www.postgresql.org/download/)
- [NodeJS v20 or higher](https://nodejs.org/en/download/package-manager)
- [GitHub OAuth Client ID and secret](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
- [Google OAuth Client ID and secret](https://support.google.com/cloud/answer/6158849?hl=en)

## Running the project
1. Copy contents of `.env.example` into `.env.local` and add in values from PostgreSQL database and OAuth providers from above
2. Install dependencies
    ```bash
    npm i
    ```
3. Run the development server:

    ```bash
    npm run dev
    ```
## Testing
Run tests with `npm run test`
Watch for test changes with `npm run test:watch`

