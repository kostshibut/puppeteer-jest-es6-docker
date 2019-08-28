#### Application for running api or end-to-end automated tests in jenkins using puppeteer, jest, docker

## build or pull image
```bash
docker build -t image-e2e-tests .
docker pull mhuretski/puppet-jest-es6
```
## start in jenkins
### 1. Create pipeline
### 2. Specify repository from SCM
### 3. Run job

## start in nodejs locally
```bash
npm test --ENV_TO_CHECK=<LOCAL> --BUILD_NUMBER=<BUILD_NUMBER> <SPEC> --CHECK=<UI> --SCREENSHOT=<SCREENSHOT> --debug
<LOCAL> - local environment
<BUILD_NUMBER> - specifies folder for output
<SPEC> - specifies filename pattern to run
<UI> - specifies flag how to check
<SCREENSHOT> - specifies whether to make screenshots
--debug - run non-headless
```
##### Example
```bash
npm test --ENV_TO_CHECK=LOCAL --BUILD_NUMBER=100 spec --CHECK=UI --debug --SCREENSHOT=true
```

##### IDE scope setup pattern:
```bash 
file:tests//*&&(file:*ui.ts||file:*spec.ts||file:*api.ts||file:*soap.ts||file:*rest.ts||file:*perf.ts)
```
