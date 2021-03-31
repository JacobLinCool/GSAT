async function candidates() {
    let result = {};

    let first_stage = await fetch(`./first_stage/first_stage.json`).then((r) => r.json());

    for (let [college, departments] of Object.entries(first_stage)) {
        for (let [department, informations] of Object.entries(departments)) {
            informations.candidate.forEach((id) => {
                if (!result[id]) result[id] = [];
                result[id].push({
                    college: college,
                    department: department,
                    department_code: informations.code,
                });
            });
        }
    }

    return result;
}
