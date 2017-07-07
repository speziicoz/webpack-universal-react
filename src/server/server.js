import path from "path"
import Express from "express"
import ejs from "ejs"

import React from "react"
import { renderToString, renderToStaticMarkup } from "react-dom/server"
import { Provider } from "react-redux"
import { match, RouterContext } from "react-router"

import routes from "../common/routes"
import configureStore from "../common/store/configureStore"
import template from "../views/index.ejs"

const app = new Express()
const port = process.env.PORT || 3000

if (process.env.NODE_ENV === "development") {
  const webpack = require("webpack")
  const webpackConfig = require("../../webpack/config.common")
  const webpackDevMiddleware = require("webpack-dev-middleware")
  const webpackHotMiddleware = require("webpack-hot-middleware")

  const compiler = webpack(webpackConfig)

  app.use(webpackDevMiddleware(compiler, {
    index: "index.ejs",
    stats: "minimal",
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }))

  app.use(webpackHotMiddleware(compiler))
} else {
  app.use(Express.static("public/static"))
}

app.use(function (req, res) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const store = configureStore()

      Promise.all(
        renderProps.components
          .filter(component => component && component.fetchInitialComponentData)
          .map(component => store.dispatch(component.fetchInitialComponentData(renderProps.params)))
      ).then(result => {
        const bundleJS = `<script async src="bundle.js"></script>`
        const markup = renderToStaticMarkup(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        )

        res.send(ejs.render(template, { markup, bundleJS }))
      }).catch(error => {
        res.status(500).send(error.message)
      })
    } else {
      res.status(404).send("Not found")
    }
  })
})

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.log(`Listening on port ${port} [${process.env.NODE_ENV}]`)
  }
})