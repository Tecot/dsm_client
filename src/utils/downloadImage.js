import jsPDF from "jspdf"
import html2canvas from "html2canvas"


export const downloadImage2SVG = (el) => {
    const svgString = new XMLSerializer().serializeToString(el)
    const file = new Blob([svgString], { type: 'image/svg+xm' })
    const url = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.download = 'my-svg-file.svg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}


export const downloadImage2PDF = async (svgElement) => {
      // 使用html2canvas将Vue组件渲染为图片
      const canvas = await html2canvas(svgElement)
      // 创建新的jsPDF文档
      const pdf = new jsPDF('l', 'mm', [300, 100])
      // 将渲染的图片添加到PDF文档中
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 290, 80)
      // 下载PDF文件

      pdf.save(new Date().valueOf() + '.pdf')
}



// downloadSvg2Pdf(imageBase64, svg, outFileName = 'newplot.pdf') {
//     const img = new Image(); // 创建图片容器
//     img.src = imageBase64; //imageBase64 为svg+xml的Base64 文件流
//     img.onload = async () => {
//         const size = [img.width, img.height]; // 获取图片尺寸防止不完整
//         // const pdf = new jsPDF('portrait', 'cm', [21.0, 29.6]);
//         // const pdf = new jsPDF('l', 'pt', 'a4');
//         const pdf = new jsPDF('l', 'pt', size);
//         await pdf.svg(svg);
//         const uri = pdf.output('datauristring');
//         const link = document.createElement('a');
//         link.download = outFileName;
//         link.href = uri;
//         link.click();
//     }
// }


// ==============download png
const doctype = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" [<!ENTITY nbsp " ">]>';
 
function convertToPng(src, w, h) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = w;
    canvas.height = h;
    context.drawImage(src, 0, 0);
    let png;
    try {
        png = canvas.toDataURL("image/png");
    } catch (e) {
        if ((typeof SecurityError !== 'undefined' && e instanceof SecurityError) || e.name == "SecurityError") {
            console.error("Rendered SVG images cannot be downloaded in this browser.");
            return;
        } else {
            throw e;
        }
    }
    return png;
}
 
function isElement(obj) {
    return obj instanceof HTMLElement || obj instanceof SVGElement;
}

function reEncode(data) {
    data = encodeURIComponent(data);
    data = data.replace(/%([0-9A-F]{2})/g, function (match, p1) {
        var c = String.fromCharCode('0x' + p1);
        return c === '%' ? '%25' : c;
    });
    return decodeURIComponent(data);
}

function uriToBlob(uri) {
    const byteString = window.atob(uri.split(',')[1]);
    const mimeString = uri.split(',')[0].split(':')[1].split(';')[0]
    const buffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(buffer);
    for (let i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([buffer], {type: mimeString});
}

export const downloadImage2PNG = (el, name) => {
    if (!isElement(el)) {
        throw new Error('an HTMLElement or SVGElement is required; got ' + el);
    }
    if (!name) {
        console.error("文件名为空!");
        return;
    }
    const xmlns = "http://www.w3.org/2000/xmlns/";
    const clone = el.cloneNode(true);
    clone.setAttribute("version", "1.1");
    if (!clone.getAttribute('xmlns')) {
        clone.setAttributeNS(xmlns, "xmlns", "http://www.w3.org/2000/svg");
    }
    if (!clone.getAttribute('xmlns:xlink')) {
        clone.setAttributeNS(xmlns, "xmlns:xlink", "http://www.w3.org/1999/xlink");
    }


    const svg = clone.outerHTML;
    const uri = 'data:image/svg+xml;base64,' + window.btoa(reEncode(doctype + svg));
    const image = new Image();
    image.onload = function () {
        var png = convertToPng(image, image.width, image.height);
        var saveLink = document.createElement('a');
        var downloadSupported = 'download' in saveLink;
        if (downloadSupported) {
            saveLink.download = name + ".png";
            saveLink.style.display = 'none';
            document.body.appendChild(saveLink);
            try {
                var blob = uriToBlob(png);
                var url = URL.createObjectURL(blob);
                saveLink.href = url;
                saveLink.onclick = function () {
                    requestAnimationFrame(function () {
                        URL.revokeObjectURL(url);
                    })
                };
            } catch (e) {
                saveLink.href = uri;
            }
            saveLink.click();
            document.body.removeChild(saveLink);
        }
    };
    image.src = uri;
}