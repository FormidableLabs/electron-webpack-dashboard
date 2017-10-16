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

### Install

Download the version for your OS here:

[https://github.com/FormidableLabs/electron-webpack-dashboard/releases/latest](https://github.com/FormidableLabs/electron-webpack-dashboard/releases/latest)

If you are on macOS you can also install the app via [Homebrew Cask](https://caskroom.github.io/):

```bash
$ brew update
$ brew cask install webpack-dashboard
```

### Webpack 3 compatibility
To receive a complete analysis of your bundle, including modules, assets, and problems, you will need to make sure your project is using Webpack Dashboard Plugin 1.0 or higher.

### Configuring Your Project

First, in your project, install the `webpack-dashboard` plugin:

`npm install webpack-dashboard --save-dev`

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
