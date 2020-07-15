export const convertToBatch = (list, size: number = 4) => {
    const batch = [];
    for (let index = 0; index < list.length; index+=size) {
        batch.push(list.slice(index, size))
    }
    return batch;
}
