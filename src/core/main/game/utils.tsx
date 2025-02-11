
export const posText2Num = (posText: string): { x: number; z: number } | null => {
    const values = posText
      .replace(/[;[\]]/g, "") 
      .split(" ")
      .map(Number);

    //console.log("values:",values);
    if (values.length !== 3 || values.some(isNaN)) {
      console.error("Invalid posText format");
      return null;
    }

    const [x, , z] = values;
    if (x === undefined || z === undefined) {
      console.error("Invalid posText format: x or z is undefined");
      return null;
    }

    return { x, z };
};