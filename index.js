let api = "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";
const inpt = document.getElementById("inpt");
const images = document.getElementById("images");

const getImages = async () => {
    const methods = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${api}`,
        },
        body: JSON.stringify({
            prompt: inpt.value,
            n: 3,
            size: "256x256",
        }),
    };

    try {
        const res = await fetch(
            "https://api.openai.com/v1/images/generations",
            methods
        );

        if (res.status === 429) {
            console.error("Rate limit exceeded. Please wait and try again.");
            return;
        }

        const myData = await res.json();

        // التحقق من وجود imageList قبل استخدام map
        const imageList = myData.data || [];

        images.innerHTML = "";

        // استخدام forEach بدلاً من map للتعامل مع قائمة فارغة بشكل أفضل
        imageList.forEach((photo) => {
            const div = document.createElement("div");
            images.append(div);
            const img = document.createElement("img");
            div.append(img);
            img.src = photo.url;
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
};
