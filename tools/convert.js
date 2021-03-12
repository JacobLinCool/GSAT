const convert = (國文, 英文, 數學, 社會, 自然, data, mode = "TOP") => {
    let year = "110";
    let TOPs = {
        國文: top(國文, data[year].國文),
        英文: top(英文, data[year].英文),
        數學: top(數學, data[year].數學),
        社會: top(社會, data[year].社會),
        自然: top(自然, data[year].自然),
    };
    let BTMs = {
        國文: btm(國文, data[year].國文),
        英文: btm(英文, data[year].英文),
        數學: btm(數學, data[year].數學),
        社會: btm(社會, data[year].社會),
        自然: btm(自然, data[year].自然),
    };
    let AVGs = {
        國文: avg(國文, data[year].國文),
        英文: avg(英文, data[year].英文),
        數學: avg(數學, data[year].數學),
        社會: avg(社會, data[year].社會),
        自然: avg(自然, data[year].自然),
    };

    let TOP = {},
        BTM = {},
        AVG = {};

    for (let y = 109; y >= 106; y--) {
        TOP[y] = {};
        TOP[y]["國文"] = grade(TOPs.國文, data[y].國文);
        TOP[y]["英文"] = grade(TOPs.英文, data[y].英文);
        TOP[y]["數學"] = grade(TOPs.數學, data[y].數學);
        TOP[y]["社會"] = grade(TOPs.社會, data[y].社會);
        TOP[y]["自然"] = grade(TOPs.自然, data[y].自然);
    }
    for (let y = 109; y >= 106; y--) {
        BTM[y] = {};
        BTM[y]["國文"] = grade(BTMs.國文, data[y].國文);
        BTM[y]["英文"] = grade(BTMs.英文, data[y].英文);
        BTM[y]["數學"] = grade(BTMs.數學, data[y].數學);
        BTM[y]["社會"] = grade(BTMs.社會, data[y].社會);
        BTM[y]["自然"] = grade(BTMs.自然, data[y].自然);
    }
    for (let y = 109; y >= 106; y--) {
        AVG[y] = {};
        AVG[y]["國文"] = grade(AVGs.國文, data[y].國文);
        AVG[y]["英文"] = grade(AVGs.英文, data[y].英文);
        AVG[y]["數學"] = grade(AVGs.數學, data[y].數學);
        AVG[y]["社會"] = grade(AVGs.社會, data[y].社會);
        AVG[y]["自然"] = grade(AVGs.自然, data[y].自然);
    }

    if (mode == "TOP") {
        return TOP;
    } else if (mode == "BTM") {
        return BTM;
    } else if (mode == "AVG") {
        return AVG;
    } else {
        return {
            AVG,
            TOP,
            BTM,
        };
    }

    function acc(grade, table) {
        let sum = 0;
        for (let i = 15; i >= grade; i--) sum += table[i];
        return sum;
    }
    function top(grade, table) {
        if (grade < 15) grade++;
        return acc(grade, table) + 1;
    }
    function btm(grade, table) {
        return acc(grade, table);
    }
    function avg(grade, table) {
        return parseInt((top(grade, table) + btm(grade, table)) / 2);
    }
    function grade(rank, table) {
        let u, l;
        for (let i = 15; i >= 0; i--) {
            if (acc(i, table) >= rank) {
                u = i + 1;
                l = i;
                break;
            }
        }
        return Math.floor((u - (rank - acc(u, table)) / (acc(l, table) - acc(u, table))) * 10 + 0.5) / 10;
    }
};

export default convert;
