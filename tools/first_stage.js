async function first_stage() {
    let result = {};

    let root = `https://www.cac.edu.tw/CacLink/apply110/110apply_pgSieve_22sd8rga/html_sieve_110swk5m/ColPost/collegeList.htm`;

    console.log(`Fetching College List...`);
    let college_list_dom = await fetch(root)
        .then((r) => r.text())
        .then((text) => {
            return new DOMParser().parseFromString(text, "text/html");
        });
    console.log(`College List Fetched.`);

    let college_links = Array.from(college_list_dom.querySelectorAll(`a`))
        .filter((x) => x.innerHTML == "招生名額")
        .map((x) => x.href);

    console.log(`College Links.`, college_links);

    for (let college_link of college_links) {
        console.log(`Fetching Department List...`);
        college_link = new URL(college_link);
        let department_list_dom = await fetch(college_link)
            .then((r) => r.text())
            .then((text) => {
                return new DOMParser().parseFromString(text, "text/html");
            });
        console.log(`Department List Fetched.`);

        let school_name = department_list_dom.title.replace(
            /\d{3} 學年度大學個人申請入學招生各校系通過第一階段篩選名單-/,
            ``
        );
        result[school_name] = {};

        let department_links = Array.from(department_list_dom.querySelectorAll(`a[name^="applyno"]`)).map((x) =>
            x.href.replace(`/ColPost/apply`, `/ColPost/common/apply`)
        );
        console.log(`Department Links.`, department_links);

        for (let department_link of department_links) {
            let department_dom = await fetch(department_link)
                .then((r) => r.text())
                .then((text) => {
                    return new DOMParser().parseFromString(text, "text/html");
                });
            try {
                let [name_element] = Array.from(department_dom.querySelectorAll(`span`)).filter((x) =>
                    x.innerHTML.match(/^\((\d{6})\)([^]+)/)
                );
                let [department_code, department_name] = name_element.innerHTML.match(/^\((\d{6})\)([^]+)/).splice(1);

                result[school_name][department_name] = {
                    code: department_code,
                    candidate: Array.from(department_dom.querySelectorAll(`span`))
                        .filter((x) => x.innerHTML.match(/^\d{8}/))
                        .map((x) => x.innerText),
                };
                console.log(`Processed ${school_name} ${department_name}.`, result[school_name][department_name]);
            } catch (e) {
                console.error(e, department_dom);
            }
        }
    }
    return result;
}
