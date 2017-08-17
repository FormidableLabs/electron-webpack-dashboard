<h1 align="center">electron-webpack-dashboard</h1>

<h4 align="center">
  Electron Desktop GUI for Webpack Dashboard
</h4>

***

![http://i.imgur.com/9TObNrN.png](http://i.imgur.com/9TObNrN.png)

## Whats this all about?

The original [webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard), was fun and people seemed to like it. Unless they were on Windows, or used a weird terminal set up, or if they just wanted more.

Making things work across a variety of different terminal environments is pretty rough. Also, a web GUI provides some unique UI possibilities that weren't there with the term display.

So here we are.

The original dashboard felt like working at NASA. 50 years ago. I hope this dashboard feels like working at NASA today. Or at Westworld. Or like the beginning of Westworld at least.

## Getting Started

#### NOTE: THIS IS THE INITIAL BETA. THINGS WILL BE BROKEN. PROBABLY.

### Install

#### Mac
Download the App for Mac: [Webpack.Dashboard-1.0.0.dmg](https://github.com/FormidableLabs/electron-webpack-dashboard/releases/download/0.0.1-beta.1/Webpack.Dashboard-1.0.0.dmg)

Or you can also install the App via [Homebrew Cask](https://caskroom.github.io/):

```bash
$ brew cask install webpack-dashboard
```

#### Windows
Download for Windows: [Webpack.Dashboard.Setup.1.0.0.exe](https://github.com/FormidableLabs/electron-webpack-dashboard/releases/download/0.0.1-beta.1/Webpack.Dashboard.Setup.1.0.0.exe)

### Configuring Your Project

First, in your project, install the `webpack-dashboard` beta release:

`npm install webpack-dashboard@v1.0.0-2 --save-dev`

Next, in any Webpack config you want telemetry on, import the plugin:

```js
const DashboardPlugin = require('webpack-dashboard/plugin');
```

Then add the plugin to your config's plugins array, like so:

```js
plugins: [
  // ... your other plugins
    new DashboardPlugin()
  ],
```

### Usage

Simply hit save on a project running `webpack-dev-server`, or run your build task that builds with `webpack` and providing you have configured your project as shown above, you should see the dashboard start to display data.

### Credits

The visualizations view was essentially recreated using code from [https://github.com/chrisbateman/webpack-visualizer](https://github.com/chrisbateman/webpack-visualizer), and I am forever grateful that I didn't have to figure this stuff out on my own.
