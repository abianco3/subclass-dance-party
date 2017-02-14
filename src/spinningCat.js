var SpinningCatDancer = function(top, left, timeBetweenSteps) {
  CatDancer.call(this, top, left, timeBetweenSteps);
  this.$node.find('img').addClass('spin');
  
};

SpinningCatDancer.prototype = Object.create(CatDancer.prototype);

SpinningCatDancer.prototype.constructor = SpinningCatDancer;

SpinningCatDancer.prototype.constructor = SpinningCatDancer;
