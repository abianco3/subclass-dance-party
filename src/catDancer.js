var CatDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.append('<img class="cat" src="src/cat1.png"></img>');
  this.explode();
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
    var rightBound = window.innerWidth - 75;  // cat size
    var bottomBound = window.innerHeight - 75;  // cat size
    newLeft = newLeft > rightBound ? rightBound : newLeft;
    newTop = newTop > bottomBound ? bottomBound : newTop;

    this.setPosition(newTop, newLeft);
    this.top = newTop;
    this.left = newLeft;
  }
 
};

CatDancer.prototype.explode = function() {
  var catObject = this;
  var $catDisplay = this.$node;

  var explodeImage = function explodeImage() {
    $catDisplay.find('img').attr('src', 'src/explosion.png');
    setTimeout(function() {
      $catDisplay.remove();
      // remove the object from dancers array
      for (var i = 0; i < window.dancers.length; i++) {
        if (window.dancers[i] === catObject) {
          window.dancers.splice(i, 1);
        }
      }
      //delete catObject;
    }, 1000);
  };

  $catDisplay.find('img').hover(explodeImage);
};
