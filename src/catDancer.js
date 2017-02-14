var CatDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.append('<img class="cat" src="src/cat1.png"></img>');
  this.width = $('body').width();
  this.height = $('body').height();
  this.targetY = this.width * Math.random();
  this.targetX = this.height * Math.random();
  this.increment = 5;  // in px
  this.top = top;
  this.left = left;
  this.slope = (this.targetX - this.top) / (this.targetY - this.left);
  
};

CatDancer.prototype = Object.create(Dancer.prototype);

CatDancer.prototype.constructor = CatDancer;

CatDancer.prototype.oldStep = Dancer.prototype.step;

CatDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  
  if (!this.pause) {
    this.oldStep();
    // toggle() is a jQuery method to show/hide the <span> tag.
    // See http://api.jquery.com/category/effects/ for this and
    // other effects you can use on a jQuery-wrapped html tag.
    var newLeft = this.left + this.increment * this.slope;
    var newTop = this.top + this.slope * this.increment;

    newLeft = newLeft < 0 ? 0 : newLeft;
    newTop = newTop < 0 ? 0 : newTop;
    newLeft = newLeft > this.width ? this.width : newLeft;
    newTop = newTop > this.heigth ? this.heigth : newTop;

    this.setPosition(newTop, newLeft);
    this.top = newTop;
    this.left = newLeft;
  }
};
