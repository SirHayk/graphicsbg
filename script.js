// Customize these...
var n = 2000,
    duration = 10;

// ...not these
var c = document.getElementById("c"),
    ctx = c.getContext("2d"),
    cw = (c.width = window.innerWidth),
    ch = (c.height = window.innerHeight),
    img = new Image(),
    particles = [],
    particleNumber = 0,
    Particle = function() {
      //this._dur = 
      this.draw = function() {
        ctx.globalAlpha = this.alpha;
        if (this.dur<duration/1.5) ctx.globalAlpha = rand(0.2,0.7); // adds flicker
        ctx.globalCompositeOperation = 'lighter';
        ctx.drawImage(img, this.x, this.y, this.size, this.size);
      }
    };


function setParticle(p) {
  particleNumber++;
  var _dur = rand(duration, duration*1.5),
      _size = rand(15, 400) // px width + height
      _tl = new TimelineMax()
            .fromTo(p, _dur,  {x:cw/2-7, y:ch/2-7, size:14, dur:0},
                              {x:rand(-_size, cw+_size),
                               y:rand(-_size*2, ch+_size),
                               size:_size,
                               dur:_dur,                               
                               ease:ExpoScaleEase.config(0.001, 0.2),
                               onComplete:function(){ setParticle(p); }
                              }, 0)
            .fromTo(p,  _dur/2,  {alpha:1}, {alpha:0, ease:Power2.easeIn}, _dur/2)
  if (particleNumber<n) _tl.seek(_dur*rand()); //fast forward on first run
}


// First run
for (var i=0; i<n; i++) {
    particles.push(new Particle());
    setParticle(particles[i]);      
}

TweenMax.ticker.addEventListener("tick", function(){
  ctx.clearRect(0, 0, cw, ch);
  for (var i=0; i<n; i++) particles[i].draw();
});


window.addEventListener('resize', function() {
  particleNumber = 0;  
  cw = (c.width = window.innerWidth);
  ch = (c.height = window.innerHeight);
  for (var i=0; i<n; i++) {
    TweenMax.killTweensOf(particles[i]);
    setParticle(particles[i]);
  }
});


function rand(min=0, max=1) {
  return min + (max-min)*Math.random();
}


img.src = "data:image/png;base64,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";