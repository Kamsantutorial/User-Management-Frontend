## Bakong Acquiring Portal

Bakong Acquiring Service enables ASB customers to pay their AEON Credit Card bills by scanning KHQR Code through Bakong app or any Bakong member App. This helps ASB to increase customer service satisfaction and diversify its payment channels with Bakong acquiring service solution.

## Overall Flow
Bakong Acquiring Service is provided the automation process generating KHQR code at the backend every end of month during or after billing were created at AFIS side by sync customer information to generate KHQR content. After or during billing was sent to customer at the AFIS side our service will process scheduling sending KHQR embedded KHQR code with the email attachment to customer for scan pay their credit card repayment. In case failed sending to customer our system able to generate and sending by manually in the Web Portal. The payment transaction will record at Bakong PG database. And our service will generate CSV payment file and upload to SFTP server every day for settle with AFIS.

## About Web Frontend

We implement the Frontend and Backend separately, so the client user must log in to obtain an access token from the API before accessing each API via their LDAP account.

## Customize configuration

### Prerequisite
- Node v18.16.0 or Above
- Vue V3.3.4

### Plugins
- ANT Design Vue V3.2.20
- Pinia V2.1.6

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
# Deployment

```node
node -v
```

Current node version use: v18.16.0

## Installing Node JS

Install or update nvm

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```



## Development ENV configuration
.env.development

```properties
#enviroment
NODE_ENV=development
VITE_BASE_URL=http://uat-bakong.aeon.com.kh/
#System Name
VITE_APP_TITLE=Bakong Acquiring UAT
#API Base URL
VITE_API_BASE_URL=http://localhost:8080/
#Version
VITE_APP_VERSION=1.0.0

```

## Production ENV configuration
.env.production

```properties
#enviroment
NODE_ENV=production
VITE_BASE_URL=http://uat-bakong.aeon.com.kh/
#System Name
VITE_APP_TITLE=Bakong Acquiring
#API Base URL
VITE_API_BASE_URL=http://uat-bakong-api.aeon.com.kh/
#Version
VITE_APP_VERSION=1.0.0

```
