import Slideout from 'slideout';

if (Meteor.isClient) {
  var slideoutLeft
  var slideoutRight
  
  // Router configuration
  Router.configure({
    layoutTemplate: 'MasterLayout'
  });

  // Auto-close the menu on route stop (when navigating to a new route)
  Router.onStop(function () {
    if (slideoutLeft) {
      slideoutLeft.close();
    }
    if (slideoutRight) {
      slideoutRight.close();
    }
  });

  // Define some routes
  Router.route('/', { name: 'page1' });
  Router.route('/page2', { name: 'page2' });
  Router.route('/page3', { name: 'page3' });
  Router.route('/page4', { name: 'page4' });

  // Setup code for Slideout menu in MasterLayout
  Template.MasterLayout.onRendered(function () {

    // init slideout right navigation menu
    slideoutLeft = new Slideout({
      'panel': $('#content').get(0),
      'menu': $('#slideout-menu-left').get(0),
      'padding': 256,
      'tolerance': 70,
      'side': 'left'
    });

    // event-based transitions
    slideoutLeft.on('beforeopen', function() {
      $('#slideout-menu-left.slideout-menu').css('z-index', 0);
    });
    slideoutLeft.once('close', function() {
      $('#slideout-menu-left.slideout-menu').css('z-index', -1);
    });
    // to account for touchscreen devices
    slideoutLeft.on('translatestart', function() {
      $('#slideout-menu-left.slideout-menu').css('z-index', 0);
    });
    slideoutLeft.on('translateend', function() {
      $('#slideout-menu-left.slideout-menu').css('z-index', 0);
    });

    // init slideout right navigation menu
    slideoutRight = new Slideout({
      'panel': $('#content').get(0),
      'menu': $('#slideout-menu-right').get(0),
      'padding': 256,
      'tolerance': 70,
      'side': 'right'
    });

    // event-based transitions
    slideoutRight.on('beforeopen', function() {
      $('#slideout-menu-right.slideout-menu').css('z-index', 0);
    });
    slideoutRight.once('close', function() {
      $('#slideout-menu-right.slideout-menu').css('z-index', -1);
    });
    // to account for touchscreen devices
    slideoutRight.on('translatestart', function() {
      $('#slideout-menu-right.slideout-menu').css('z-index', 0);
    });
    slideoutRight.on('translateend', function() {
      $('#slideout-menu-right.slideout-menu').css('z-index', 0);
    });
  });

  Template.MasterLayout.events({
    'click .nav-button-left': function() {
      slideoutLeft.toggle();
    },
    'click .nav-button-right': function() {
      slideoutRight.toggle();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
