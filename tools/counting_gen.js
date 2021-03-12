const gen = (國文, 英文, 數學, 社會, 自然) => {
    const convert = (text) => text.replaceAll(/,/g, "").replaceAll(/"/g, "").split("\n").reverse().map(Number);

    let a = {};
    a["國文"] = convert(國文);
    a["英文"] = convert(英文);
    a["數學"] = convert(數學);
    a["社會"] = convert(社會);
    a["自然"] = convert(自然);
    return a;
};

export default gen;
