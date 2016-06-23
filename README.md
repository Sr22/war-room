# War Room Project
A project aimed to help CDK Global employees with their daily tasks.


## Dependencies:
* `npm ~2.15.5`
* `bower ~1.7.9`
* `python ~3.5.1`
<br>

## To build and run the test server
```
npm install
cd app
python -m http.server
```
<br>
Now you can visit <a target="_blank" href="http://localhost:8000/">http://localhost:8000/</a>

## Entire installation guide

### Grab dependencies
[Python (direct download)](https://www.python.org/ftp/python/3.5.1/python-3.5.1-amd64.exe)<br>
[Node.js (direct download)](https://nodejs.org/dist/v4.4.5/node-v4.4.5-x64.msi)<br>
Bower: `npm install -g bower`<br>

### Download, install, and run the test server
```
git clone ssh://git@stash.cdk.com/~sabod/war-room.git
cd war-room
npm install
cd app
python -m http.server
```
Go to <a target="_blank" href="http://localhost:8000/">http://localhost:8000/</a> to view the app!