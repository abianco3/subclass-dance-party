var CatDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.append('<img class="cat" src="src/cat1.png"></img>');
  this.explode();
  this.width = $('body').width();
  this.height = $('body').height();
  this.increment = 15;  // in px
  this.top = top;
  this.left = left;
  this.angle = this._setAngle();
  
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
    var newLeft = this._setLeft();
    var newTop = this._setTop();

    //newLeft = newLeft < 0 ? 0 : newLeft;
    //newTop = newTop < 0 ? 0 : newTop;
    //var rightBound = window.innerWidth - 75;  // cat size
    //var bottomBound = window.innerHeight - 75;  // cat size
    //newLeft = newLeft > rightBound ? rightBound : newLeft;
    //newTop = newTop > bottomBound ? bottomBound : newTop;
    var collision = this._collisionDetector();
    if (collision === 'horizontal collision') {
      this.angle = -this.angle;
      newLeft = this._setLeft();
      newTop = this._setTop();
    } else if (collision === 'vertical collision') {
      this.angle = Math.PI - this.angle;
      newLeft = this._setLeft();
      newTop = this._setTop();
    }
    this.setPosition(newTop, newLeft);
    this.top = newTop;
    this.left = newLeft;
  }
 
};


CatDancer.prototype._collisionDetector = function() {
  
  // iterate through all the cat objects
  for (var i = 0; i < window.dancers.length; i++) {
    // vertical collision factor
    var cat = window.dancers[i];
    if (cat !== this) {
      var VC = Math.abs(cat.top - this.top);
      // HC factor
      var HC = Math.abs(cat.left - this.left);
      if (VC < 75 && HC < 75) {
        // debugger;
        if (VC < HC) {
          return 'vertical collision';
        } else {
          return 'horizontal collision';
        }
      } else {
      }
    }
  }
  return 'no collision';
};


CatDancer.prototype._setLeft = function() {
  var newLeft = this.left + this.increment * Math.cos(this.angle);
  if (newLeft < 0 || newLeft > window.innerWidth - 75) {
    this.angle = Math.PI - this.angle;
    newLeft = this.left + this.increment * Math.cos(this.angle);
  }
  return newLeft;
};

CatDancer.prototype._setTop = function() {
  var newTop = this.top + this.increment * Math.sin(this.angle);
  if (newTop < 0 || newTop > window.innerHeight - 75) {
    this.angle = -this.angle;
    newTop = this.top + this.increment * Math.sin(this.angle);
  }
  return newTop;
};

CatDancer.prototype._setAngle = function () {
  return Math.random() * (2 * Math.PI);
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
