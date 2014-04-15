issues-mvc
==========

[![Stories in Ready](https://badge.waffle.io/juristr/issues-mvc.png?label=ready&title=Ready)](https://waffle.io/juristr/issues-mvc)

> TodoMVC evolved - Testing MVC frameworks on an oversimplified issue tracking system.

[TodoMVC](http://todomvc.com/) is awesome in helping you to select a suitable MVC framework, but it is limited in a couple of use cases. When I look at MVC JavaScript frameworks I'm interested in more scenarios which you usually encounter in real-world apps like

- filtering data
- master-detail relationships
- model associations (has-many, belongs-to,..)
- ...

In IssuesMVC I'd like to try these out.

**Tl;dr:** I am just doing a review on the most popular JavaScript MVC frameworks. To experiment a bit with them I started building something a little more evolved than TodoMVC and what came out was a GitHub-style issue management app.  
Just open sourced it to let some more experienced devs help, do code reviews or even contribute. Would be great!

## Goals

"Issues-MVC" aims at implementing a simple issue tracking system (like GitHub's, but just simpler). Here's a very early feature spec that should be present.

- Adding a new issues
- Filtering of issues by
  - open/closed state
  - all
  - assigned to me
  - created by me
- Assignment of labels to issues
- Management of available labels
- _(More to come eventually..)_

So far, take a [look here](https://github.com/juristr/issues-mvc/issues).

## So far..

- [EmberJS Demo](http://juristr.com/issues-mvc/ember/index.html)

## License

Copyright (c) 2014 Juri Strumpflohner

Licensed under the [MIT license](https://github.com/juristr/issues-mvc/blob/master/LICENSE).
