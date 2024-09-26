let model;

async function loadModel() {
    model = await blazeface.load();
    console.log('Yuzingiz aniqlandi!!');
}

document.getElementById('fileInput').addEventListener('change', async function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);
    
    img.onload = async () => {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const predictions = await model.estimateFaces(canvas);
        document.getElementById('count').textContent = predictions.length;

        predictions.forEach(prediction => {
            const [startX, startY] = prediction.topLeft;
            const [endX, endY] = prediction.bottomRight;
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.strokeRect(startX, startY, endX - startX, endY - startY);
        });
    };
});


loadModel();
