const objectArrayDeduplication = (objects, targetKey) => {
    const uniqueKeys = [...new Set(objects.map(obj => obj[`${targetKey}`]))];
    const uniqueObjects = uniqueKeys.map(key => 
        objects.find(obj => obj[`${targetKey}`] === key)
    );
    return uniqueObjects
}

const tcgaColor = (char) => {
    const colors = {
        'A': '#73D216',
        'G': '#F5A902',
        'C': '#FF0000',
        'T': '#007BE4'
    }
    return colors[char]
}

export {
    objectArrayDeduplication,
    tcgaColor
}