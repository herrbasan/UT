function addHeadImport(options){
    if(Array.isArray(options)){
        let promises = [];
        for(let i=0; i<options.length; i++){
            promises.push(addHeadImport(options[i]))
        }
        return Promise.allSettled(promises);
    }
    
    return new Promise((resolve, reject) => {
        let link;
        if(options.type === 'js') { link = document.createElement('script'); link.type = 'text/javascript'; }
        if(options.type === 'esm') { document.createElement('script'); link.type = 'module'; }
        if(options.type === 'css') { 
            link = document.createElement('link');
            link.type = "text/css";
            link.rel = 'stylesheet';
        }
        link.href = options.url;
        link.src = options.url;
        link.addEventListener('error', (e) => { console.log(e)})
        link.addEventListener('load', resolve, {once:true});
        document.getElementsByTagName('head')[0].appendChild(link);
    })
}

function drawImageDummy(text="Missing Asset", width=960, height=720){
    let canvas = document.createElement('canvas');
    var dpr = window.devicePixelRatio || 1;
    canvas.width = width;
    canvas.height = height;
    
    let ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(30,30,30,0.9)';
    ctx.fill();

    ctx.fillStyle = 'rgba(237, 63, 24,1)'
    ctx.textAlign = "center";
    ctx.font = 40 * dpr + "px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif";
    ctx.fillText('ASSET MISSING',canvas.width/2,canvas.height/2 - 20);
    ctx.fillStyle = 'rgba(255,255,255,0.8)'
    ctx.font = 14 * dpr + "px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif";
    ctx.fillText(text,canvas.width/2,canvas.height/2 + 20);
    let img = new Image();
    img.src = canvas.toDataURL();
    return img;
}

function awaitMs(ms){
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}

function awaitEvent(el, event, time=100000){
    return new Promise((resolve, reject) => {
        el.addEventListener(event, done);
        let to = setTimeout(done, time);
        function done(e){
            clearTimeout(to);
            el.removeEventListener(event, done);
            if(!e){ resolve('timeout') }
            else { resolve(e); }
        }
    })
}

export default {
    addHeadImport,
    drawImageDummy,
    awaitMs,
    awaitEvent
};

// Also export individually for backward compatibility with css.js import
export { addHeadImport, drawImageDummy, awaitMs, awaitEvent };